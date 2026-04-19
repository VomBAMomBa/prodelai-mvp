import { create } from 'zustand'
import { initialProjects } from '../data/projects.js'

export const useAppStore = create((set) => ({
  projects: initialProjects,
  
  addProject: (project) => set((state) => ({
    projects: [
      ...state.projects,
      {
        id: Date.now(),
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
  }))
}))
