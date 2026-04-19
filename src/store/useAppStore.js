import { create } from 'zustand'
import { initialProjects } from '../data/projects.js'
import { tasks as initialTasks } from '../data/tasks.js'
import { generateId } from '../data/taskModel.js'

export const useAppStore = create((set, get) => ({
  projects: initialProjects,
  tasks: initialTasks,
  
  // Project actions
  addProject: (project) => set((state) => ({
    projects: [
      ...state.projects,
      {
        id: Date.now().toString(),
        ...project,
        status: 'В процессе',
        progress: 0,
        deadline: 'Не установлен',
        members: 1,
        color: 'from-indigo-500 to-purple-600'
      }
    ]
  })),
  
  updateProject: (id, updates) => set((state) => ({
    projects: state.projects.map((p) =>
      p.id === id ? { ...p, ...updates } : p
    )
  })),
  
  deleteProject: (id) => set((state) => ({
    projects: state.projects.filter((p) => p.id !== id)
  })),
  
  // Task actions
  addTask: (task) => set((state) => ({
    tasks: [...state.tasks, task]
  })),
  
  updateTask: (id, updates) => set((state) => ({
    tasks: state.tasks.map((t) =>
      t.id === id ? { ...t, ...updates } : t
    )
  })),
  
  deleteTask: (id) => set((state) => ({
    tasks: state.tasks.filter((t) => t.id !== id && t.parentId !== id)
  })),
  
  moveTask: (id, newStatus) => set((state) => ({
    tasks: state.tasks.map((t) =>
      t.id === id ? { ...t, status: newStatus } : t
    )
  })),
  
  toggleChecklistItem: (taskId, checklistItemId) => set((state) => ({
    tasks: state.tasks.map((t) =>
      t.id === taskId
        ? {
            ...t,
            checklist: t.checklist.map((item) =>
              item.id === checklistItemId
                ? { ...item, checked: !item.checked }
                : item
            )
          }
        : t
    )
  })),
  
  addChecklistItem: (taskId, text) => set((state) => ({
    tasks: state.tasks.map((t) =>
      t.id === taskId
        ? {
            ...t,
            checklist: [...t.checklist, { id: generateId(), text, checked: false }]
          }
        : t
    )
  })),
  
  deleteChecklistItem: (taskId, checklistItemId) => set((state) => ({
    tasks: state.tasks.map((t) =>
      t.id === taskId
        ? {
            ...t,
            checklist: t.checklist.filter((item) => item.id !== checklistItemId)
          }
        : t
    )
  })),
  
  addComment: (taskId, comment) => set((state) => ({
    tasks: state.tasks.map((t) =>
      t.id === taskId
        ? { ...t, comments: [...t.comments, { ...comment, id: generateId() }] }
        : t
    )
  })),
  
  addAttachment: (taskId, attachment) => set((state) => ({
    tasks: state.tasks.map((t) =>
      t.id === taskId
        ? { ...t, attachments: [...t.attachments, { ...attachment, id: generateId() }] }
        : t
    )
  })),
  
  addTag: (taskId, tag) => set((state) => ({
    tasks: state.tasks.map((t) =>
      t.id === taskId && !t.tags.includes(tag)
        ? { ...t, tags: [...t.tags, tag] }
        : t
    )
  })),
  
  removeTag: (taskId, tag) => set((state) => ({
    tasks: state.tasks.map((t) =>
      t.id === taskId
        ? { ...t, tags: t.tags.filter((tg) => tg !== tag) }
        : t
    )
  })),
  
  // Selectors
  getTasksByProject: (projectId) => {
    const state = get()
    return state.tasks.filter((t) => t.projectId === projectId && !t.parentId)
  },
  
  getSubtasks: (parentId) => {
    const state = get()
    return state.tasks.filter((t) => t.parentId === parentId)
  },
  
  getTaskById: (id) => {
    const state = get()
    return state.tasks.find((t) => t.id === id)
  }
}))
