import { useSession } from '../store/session'
import { MODULES } from '../data/modules'
import { PageShell, ProgressBar } from '../components/ui'

export default function Teacher() {
  const { t, students, clearAll } = useSession()
  const avg = students.length ? Math.round(students.reduce((a, s) => a + s.xp, 0) / students.length) : 0
  return (
    <PageShell>
      <h1 className="font-display text-3xl font-bold">{t('tch.title')}</h1>
      <p className="mt-1 text-navy-900/60">{t('tch.sub')}</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="card hover:translate-y-0"><div className="text-xs uppercase tracking-widest text-navy-900/50">{t('tch.students')}</div><div className="font-display text-3xl font-bold">{students.length}</div></div>
        <div className="card hover:translate-y-0"><div className="text-xs uppercase tracking-widest text-navy-900/50">{t('tch.avg')}</div><div className="font-display text-3xl font-bold text-violetx">{avg}</div></div>
      </div>
      <div className="card mt-6 overflow-x-auto hover:translate-y-0">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead className="text-xs uppercase text-navy-900/50"><tr><th className="pb-3">{t('tbl.name')}</th><th className="pb-3">{t('tbl.group')}</th><th className="pb-3">XP</th><th className="w-40 pb-3">{t('tbl.progress')}</th></tr></thead>
          <tbody>{students.map(s => (
            <tr key={s.id} className="border-t border-navy-900/10"><td className="py-3 font-medium">{s.name}</td><td>{s.group}</td><td>{s.xp}</td><td><ProgressBar value={Math.round(s.briefed.length / MODULES.length * 100)} /></td></tr>))}</tbody>
        </table>
        {students.length === 0 && <p className="py-4 text-navy-900/50">{t('lb.empty')}</p>}
      </div>
      <button className="btn-ghost mt-6 text-red-600" onClick={clearAll} disabled={!students.length}>{t('tch.clear')}</button>
    </PageShell>)
}
