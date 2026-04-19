import { useState, useMemo } from 'react'
import Header from '../components/Header.jsx'
import { LayoutGrid, Search, Plus, Users, Calendar, X, Upload, Link as LinkIcon, CheckSquare, List, Kanban, Filter, MessageSquare, Paperclip, ChevronDown, Rocket, GraduationCap, Megaphone, Code, FolderSearch } from 'lucide-react'
import { useAppStore } from '../store/useAppStore.js'
import TaskDetailPage from './TaskDetailPage.jsx'
import { DndContext, DragOverlay, useDraggable, useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from '../data/taskModel.js'
import { templates, countTemplateTasks, countTemplateStages } from '../data/templates.js'

// Helper functions
function getInitials(name) {
  if (!name) return ''
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

function getAvatarColor(name) {
  const colors = ['bg-indigo-500', 'bg-purple-500', 'bg-pink-500', 'bg-blue-500', 'bg-emerald-500']
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

function getPriorityColor(priority) {
  switch (priority) {
    case 'critical': return 'bg-red-500'
    case 'high': return 'bg-orange-500'
    case 'medium': return 'bg-yellow-500'
    case 'low': return 'bg-green-500'
    default: return 'bg-gray-400'
  }
}

function getStatusLabel(status) {
  return STATUS_OPTIONS.find(s => s.value === status)?.label || status
}

function getPriorityLabel(priority) {
  return PRIORITY_OPTIONS.find(p => p.value === priority)?.label || priority
}

// Sortable Task Card Component
function SortableTaskCard({ task, onClick }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id })
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  }

  const checklistTotal = task.checklist.length
  const checklistChecked = task.checklist.filter(i => i.checked).length
  const hasChecklist = checklistTotal > 0
  const hasComments = task.comments.length > 0
  const hasAttachments = task.attachments.length > 0
  const overdue = isOverdue(task.dueDate)

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => onClick(task.id)}
      className="bg-white rounded-lg border border-gray-200 shadow-sm p-3 cursor-pointer hover:shadow-md transition-all group relative"
    >
      {/* Priority stripe */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-lg ${getPriorityColor(task.priority)}`} />
      
      <div className="pl-2">
        {/* Title */}
        <h4 className="text-sm font-medium text-gray-800 mb-2 pr-2">{task.title}</h4>
        
        {/* Stage badge */}
        {task.stage && (
          <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs mb-2">
            {task.stage}
          </span>
        )}
        
        {/* Checklist progress */}
        {hasChecklist && (
          <div className="mb-2">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>{checklistChecked}/{checklistTotal}</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-600"
                style={{ width: `${(checklistChecked / checklistTotal) * 100}%` }}
              />
            </div>
          </div>
        )}
        
        {/* Footer */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            {/* Assignee */}
            {task.assignee && (
              <div 
                className={`w-6 h-6 rounded-full ${getAvatarColor(task.assignee)} flex items-center justify-center text-white text-xs font-medium`}
                title={task.assignee}
              >
                {getInitials(task.assignee)}
              </div>
            )}
            
            {/* Due date */}
            {task.dueDate && (
              <div className={`flex items-center gap-1 text-xs ${overdue ? 'text-red-500' : 'text-gray-400'}`}>
                <Calendar size={12} />
                <span>{formatDate(task.dueDate)}</span>
              </div>
            )}
          </div>
          
          {/* Icons */}
          <div className="flex items-center gap-1.5">
            {hasAttachments && (
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Paperclip size={12} />
                <span>{task.attachments.length}</span>
              </div>
            )}
            {hasComments && (
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <MessageSquare size={12} />
                <span>{task.comments.length}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Droppable Column Component
function KanbanColumn({ status, title, tasks, onAddTask, onTaskClick, icon: Icon, headerColor }) {
  const { setNodeRef, isOver } = useDroppable({ id: status })
  const [isAdding, setIsAdding] = useState(false)
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [newTaskPriority, setNewTaskPriority] = useState('medium')
  const addTask = useAppStore((s) => s.addTask)
  const projects = useAppStore((s) => s.projects)
  
  // Get current project from URL or context (simplified - using first project for demo)
  const currentProjectId = projects[0]?.id || '1'
  const currentProject = projects.find(p => p.id === currentProjectId)

  const handleCreate = () => {
    if (!newTaskTitle.trim()) return
    addTask({
      id: Date.now().toString(),
      projectId: currentProjectId,
      parentId: null,
      title: newTaskTitle.trim(),
      description: '',
      status,
      priority: newTaskPriority,
      assignee: null,
      stage: currentProject?.name || '',
      dueDate: null,
      createdAt: new Date().toISOString(),
      checklist: [],
      comments: [],
      attachments: [],
      tags: []
    })
    setNewTaskTitle('')
    setNewTaskPriority('medium')
    setIsAdding(false)
  }

  return (
    <div className="flex-1 min-w-[300px] max-w-[350px] flex flex-col bg-gray-50 rounded-xl">
      {/* Header */}
      <div className={`flex items-center justify-between px-4 py-3 border-b-2 ${headerColor} bg-white rounded-t-xl`}>
        <div className="flex items-center gap-2">
          <Icon size={18} className="text-gray-600" />
          <span className="font-semibold text-gray-700">{title}</span>
          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
            {tasks.length}
          </span>
        </div>
      </div>
      
      {/* Tasks */}
      <div 
        ref={setNodeRef}
        className={`flex-1 p-3 space-y-2 overflow-y-auto max-h-[60vh] ${isOver ? 'bg-indigo-50' : ''}`}
      >
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <SortableTaskCard key={task.id} task={task} onClick={onTaskClick} />
          ))}
        </SortableContext>
        
        {/* Inline Add Form */}
        {isAdding && (
          <div className="bg-white rounded-lg border border-gray-200 p-3 space-y-3">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Название задачи"
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
            />
            <select
              value={newTaskPriority}
              onChange={(e) => setNewTaskPriority(e.target.value)}
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              {PRIORITY_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <div className="flex gap-2">
              <button
                onClick={handleCreate}
                className="flex-1 px-3 py-1.5 bg-indigo-500 text-white text-sm font-medium rounded-lg hover:bg-indigo-600"
              >
                Создать
              </button>
              <button
                onClick={() => setIsAdding(false)}
                className="flex-1 px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200"
              >
                Отмена
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Add Button */}
      {!isAdding && (
        <div className="p-3 pt-0">
          <button
            onClick={() => setIsAdding(true)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-indigo-400 hover:text-indigo-500 transition-colors"
          >
            <Plus size={16} />
            Добавить задачу
          </button>
        </div>
      )}
    </div>
  )
}

// Main Kanban Board Component
function KanbanBoard({ projectId, onTaskClick }) {
  const getTasksByProject = useAppStore((s) => s.getTasksByProject)
  const moveTask = useAppStore((s) => s.moveTask)
  const [activeId, setActiveId] = useState(null)
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')
  const [assigneeFilter, setAssigneeFilter] = useState('')
  
  const allTasks = getTasksByProject(projectId)
  
  // Get unique assignees from tasks
  const assignees = useMemo(() => {
    const unique = new Set(allTasks.map(t => t.assignee).filter(Boolean))
    return Array.from(unique)
  }, [allTasks])
  
  // Filtered tasks
  const filteredTasks = useMemo(() => {
    return allTasks.filter(task => {
      if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
      if (priorityFilter && task.priority !== priorityFilter) return false
      if (assigneeFilter && task.assignee !== assigneeFilter) return false
      return true
    })
  }, [allTasks, searchQuery, priorityFilter, assigneeFilter])
  
  const todoTasks = filteredTasks.filter(t => t.status === 'todo')
  const inProgressTasks = filteredTasks.filter(t => t.status === 'in_progress')
  const doneTasks = filteredTasks.filter(t => t.status === 'done')

  const handleDragEnd = (event) => {
    const { active, over } = event
    setActiveId(null)
    
    if (!over) return
    
    const newStatus = over.id
    
    if (active.id !== over.id && newStatus && ['todo', 'in_progress', 'done'].includes(newStatus)) {
      moveTask(active.id, newStatus)
    }
  }

  const resetFilters = () => {
    setSearchQuery('')
    setPriorityFilter('')
    setAssigneeFilter('')
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap bg-white p-4 rounded-xl border border-gray-200">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск задач..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="">Все приоритеты</option>
          {PRIORITY_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        
        <select
          value={assigneeFilter}
          onChange={(e) => setAssigneeFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="">Все исполнители</option>
          {assignees.map(a => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
        
        {(searchQuery || priorityFilter || assigneeFilter) && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-800"
          >
            <X size={14} />
            Сбросить
          </button>
        )}
      </div>
      
      {/* Kanban Board */}
      <DndContext onDragStart={({ active }) => setActiveId(active.id)} onDragEnd={handleDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-4">
          <KanbanColumn
            status="todo"
            title="To Do"
            tasks={todoTasks}
            onAddTask={() => {}}
            onTaskClick={onTaskClick}
            icon={List}
            headerColor="border-gray-300"
          />
          <KanbanColumn
            status="in_progress"
            title="In Progress"
            tasks={inProgressTasks}
            onAddTask={() => {}}
            onTaskClick={onTaskClick}
            icon={ChevronDown}
            headerColor="border-blue-400"
          />
          <KanbanColumn
            status="done"
            title="Done"
            tasks={doneTasks}
            onAddTask={() => {}}
            onTaskClick={onTaskClick}
            icon={CheckSquare}
            headerColor="border-emerald-400"
          />
        </div>
        
        <DragOverlay>
          {activeId ? (
            <div className="bg-white rounded-lg border border-gray-200 shadow-lg p-3 opacity-50">
              <div className="text-sm text-gray-500">Перемещение...</div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  )
}

// Task List Table View
function TaskListView({ projectId, onTaskClick }) {
  const getTasksByProject = useAppStore((s) => s.getTasksByProject)
  const tasks = getTasksByProject(projectId)
  
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Название</th>
            <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Статус</th>
            <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Приоритет</th>
            <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Исполнитель</th>
            <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Дедлайн</th>
            <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Прогресс</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {tasks.map((task) => {
            const checklistTotal = task.checklist.length
            const checklistChecked = task.checklist.filter(i => i.checked).length
            const progress = checklistTotal > 0 ? Math.round((checklistChecked / checklistTotal) * 100) : 0
            
            return (
              <tr
                key={task.id}
                onClick={() => onTaskClick(task.id)}
                className="cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-1 h-4 rounded ${getPriorityColor(task.priority)}`} />
                    <span className="text-sm font-medium text-gray-800">{task.title}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                    task.status === 'done' ? 'bg-emerald-100 text-emerald-700' :
                    task.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {getStatusLabel(task.status)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                    task.priority === 'critical' ? 'bg-red-100 text-red-700' :
                    task.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                    task.priority === 'medium' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {getPriorityLabel(task.priority)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {task.assignee ? (
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full ${getAvatarColor(task.assignee)} flex items-center justify-center text-white text-xs`}>
                        {getInitials(task.assignee)}
                      </div>
                      <span className="text-sm text-gray-700">{task.assignee}</span>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">—</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {task.dueDate ? (
                    <span className={`text-sm ${isOverdue(task.dueDate) ? 'text-red-500' : 'text-gray-600'}`}>
                      {formatDate(task.dueDate)}
                    </span>
                  ) : (
                    <span className="text-sm text-gray-400">—</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {checklistTotal > 0 ? (
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden max-w-[100px]">
                        <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-600" style={{ width: `${progress}%` }} />
                      </div>
                      <span className="text-xs text-gray-500">{progress}%</span>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">—</span>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {tasks.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          В этом проекте пока нет задач
        </div>
      )}
    </div>
  )
}

// Template Card Component
function TemplateCard({ template, onSelect }) {
  const iconMap = {
    Rocket: Rocket,
    GraduationCap: GraduationCap,
    Megaphone: Megaphone,
    Code: Code,
    Calendar: Calendar,
    Search: FolderSearch
  }
  
  const IconComponent = iconMap[template.icon] || FolderSearch
  
  const colorMap = {
    purple: 'bg-purple-100 text-purple-600',
    blue: 'bg-blue-100 text-blue-600',
    orange: 'bg-orange-100 text-orange-600',
    green: 'bg-green-100 text-green-600',
    pink: 'bg-pink-100 text-pink-600',
    teal: 'bg-teal-100 text-teal-600'
  }
  
  const categoryColorMap = {
    'Стартап': 'bg-purple-50 text-purple-700 border-purple-200',
    'Учёба': 'bg-blue-50 text-blue-700 border-blue-200',
    'Маркетинг': 'bg-orange-50 text-orange-700 border-orange-200',
    'Разработка': 'bg-green-50 text-green-700 border-green-200'
  }
  
  const taskCount = countTemplateTasks(template)
  const stageCount = countTemplateStages(template)
  
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col">
      <div className={`h-16 ${colorMap[template.color]} flex items-center justify-center`}>
        <IconComponent size={32} />
      </div>
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-gray-800 line-clamp-2">{template.name}</h3>
        </div>
        <p className="text-sm text-gray-500 line-clamp-2">{template.description}</p>
        
        <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-medium border ${categoryColorMap[template.category] || 'bg-gray-50 text-gray-700 border-gray-200'}`}>
          {template.category}
        </span>
        
        <div className="flex items-center gap-4 text-xs text-gray-500 pt-2 mt-auto">
          <div className="flex items-center gap-1">
            <CheckSquare size={14} />
            <span>{taskCount} задач</span>
          </div>
          <div className="flex items-center gap-1">
            <List size={14} />
            <span>{stageCount} этапов</span>
          </div>
        </div>
        
        <button
          onClick={() => onSelect(template)}
          className="w-full mt-3 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-lg transition-colors"
        >
          Использовать шаблон
        </button>
      </div>
    </div>
  )
}

// Templates Grid Component
function TemplatesGrid({ onSelectTemplate }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {templates.map((template) => (
        <TemplateCard 
          key={template.id} 
          template={template} 
          onSelect={onSelectTemplate}
        />
      ))}
    </div>
  )
}

