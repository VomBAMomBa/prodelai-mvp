import { useState } from 'react'
import Header from '../components/Header.jsx'
import { LayoutGrid, Search, Plus, Users, Calendar, X, Upload, Link as LinkIcon, CheckSquare, List, Kanban, Filter } from 'lucide-react'
import { useAppStore } from '../store/useAppStore.js'
import TaskDetailPage from './TaskDetailPage.jsx'
import { DndContext, DragOverlay, useDraggable, useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

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

function getPriorityColor(priority) {
  switch (priority) {
    case 'critical': return 'bg-red-500'
    case 'high': return 'bg-orange-500'
    case 'medium': return 'bg-yellow-500'
    case 'low': return 'bg-green-500'
    default: return 'bg-gray-400'
  }
}

function getPriorityBorder(priority) {
  switch (priority) {
    case 'critical': return 'border-red-500'
    case 'high': return 'border-orange-500'
    case 'medium': return 'border-yellow-500'
    case 'low': return 'border-green-500'
    default: return 'border-gray-400'
  }
}

function getInitials(name) {
  if (!name) return ''
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

function getAvatarColor(name) {
  const colors = [
    'bg-indigo-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-blue-500',
    'bg-emerald-500'
  ]
  const index = name.length % colors.length
  return colors[index]
}

function formatDate(dateString) {
  if (!dateString) return null
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU')
}

function isOverdue(dueDate) {
  if (!dueDate) return false
  return new Date(dueDate) < new Date()
}

function ProjectCard({ project, onClick }) {
  const getTasksByProject = useAppStore((s) => s.getTasksByProject)
  const tasks = getTasksByProject(project.id)
  const doneTasks = tasks.filter(t => t.status === 'done').length
  const totalTasks = tasks.length

  return (
    <div 
      className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
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

        {totalTasks > 0 && (
          <div className="flex items-center gap-2 text-xs text-gray-500 pt-1">
            <CheckSquare size={14} />
            <span>{doneTasks}/{totalTasks} задач выполнено</span>
          </div>
        )}

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
  const [selectedProjectId, setSelectedProjectId] = useState(null)

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
          {filtered.map((p) => (
            <ProjectCard 
              key={p.id} 
              project={p} 
              onClick={() => setSelectedProjectId(p.id)}
            />
          ))}
        </div>
      </div>

      {isModalOpen && <CreateProjectModal onClose={() => setIsModalOpen(false)} />}
      
      {selectedProjectId && (
        <TaskDetailModal 
          projectId={selectedProjectId} 
          onClose={() => setSelectedProjectId(null)} 
        />
      )}
    </div>
  )
}

// Модальное окно для просмотра задач проекта
function TaskDetailModal({ projectId, onClose }) {
  const project = useAppStore((s) => s.projects.find(p => p.id === projectId))
  const getTasksByProject = useAppStore((s) => s.getTasksByProject)
  const tasks = getTasksByProject(projectId)
  const [selectedTaskId, setSelectedTaskId] = useState(null)

  if (!project) return null

  const todoTasks = tasks.filter(t => t.status === 'todo')
  const inProgressTasks = tasks.filter(t => t.status === 'in_progress')
  const doneTasks = tasks.filter(t => t.status === 'done')

  function TaskColumn({ title, tasks, color }) {
    return (
      <div className="flex-1 min-w-[280px]">
        <div className={`flex items-center gap-2 mb-3 pb-2 border-b-2 ${color}`}>
          <span className="font-medium text-gray-700">{title}</span>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{tasks.length}</span>
        </div>
        <div className="space-y-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => setSelectedTaskId(task.id)}
              className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="text-sm font-medium text-gray-800 line-clamp-2">{task.title}</h4>
              </div>
              {task.assignee && (
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <div className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs">
                    {task.assignee.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </div>
                  <span>{task.assignee}</span>
                </div>
              )}
              {task.dueDate && (
                <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                  <Calendar size={12} />
                  <span>{new Date(task.dueDate).toLocaleDateString('ru-RU')}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">{project.name}</h2>
            <p className="text-sm text-gray-500">{project.description}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>
        
        <div className="flex-1 overflow-x-auto p-6">
          <div className="flex gap-6 h-full">
            <TaskColumn 
              title="To Do" 
              tasks={todoTasks} 
              color="border-gray-300" 
            />
            <TaskColumn 
              title="In Progress" 
              tasks={inProgressTasks} 
              color="border-blue-400" 
            />
            <TaskColumn 
              title="Done" 
              tasks={doneTasks} 
              color="border-emerald-400" 
            />
          </div>
        </div>
      </div>

      {selectedTaskId && (
        <TaskDetailPage 
          taskId={selectedTaskId} 
          onClose={() => setSelectedTaskId(null)} 
        />
      )}
    </div>
  )
}
