export default function ResourcesPage() {
  const emergencyResources = [
    {
      title: 'Bombeiros',
      phone: '193',
      description: 'Para casos de incêndio, acidentes e resgates.',
      icon: '🚒'
    },
    {
      title: 'SAMU',
      phone: '192',
      description: 'Serviço de atendimento móvel de urgência.',
      icon: '🚑'
    },
    {
      title: 'Polícia Militar',
      phone: '190',
      description: 'Para emergências que necessitem intervenção policial.',
      icon: '👮'
    },
    {
      title: 'Defesa Civil',
      phone: '199',
      description: 'Para casos de desastres naturais e riscos estruturais.',
      icon: '🏛️'
    },
    {
      title: 'Polícia Rodoviária Federal',
      phone: '191',
      description: 'Para emergências em rodovias federais.',
      icon: '🛣️'
    }
  ];

  const safetyTips = [
    {
      title: 'Em caso de incêndio',
      tips: [
        'Mantenha a calma e saia imediatamente do local',
        'Não use elevadores',
        'Cubra o nariz e a boca com um pano úmido',
        'Fique próximo ao chão onde o ar é mais limpo'
      ]
    },
    {
      title: 'Em caso de desastre natural',
      tips: [
        'Fique atento aos alertas meteorológicos',
        'Tenha um kit de emergência preparado',
        'Conheça as rotas de fuga da sua região',
        'Mantenha documentos importantes em local seguro'
      ]
    },
    {
      title: 'Em caso de emergência médica',
      tips: [
        'Verifique se a pessoa está consciente',
        'Cheque a respiração',
        'Não movimente a vítima em caso de suspeita de trauma',
        'Ligue imediatamente para o SAMU (192)'
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Recursos de Emergência
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          Números importantes e dicas de segurança para situações de emergência
        </p>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Números de Emergência
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {emergencyResources.map((resource) => (
            <div
              key={resource.phone}
              className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400"
            >
              <div className="flex-shrink-0 text-3xl">{resource.icon}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{resource.title}</p>
                <p className="text-lg font-bold text-blue-600">{resource.phone}</p>
                <p className="text-sm text-gray-500">{resource.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Dicas de Segurança
        </h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {safetyTips.map((section) => (
            <div
              key={section.title}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.tips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-shrink-0 h-5 w-5 text-green-500">
                        ✓
                      </span>
                      <p className="ml-2 text-sm text-gray-500">{tip}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 bg-blue-50 rounded-lg px-6 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-blue-900">
            Mantenha-se Preparado
          </h2>
          <p className="mt-4 text-blue-700">
            Salve esses números em seu telefone e compartilhe essas informações com sua família.
            Em situações de emergência, cada segundo conta.
          </p>
        </div>
      </div>
    </div>
  );
} 