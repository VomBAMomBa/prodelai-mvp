import Header from '../components/Header.jsx'
import { Users, Building2, Smile } from 'lucide-react'

function EmployeeCard({ name, role, department, isFounder, email }) {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase()
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center text-center">
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold mb-4">
        {initials}
      </div>
      <h3 className="font-semibold text-gray-800 text-lg">{name}</h3>
      <p className="text-gray-600 text-sm mb-1">{role}</p>
      <p className="text-gray-500 text-xs mb-3">Отдел: {department}</p>
      {isFounder && (
        <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-md mb-3">
          Основатель
        </span>
      )}
      {email && (
        <p className="text-gray-500 text-xs mb-4">{email}</p>
      )}
      <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-lg transition-colors">
        Написать
      </button>
    </div>
  )
}

export default function TeamPage() {
  const employees = [
    { name: 'Ставничук Ян', role: 'Co-founder, Product Manager', department: 'Управление', isFounder: true, email: 'stavni.yan@yandex.ru' },
    { name: 'Пономарев Александр', role: 'Co-founder, Tech Lead', department: 'Разработка', isFounder: true, email: 'ponomarev@prodelai.ru' },
    { name: 'Иванов Дмитрий', role: 'Frontend-разработчик', department: 'Разработка', isFounder: false },
    { name: 'Петрова Мария', role: 'UX/UI дизайнер', department: 'Дизайн', isFounder: false },
    { name: 'Козлов Артём', role: 'QA-инженер', department: 'Разработка', isFounder: false },
  ]

  return (
    <div>
      <Header
        icon={Users}
        title="Наша команда"
        subtitle="Профессионалы, которые создают ProДелай"
        badges={['5 Сотрудников', '3 Отдела', '96% Удовлетворённость']}
      />

      <div className="px-8 py-6 space-y-6">
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-indigo-500 text-white text-sm font-medium rounded-lg">Все</button>
          <button className="px-4 py-2 bg-gray-100 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-200">По рейтингу</button>
          <button className="px-4 py-2 bg-gray-100 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-200">По уровню</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees.map((emp) => (
            <EmployeeCard key={emp.name} {...emp} />
          ))}
        </div>
      </div>
    </div>
  )
}
