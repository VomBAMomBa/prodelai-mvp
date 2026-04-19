import Header from '../components/Header.jsx'
import { User, Trophy, CheckCircle, FolderOpen, Clock } from 'lucide-react'

function Badge({ icon: Icon, title, description }) {
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 flex items-start gap-3">
      <div className="p-2 bg-indigo-500 rounded-lg">
        <Icon size={20} className="text-white" />
      </div>
      <div>
        <h4 className="font-semibold text-gray-800 text-sm">{title}</h4>
        <p className="text-xs text-gray-500 mt-0.5">{description}</p>
      </div>
    </div>
  )
}

export default function ProfilePage() {
  const user = {
    name: 'Ставничук Ян',
    email: 'stavni.yan@yandex.ru',
    role: 'Co-founder & Product Manager платформы ProДелай. Студент 4 курса РЭУ им. Г.В. Плеханова, факультет «КАПИТАНЫ».',
    level: 3,
    xp: 1250,
    maxXp: 2000,
    totalTasks: 28,
    completedTasks: 19,
    projects: 3
  }

  const xpProgress = (user.xp / user.maxXp) * 100

  return (
    <div>
      <Header
        icon={User}
        title="Профиль"
        subtitle="Личная информация и достижения"
      />

      <div className="px-8 py-6 space-y-6">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shrink-0">
              СЯ
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-1">{user.name}</h2>
              <p className="text-gray-500 text-sm mb-3">{user.email}</p>
              <p className="text-gray-600 text-sm leading-relaxed">{user.role}</p>
            </div>
          </div>
        </div>

        {/* Level & XP */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-sm text-gray-500">Уровень</span>
              <div className="text-3xl font-bold text-gray-800">{user.level}</div>
            </div>
            <div className="flex-1 ml-8">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">XP</span>
                <span className="font-medium text-gray-700">{user.xp} / {user.maxXp}</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all"
                  style={{ width: `${xpProgress}%` }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-2 text-right">{Math.round(xpProgress)}% до следующего уровня</p>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Достижения</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Badge 
              icon={FolderOpen} 
              title="Первый проект" 
              description="Создал первый проект" 
            />
            <Badge 
              icon={User} 
              title="Командный игрок" 
              description="Пригласил 5 участников" 
            />
            <Badge 
              icon={Trophy} 
              title="Ранний доступ" 
              description="Участник бета-тестирования" 
            />
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4">
            <div className="p-3 bg-indigo-500 rounded-lg">
              <CheckCircle size={22} className="text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">{user.totalTasks}</div>
              <div className="text-sm text-gray-500">Всего задач</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4">
            <div className="p-3 bg-emerald-500 rounded-lg">
              <Trophy size={22} className="text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">{user.completedTasks}</div>
              <div className="text-sm text-gray-500">Выполнено</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4">
            <div className="p-3 bg-purple-500 rounded-lg">
              <FolderOpen size={22} className="text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">{user.projects}</div>
              <div className="text-sm text-gray-500">Проектов</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
