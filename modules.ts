export type ModuleId = 'theory'|'rutherford'|'quantum'|'photon'|'nuclear'|'final-boss'
export interface ModuleDef { id: ModuleId; icon: string; xp: number }
export const MODULES: ModuleDef[] = [
  { id:'theory', icon:'⚛', xp:20 }, { id:'rutherford', icon:'◎', xp:20 }, { id:'quantum', icon:'ψ', xp:20 },
  { id:'photon', icon:'✦', xp:20 }, { id:'nuclear', icon:'☢', xp:20 }, { id:'final-boss', icon:'♛', xp:50 } ]
export const XP_PER_LEVEL = 50
