import { useGame } from '../GameContext'
import { CASES } from '../../data/cases'
import { formatTime } from '../../domain/utils'
import type { Difficulty } from '../../domain/types'

const DIFFICULTIES: { key: Difficulty; label: string; className: string }[] = [
  { key: 'easy', label: 'EASY', className: 'easy' },
  { key: 'medium', label: 'MEDIUM', className: 'medium' },
  { key: 'hard', label: 'HARD', className: 'hard' },
  { key: 'extreme', label: 'EXTREME', className: 'extreme' },
]

export function DifficultyScreen() {
  const { dispatch, navigate, getBestTime } = useGame()

  const handleSelect = (difficulty: Difficulty) => {
    dispatch({ type: 'START_CASE', difficulty })
  }

  return (
    <>
      <div className="top-actions">
        <div className="logo">
          <img className="logo-mark" src="/assets/OfficialLogo_AlgoPay.svg" alt="AlgoPay" />
        </div>
        <div className="nav-links">
          <button className="nav-link" onClick={() => navigate('nameGate')}>Home</button>
          <button className="nav-link" onClick={() => navigate('leaderboard')}>Leaderboard</button>
        </div>
      </div>
      <div className="difficulty-select">
        <h2>SELECT DIFFICULTY</h2>
        <div className="diff-grid">
          {DIFFICULTIES.map(({ key, label, className }) => {
            const caseData = CASES[key]
            const best = getBestTime(key)
            return (
              <div key={key} className={`diff-card ${className}`} onClick={() => handleSelect(key)}>
                <img className="diff-card-avatar" src={`/assets/avatar-${key}.png`} alt="Applicant" />
                <span className="diff-badge">{label}</span>
                <h3>{caseData.applicant.name}</h3>
                <p className="case-desc">{caseData.difficultyBlurb}</p>
                <div className="best-time">Best: {best !== null ? formatTime(best) : '—'}</div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
