import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import LandingPage from './pages/LandingPage.jsx'
import HomePage from './pages/HomePage.jsx'
import ProjectsPage from './pages/ProjectsPage.jsx'
import KnowledgePage from './pages/KnowledgePage.jsx'
import CalendarPage from './pages/CalendarPage.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/app" element={<Layout><HomePage /></Layout>} />
      <Route path="/app/projects" element={<Layout><ProjectsPage /></Layout>} />
      <Route path="/app/knowledge" element={<Layout><KnowledgePage /></Layout>} />
      <Route path="/app/calendar" element={<Layout><CalendarPage /></Layout>} />
    </Routes>
  )
}
