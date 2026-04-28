import { describe, it, expect } from 'vitest'
import {
  calculateEvidencePoints,
  calculateClassificationBonus,
  calculateFieldBonus,
  calculateNoiseRatio,
  getNoiseMultiplier,
  calculateMissedClues,
  getVerdictPoints,
  calculateFinalScore,
  findPostById,
  getAllPosts,
} from './scoring'
import type { Case, PinnedEvidence, Post } from './types'

function makePost(overrides: Partial<Post> = {}): Post {
  return {
    id: 'p1',
    platform: 'facebook',
    author: 'Test User',
    handle: 'test',
    meta: 'March 1',
    content: 'Test post',
    image: null,
    likes: 10,
    comments: 2,
    classification: 'strong',
    correctField: 'age',
    correctReason: 'contradiction',
    points: 15,
    ...overrides,
  }
}

function makeCase(posts: Post[] = [], correctVerdict: 'approve' | 'reject' = 'reject'): Case {
  const fb = posts.filter((p) => p.platform === 'facebook')
  const ig = posts.filter((p) => p.platform === 'instagram')
  const li = posts.filter((p) => p.platform === 'linkedin')
  const tw = posts.filter((p) => p.platform === 'twitter')

  return {
    id: 'easy',
    difficulty: 'Easy',
    difficultyBlurb: 'Test case',
    applicant: {
      name: 'Test',
      age: 21,
      civilStatus: 'Single',
      location: 'QC',
      address: 'QC',
      employer: 'Test Corp',
      position: 'Tester',
      tenure: '1 year',
      income: 25000,
      loanAmount: 50000,
      loanPurpose: 'Testing',
      dependents: 0,
    },
    correctVerdict,
    briefingQuote: 'Test quote',
    posts: { facebook: fb, instagram: ig, linkedin: li, twitter: tw },
    followUp: {
      correct: {
        subjectLine: 'Good',
        body: 'Well done',
        lesson: 'Lesson',
        advisorQuote: 'Quote',
        impactReport: { defaultLoss: 0, trustPoints: 5, lessonShort: 'Short' },
        primaryCluePostId: 'p1',
      },
      wrong: {
        subjectLine: 'Bad',
        body: 'Bad call',
        lesson: 'Lesson',
        advisorQuote: 'Quote',
        impactReport: { defaultLoss: 50000, trustPoints: -5, lessonShort: 'Short' },
        primaryCluePostId: 'p1',
      },
    },
  }
}

function makeEvidence(overrides: Partial<PinnedEvidence> = {}): PinnedEvidence {
  return {
    postId: 'p1',
    reason: 'contradiction',
    field: 'age',
    note: '',
    ...overrides,
  }
}

describe('findPostById', () => {
  it('finds a post by ID across platforms', () => {
    const post = makePost({ id: 'ig1', platform: 'instagram' })
    const c = makeCase([post])
    expect(findPostById(c, 'ig1')).toBe(post)
  })

  it('returns null for non-existent ID', () => {
    const c = makeCase([makePost()])
    expect(findPostById(c, 'nonexistent')).toBeNull()
  })
})

describe('getAllPosts', () => {
  it('flattens all posts from all platforms', () => {
    const posts = [
      makePost({ id: 'fb1', platform: 'facebook' }),
      makePost({ id: 'ig1', platform: 'instagram' }),
      makePost({ id: 'li1', platform: 'linkedin' }),
    ]
    const c = makeCase(posts)
    expect(getAllPosts(c)).toHaveLength(3)
  })
})

describe('calculateEvidencePoints', () => {
  it('sums points from pinned posts', () => {
    const posts = [
      makePost({ id: 'p1', points: 15 }),
      makePost({ id: 'p2', points: 8 }),
    ]
    const c = makeCase(posts)
    const evidence = [makeEvidence({ postId: 'p1' }), makeEvidence({ postId: 'p2' })]
    expect(calculateEvidencePoints(evidence, c)).toBe(23)
  })

  it('includes negative points from red herrings', () => {
    const posts = [makePost({ id: 'p1', points: -8, classification: 'red-herring' })]
    const c = makeCase(posts)
    expect(calculateEvidencePoints([makeEvidence()], c)).toBe(-8)
  })

  it('returns 0 for empty evidence', () => {
    const c = makeCase([makePost()])
    expect(calculateEvidencePoints([], c)).toBe(0)
  })
})

describe('calculateClassificationBonus', () => {
  it('awards bonus for correct reason', () => {
    const posts = [makePost({ id: 'p1', correctReason: 'contradiction' })]
    const c = makeCase(posts)
    const evidence = [makeEvidence({ reason: 'contradiction' })]
    expect(calculateClassificationBonus(evidence, c)).toBe(3)
  })

  it('awards 0 for wrong reason', () => {
    const posts = [makePost({ id: 'p1', correctReason: 'contradiction' })]
    const c = makeCase(posts)
    const evidence = [makeEvidence({ reason: 'misinformation' })]
    expect(calculateClassificationBonus(evidence, c)).toBe(0)
  })
})

