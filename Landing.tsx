import { Link } from 'react-router-dom'
import { useSession } from '../store/session'
import { AtomMark } from '../components/ui'

export default function Landing() {
  const { t, student } = useSession()
  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 text-white">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-violetx/30 blur-3xl animate-glow" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-cyanx/25 blur-3xl animate-glow" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 md:grid-cols-2 md:py-32">
          <div className="animate-fadeUp">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyanx"><AtomMark size={16} />{t('hero.badge')}</span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-tight sm:text-6xl">{t('hero.title')}</h1>
            <p className="mt-5 max-w-xl text-lg text-white/70">{t('hero.sub')}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to={student ? '/dashboard' : '/register'} className="btn-primary">{t('hero.cta')}</Link>
              <Link to="/dashboard" className="btn-dark">{t('hero.cta2')}</Link>
            </div>
          </div>
          <div className="relative mx-auto grid h-72 w-72 place-items-center sm:h-96 sm:w-96 animate-float" aria-hidden>
            <div className="absolute h-4 w-4 rounded-full bg-cyanx shadow-[0_0_40px_10px_#22D3EE]" />
            {[0, 60, 120].map((r, i) => (
              <div key={r} className="absolute h-full w-full" style={{ transform: `rotate(${r}deg)` }}>
                <div className="absolute inset-x-0 top-1/2 h-1/3 -translate-y-1/2 rounded-[50%] border border-violetx/60" />
                <div className="absolute inset-0 animate-orbit" style={{ animationDuration: `${8 + i * 4}s` }}><span className="absolute left-1/2 top-[33%] h-2.5 w-2.5 rounded-full bg-cyanx shadow-[0_0_12px_#22D3EE]" /></div>
              </div>))}
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-14 sm:px-6 md:grid-cols-3">
        {(['feat.1', 'feat.2', 'feat.3'] as const).map((k, i) => (
          <div key={k} className="card animate-fadeUp text-center" style={{ animationDelay: `${i * 100}ms` }}>
            <div className="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-cyanx to-violetx font-bold text-white">{i + 1}</div>
            <div className="font-display font-bold">{t(k)}</div>
          </div>))}
      </section>
    </>)
}
