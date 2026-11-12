import { FormEvent, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useSession } from '../store/session'
import { AtomMark, PageShell } from '../components/ui'

export default function Register() {
  const { t, register, student } = useSession()
  const nav = useNavigate()
  const [name, setName] = useState(''); const [group, setGroup] = useState(''); const [err, setErr] = useState(false)
  if (student) return <Navigate to="/dashboard" replace />
  const submit = (e: FormEvent) => { e.preventDefault(); if (!name.trim() || !group.trim()) return setErr(true); register(name, group); nav('/dashboard') }
  const input = 'w-full rounded-xl border border-navy-900/15 px-4 py-3 outline-none transition focus:border-violetx focus:ring-4 focus:ring-violetx/15'
  return (
    <PageShell>
      <form onSubmit={submit} className="card mx-auto max-w-md hover:translate-y-0">
        <AtomMark size={40} />
        <h1 className="mt-4 font-display text-2xl font-bold">{t('reg.title')}</h1>
        <p className="mt-1 text-sm text-navy-900/60">{t('reg.sub')}</p>
        <label className="mt-6 block text-sm font-medium">{t('reg.name')}<input className={`${input} mt-1.5`} value={name} onChange={e => { setName(e.target.value); setErr(false) }} autoComplete="name" /></label>
        <label className="mt-4 block text-sm font-medium">{t('reg.group')}<input className={`${input} mt-1.5`} value={group} onChange={e => { setGroup(e.target.value); setErr(false) }} /></label>
        {err && <p className="mt-3 text-sm text-red-600" role="alert">{t('reg.error')}</p>}
        <button type="submit" className="btn-primary mt-6 w-full">{t('reg.submit')}</button>
      </form>
    </PageShell>)
}
