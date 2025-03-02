import Image from "next/image";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Sistema de Alerta de Emergência
        </h1>
        <p className="text-xl text-gray-600">
          Conectando cidadãos e autoridades para respostas rápidas a emergências
        </p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card de Alerta */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">Reportar Emergência</h2>
          <p className="text-gray-600 mb-4">
            Reporte uma situação de emergência para receber ajuda imediata das autoridades competentes.
          </p>
          <button className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors">
            Criar Alerta
          </button>
        </div>

        {/* Card de Monitoramento */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Monitorar Alertas</h2>
          <p className="text-gray-600 mb-4">
            Acompanhe alertas ativos em sua região e veja atualizações em tempo real.
          </p>
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
            Ver Alertas
          </button>
        </div>

        {/* Card de Recursos */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">Recursos de Emergência</h2>
          <p className="text-gray-600 mb-4">
            Acesse informações importantes e contatos de serviços de emergência.
          </p>
          <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors">
            Ver Recursos
          </button>
        </div>
      </div>
    </div>
  );
}
