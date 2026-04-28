/** Difficulty levels, used as keys into the cases record. */
export type Difficulty = 'easy' | 'medium' | 'hard' | 'extreme'

/** Social-media platforms in the investigation. */
export type Platform = 'facebook' | 'instagram' | 'linkedin' | 'twitter'

/** Evidence classification strength. */
export type Classification = 'strong' | 'moderate' | 'weak' | 'neutral' | 'red-herring'

/** Why the player flagged a post. */
export type EvidenceReason = 'contradiction' | 'misinformation' | 'other'

/** Which applicant field the evidence targets. */
export type EvidenceField =
  | 'age'
  | 'address'
  | 'employer'
  | 'position'
  | 'tenure'
  | 'income'
  | 'purpose'
  | 'dependents'

/** A social-media post in a case. */
export interface Post {
  readonly id: string
  readonly platform: Platform
  readonly author: string
  readonly handle: string
  readonly meta: string
  readonly content: string
  readonly image: string | null
  readonly previewDescription?: string
  readonly likes: number
  readonly comments: number
  readonly classification: Classification
  readonly correctField: EvidenceField | null
  readonly correctReason: EvidenceReason | null
  readonly points: number
}

/** Applicant profile as declared on the loan application. */
export interface Applicant {
  readonly name: string
  readonly age: number
  readonly civilStatus: string
  readonly location: string
  readonly address: string
  readonly employer: string
  readonly position: string
  readonly tenure: string
  readonly income: number
  readonly loanAmount: number
  readonly loanPurpose: string
  readonly dependents: number
}

/** Consequence follow-up for a correct or wrong verdict. */
export interface FollowUpBranch {
  readonly subjectLine: string
  readonly body: string
  readonly lesson: string
  readonly advisorQuote: string
  readonly impactReport: {
    readonly defaultLoss: number
    readonly trustPoints: number
    readonly lessonShort: string
  }
  readonly primaryCluePostId: string
}

/** Posts grouped by platform. */
export interface PostsByPlatform {
  readonly facebook: readonly Post[]
  readonly instagram: readonly Post[]
  readonly linkedin: readonly Post[]
  readonly twitter: readonly Post[]
}

/** A complete investigation case. */
export interface Case {
  readonly id: Difficulty
  readonly difficulty: string
  readonly difficultyBlurb: string
  readonly applicant: Applicant
  readonly correctVerdict: Verdict
  readonly briefingQuote: string
  readonly posts: PostsByPlatform
  readonly followUp: {
    readonly correct: FollowUpBranch
    readonly wrong: FollowUpBranch
  }
}

/** Player's verdict on a case. */
export type Verdict = 'approve' | 'reject'

/** A piece of evidence the player has pinned. */
export interface PinnedEvidence {
  readonly postId: string
  readonly reason: EvidenceReason
  readonly field: EvidenceField
  readonly note: string
}

/** Breakdown of the final score. */
export interface ScoreBreakdown {
  readonly evidencePoints: number
  readonly classificationBonus: number
  readonly fieldBonus: number
  readonly noiseMultiplier: number
  readonly adjustedEvidence: number
  readonly missedCluesPenalty: number
  readonly verdictPoints: number
  readonly total: number
}

/** Leaderboard entry. */
export interface LeaderboardEntry {
  readonly name: string
  readonly score: number
  readonly casesClosed: number
  readonly time: number
}

/** Leaderboard data keyed by difficulty. */
export type Leaderboards = Record<Difficulty, LeaderboardEntry[]>

/** Player profile persisted to localStorage. */
export interface PlayerProfile {
  readonly name: string
  readonly casesClosed: number
  readonly totalScore: number
}

/** Investigator rank title. */
export type Rank =
  | 'Trainee Analyst'
  | 'Junior Investigator'
  | 'Field Agent'
  | 'Senior Investigator'
  | 'Chief Risk Officer'

/**
 * All game screens. Each maps 1:1 to a screen component.
 */
export type ScreenName =
  | 'nameGate'
  | 'onboarding'
  | 'home'
  | 'difficulty'
  | 'briefing'
  | 'investigation'
  | 'verdict'
  | 'score'
  | 'leaderboard'
