import { Navigate, Route, Routes } from 'react-router-dom'
import { ReactElement } from 'react'
import Layout from './components/Layout'
import { useSession } from './store/session'
import { MODULES } from './data/modules'
import Landing from './pages/Landing'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import ModulePage from './pages/ModulePage'
import Leaderboard from './pages/Leaderboard'
import Teacher from './pages/Teacher'
import { PageShell } from './components/ui'
import { Link } from 'react-router-dom'

function Guard({ children }: { children: ReactElement }) {
  const { student } = useSession()
  return student ? children : <Navigate to="/register" replace />
}
function NotFound() { const { t } = useSession(); return <PageShell><h1 className="font-display text-3xl font-bold">{t('nf.title')}</h1><Link to="/" className="btn-primary mt-6">{t('nav.home')}</Link></PageShell> }

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="register" element={<Register />} />
        <Route path="dashboard" element={<Guard><Dashboard /></Guard>} />
        <Route path="profile" element={<Guard><Profile /></Guard>} />
        {MODULES.map(m => <Route key={m.id} path={m.id} element={<Guard><ModulePage id={m.id} /></Guard>} />)}
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="teacher" element={<Teacher />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>)
}
