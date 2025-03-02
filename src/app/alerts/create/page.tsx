'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function CreateAlertPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

  // Obter localização atual
  const getCurrentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error('Erro ao obter localização:', error);
          setError('Não foi possível obter sua localização');
        }
      );
    } else {
      setError('Seu navegador não suporta geolocalização');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = {
      type: formData.get('type'),
      description: formData.get('description'),
      location: formData.get('location'),
      latitude: location.latitude,
      longitude: location.longitude,
    };

    try {
      const response = await fetch('/api/alerts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push('/alerts?created=true');
      } else {
        const error = await response.json();
        setError(error.message || 'Erro ao criar alerta');
      }
    } catch (error) {
      setError('Ocorreu um erro ao criar o alerta');
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    router.push('/auth/login');
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Criar Alerta de Emergência</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Tipo de Emergência
          </label>
          <select
            id="type"
            name="type"
            required
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="">Selecione o tipo</option>
            <option value="FIRE">Incêndio</option>
            <option value="MEDICAL">Emergência Médica</option>
            <option value="POLICE">Polícia</option>
            <option value="NATURAL_DISASTER">Desastre Natural</option>
            <option value="ACCIDENT">Acidente</option>
            <option value="VIOLENCE">Violência</option>
            <option value="OTHER">Outro</option>
          </select>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Descrição da Emergência
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Descreva a situação em detalhes..."
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Endereço/Local
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="text"
              name="location"
              id="location"
              required
              className="flex-1 block w-full border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Digite o endereço ou local"
            />
            <button
              type="button"
              onClick={getCurrentLocation}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Usar Localização Atual
            </button>
          </div>
          {location.latitude !== 0 && location.longitude !== 0 && (
            <p className="mt-2 text-sm text-gray-500">
              Localização: {location.latitude}, {location.longitude}
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            {loading ? 'Criando...' : 'Criar Alerta'}
          </button>
        </div>
      </form>
    </div>
  );
} 