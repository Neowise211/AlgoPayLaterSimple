import { useState, useCallback } from 'react'
import type { Difficulty, LeaderboardEntry, Leaderboards } from '../domain/types'
import { STORAGE_KEYS, LEADERBOARD_MAX_ENTRIES } from '../domain/constants'

function loadLeaderboards(): Leaderboards {
  const empty: Leaderboards = { easy: [], medium: [], hard: [], extreme: [] }
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LEADERBOARD)
    if (!raw) return empty
    const parsed = JSON.parse(raw) as Record<string, unknown>
    const result = { ...empty }
    for (const key of Object.keys(result) as Difficulty[]) {
      const entries = parsed[key]
      if (!Array.isArray(entries)) continue
      result[key] = entries
        .map((e: Record<string, unknown>) => ({
          name: typeof e.name === 'string' ? e.name : 'Player',
          score: Number(e.score) || 0,
          casesClosed: Number(e.casesClosed) || 0,
          time: Number(e.time) || 0,
        }))
        .slice(0, LEADERBOARD_MAX_ENTRIES)
    }
    return result
  } catch {
    return empty
  }
}

function saveLeaderboards(leaderboards: Leaderboards): void {
  localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(leaderboards))
}

export function useLeaderboard() {
  const [leaderboards, setLeaderboards] = useState<Leaderboards>(loadLeaderboards)

  const addEntry = useCallback(
    (difficulty: Difficulty, entry: LeaderboardEntry) => {
      setLeaderboards((prev) => {
        const list = [...(prev[difficulty] ?? []), entry]
        list.sort((a, b) => (b.score !== a.score ? b.score - a.score : a.time - b.time))
        const updated = { ...prev, [difficulty]: list.slice(0, LEADERBOARD_MAX_ENTRIES) }
        saveLeaderboards(updated)
        return updated
      })
    },
    [],
  )

  const getBestTime = useCallback(
    (difficulty: Difficulty): number | null => {
      const board = leaderboards[difficulty]
      if (!board || board.length === 0) return null
      return board[0]?.time ?? null
    },
    [leaderboards],
  )

  return { leaderboards, addEntry, getBestTime } as const
}
