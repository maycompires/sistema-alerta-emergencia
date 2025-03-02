'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

interface Alert {
  id: string;
  type: string;
  status: string;
  description: string;
  location: string;
  latitude: number;
  longitude: number;
  createdAt: string;
  creator: {
    id: string;
    name: string;
    role: string;
  };
  responses: Array<{
    id: string;
    status: string;
    notes: string;
    responder: {
      id: string;
      name: string;
      role: string;
    };
  }>;
}

export default function AlertsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('ACTIVE');
  const [typeFilter, setTypeFilter] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter) params.append('status', statusFilter);
      if (typeFilter) params.append('type', typeFilter);

      const response = await fetch(`/api/alerts?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Falha ao carregar alertas');
      }
      const data = await response.json();
      setAlerts(data);
    } catch (err) {
      setError('Erro ao carregar alertas');
      console.error('Erro:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mounted && status === 'authenticated') {
      fetchAlerts();
    }
  }, [statusFilter, typeFilter, mounted, status]);

  const getAlertTypeLabel = (type: string) => {
    const types = {
      FIRE: 'Incêndio',
      MEDICAL: 'Emergência Médica',
      POLICE: 'Polícia',
      NATURAL_DISASTER: 'Desastre Natural',
      ACCIDENT: 'Acidente',
      VIOLENCE: 'Violência',
      OTHER: 'Outro'
    };
    return types[type as keyof typeof types] || type;
  };

  const getStatusLabel = (status: string) => {
    const statuses = {
      ACTIVE: 'Ativo',
      IN_PROGRESS: 'Em Andamento',
      RESOLVED: 'Resolvido',
      CANCELLED: 'Cancelado'
    };
    return statuses[status as keyof typeof statuses] || status;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      ACTIVE: 'bg-red-100 text-red-800',
      IN_PROGRESS: 'bg-yellow-100 text-yellow-800',
      RESOLVED: 'bg-green-100 text-green-800',
      CANCELLED: 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (!mounted || status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-red-600 border-r-transparent"></div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Alertas de Emergência</h1>
          <p className="mt-2 text-sm text-gray-700">
            Lista de todos os alertas de emergência registrados no sistema.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={() => router.push('/alerts/create')}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-auto"
          >
            Criar Alerta
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-col">
        <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
            >
              <option value="">Todos</option>
              <option value="ACTIVE">Ativos</option>
              <option value="IN_PROGRESS">Em Andamento</option>
              <option value="RESOLVED">Resolvidos</option>
              <option value="CANCELLED">Cancelados</option>
            </select>
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Tipo
            </label>
            <select
              id="type"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
            >
              <option value="">Todos</option>
              <option value="FIRE">Incêndio</option>
              <option value="MEDICAL">Emergência Médica</option>
              <option value="POLICE">Polícia</option>
              <option value="NATURAL_DISASTER">Desastre Natural</option>
              <option value="ACCIDENT">Acidente</option>
              <option value="VIOLENCE">Violência</option>
              <option value="OTHER">Outro</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {loading ? (
          <div className="text-center py-4">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-red-600 border-r-transparent"></div>
          </div>
        ) : (
          <div className="overflow-hidden bg-white shadow sm:rounded-md">
            <ul role="list" className="divide-y divide-gray-200">
              {alerts.map((alert) => (
                <li key={alert.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <p className="truncate text-sm font-medium text-gray-900">
                          {getAlertTypeLabel(alert.type)}
                        </p>
                        <span className={`ml-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(alert.status)}`}>
                          {getStatusLabel(alert.status)}
                        </span>
                      </div>
                      <div className="ml-2 flex flex-shrink-0">
                        <p className="text-sm text-gray-500">
                          {new Date(alert.createdAt).toLocaleString('pt-BR')}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">{alert.description}</p>
                      <p className="mt-1 text-sm text-gray-500">{alert.location}</p>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Criado por: {alert.creator.name}
                      </p>
                      {alert.responses.length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm font-medium text-gray-500">Respostas:</p>
                          <ul className="mt-1 space-y-1">
                            {alert.responses.map((response) => (
                              <li key={response.id} className="text-sm text-gray-500">
                                {response.responder.name} - {response.status}
                                {response.notes && `: ${response.notes}`}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              ))}
              {alerts.length === 0 && (
                <li className="px-4 py-4 sm:px-6 text-center text-gray-500">
                  Nenhum alerta encontrado
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
} 