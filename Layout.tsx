import { useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useSession } from '../store/session'
import { AtomMark, LanguageSwitcher } from './ui'
import type { TKey } from '../i18n/dictionary'

const LINKS: { to: string; key: TKey; auth: boolean }[] = [
  { to:'/dashboard', key:'nav.dashboard', auth:true }, { to:'/profile', key:'nav.profile', auth:true },
  { to:'/leaderboard', key:'nav.leaderboard', auth:false }, { to:'/teacher', key:'nav.teacher', auth:false } ]

export default function Layout() {
  const { t, student, logout } = useSession()
  const [open, setOpen] = useState(false)
  const nav = useNavigate()
  const links = LINKS.filter(l => !l.auth || student)
  const cls = ({ isActive }: { isActive: boolean }) => `rounded-lg px-3 py-2 text-sm font-medium transition ${isActive ? 'bg-navy-900 text-white' : 'text-navy-900/70 hover:bg-navy-900/5'}`
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-navy-900/10 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold" onClick={() => setOpen(false)}><AtomMark />ATOM <span className="text-violetx">X</span></Link>
          <nav className="hidden items-center gap-1 md:flex">{links.map(l => <NavLink key={l.to} to={l.to} className={cls}>{t(l.key)}</NavLink>)}</nav>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            {student
              ? <button className="btn-ghost hidden md:inline-flex" onClick={() => { logout(); nav('/') }}>{t('nav.logout')}</button>
              : <Link to="/register" className="btn-primary hidden md:inline-flex">{t('nav.register')}</Link>}
            <button className="btn-ghost px-3 md:hidden" aria-label={t('nav.menu')} aria-expanded={open} onClick={() => setOpen(o => !o)}>{open ? '✕' : '☰'}</button>
          </div>
        </div>
        {open && (
          <nav className="flex flex-col gap-1 border-t border-navy-900/10 bg-white p-4 md:hidden" onClick={() => setOpen(false)}>
            <NavLink to="/" className={cls} end>{t('nav.home')}</NavLink>
            {links.map(l => <NavLink key={l.to} to={l.to} className={cls}>{t(l.key)}</NavLink>)}
            {student ? <button className="btn-ghost mt-2" onClick={() => { logout(); nav('/') }}>{t('nav.logout')}</button> : <Link to="/register" className="btn-primary mt-2">{t('nav.register')}</Link>}
          </nav>)}
      </header>
      <main className="flex-1"><Outlet /></main>
      <footer className="border-t border-navy-900/10 py-6 text-center text-xs text-navy-900/50">{t('footer')}</footer>
    </div>)
}
