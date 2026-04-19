import { NavLink } from 'react-router-dom'
import {
  Home, Users, Newspaper, LayoutGrid, GraduationCap, BarChart2,
  UserCog, BookOpen, MessageSquare, CalendarDays, Bot, User
} from 'lucide-react'

const menu = [
  { to: '/app', label: 'Главная страница', icon: Home },
  { to: '/app/team', label: 'Команда', icon: Users },
  { to: '/app/news', label: 'Новости', icon: Newspaper },
  { to: '/app/projects', label: 'Проекты', icon: LayoutGrid },
  { to: '/app/learning', label: 'Обучение', icon: GraduationCap },
  { to: '/app/finance', label: 'Финансы', icon: BarChart2 },
  { to: '/app/hr', label: 'HR процессы', icon: UserCog },
  { to: '/app/knowledge', label: 'База знаний', icon: BookOpen },
  { to: '/app/messenger', label: 'Мессенджер', icon: MessageSquare },
  { to: '/app/calendar', label: 'Календарь', icon: CalendarDays },
  { to: '/app/bot', label: 'ИИ-бот', icon: Bot },
  { to: '/app/profile', label: 'Профиль', icon: User }
]

export default function Sidebar() {
  return (
    <aside className="w-[220px] shrink-0 bg-sidebar text-gray-300 h-screen sticky top-0 flex flex-col">
      <div className="px-5 py-5 border-b border-white/5">
        <div className="text-white font-bold text-lg leading-tight">ProДелай</div>
        <div className="text-xs text-gray-400 mt-0.5">Workspace</div>
      </div>
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-1">
        {menu.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/app'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                isActive
                  ? 'bg-[#6366f1] text-white'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <Icon size={18} />
            <span className="truncate">{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
