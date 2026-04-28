import { useCallback } from 'react'
import type { PlayerProfile } from '../domain/types'
import { STORAGE_KEYS } from '../domain/constants'

export function loadPlayerProfile(): PlayerProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PLAYER)
    if (!raw) return { name: '', casesClosed: 0, totalScore: 0 }
    const p = JSON.parse(raw) as Record<string, unknown>
    return {
      name: typeof p.name === 'string' ? p.name : '',
      casesClosed: Number(p.casesClosed) || 0,
      totalScore: Number(p.totalScore) || 0,
    }
  } catch {
    return { name: '', casesClosed: 0, totalScore: 0 }
  }
}

export function usePlayerProfile() {
  const saveProfile = useCallback((name: string, casesClosed: number, totalScore: number) => {
    localStorage.setItem(
      STORAGE_KEYS.PLAYER,
      JSON.stringify({ name, casesClosed, totalScore }),
    )
  }, [])

  return { loadPlayerProfile, saveProfile } as const
}
