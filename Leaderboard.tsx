import { useSession } from '../store/session'
import { PageShell } from '../components/ui'

export default function Leaderboard() {
  const { t, students, student } = useSession()
  const sorted = [...students].sort((a, b) => b.xp - a.xp)
  return (
    <PageShell>
      <h1 className="font-display text-3xl font-bold">{t('lb.title')}</h1>
      <p className="mt-1 text-navy-900/60">{t('lb.sub')}</p>
      <div className="mt-6 space-y-3">
        {sorted.length === 0 && <div className="card hover:translate-y-0">{t('lb.empty')}</div>}
        {sorted.map((s, i) => (
          <div key={s.id} className={`card flex items-center gap-4 py-4 hover:translate-y-0 ${s.id === student?.id ? 'border-violetx/50 bg-violetx/5' : ''}`}>
            <div className="grid h-10 w-10 place-items-center rounded-full bg-navy-900 font-display font-bold text-white">{i + 1}</div>
            <div className="min-w-0 flex-1"><div className="truncate font-semibold">{s.name}{s.id === student?.id && <span className="ml-2 text-xs text-violetx">({t('lb.you')})</span>}</div><div className="text-xs text-navy-900/50">{s.group}</div></div>
            <div className="font-display font-bold text-violetx">{s.xp} XP</div>
          </div>))}
      </div>
    </PageShell>)
}
