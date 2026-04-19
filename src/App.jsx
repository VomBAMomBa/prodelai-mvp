import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import LandingPage from './pages/LandingPage.jsx'
import HomePage from './pages/HomePage.jsx'
import ProjectsPage from './pages/ProjectsPage.jsx'
import KnowledgePage from './pages/KnowledgePage.jsx'
import CalendarPage from './pages/CalendarPage.jsx'
import TeamPage from './pages/TeamPage.jsx'
import HRPage from './pages/HRPage.jsx'
import AIBotPage from './pages/AIBotPage.jsx'
import MessengerPage from './pages/MessengerPage.jsx'

export default function App() {
  return (
    <Routes>
      {/* Стартовая страница - лендинг */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Основное приложение с сайдбаром */}
      <Route path="/app" element={<Layout><HomePage /></Layout>} />
      <Route path="/app/projects" element={<Layout><ProjectsPage /></Layout>} />
      <Route path="/app/knowledge" element={<Layout><KnowledgePage /></Layout>} />
      <Route path="/app/calendar" element={<Layout><CalendarPage /></Layout>} />
      <Route path="/app/team" element={<Layout><TeamPage /></Layout>} />
      <Route path="/app/news" element={<Layout><div className="p-8"><h1 className="text-2xl font-bold">Новости</h1></div></Layout>} />
      <Route path="/app/learning" element={<Layout><div className="p-8"><h1 className="text-2xl font-bold">Обучение</h1></div></Layout>} />
      <Route path="/app/finance" element={<Layout><div className="p-8"><h1 className="text-2xl font-bold">Финансы</h1></div></Layout>} />
      <Route path="/app/hr" element={<Layout><HRPage /></Layout>} />
      <Route path="/app/messenger" element={<Layout><MessengerPage /></Layout>} />
      <Route path="/app/bot" element={<Layout><AIBotPage /></Layout>} />
      <Route path="/app/profile" element={<Layout><div className="p-8"><h1 className="text-2xl font-bold">Профиль</h1></div></Layout>} />
    </Routes>
  )
}
