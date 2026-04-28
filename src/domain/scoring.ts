import type { Case, PinnedEvidence, Post, ScoreBreakdown, Verdict } from './types'
import { PLATFORMS, SCORING } from './constants'

/** Find a post by ID across all platforms in a case. */
export function findPostById(caseData: Case, postId: string): Post | null {
  for (const platform of PLATFORMS) {
    const posts = caseData.posts[platform]
    const match = posts.find((post) => post.id === postId)
    if (match) return match
  }
  return null
}

/** Sum raw evidence points from pinned posts. */
export function calculateEvidencePoints(
  pinnedEvidence: readonly PinnedEvidence[],
  caseData: Case,
): number {
  return pinnedEvidence.reduce((total, evidence) => {
    const post = findPostById(caseData, evidence.postId)
    if (!post) return total
    return total + post.points
  }, 0)
}

/** Bonus for correctly classifying the reason (contradiction, misinformation, other). */
export function calculateClassificationBonus(
  pinnedEvidence: readonly PinnedEvidence[],
  caseData: Case,
): number {
  return pinnedEvidence.reduce((total, evidence) => {
    const post = findPostById(caseData, evidence.postId)
    if (!post) return total
    return total + (evidence.reason === post.correctReason ? SCORING.CORRECT_REASON_BONUS : 0)
  }, 0)
}

/** Bonus for correctly identifying which applicant field the evidence targets. */
export function calculateFieldBonus(
  pinnedEvidence: readonly PinnedEvidence[],
  caseData: Case,
): number {
  return pinnedEvidence.reduce((total, evidence) => {
    const post = findPostById(caseData, evidence.postId)
    if (!post) return total
    return total + (evidence.field === post.correctField ? SCORING.CORRECT_FIELD_BONUS : 0)
  }, 0)
}

/** Ratio of junk pins (neutral + red-herring) to total pins. */
export function calculateNoiseRatio(
  pinnedEvidence: readonly PinnedEvidence[],
  caseData: Case,
): number {
  const total = pinnedEvidence.length
  if (total === 0) return 0

  const junkPins = pinnedEvidence.reduce((count, evidence) => {
    const post = findPostById(caseData, evidence.postId)
    if (!post) return count
    return post.classification === 'red-herring' || post.classification === 'neutral'
      ? count + 1
      : count
  }, 0)

  return junkPins / total
}

/** Map noise ratio to a score multiplier. More junk = lower multiplier. */
export function getNoiseMultiplier(ratio: number): number {
  for (const threshold of SCORING.NOISE_THRESHOLDS) {
    if (ratio <= threshold.maxRatio) return threshold.multiplier
  }
  return SCORING.NOISE_FLOOR_MULTIPLIER
}

/** Penalty for strong clues that the player didn't pin. */
export function calculateMissedClues(
  allPosts: readonly Post[],
  pinnedEvidence: readonly PinnedEvidence[],
): number {
  const pinnedPostIds = new Set(pinnedEvidence.map((e) => e.postId))
  const missedCount = allPosts.filter(
    (post) => post.classification === 'strong' && !pinnedPostIds.has(post.id),
  ).length
  return missedCount === 0 ? 0 : missedCount * SCORING.MISSED_STRONG_CLUE
}

/** Points awarded (or deducted) for the verdict. */
export function getVerdictPoints(playerVerdict: Verdict, correctVerdict: Verdict): number {
  return playerVerdict === correctVerdict ? SCORING.CORRECT_VERDICT : SCORING.WRONG_VERDICT
}

/** Flatten all posts across platforms into a single array. */
export function getAllPosts(caseData: Case): Post[] {
  return PLATFORMS.flatMap((platform) => caseData.posts[platform])
}

/** Calculate the complete score breakdown for a case. */
export function calculateFinalScore(
  caseData: Case,
  pinnedEvidence: readonly PinnedEvidence[],
  playerVerdict: Verdict,
): ScoreBreakdown {
  const evidencePoints = calculateEvidencePoints(pinnedEvidence, caseData)
  const classificationBonus = calculateClassificationBonus(pinnedEvidence, caseData)
  const fieldBonus = calculateFieldBonus(pinnedEvidence, caseData)
  const noiseRatio = calculateNoiseRatio(pinnedEvidence, caseData)
  const noiseMultiplier = getNoiseMultiplier(noiseRatio)
  const adjustedEvidence = (evidencePoints + classificationBonus + fieldBonus) * noiseMultiplier

  const allPosts = getAllPosts(caseData)
  const missedCluesPenalty = calculateMissedClues(allPosts, pinnedEvidence)
  const verdictPoints = getVerdictPoints(playerVerdict, caseData.correctVerdict)
  const total = Math.max(0, adjustedEvidence + missedCluesPenalty + verdictPoints)

  return {
    evidencePoints,
    classificationBonus,
    fieldBonus,
    noiseMultiplier,
    adjustedEvidence,
    missedCluesPenalty,
    verdictPoints,
    total,
  }
}
