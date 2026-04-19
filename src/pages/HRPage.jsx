import Header from '../components/Header.jsx'
import { UserCog, Rocket } from 'lucide-react'

export default function HRPage() {
  return (
    <div>
      <Header
        icon={UserCog}
        title="HR процессы"
        subtitle="Управление персоналом и кадровыми вопросами"
      />

      <div className="px-8 py-6">
        <div className="bg-white rounded-xl shadow-sm p-12 flex flex-col items-center justify-center text-center">
          <UserCog size={64} className="text-gray-300 mb-6" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Раздел в разработке</h2>
          <p className="text-gray-500 mb-6 max-w-md">
            Этот модуль находится на стадии активной разработки. Ознакомьтесь с предварительным функционалом при запуске продукта.
          </p>
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 text-sm font-medium rounded-lg mb-4">
            <Rocket size={16} />
            Скоро будет доступно
          </span>
          <p className="text-xs text-gray-400">Ожидаемый запуск: версия 2.0</p>
        </div>
      </div>
    </div>
  )
}
