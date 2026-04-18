import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import HomePage from './pages/HomePage.jsx'
import ProjectsPage from './pages/ProjectsPage.jsx'
import KnowledgePage from './pages/KnowledgePage.jsx'
import CalendarPage from './pages/CalendarPage.jsx'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/knowledge" element={<KnowledgePage />} />
        <Route path="/calendar" element={<CalendarPage />} />
      </Routes>
    </Layout>
  )
}
