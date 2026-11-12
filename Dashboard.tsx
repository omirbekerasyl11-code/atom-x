import { useSession } from '../store/session'
import { MODULES } from '../data/modules'
import { ModuleCard, PageShell, ProgressBar, XPDisplay } from '../components/ui'

export default function Dashboard() {
  const { t, student, progress } = useSession()
  return (
    <PageShell>
      <h1 className="font-display text-3xl font-bold">{t('dash.title')}</h1>
      <p className="mt-1 text-navy-900/60">{t('dash.hello')}, {student?.name} · {student?.group}</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <XPDisplay />
        <div className="card md:col-span-2 hover:translate-y-0"><ProgressBar value={progress} label={t('dash.progress')} /></div>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{MODULES.map((m, i) => <ModuleCard key={m.id} m={m} index={i} />)}</div>
    </PageShell>)
}
