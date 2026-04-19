import Header from '../components/Header.jsx'
import { Home, FolderOpen, CheckSquare, Users, Trophy } from 'lucide-react'
import { useAppStore } from '../store/useAppStore.js'

function MetricCard({ icon: Icon, label, value, tone }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4">
      <div className={`p-3 rounded-lg ${tone}`}>
        <Icon size={22} className="text-white" />
      </div>
      <div>
        <div className="text-2xl font-bold text-gray-800">{value}</div>
        <div className="text-sm text-gray-500">{label}</div>
      </div>
    </div>
  )
}

export default function HomePage() {
  const projects = useAppStore((s) => s.projects)

  const newsItems = [
    {
      id: 1,
      title: 'Запуск бета-версии платформы',
      date: '15.04.2026'
    },
    {
      id: 2,
      title: 'Партнёрство с РЭУ им. Плеханова',
      date: '01.04.2026'
    }
  ]

  return (
    <div>
      <Header
        icon={Home}
        badge="Главная страница"
        title="Добро пожаловать в ProДелай"
        subtitle="Управляйте проектами, задачами и командой в едином пространстве"
        badges={['Активных проектов: 3', 'Задач на сегодня: 7']}
      />

      <div className="px-8 py-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard icon={FolderOpen} label="Всего проектов" value="3" tone="bg-purple-500" />
          <MetricCard icon={CheckSquare} label="Активных задач" value="12" tone="bg-blue-500" />
          <MetricCard icon={Users} label="Участников" value="5" tone="bg-green-500" />
          <MetricCard icon={Trophy} label="Завершено" value="28" tone="bg-yellow-500" />
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">Последние проекты</h2>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="text-left px-6 py-3 font-medium">Название</th>
                <th className="text-left px-6 py-3 font-medium">Статус</th>
                <th className="text-left px-6 py-3 font-medium">Прогресс</th>
                <th className="text-left px-6 py-3 font-medium">Дедлайн</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id} className="border-t border-gray-100">
                  <td className="px-6 py-4 text-gray-800 font-medium">{p.name}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                      p.status === 'Завершён'
                        ? 'bg-emerald-100 text-emerald-700'
                        : p.status === 'На паузе'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-indigo-100 text-indigo-700'
                    }`}>{p.status}</span>
                  </td>
                  <td className="px-6 py-4 min-w-[180px]">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-600"
                          style={{ width: `${p.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 w-10 text-right">{p.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{p.deadline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">Новости компании</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {newsItems.map((item) => (
              <div key={item.id} className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-medium text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-500 mt-2">{item.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
