import { useState } from 'react'
import { useGame } from '../GameContext'
import { formatTime, formatSigned, formatCurrency, escapeHtml } from '../../domain/utils'

export function ScoreScreen() {
  const { state, navigate } = useGame()
  const [showConsequence, setShowConsequence] = useState(false)
  const breakdown = state.latestBreakdown
  const isCorrect = state.latestVerdictCorrect
  const caseData = state.currentCase

  if (!breakdown || !caseData) {
    return <div className="score-screen"><h2>CASE CLOSED</h2><p className="score-subtitle">No score available.</p></div>
  }

  const applicantName = caseData.applicant.name
  const verdictPill = isCorrect ? '✓ CORRECT VERDICT' : '✕ WRONG VERDICT'
  const verdictClass = isCorrect ? 'correct' : 'wrong'
  const verdictLabel = isCorrect ? 'IDEAL' : 'WRONG'

  const followUp = isCorrect ? caseData.followUp.correct : caseData.followUp.wrong
  const impact = followUp.impactReport
  const trustText = impact.trustPoints > 0 ? `+${impact.trustPoints}` : String(impact.trustPoints)

  // Auto-show consequence after a delay
  if (!showConsequence) {
    setTimeout(() => setShowConsequence(true), 1500)
  }

  return (
    <div className="score-screen">
      <h2>CASE CLOSED</h2>
      <p className="score-subtitle">{applicantName} · {caseData.difficulty}</p>
      <div className={`verdict-result ${verdictClass}`}>{verdictPill}</div>
      <div className="score-big">{breakdown.total} PTS</div>
      <div className="score-time">⏱ {formatTime(state.elapsedSeconds)}</div>
      <div className="score-breakdown">
        <div className="score-row"><span>Evidence pinned ({state.pinnedEvidence.length})</span><span>{formatSigned(breakdown.evidencePoints)}</span></div>
        <div className="score-row"><span>Classification accuracy</span><span>{formatSigned(breakdown.classificationBonus)}</span></div>
        <div className="score-row"><span>Field targeting</span><span>{formatSigned(breakdown.fieldBonus)}</span></div>
        <div className="score-row"><span>Verdict: {verdictLabel}</span><span>{formatSigned(breakdown.verdictPoints)}</span></div>
        <div className="score-row"><span>TOTAL</span><span>{breakdown.total} pts</span></div>
      </div>
      <div className="score-actions">
        <button className="btn-secondary" onClick={() => navigate('leaderboard')}>VIEW LEADERBOARD</button>
        <button className="btn-primary" onClick={() => navigate('nameGate')}>BACK TO HOME</button>
      </div>

      {showConsequence && (
        <div className="consequence-overlay" style={{ display: 'flex' }}>
          <div className="consequence-modal">
            <div className="consequence-header">
              <div className="consequence-sender">
                <div className="consequence-av">AV</div>
                <div className="consequence-sender-meta">
                  <div className="consequence-sender-name">Ate Vivien Cruz</div>
                  <div className="consequence-sender-role">Senior Risk Officer</div>
                </div>
              </div>
              <div className="consequence-time">2 weeks later</div>
            </div>
            <div className="consequence-subject">
              <div className="label">SUBJECT</div>
              <div className="text">{escapeHtml(followUp.subjectLine)}</div>
            </div>
            <div className="consequence-body">
              <p>{followUp.body}</p>
              <div className="consequence-quote">{followUp.advisorQuote}</div>
            </div>
            <div className="consequence-impact">
              <div className="impact-label">IMPACT REPORT</div>
              <div className="impact-grid">
                <div className="impact-card"><div className="lbl">DEFAULT LOSS</div><div className="val">{formatCurrency(impact.defaultLoss)}</div></div>
                <div className="impact-card"><div className="lbl">TRUST POINTS</div><div className="val">{trustText}</div></div>
                <div className="impact-card"><div className="lbl">LESSON</div><div className="val val-lesson">{followUp.lesson}</div></div>
              </div>
            </div>
            <div className="consequence-actions">
              <button className="btn-cancel" onClick={() => setShowConsequence(false)}>Next Case</button>
              <button className="btn-save" onClick={() => setShowConsequence(false)}>I'll Do Better</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