// Template Preview Modal
function TemplatePreviewModal({ template, onClose }) {
  const createProjectFromTemplate = useAppStore((s) => s.createProjectFromTemplate)
  const [projectName, setProjectName] = useState(template.name)
  
  const handleCreate = () => {
    if (!projectName.trim()) return
    const projectId = createProjectFromTemplate(template, projectName.trim())
    onClose(projectId)
  }
  
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <h2 className="text-lg font-semibold text-gray-800">Создание проекта из шаблона</h2>
          <button onClick={() => onClose(null)} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Template Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-800 mb-1">{template.name}</h3>
            <p className="text-sm text-gray-500">{template.description}</p>
          </div>
          
          {/* Project Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Название вашего проекта</label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              autoFocus
            />
          </div>
          
          {/* Stages and Tasks Preview */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Этапы и задачи:</h4>
            <div className="space-y-3">
              {template.stages.map((stage, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                    <h5 className="text-sm font-medium text-gray-700">{stage.name}</h5>
                  </div>
                  <ul className="divide-y divide-gray-100">
                    {stage.tasks.map((task, taskIndex) => (
                      <li key={taskIndex} className="px-4 py-2 text-sm text-gray-600 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-2 px-6 py-4 border-t border-gray-100 shrink-0">
          <button
            type="button"
            onClick={() => onClose(null)}
            className="px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100"
          >
            Отмена
          </button>
          <button
            onClick={handleCreate}
            className="px-4 py-2 rounded-lg text-sm text-white bg-indigo-500 hover:bg-indigo-600"
          >
            Создать проект из шаблона
          </button>
        </div>
      </div>
    </div>
  )
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
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [selectedProjectId, setSelectedProjectId] = useState(null)
  const [activeTab, setActiveTab] = useState('my-projects') // 'my-projects' or 'templates'

  const filtered = projects.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  )

  const completion = Math.round(
    projects.reduce((acc, p) => acc + p.progress, 0) / (projects.length || 1)
  )

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template)
  }

  const handleTemplatePreviewClose = (projectId) => {
    setSelectedTemplate(null)
    if (projectId) {
      setSelectedProjectId(projectId)
    }
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
        {/* Main Tabs */}
        <div className="flex items-center gap-2 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('my-projects')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'my-projects' 
                ? 'border-indigo-500 text-indigo-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <LayoutGrid size={16} />
            Мои проекты
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'templates' 
                ? 'border-indigo-500 text-indigo-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <FolderSearch size={16} />
            Шаблоны
          </button>
        </div>

        {activeTab === 'my-projects' ? (
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
              {filtered.length === 0 ? (
                <div className="col-span-full text-center py-12 text-gray-500">
                  {query ? `Проекты по запросу "${query}" не найдены` : 'Пока нет проектов. Создайте первый проект!'}
                </div>
              ) : (
                filtered.map((p) => (
                  <ProjectCard 
                    key={p.id} 
                    project={p} 
                    onClick={() => setSelectedProjectId(p.id)}
                  />
                ))
              )}
            </div>
          </>
        ) : (
          <TemplatesGrid onSelectTemplate={handleTemplateSelect} />
        )}
      </div>

      {isModalOpen && <CreateProjectModal onClose={() => setIsModalOpen(false)} />}
      
      {selectedTemplate && (
        <TemplatePreviewModal 
          template={selectedTemplate} 
          onClose={handleTemplatePreviewClose} 
        />
      )}
      
      {selectedProjectId && typeof selectedProjectId === 'string' && !selectedProjectId.startsWith('template-') && (
        <TaskDetailModal 
          projectId={selectedProjectId} 
          onClose={() => setSelectedProjectId(null)} 
        />
      )}
    </div>
  )
}

// Модальное окно для просмотра задач проекта с вкладками Канбан и Список
function TaskDetailModal({ projectId, onClose }) {
  const project = useAppStore((s) => s.projects.find(p => p.id === projectId))
  const [selectedTaskId, setSelectedTaskId] = useState(null)
  const [activeTab, setActiveTab] = useState('kanban') // 'kanban' or 'list'

  if (!project) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">{project.name}</h2>
            <p className="text-sm text-gray-500">{project.description}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>
        
        {/* Tabs */}
        <div className="flex items-center gap-2 px-6 py-3 border-b border-gray-100 bg-gray-50">
          <button
            onClick={() => setActiveTab('kanban')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'kanban' 
                ? 'bg-white text-indigo-600 shadow-sm' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Kanban size={16} />
            Канбан
          </button>
          <button
            onClick={() => setActiveTab('list')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'list' 
                ? 'bg-white text-indigo-600 shadow-sm' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <List size={16} />
            Список задач
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-hidden p-6">
          {activeTab === 'kanban' ? (
            <KanbanBoard projectId={projectId} onTaskClick={setSelectedTaskId} />
          ) : (
            <TaskListView projectId={projectId} onTaskClick={setSelectedTaskId} />
          )}
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
