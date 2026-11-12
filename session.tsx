import { createContext, useContext, useEffect, useMemo, useState, ReactNode, useCallback } from 'react'
import { dictionary, Lang, TKey } from '../i18n/dictionary'
import { MODULES, ModuleId, XP_PER_LEVEL } from '../data/modules'

export interface Student { id: string; name: string; group: string; xp: number; briefed: ModuleId[]; joined: string }
const K = { students:'atomx.students', current:'atomx.current', lang:'atomx.lang' }
const read = <T,>(k: string, fb: T): T => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) as T : fb } catch { return fb } }
const write = (k: string, v: unknown) => { try { localStorage.setItem(k, JSON.stringify(v)) } catch { /* storage unavailable */ } }

interface Ctx {
  lang: Lang; setLang: (l: Lang) => void; t: (k: TKey) => string
  student: Student | null; students: Student[]
  register: (name: string, group: string) => void; logout: () => void
  markBriefed: (m: ModuleId) => void; resetProgress: () => void; clearAll: () => void
  level: number; progress: number
}
const SessionCtx = createContext<Ctx | null>(null)
export const useSession = () => { const c = useContext(SessionCtx); if (!c) throw new Error('SessionProvider missing'); return c }

export function SessionProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => read<Lang>(K.lang, 'en'))
  const [students, setStudents] = useState<Student[]>(() => read<Student[]>(K.students, []))
  const [currentId, setCurrentId] = useState<string | null>(() => read<string | null>(K.current, null))
  useEffect(() => { write(K.students, students) }, [students])
  useEffect(() => { write(K.current, currentId) }, [currentId])
  useEffect(() => { write(K.lang, lang); document.documentElement.lang = lang === 'kz' ? 'kk' : lang }, [lang])

  const student = students.find(s => s.id === currentId) ?? null
  const patch = useCallback((fn: (s: Student) => Student) =>
    setStudents(all => all.map(s => s.id === currentId ? fn(s) : s)), [currentId])

  const value = useMemo<Ctx>(() => ({
    lang, setLang, t: k => dictionary[k][lang], student, students,
    register: (name, group) => {
      const s: Student = { id: crypto.randomUUID(), name: name.trim(), group: group.trim(), xp: 0, briefed: [], joined: new Date().toISOString() }
      setStudents(a => [...a, s]); setCurrentId(s.id)
    },
    logout: () => setCurrentId(null),
    markBriefed: m => patch(s => s.briefed.includes(m) ? s : { ...s, briefed: [...s.briefed, m], xp: s.xp + (MODULES.find(x => x.id === m)?.xp ?? 0) }),
    resetProgress: () => patch(s => ({ ...s, xp: 0, briefed: [] })),
    clearAll: () => { setStudents([]); setCurrentId(null) },
    level: student ? Math.floor(student.xp / XP_PER_LEVEL) + 1 : 1,
    progress: student ? Math.round(student.briefed.length / MODULES.length * 100) : 0,
  }), [lang, student, students, patch])
  return <SessionCtx.Provider value={value}>{children}</SessionCtx.Provider>
}
