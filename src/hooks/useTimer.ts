import { useEffect, useRef } from 'react'
import type { GameAction } from './useGameState'

export function useTimer(isRunning: boolean, dispatch: React.Dispatch<GameAction>) {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        dispatch({ type: 'TICK_TIMER' })
      }, 1000)
    }
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isRunning, dispatch])
}
