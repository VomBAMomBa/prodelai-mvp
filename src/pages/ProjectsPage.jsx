import { useState } from 'react'
import Header from '../components/Header.jsx'
import { LayoutGrid, Search, Plus, Users, Calendar, X, Upload, Link as LinkIcon } from 'lucide-react'
import { useAppStore } from '../store/useAppStore.js'

function StatusBadge({ status }) {
  const map = {
    'В процессе': 'bg-indigo-100 text-indigo-700',
    'Завершён': 'bg-emerald-100 text-emerald-700',
    'На паузе': 'bg-amber-100 text-amber-700'
  }
  return (
    <span className={`px-2 py-1 rounded-md text-xs font-medium ${map[status] || 'bg-gray-100 text-gray-700'}`}>
      {status}
    </span>
  )
}

function ProjectCard({ project }) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col">
      <div className={`h-24 bg-gradient-to-r ${project.color}`} />
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-gray-800">{project.name}</h3>
          <StatusBadge status={project.status} />
        </div>
        <p className="text-sm text-gray-500 line-clamp-2">{project.description}</p>

        <div>
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Прогресс</span>
            <span>{project.progress}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-600"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 pt-1 mt-auto">
          <div className="flex items-center gap-1.5">
            <Calendar size={14} />
            <span>{project.deadline}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users size={14} />
            <span>{project.members}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function CreateProjectModal({ onClose }) {
  const addProject = useAppStore((s) => s.addProject)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    addProject({ name: name.trim(), description: description.trim() || 'Без описания' })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">Создать проект</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Название проекта</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Введите название"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Описание</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Краткое описание"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Обложка проекта</label>
            <div className="flex gap-2">
              <button type="button" className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
                <Upload size={16} /> Загрузить
              </button>
              <button type="button" className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
                <LinkIcon size={16} /> Ссылка
              </button>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-sm text-white bg-[#6366f1] hover:bg-[#4f46e5]"
            >
              Создать
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function ProjectsPage() {
  const projects = useAppStore((s) => s.projects)
  const [query, setQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filtered = projects.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  )

  const completion = Math.round(
    projects.reduce((acc, p) => acc + p.progress, 0) / (projects.length || 1)
  )

  return (
    <div>
      <Header
        icon={LayoutGrid}
        title="Управление проектами"
        subtitle="Эффективно планируем, координируем и реализуем проекты"
        badges={[`Всего проектов: ${projects.length}`, `Завершённость: ${completion}%`]}
      />

      <div className="px-8 py-6 space-y-6">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[240px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск проектов..."
              className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-[#6366f1] hover:bg-[#4f46e5] text-white px-4 py-2.5 rounded-lg text-sm font-medium"
          >
            <Plus size={16} /> Создать проект
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((p) => <ProjectCard key={p.id} project={p} />)}
        </div>
      </div>

      {isModalOpen && <CreateProjectModal onClose={() => setIsModalOpen(false)} />}
    </div>
  )
}
