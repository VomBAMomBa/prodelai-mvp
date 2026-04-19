import { useState } from 'react'
import { Users, Building2, Heart, Mail } from 'lucide-react'

const employees = [
  {
    id: 1,
    name: 'Ставничук Ян',
    position: 'Co-founder, Product Manager',
    department: 'Управление',
    email: 'stavni.yan@yandex.ru',
    isFounder: true,
    initials: 'СЯ',
    avatarColor: 'bg-indigo-500'
  },
  {
    id: 2,
    name: 'Пономарев Александр',
    position: 'Co-founder, Tech Lead',
    department: 'Разработка',
    email: 'ponomarev@prodelai.ru',
    isFounder: true,
    initials: 'ПА',
    avatarColor: 'bg-purple-500'
  },
  {
    id: 3,
    name: 'Иванов Дмитрий',
    position: 'Frontend-разработчик',
    department: 'Разработка',
    email: '',
    isFounder: false,
    initials: 'ИД',
    avatarColor: 'bg-blue-500'
  },
  {
    id: 4,
    name: 'Петрова Мария',
    position: 'UX/UI дизайнер',
    department: 'Дизайн',
    email: '',
    isFounder: false,
    initials: 'ПМ',
    avatarColor: 'bg-pink-500'
  },
  {
    id: 5,
    name: 'Козлов Артём',
    position: 'QA-инженер',
    department: 'Разработка',
    email: '',
    isFounder: false,
    initials: 'КА',
    avatarColor: 'bg-green-500'
  }
]

export default function TeamPage() {
  const [filterType, setFilterType] = useState('all')

  return (
    <div className="space-y-6">
      {/* Шапка */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-600 p-8">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white mb-2">Наша команда</h1>
          <p className="text-white/80">Профессионалы, которые создают ProДелай</p>
        </div>
      </div>

      {/* Метрики */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
            <Users className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Сотрудников</p>
            <p className="text-2xl font-bold text-gray-900">5</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
            <Building2 className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Отделов</p>
            <p className="text-2xl font-bold text-gray-900">3</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <Heart className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Удовлетворённость</p>
            <p className="text-2xl font-bold text-gray-900">96%</p>
          </div>
        </div>
      </div>

      {/* Фильтры */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilterType('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filterType === 'all'
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          Все
        </button>
        <button
          onClick={() => setFilterType('rating')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filterType === 'rating'
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          По рейтингу
        </button>
        <button
          onClick={() => setFilterType('level')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filterType === 'level'
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          По уровню
        </button>
      </div>

      {/* Карточки сотрудников */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((employee) => (
          <div
            key={employee.id}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start gap-4">
              {/* Аватар */}
              <div className={`w-16 h-16 ${employee.avatarColor} rounded-full flex items-center justify-center flex-shrink-0`}>
                <span className="text-white text-xl font-bold">{employee.initials}</span>
              </div>
              
              {/* Информация */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900 truncate">{employee.name}</h3>
                  {employee.isFounder && (
                    <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full whitespace-nowrap">
                      Основатель
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-1">{employee.position}</p>
                <p className="text-sm text-gray-500 mb-3">Отдел: {employee.department}</p>
                
                {employee.email && (
                  <a
                    href={`mailto:${employee.email}`}
                    className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700 mb-3"
                  >
                    <Mail className="w-4 h-4" />
                    {employee.email}
                  </a>
                )}
                
                <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                  Написать
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
