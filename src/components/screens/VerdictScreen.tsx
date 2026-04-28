import { useGame } from '../GameContext'
import { calculateFinalScore } from '../../domain/scoring'

export function VerdictScreen() {
  const { state, dispatch, saveProfile, addLeaderboardEntry } = useGame()
  const applicantName = state.currentCase?.applicant.name ?? 'Applicant'

  const handleSubmit = () => {
    if (!state.selectedVerdict || !state.currentCase) return
    if (!confirm('Submit your verdict? This cannot be undone.')) return

    const breakdown = calculateFinalScore(state.currentCase, state.pinnedEvidence, state.selectedVerdict)
    const isCorrect = state.selectedVerdict === state.currentCase.correctVerdict

    const newScore = state.sessionScore + breakdown.total
    const newCases = state.casesClosed + 1
    saveProfile(state.playerName, newCases, newScore)
    addLeaderboardEntry(state.currentCase.id, {
      name: state.playerName || 'Player',
      score: breakdown.total,
      casesClosed: newCases,
      time: state.elapsedSeconds,
    })

    dispatch({ type: 'RECORD_SCORE', breakdown, isCorrect })
  }

  return (
    <div className="verdict">
      <h2>YOUR VERDICT</h2>
      <p className="verdict-intro">Based on your investigation, what is your recommendation for {applicantName}?</p>
      <div className="verdict-options">
        <div className={`verdict-option approve ${state.selectedVerdict === 'approve' ? 'selected' : ''}`} onClick={() => dispatch({ type: 'SELECT_VERDICT', verdict: 'approve' })}>
          <div className="verdict-icon">✓</div><div className="verdict-title">APPROVE</div>
          <div className="verdict-desc">Application is clean. Proceed with disbursement.</div>
        </div>
        <div className={`verdict-option reject ${state.selectedVerdict === 'reject' ? 'selected' : ''}`} onClick={() => dispatch({ type: 'SELECT_VERDICT', verdict: 'reject' })}>
          <div className="verdict-icon">✕</div><div className="verdict-title">REJECT</div>
          <div className="verdict-desc">Material misrepresentation found. Deny application.</div>
        </div>
      </div>
      <button className="btn-primary" disabled={!state.selectedVerdict} onClick={handleSubmit}>SUBMIT VERDICT</button>
    </div>
  )
}
