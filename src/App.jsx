import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import LandingPage from './pages/LandingPage.jsx'
import HomePage from './pages/HomePage.jsx'
import ProjectsPage from './pages/ProjectsPage.jsx'
import KnowledgePage from './pages/KnowledgePage.jsx'
import CalendarPage from './pages/CalendarPage.jsx'
import TeamPage from './pages/TeamPage.jsx'
import NewsPage from './pages/NewsPage.jsx'
import LearningPage from './pages/LearningPage.jsx'
import FinancePage from './pages/FinancePage.jsx'
import HRPage from './pages/HRPage.jsx'
import MessengerPage from './pages/MessengerPage.jsx'
import BotPage from './pages/BotPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/app" element={<Layout><HomePage /></Layout>} />
      <Route path="/app/team" element={<Layout><TeamPage /></Layout>} />
      <Route path="/app/news" element={<Layout><NewsPage /></Layout>} />
      <Route path="/app/projects" element={<Layout><ProjectsPage /></Layout>} />
      <Route path="/app/learning" element={<Layout><LearningPage /></Layout>} />
      <Route path="/app/finance" element={<Layout><FinancePage /></Layout>} />
      <Route path="/app/hr" element={<Layout><HRPage /></Layout>} />
      <Route path="/app/knowledge" element={<Layout><KnowledgePage /></Layout>} />
      <Route path="/app/messenger" element={<Layout><MessengerPage /></Layout>} />
      <Route path="/app/calendar" element={<Layout><CalendarPage /></Layout>} />
      <Route path="/app/bot" element={<Layout><BotPage /></Layout>} />
      <Route path="/app/profile" element={<Layout><ProfilePage /></Layout>} />
    </Routes>
  )
}
