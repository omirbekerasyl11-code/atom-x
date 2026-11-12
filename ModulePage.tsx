import { Link } from 'react-router-dom'
import { useSession } from '../store/session'
import { MODULES, ModuleId } from '../data/modules'
import { PageShell } from '../components/ui'

export default function ModulePage({ id }: { id: ModuleId }) {
  const { t, student, markBriefed } = useSession()
  const m = MODULES.find(x => x.id === id)!
  const done = !!student?.briefed.includes(id)
  return (
    <PageShell>
      <Link to="/dashboard" className="text-sm font-medium text-violetx hover:underline">← {t('intro.back')}</Link>
      <div className="relative mt-4 overflow-hidden rounded-3xl bg-navy-950 p-8 text-white sm:p-14">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-violetx/30 blur-3xl animate-glow" />
        <div className="relative">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-white/10 font-display text-3xl text-cyanx animate-float">{m.icon}</div>
          <div className="mt-6 text-xs font-semibold uppercase tracking-widest text-cyanx">{t('intro.label')}</div>
          <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">{t(`mod.${id}.name` as never)}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/70">{t(`mod.${id}.desc` as never)}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {(['intro.o1', 'intro.o2', 'intro.o3'] as const).map(k => <div key={k} className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">{t(k)}</div>)}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button className="btn-primary" disabled={done} onClick={() => markBriefed(id)}>{done ? `✓ ${t('intro.done')}` : t('intro.brief')}</button>
            <span className="text-sm text-white/60">{t('intro.reward')}: <b className="text-cyanx">+{m.xp} XP</b></span>
          </div>
          <p className="mt-6 text-sm text-white/50">{t('intro.soon')}</p>
        </div>
      </div>
    </PageShell>)
}