describe('calculateFieldBonus', () => {
  it('awards bonus for correct field', () => {
    const posts = [makePost({ id: 'p1', correctField: 'age' })]
    const c = makeCase(posts)
    const evidence = [makeEvidence({ field: 'age' })]
    expect(calculateFieldBonus(evidence, c)).toBe(5)
  })

  it('awards 0 for wrong field', () => {
    const posts = [makePost({ id: 'p1', correctField: 'age' })]
    const c = makeCase(posts)
    const evidence = [makeEvidence({ field: 'income' })]
    expect(calculateFieldBonus(evidence, c)).toBe(0)
  })
})

describe('calculateNoiseRatio', () => {
  it('returns 0 for empty evidence', () => {
    const c = makeCase([])
    expect(calculateNoiseRatio([], c)).toBe(0)
  })

  it('returns correct ratio of junk to total', () => {
    const posts = [
      makePost({ id: 'p1', classification: 'strong' }),
      makePost({ id: 'p2', classification: 'red-herring' }),
    ]
    const c = makeCase(posts)
    const evidence = [makeEvidence({ postId: 'p1' }), makeEvidence({ postId: 'p2' })]
    expect(calculateNoiseRatio(evidence, c)).toBe(0.5)
  })

  it('counts neutral posts as junk', () => {
    const posts = [makePost({ id: 'p1', classification: 'neutral' })]
    const c = makeCase(posts)
    expect(calculateNoiseRatio([makeEvidence()], c)).toBe(1)
  })
})

describe('getNoiseMultiplier', () => {
  it('returns 1.0 for clean evidence (ratio ≤ 0.5)', () => {
    expect(getNoiseMultiplier(0)).toBe(1.0)
    expect(getNoiseMultiplier(0.5)).toBe(1.0)
  })

  it('returns 0.75 for moderate noise', () => {
    expect(getNoiseMultiplier(0.6)).toBe(0.75)
    expect(getNoiseMultiplier(0.7)).toBe(0.75)
  })

  it('returns 0.5 for high noise', () => {
    expect(getNoiseMultiplier(0.8)).toBe(0.5)
    expect(getNoiseMultiplier(0.9)).toBe(0.5)
  })

  it('returns 0.25 for extreme noise', () => {
    expect(getNoiseMultiplier(0.95)).toBe(0.25)
    expect(getNoiseMultiplier(1.0)).toBe(0.25)
  })
})

describe('calculateMissedClues', () => {
  it('penalizes missed strong clues', () => {
    const posts = [
      makePost({ id: 'p1', classification: 'strong' }),
      makePost({ id: 'p2', classification: 'strong' }),
    ]
    expect(calculateMissedClues(posts, [])).toBe(-10)
  })

  it('does not penalize for pinned strong clues', () => {
    const posts = [makePost({ id: 'p1', classification: 'strong' })]
    expect(calculateMissedClues(posts, [makeEvidence({ postId: 'p1' })])).toBe(0)
  })

  it('ignores non-strong posts', () => {
    const posts = [makePost({ id: 'p1', classification: 'moderate' })]
    expect(calculateMissedClues(posts, [])).toBe(0)
  })
})

describe('getVerdictPoints', () => {
  it('awards 30 for correct verdict', () => {
    expect(getVerdictPoints('reject', 'reject')).toBe(30)
    expect(getVerdictPoints('approve', 'approve')).toBe(30)
  })

  it('deducts 10 for wrong verdict', () => {
    expect(getVerdictPoints('approve', 'reject')).toBe(-10)
    expect(getVerdictPoints('reject', 'approve')).toBe(-10)
  })
})

describe('calculateFinalScore', () => {
  it('produces a complete breakdown', () => {
    const posts = [
      makePost({ id: 'p1', points: 15, correctField: 'age', correctReason: 'contradiction' }),
    ]
    const c = makeCase(posts)
    const evidence = [makeEvidence({ postId: 'p1', field: 'age', reason: 'contradiction' })]
    const result = calculateFinalScore(c, evidence, 'reject')

    expect(result.evidencePoints).toBe(15)
    expect(result.classificationBonus).toBe(3)
    expect(result.fieldBonus).toBe(5)
    expect(result.noiseMultiplier).toBe(1.0)
    expect(result.verdictPoints).toBe(30)
    expect(result.missedCluesPenalty).toBe(0)
    expect(result.total).toBe(53)
  })

  it('floors total at 0', () => {
    const posts = [
      makePost({
        id: 'p1',
        points: -8,
        classification: 'red-herring',
        correctField: null,
        correctReason: null,
      }),
    ]
    const c = makeCase(posts)
    const evidence = [makeEvidence({ postId: 'p1', field: 'age', reason: 'other' })]
    const result = calculateFinalScore(c, evidence, 'approve')

    expect(result.total).toBe(0)
  })
})
