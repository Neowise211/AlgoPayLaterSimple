/**
 * Named scoring constants. No magic numbers in game logic.
 *
 * Values match the original implementation:
 * - Strong post = 15 pts, moderate = 8, neutral = 0, red-herring = -8
 * - Correct reason classification = +3
 * - Correct field targeting = +5
 * - Correct verdict = +30, wrong verdict = -10
 * - Each missed strong clue = -5
 */
export const SCORING = {
  /** Points for correctly classifying the reason. */
  CORRECT_REASON_BONUS: 3,
  /** Points for correctly identifying the field. */
  CORRECT_FIELD_BONUS: 5,
  /** Points awarded for a correct verdict. */
  CORRECT_VERDICT: 30,
  /** Points deducted for a wrong verdict. */
  WRONG_VERDICT: -10,
  /** Penalty per missed strong clue. */
  MISSED_STRONG_CLUE: -5,
  /** Noise ratio thresholds → multipliers. */
  NOISE_THRESHOLDS: [
    { maxRatio: 0.5, multiplier: 1.0 },
    { maxRatio: 0.7, multiplier: 0.75 },
    { maxRatio: 0.9, multiplier: 0.5 },
  ] as const,
  /** Multiplier when noise ratio exceeds all thresholds. */
  NOISE_FLOOR_MULTIPLIER: 0.25,
} as const

/** Rank thresholds (cumulative score → rank title). Ordered highest first. */
export const RANK_THRESHOLDS = [
  { minScore: 300, rank: 'Chief Risk Officer' },
  { minScore: 200, rank: 'Senior Investigator' },
  { minScore: 120, rank: 'Field Agent' },
  { minScore: 50, rank: 'Junior Investigator' },
] as const

export const DEFAULT_RANK = 'Trainee Analyst' as const

/** All platforms in investigation order. */
export const PLATFORMS = ['facebook', 'instagram', 'linkedin', 'twitter'] as const

/** Evidence field options shown in the pin panel. */
export const EVIDENCE_FIELDS = [
  'age',
  'address',
  'employer',
  'position',
  'tenure',
  'income',
  'purpose',
  'dependents',
] as const

/** Evidence reason options shown in the pin panel. */
export const EVIDENCE_REASONS = [
  { value: 'contradiction', label: 'No Match / Contradiction' },
  { value: 'misinformation', label: 'Misinformation' },
  { value: 'other', label: 'Other Red Flag' },
] as const

/** LocalStorage keys. */
export const STORAGE_KEYS = {
  LEADERBOARD: 'algopay_lb',
  PLAYER: 'algopay_player',
  ONBOARDED: 'algopay_onboarded',
} as const

/** Maximum entries per leaderboard difficulty tab. */
export const LEADERBOARD_MAX_ENTRIES = 10

/** Maximum player name length. */
export const PLAYER_NAME_MAX_LENGTH = 20
