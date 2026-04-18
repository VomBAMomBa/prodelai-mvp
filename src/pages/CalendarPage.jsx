import { useState } from 'react'
import Header from '../components/Header.jsx'
import { CalendarDays, Plus } from 'lucide-react'
import { tasks } from '../data/tasks.js'

const months = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
]

const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

function buildMonthGrid(year, month) {
  const firstDay = new Date(year, month, 1)
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const startWeekday = firstDay.getDay()
  const prevMonthDays = new Date(year, month, 0).getDate()

  const cells = []
  for (let i = startWeekday - 1; i >= 0; i--) {
    cells.push({ day: prevMonthDays - i, currentMonth: false })
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, currentMonth: true })
  }
  while (cells.length % 7 !== 0) {
    cells.push({ day: cells.length - daysInMonth - startWeekday + 1, currentMonth: false })
  }
  return cells
}

export default function CalendarPage() {
  const today = new Date(2026, 3, 18)
  const [year, setYear] = useState(2026)
  const [month, setMonth] = useState(3)
  const [mode, setMode] = useState('Month')
  const [quickFilter, setQuickFilter] = useState('today')

  const cells = buildMonthGrid(year, month)

  const isToday = (day, currentMonth) =>
    currentMonth &&
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear()

  return (
    <div>
      <Header
        icon={CalendarDays}
        title="Управление занятостью"
        subtitle="Помогает планировать события и задания на определённые даты и время"
        badges={['Всего задач: 0', 'Выполнено: 0', 'В процессе: 0', 'Просрочено: 0']}
      />

      <div className="px-8 py-6 space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="text-sm font-medium text-gray-700 mb-3">Быстрые действия</div>
          <div className="flex gap-2 flex-wrap">
            {[
              { key: 'today', label: 'Сегодня' },
              { key: 'tomorrow', label: 'Завтра' },
              { key: 'next-week', label: 'Следующая неделя' }
            ].map((b) => (
              <button
                key={b.key}
                onClick={() => setQuickFilter(b.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  quickFilter === b.key
                    ? 'bg-[#6366f1] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {b.label}
              </button>
            ))}
            <button className="flex items-center gap-1.5 ml-auto px-4 py-2 rounded-lg text-sm font-medium bg-white border border-indigo-200 text-indigo-600 hover:bg-indigo-50">
              <Plus size={16} /> Быстрая задача
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between gap-4 flex-wrap mb-5">
            <div className="flex items-center gap-3">
              <select
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                {[2024, 2025, 2026, 2027, 2028].map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
              <select
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                {months.map((m, i) => (
                  <option key={m} value={i}>{m}</option>
                ))}
              </select>
            </div>
            <div className="flex rounded-lg border border-gray-200 overflow-hidden">
              {['Month', 'Year'].map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`px-4 py-2 text-sm font-medium ${
                    mode === m ? 'bg-[#6366f1] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-500 mb-2">
            {weekdays.map((d) => <div key={d} className="py-2">{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {cells.map((c, i) => (
              <div
                key={i}
                className={`aspect-square flex items-start justify-start p-2 rounded-lg border text-sm ${
                  c.currentMonth
                    ? 'border-gray-100 bg-white text-gray-700 hover:bg-gray-50'
                    : 'border-transparent bg-gray-50/50 text-gray-300'
                }`}
              >
                {isToday(c.day, c.currentMonth) ? (
                  <span className="w-7 h-7 rounded-full bg-[#6366f1] text-white flex items-center justify-center font-semibold">
                    {c.day}
                  </span>
                ) : (
                  <span>{c.day}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">Задачи на апрель</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {tasks.map((t) => (
              <div key={t.id} className="px-6 py-3 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="font-medium text-gray-800 truncate">{t.title}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{t.date} · Приоритет: {t.priority}</div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-md font-medium ${
                  t.status === 'Выполнено'
                    ? 'bg-emerald-100 text-emerald-700'
                    : t.status === 'В процессе'
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'bg-gray-100 text-gray-600'
                }`}>{t.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
