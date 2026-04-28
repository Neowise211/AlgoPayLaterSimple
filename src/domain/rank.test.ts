import { describe, it, expect } from 'vitest'
import { getRank } from './rank'

describe('getRank', () => {
  it('returns Trainee Analyst for low scores', () => {
    expect(getRank(0)).toBe('Trainee Analyst')
    expect(getRank(49)).toBe('Trainee Analyst')
  })

  it('returns Junior Investigator at 50', () => {
    expect(getRank(50)).toBe('Junior Investigator')
    expect(getRank(119)).toBe('Junior Investigator')
  })

  it('returns Field Agent at 120', () => {
    expect(getRank(120)).toBe('Field Agent')
    expect(getRank(199)).toBe('Field Agent')
  })

  it('returns Senior Investigator at 200', () => {
    expect(getRank(200)).toBe('Senior Investigator')
    expect(getRank(299)).toBe('Senior Investigator')
  })

  it('returns Chief Risk Officer at 300+', () => {
    expect(getRank(300)).toBe('Chief Risk Officer')
    expect(getRank(1000)).toBe('Chief Risk Officer')
  })
})
