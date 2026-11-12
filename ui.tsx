import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useSession } from '../store/session'
import { LANGS } from '../i18n/dictionary'
import { MODULES, ModuleDef, XP_PER_LEVEL } from '../data/modules'

export function LanguageSwitcher({ dark = false }: { dark?: boolean }) {
  const { lang, setLang } = useSession()
  return (
    <div className={`flex rounded-xl p-1 text-xs font-semibold ${dark ? 'bg-white/10' : 'bg-navy-900/5'}`} role="group" aria-label="Language">
      {LANGS.map(l => (
        <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l}
          className={`rounded-lg px-3 py-1.5 uppercase transition ${lang === l ? 'bg-gradient-to-r from-cyanx to-violetx text-white' : dark ? 'text-white/70 hover:text-white' : 'text-navy-900/60 hover:text-navy-900'}`}>{l}</button>
      ))}
    </div>)
}

export function ProgressBar({ value, label }: { value: number; label?: string }) {
  return (
    <div>
      {label && <div className="mb-1.5 flex justify-between text-xs font-medium text-navy-900/60"><span>{label}</span><span>{value}%</span></div>}
      <div className="h-2.5 overflow-hidden rounded-full bg-navy-900/10" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
        <div className="h-full rounded-full bg-gradient-to-r from-cyanx to-violetx transition-all duration-700" style={{ width: `${value}%` }} />
      </div>
    </div>)
}

export function XPDisplay() {
  const { student, level, t } = useSession()
  if (!student) return null
  const into = student.xp % XP_PER_LEVEL
  return (
    <div className="rounded-2xl bg-navy-900 p-5 text-white">
      <div className="flex items-end justify-between">
        <div><div className="text-xs uppercase tracking-widest text-cyanx">{t('xp.level')}</div><div className="font-display text-4xl font-bold">{level}</div></div>
        <div className="text-right"><div className="text-xs uppercase tracking-widest text-white/60">{t('xp.label')}</div><div className="font-display text-2xl font-bold text-cyanx">{student.xp} XP</div></div>
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/15"><div className="h-full rounded-full bg-gradient-to-r from-cyanx to-violetx transition-all duration-700" style={{ width: `${into / XP_PER_LEVEL * 100}%` }} /></div>
    </div>)
}

export function ModuleCard({ m, index }: { m: ModuleDef; index: number }) {
  const { student, t } = useSession()
  const done = student?.briefed.includes(m.id)
  return (
    <Link to={`/${m.id}`} className="card group block animate-fadeUp" style={{ animationDelay: `${index * 70}ms` }}>
      <div className="flex items-start justify-between">
        <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-cyanx/20 to-violetx/20 font-display text-2xl text-violetx">{m.icon}</div>
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${done ? 'bg-cyanx/15 text-cyan-700' : 'bg-navy-900/5 text-navy-900/50'}`}>{done ? t('status.briefed') : t('status.locked')}</span>
      </div>
      <h3 className="mt-4 font-display text-lg font-bold">{t(`mod.${m.id}.name` as never)}</h3>
      <p className="mt-1 text-sm text-navy-900/60">{t(`mod.${m.id}.desc` as never)}</p>
      <div className="mt-4 flex items-center justify-between text-sm font-semibold"><span className="text-violetx">+{m.xp} XP</span><span className="text-navy-900 transition group-hover:translate-x-1">{t('card.open')} →</span></div>
    </Link>)
}

export const PageShell = ({ children }: { children: ReactNode }) => <div className="mx-auto w-full max-w-6xl animate-fadeUp px-4 py-8 sm:px-6 sm:py-12">{children}</div>
export const AtomMark = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden><circle cx="16" cy="16" r="3" fill="#22D3EE"/><ellipse cx="16" cy="16" rx="13" ry="5" stroke="#8B5CF6" strokeWidth="1.5"/><ellipse cx="16" cy="16" rx="13" ry="5" stroke="#22D3EE" strokeWidth="1.5" transform="rotate(60 16 16)"/><ellipse cx="16" cy="16" rx="13" ry="5" stroke="#8B5CF6" strokeWidth="1.5" transform="rotate(120 16 16)"/></svg>)
export const MODULE_COUNT = MODULES.length
