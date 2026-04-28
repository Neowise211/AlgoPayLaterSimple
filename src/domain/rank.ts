import type { Rank } from './types'
import { RANK_THRESHOLDS, DEFAULT_RANK } from './constants'

/** Determine the player's rank based on cumulative score. */
export function getRank(totalScore: number): Rank {
  for (const threshold of RANK_THRESHOLDS) {
    if (totalScore >= threshold.minScore) {
      return threshold.rank as Rank
    }
  }
  return DEFAULT_RANK
}
