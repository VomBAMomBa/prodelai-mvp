import { useState } from 'react'
import { DollarSign, TrendingUp, Users, Award, Rocket, FileText, Calendar, Brain, Plug, Database } from 'lucide-react'

export default function FinancePage() {
  const [activeTab, setActiveTab] = useState('deals')

  const deals = [
    {
      id: 1,
      client: 'РЭУ им. Плеханова',
      project: 'Пилотное внедрение',
      stage: 'Переговоры',
      progress: 70,
      amount: null,
      manager: 'Ставничук Я.',
      status: 'В РАБОТЕ'
    },
    {
      id: 2,
      client: 'Бизнес-инкубатор МГУ',
      project: 'Лицензия edu',
      stage: 'Ком. предложение',
      progress: 40,
      amount: '120 000 ₽',
      manager: 'Пономарев А.',
      status: 'ОЖИДАЕТ'
    },
    {
      id: 3,
      client: 'ИП Сидоров',
      project: 'Подписка B2C',
      stage: 'Завершено',
      progress: 100,
      amount: '5 988 ₽',
      manager: '—',
      status: 'ОПЛАЧЕНО'
    },
    {
      id: 4,
      client: 'Акселератор Сбер',
      project: 'Партнёрство',
      stage: 'Переговоры',
      progress: 30,
      amount: null,
      manager: 'Ставничук Я.',
      status: 'В РАБОТЕ'
    },
    {
      id: 5,
      client: 'Студ. команда "Вектор"',
      project: 'Freemium→Paid',
      stage: 'Конверсия',
      progress: 60,
      amount: '499 ₽',
      manager: '—',
      status: 'В РАБОТЕ'
    }
  ]

  const tabs = [
    { id: 'deals', label: 'Сделки и продажи', icon: DollarSign },
    { id: 'funnel', label: 'Воронка продаж', icon: TrendingUp },
    { id: 'budget', label: 'Бюджет/Сводка', icon: FileText },
    { id: 'invoices', label: 'Счета и документы', icon: FileText },
    { id: 'calendar', label: 'Привязка к календарю', icon: Calendar },
    { id: 'ai', label: 'ИИ и аналитика', icon: Brain },
    { id: 'integrations', label: 'Интеграции', icon: Plug },
    { id: '1c', label: '1С модуль', icon: Database }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'В РАБОТЕ': return 'bg-blue-100 text-blue-800'
      case 'ОЖИДАЕТ': return 'bg-yellow-100 text-yellow-800'
      case 'ОПЛАЧЕНО': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-8">
      {/* Шапка */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-600 rounded-2xl p-6 mb-8 text-white">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Финансы и продажи</h1>
          <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
            CRM-модуль
          </span>
        </div>
        <div className="flex gap-4 flex-wrap">
          <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
            Общий оборот: 850 тыс. ₽
          </span>
          <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
            Активных сделок: 5
          </span>
        </div>
      </div>

      {/* Метрики */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Всего в работе</p>
              <p className="text-2xl font-bold text-gray-900">126 487 ₽</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Активных сделок</p>
              <p className="text-2xl font-bold text-gray-900">5</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Менеджеров</p>
              <p className="text-2xl font-bold text-gray-900">2</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Award className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Успешных сделок</p>
              <p className="text-2xl font-bold text-gray-900">40%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Табы */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 mb-8">
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Контент табов */}
        <div className="p-6">
          {activeTab === 'deals' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Активные сделки</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Клиент</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Проект</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Этап</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Прогресс</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Сумма</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Менеджер</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Статус</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deals.map((deal) => (
                      <tr key={deal.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4 text-sm font-medium text-gray-900">{deal.client}</td>
                        <td className="py-4 px-4 text-sm text-gray-600">{deal.project}</td>
                        <td className="py-4 px-4 text-sm text-gray-600">{deal.stage}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-purple-500 h-2 rounded-full transition-all"
                                style={{ width: `${deal.progress}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-500">{deal.progress}%</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-600">{deal.amount || '—'}</td>
                        <td className="py-4 px-4 text-sm text-gray-600">{deal.manager}</td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(deal.status)}`}>
                            {deal.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab !== 'deals' && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Rocket className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Раздел в разработке</h3>
              <p className="text-gray-500 text-sm">Этот модуль находится на стадии активной разработки</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
