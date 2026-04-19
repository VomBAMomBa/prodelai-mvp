// Модель данных задачи для платформы ProДелай

/**
 * @typedef {Object} ChecklistItem
 * @property {string} id
 * @property {string} text
 * @property {boolean} checked
 */

/**
 * @typedef {Object} Comment
 * @property {string} id
 * @property {string} author
 * @property {string} text
 * @property {string} createdAt
 */

/**
 * @typedef {Object} Attachment
 * @property {string} id
 * @property {string} name
 * @property {string} url
 * @property {string} type
 */

/**
 * @typedef {Object} Task
 * @property {string} id - uuid
 * @property {string} projectId - привязка к проекту
 * @property {string | null} parentId - для вложенных подзадач
 * @property {string} title
 * @property {string} description
 * @property {"todo" | "in_progress" | "done"} status
 * @property {"low" | "medium" | "high" | "critical"} priority
 * @property {string | null} assignee - имя исполнителя
 * @property {string} stage - название этапа проекта
 * @property {string | null} dueDate - дедлайн, формат YYYY-MM-DD
 * @property {string} createdAt
 * @property {ChecklistItem[]} checklist
 * @property {Comment[]} comments
 * @property {Attachment[]} attachments
 * @property {string[]} tags
 */

export const STATUS_OPTIONS = [
  { value: 'todo', label: 'To Do', color: 'bg-gray-100 text-gray-700' },
  { value: 'in_progress', label: 'In Progress', color: 'bg-blue-100 text-blue-700' },
  { value: 'done', label: 'Done', color: 'bg-emerald-100 text-emerald-700' }
]

export const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Низкий', color: 'bg-gray-100 text-gray-600' },
  { value: 'medium', label: 'Средний', color: 'bg-blue-100 text-blue-600' },
  { value: 'high', label: 'Высокий', color: 'bg-orange-100 text-orange-600' },
  { value: 'critical', label: 'Критический', color: 'bg-red-100 text-red-600' }
]

export const generateId = () => {
  return Math.random().toString(36).substring(2, 9) + Date.now().toString(36)
}

export const createEmptyTask = (projectId, parentId = null) => ({
  id: generateId(),
  projectId,
  parentId,
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
  assignee: null,
  stage: '',
  dueDate: null,
  createdAt: new Date().toISOString().split('T')[0],
  checklist: [],
  comments: [],
  attachments: [],
  tags: []
})
