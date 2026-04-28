import { createContext, useContext } from 'react'
import type { GameState, GameAction } from '../hooks/useGameState'
import type { ScreenName, Difficulty, LeaderboardEntry } from '../domain/types'
import type { Leaderboards } from '../domain/types'

export interface GameContextValue {
  state: GameState
  dispatch: React.Dispatch<GameAction>
  navigate: (screen: ScreenName) => void
  leaderboards: Leaderboards
  addLeaderboardEntry: (difficulty: Difficulty, entry: LeaderboardEntry) => void
  getBestTime: (difficulty: Difficulty) => number | null
  saveProfile: (name: string, casesClosed: number, totalScore: number) => void
  startBgm: () => void
}

export const GameContext = createContext<GameContextValue | null>(null)

export function useGame(): GameContextValue {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used within GameContext.Provider')
  return ctx
}
