import { useNavigate } from 'react-router-dom'
import { CheckCircle, Sparkles, Users } from 'lucide-react'

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-purple-700 flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo / Title */}
          <h1 className="text-[48px] font-bold text-white mb-4">
            ProДелай
          </h1>

          {/* Subtitle */}
          <p className="text-white/80 text-lg mb-12 max-w-2xl mx-auto">
            Цифровая платформа управления проектами с гибкой системой таск-менеджмента
          </p>

          {/* Three Benefits */}
          <div className="flex items-center justify-center gap-8 mb-12 flex-wrap">
            <div className="flex items-center gap-2 text-white">
              <CheckCircle size={24} />
              <span>Готовые шаблоны проектов</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <Sparkles size={24} />
              <span>ИИ-ассистент</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <Users size={24} />
              <span>Командная работа</span>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => navigate('/app')}
            className="bg-white text-purple-700 px-12 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg"
          >
            Попробовать сейчас
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="py-6 text-center">
        <p className="text-white/60 text-sm">
          © 2026 ProДелай. РЭУ им. Г.В. Плеханова
        </p>
      </div>
    </div>
  )
}
