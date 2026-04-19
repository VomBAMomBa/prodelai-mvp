import { useState } from 'react'
import Header from '../components/Header.jsx'
import { LayoutGrid, Search, Plus, Users, Calendar, X, Upload, Link as LinkIcon, Rocket, GraduationCap, Megaphone, Code, FolderCheck, Search as SearchIcon } from 'lucide-react'
import { useAppStore } from '../store/useAppStore.js'
import { projectTemplates } from '../data/templates.js'

const iconMap = {
  Rocket,
  GraduationCap,
  Megaphone,
  Code,
  Calendar: FolderCheck,
  Search: SearchIcon
}

const colorMap = {
  purple: 'from-purple-500 to-indigo-600',
  blue: 'from-blue-500 to-cyan-600',
  orange: 'from-orange-500 to-amber-600',
  green: 'from-green-500 to-emerald-600',
  pink: 'from-pink-500 to-rose-600',
  cyan: 'from-cyan-500 to-teal-600'
}

const categoryColors = {
  'Стартап': 'bg-purple-100 text-purple-700',
  'Учёба': 'bg-blue-100 text-blue-700',
  'Маркетинг': 'bg-orange-100 text-orange-700',
  'Разработка': 'bg-green-100 text-green-700'
}

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

function TemplateCard({ template, onUse }) {
  const IconComponent = iconMap[template.icon] || Rocket
  const totalTasks = template.stages.reduce((acc, s) => acc + s.tasks.length, 0)
  const totalStages = template.stages.length

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow">
      <div className={`h-20 bg-gradient-to-r ${colorMap[template.color]} flex items-center justify-center`}>
        <IconComponent size={32} className="text-white" />
      </div>
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-gray-800">{template.name}</h3>
        </div>
        <p className="text-sm text-gray-500 line-clamp-2">{template.description}</p>
        
        <span className={`self-start px-2 py-1 rounded-md text-xs font-medium ${categoryColors[template.category]}`}>
          {template.category}
        </span>

        <div className="flex items-center gap-4 text-xs text-gray-500 pt-1 mt-auto">
          <span>{totalStages} этапов</span>
          <span>{totalTasks} задач</span>
        </div>

        <button
          onClick={() => onUse(template)}
          className="mt-2 w-full flex items-center justify-center gap-2 bg-[#6366f1] hover:bg-[#4f46e5] text-white px-4 py-2.5 rounded-lg text-sm font-medium"
        >
          Использовать шаблон
        </button>
      </div>
    </div>
  )
}

function TemplatePreviewModal({ template, onClose, onCreate }) {
  const [projectName, setProjectName] = useState(template.name)

  const handleCreate = () => {
    if (!projectName.trim()) return
    onCreate(template, projectName.trim())
  }

  const totalTasks = template.stages.reduce((acc, s) => acc + s.tasks.length, 0)

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">Использовать шаблон</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>
        <div className="px-6 py-5 overflow-y-auto flex-1">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Название вашего проекта</label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          
          <h3 className="text-sm font-medium text-gray-700 mb-3">Структура проекта ({template.stages.length} этапов, {totalTasks} задач)</h3>
          <div className="space-y-3">
            {template.stages.map((stage, idx) => (
              <div key={idx} className="border border-gray-100 rounded-lg p-3">
                <div className="font-medium text-gray-800 text-sm mb-2">{stage.name}</div>
                <ul className="space-y-1">
                  {stage.tasks.map((task, tIdx) => (
                    <li key={tIdx} className="text-xs text-gray-600 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100"
          >
            Отмена
          </button>
          <button
            onClick={handleCreate}
            className="px-4 py-2 rounded-lg text-sm text-white bg-[#6366f1] hover:bg-[#4f46e5]"
          >
            Создать проект из шаблона
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ProjectsPage() {
  const projects = useAppStore((s) => s.projects)
  const addProject = useAppStore((s) => s.addProject)
  const [query, setQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('my-projects')
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false)

  const filtered = projects.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  )

  const completion = Math.round(
    projects.reduce((acc, p) => acc + p.progress, 0) / (projects.length || 1)
  )

  const handleUseTemplate = (template) => {
    setSelectedTemplate(template)
    setIsPreviewModalOpen(true)
  }

  const handleCreateFromTemplate = (template, projectName) => {
    const newProject = {
      name: projectName,
      description: template.description,
      status: 'В процессе',
      progress: 0,
      deadline: 'Не установлен',
      members: 1,
      color: colorMap[template.color] || 'from-indigo-500 to-purple-600',
      stages: template.stages.map((stage, idx) => ({
        id: Date.now() + idx,
        name: stage.name,
        tasks: stage.tasks.map((task, tIdx) => ({
          id: Date.now() + idx + tIdx,
          title: task,
          status: 'todo',
          assignee: null,
          dueDate: null
        }))
      }))
    }
    addProject(newProject)
    setIsPreviewModalOpen(false)
  }

  return (
    <div>
      <Header
        icon={LayoutGrid}
        title="Управление проектами"
        subtitle="Эффективно планируем, координируем и реализуем проекты"
        badges={[`Всего проектов: ${projects.length}`, `Завершённость: ${completion}%`]}
      />

      <div className="px-8 py-6 space-y-6">
        {/* Вкладки */}
        <div className="flex items-center gap-2 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('my-projects')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'my-projects'
                ? 'border-[#6366f1] text-[#6366f1]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Мои проекты
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'templates'
                ? 'border-[#6366f1] text-[#6366f1]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Шаблоны
          </button>
        </div>

        {activeTab === 'my-projects' && (
          <>
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
          </>
        )}

        {activeTab === 'templates' && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {projectTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} onUse={handleUseTemplate} />
            ))}
          </div>
        )}
      </div>

      {isModalOpen && <CreateProjectModal onClose={() => setIsModalOpen(false)} />}
      {isPreviewModalOpen && selectedTemplate && (
        <TemplatePreviewModal
          template={selectedTemplate}
          onClose={() => setIsPreviewModalOpen(false)}
          onCreate={handleCreateFromTemplate}
        />
      )}
    </div>
  )
}
