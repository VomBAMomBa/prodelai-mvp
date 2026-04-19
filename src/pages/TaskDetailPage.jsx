import { useState } from 'react'
import { X, CheckSquare, Paperclip, MessageSquare, Calendar, User, Tag, Trash2, Plus, FileText, Image as ImageIcon, Film, Archive } from 'lucide-react'
import { useAppStore } from '../store/useAppStore.js'
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from '../data/taskModel.js'

const teamMembers = [
  'Ставничук Я.',
  'Пономарев А.',
  'Иванов Д.',
  'Петрова М.',
  'Козлов А.'
]

function getInitials(name) {
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

function formatDateTime(isoString) {
  const date = new Date(isoString)
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
}

function formatDate(dateString) {
  if (!dateString) return 'Не установлен'
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU')
}

function getFileIcon(type) {
  switch (type) {
    case 'image': return <ImageIcon size={16} />
    case 'video': return <Film size={16} />
    default: return <FileText size={16} />
  }
}

export default function TaskDetailPage({ taskId, onClose }) {
  const task = useAppStore((s) => s.getTaskById(taskId))
  const updateTask = useAppStore((s) => s.updateTask)
  const toggleChecklistItem = useAppStore((s) => s.toggleChecklistItem)
  const addChecklistItem = useAppStore((s) => s.addChecklistItem)
  const deleteChecklistItem = useAppStore((s) => s.deleteChecklistItem)
  const addComment = useAppStore((s) => s.addComment)
  const subtasks = useAppStore((s) => s.getSubtasks(taskId))

  const [newChecklistText, setNewChecklistText] = useState('')
  const [newCommentText, setNewCommentText] = useState('')
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [editedTitle, setEditedTitle] = useState(task?.title || '')
  const [editedDescription, setEditedDescription] = useState(task?.description || '')

  if (!task) return null

  const checklistProgress = task.checklist.length > 0
    ? Math.round((task.checklist.filter(i => i.checked).length / task.checklist.length) * 100)
    : 0

  const handleAddChecklistItem = () => {
    if (!newChecklistText.trim()) return
    addChecklistItem(taskId, newChecklistText.trim())
    setNewChecklistText('')
  }

  const handleAddComment = () => {
    if (!newCommentText.trim()) return
    addComment(taskId, {
      author: 'Ставничук Я.',
      text: newCommentText.trim(),
      createdAt: new Date().toISOString()
    })
    setNewCommentText('')
  }

  const handleTitleSave = () => {
    if (editedTitle.trim()) {
      updateTask(taskId, { title: editedTitle.trim() })
    }
    setIsEditingTitle(false)
  }

  const handleDescriptionBlur = () => {
    updateTask(taskId, { description: editedDescription })
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 overflow-hidden">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3">
            <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${
              task.priority === 'critical' ? 'bg-red-100 text-red-700' :
              task.priority === 'high' ? 'bg-orange-100 text-orange-700' :
              task.priority === 'medium' ? 'bg-blue-100 text-blue-700' :
              'bg-gray-100 text-gray-600'
            }`}>
              {PRIORITY_OPTIONS.find(p => p.value === task.priority)?.label || task.priority}
            </span>
            <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${
              task.status === 'done' ? 'bg-emerald-100 text-emerald-700' :
              task.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
              'bg-gray-100 text-gray-600'
            }`}>
              {STATUS_OPTIONS.find(s => s.value === task.status)?.label || task.status}
            </span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel (70%) */}
          <div className="w-[70%] border-r border-gray-100 overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Title */}
              <div>
                {isEditingTitle ? (
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    onBlur={handleTitleSave}
                    onKeyDown={(e) => e.key === 'Enter' && handleTitleSave()}
                    className="w-full text-xl font-semibold text-gray-800 border-b-2 border-indigo-500 focus:outline-none pb-1"
                    autoFocus
                  />
                ) : (
                  <h2
                    onClick={() => setIsEditingTitle(true)}
                    className="text-xl font-semibold text-gray-800 cursor-pointer hover:bg-gray-50 -ml-2 pl-2 pr-2 py-1 rounded transition-colors"
                  >
                    {task.title}
                  </h2>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Описание</label>
                <textarea
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  onBlur={handleDescriptionBlur}
                  placeholder="Добавьте описание задачи..."
                  rows={4}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
                />
              </div>

              {/* Checklist */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <CheckSquare size={18} className="text-gray-500" />
                    <h3 className="font-medium text-gray-800">Чек-лист</h3>
                  </div>
                  {task.checklist.length > 0 && (
                    <span className="text-xs text-gray-500">{checklistProgress}% выполнено</span>
                  )}
                </div>
                
                {task.checklist.length > 0 && (
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-3">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-300"
                      style={{ width: `${checklistProgress}%` }}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  {task.checklist.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 group">
                      <button
                        onClick={() => toggleChecklistItem(taskId, item.id)}
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                          item.checked
                            ? 'bg-indigo-500 border-indigo-500 text-white'
                            : 'border-gray-300 hover:border-indigo-400'
                        }`}
                      >
                        {item.checked && <CheckSquare size={14} />}
                      </button>
                      <span className={`flex-1 text-sm ${item.checked ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                        {item.text}
                      </span>
                      <button
                        onClick={() => deleteChecklistItem(taskId, item.id)}
                        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 mt-3">
                  <Plus size={16} className="text-gray-400" />
                  <input
                    type="text"
                    value={newChecklistText}
                    onChange={(e) => setNewChecklistText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddChecklistItem()}
                    placeholder="Добавить пункт"
                    className="flex-1 text-sm border-b border-gray-200 focus:outline-none focus:border-indigo-400 py-1"
                  />
                </div>
              </div>

              {/* Subtasks */}
              {subtasks.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <CheckSquare size={18} className="text-gray-500" />
                    <h3 className="font-medium text-gray-800">Подзадачи</h3>
                  </div>
                  <div className="space-y-2">
                    {subtasks.map((subtask) => (
                      <div key={subtask.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className={`w-2 h-2 rounded-full ${
                          subtask.status === 'done' ? 'bg-emerald-500' :
                          subtask.status === 'in_progress' ? 'bg-blue-500' :
                          'bg-gray-400'
                        }`} />
                        <span className="flex-1 text-sm text-gray-700">{subtask.title}</span>
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          subtask.status === 'done' ? 'bg-emerald-100 text-emerald-700' :
                          subtask.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {subtask.status === 'done' ? 'Done' : subtask.status === 'in_progress' ? 'In Progress' : 'To Do'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Comments */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare size={18} className="text-gray-500" />
                  <h3 className="font-medium text-gray-800">Комментарии ({task.comments.length})</h3>
                </div>

                <div className="space-y-4 mb-4">
                  {task.comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <div className={`w-8 h-8 rounded-full ${getAvatarColor(comment.author)} flex items-center justify-center text-white text-xs font-medium shrink-0`}>
                        {getInitials(comment.author)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-gray-800">{comment.author}</span>
                          <span className="text-xs text-gray-400">{formatDateTime(comment.createdAt)}</span>
                        </div>
                        <p className="text-sm text-gray-700 bg-gray-50 rounded-lg px-3 py-2">{comment.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-medium shrink-0">
                    СЯ
                  </div>
                  <div className="flex-1">
                    <textarea
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                      placeholder="Напишите комментарий..."
                      rows={2}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
                    />
                    <div className="flex justify-end mt-2">
                      <button
                        onClick={handleAddComment}
                        disabled={!newCommentText.trim()}
                        className="px-4 py-1.5 bg-indigo-500 text-white text-sm font-medium rounded-lg hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Отправить
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel (30%) */}
          <div className="w-[30%] overflow-y-auto bg-gray-50">
            <div className="p-6 space-y-5">
              {/* Status */}
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Статус</label>
                <select
                  value={task.status}
                  onChange={(e) => updateTask(taskId, { status: e.target.value })}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              {/* Priority */}
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Приоритет</label>
                <select
                  value={task.priority}
                  onChange={(e) => updateTask(taskId, { priority: e.target.value })}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  {PRIORITY_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              {/* Assignee */}
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Исполнитель</label>
                <select
                  value={task.assignee || ''}
                  onChange={(e) => updateTask(taskId, { assignee: e.target.value || null })}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  <option value="">Не назначен</option>
                  {teamMembers.map((member) => (
                    <option key={member} value={member}>{member}</option>
                  ))}
                </select>
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Дедлайн</label>
                <div className="relative">
                  <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="date"
                    value={task.dueDate || ''}
                    onChange={(e) => updateTask(taskId, { dueDate: e.target.value || null })}
                    className="w-full rounded-lg border border-gray-200 bg-white pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
              </div>

              {/* Stage */}
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Этап проекта</label>
                <input
                  type="text"
                  value={task.stage}
                  onChange={(e) => updateTask(taskId, { stage: e.target.value })}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Теги</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {task.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-100 text-indigo-700 rounded-md text-xs"
                    >
                      <Tag size={12} />
                      {tag}
                      <button
                        onClick={() => updateTask(taskId, { tags: task.tags.filter(t => t !== tag) })}
                        className="hover:text-indigo-900"
                      >
                        <X size={10} />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <Plus size={14} className="text-gray-400" />
                  <input
                    type="text"
                    placeholder="Добавить тег"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.target.value.trim()) {
                        updateTask(taskId, { tags: [...task.tags, e.target.value.trim()] })
                        e.target.value = ''
                      }
                    }}
                    className="flex-1 text-xs border-b border-gray-200 focus:outline-none focus:border-indigo-400 py-1"
                  />
                </div>
              </div>

              {/* Attachments */}
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Вложения</label>
                <div className="space-y-2">
                  {task.attachments.map((file) => (
                    <div key={file.id} className="flex items-center gap-2 p-2 bg-white rounded-lg border border-gray-100">
                      <span className="text-gray-400">{getFileIcon(file.type)}</span>
                      <span className="flex-1 text-sm text-gray-700 truncate">{file.name}</span>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-2 flex items-center justify-center gap-2 px-3 py-2 border-2 border-dashed border-gray-200 rounded-lg text-sm text-gray-500 hover:border-indigo-400 hover:text-indigo-500 transition-colors">
                  <Paperclip size={16} />
                  Добавить файл
                </button>
              </div>

              {/* Meta Info */}
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Создано:</span>
                  <span>{formatDate(task.createdAt)}</span>
                </div>
                {task.assignee && (
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <User size={12} />
                    <span>{task.assignee}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
