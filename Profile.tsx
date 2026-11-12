import { useSession } from '../store/session'
import { MODULES } from '../data/modules'
import { PageShell, ProgressBar, XPDisplay } from '../components/ui'

export default function Profile() {
  const { t, student, progress, resetProgress, lang } = useSession()
  if (!student) return null
  const initials = student.name.split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase()
  return (
    <PageShell>
      <h1 className="font-display text-3xl font-bold">{t('prof.title')}</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="card md:col-span-2 hover:translate-y-0">
          <div className="flex items-center gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-cyanx to-violetx font-display text-xl font-bold text-white">{initials}</div>
            <div><div className="font-display text-xl font-bold">{student.name}</div><div className="text-sm text-navy-900/60">{t('reg.group')}: {student.group}</div>
              <div className="text-xs text-navy-900/40">{t('prof.since')}: {new Date(student.joined).toLocaleDateString(lang === 'kz' ? 'kk-KZ' : lang === 'ru' ? 'ru-RU' : 'en-GB')}</div></div>
          </div>
          <div className="mt-6"><ProgressBar value={progress} label={`${t('prof.missions')}: ${student.briefed.length}/${MODULES.length}`} /></div>
          <button className="btn-ghost mt-6" onClick={resetProgress}>{t('prof.reset')}</button>
        </div>
        <XPDisplay />
      </div>
    </PageShell>)
}
