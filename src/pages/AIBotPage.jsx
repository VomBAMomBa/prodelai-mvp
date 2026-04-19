import { Rocket } from 'lucide-react'

export default function AIBotPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Градиентная шапка */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-600 text-white py-12 px-8">
        <h1 className="text-3xl font-bold">ИИ-бот</h1>
      </div>

      {/* Контент по центру */}
      <div className="flex items-center justify-center min-h-[60vh] px-4">
        <div className="text-center max-w-lg">
          {/* Иконка */}
          <div className="mb-6 flex justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="64" 
              height="64" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#9ca3af" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M12 8V4H8" />
              <rect width="16" height="12" x="4" y="8" rx="2" />
              <path d="M2 14h2" />
              <path d="M20 14h2" />
              <path d="M15 13v2" />
              <path d="M9 13v2" />
            </svg>
          </div>

          {/* Заголовок */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Раздел в разработке
          </h2>

          {/* Подзаголовок */}
          <p className="text-gray-600 mb-6">
            Этот модуль находится на стадии активной разработки. Ознакомьтесь с предварительным функционалом при запуске продукта.
          </p>

          {/* Бейдж */}
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Rocket size={16} />
            Скоро будет доступно
          </div>

          {/* Мелкий текст */}
          <p className="text-gray-400 text-sm">
            Ожидаемый запуск: версия 2.0
          </p>
        </div>
      </div>
    </div>
  )
}
