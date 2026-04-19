import { useNavigate } from 'react-router-dom'
import { CheckCircle, Brain, Users } from 'lucide-react'

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-purple-700 flex flex-col">
      {/* Центральная часть */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-4xl">
          {/* Логотип */}
          <h1 className="text-[48px] font-bold text-white mb-4">ProДелай</h1>
          
          {/* Подзаголовок */}
          <p className="text-white/80 text-[18px] mb-12 max-w-2xl mx-auto">
            Цифровая платформа управления проектами с гибкой системой таск-менеджмента
          </p>
          
          {/* Преимущества */}
          <div className="flex justify-center gap-8 mb-12 flex-wrap">
            <div className="flex items-center gap-3 text-white">
              <CheckCircle size={24} />
              <span>Готовые шаблоны проектов</span>
            </div>
            <div className="flex items-center gap-3 text-white">
              <Brain size={24} />
              <span>ИИ-ассистент</span>
            </div>
            <div className="flex items-center gap-3 text-white">
              <Users size={24} />
              <span>Командная работа</span>
            </div>
          </div>
          
          {/* Кнопка */}
          <button
            onClick={() => navigate('/app')}
            className="bg-white text-purple-700 px-[48px] py-[16px] rounded-[12px] text-[18px] font-semibold hover:bg-gray-100 transition-colors shadow-lg"
          >
            Попробовать сейчас
          </button>
        </div>
      </div>
      
      {/* Футер */}
      <div className="py-6 text-center">
        <p className="text-white/60 text-sm">© 2026 ProДелай. РЭУ им. Г.В. Плеханова</p>
      </div>
    </div>
  )
}
