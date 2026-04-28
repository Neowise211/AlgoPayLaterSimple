import { useGame } from '../GameContext'
import { formatTime } from '../../domain/utils'
import type { Difficulty } from '../../domain/types'

const TABS: { key: Difficulty; label: string }[] = [
  { key: 'easy', label: 'Easy' },
  { key: 'medium', label: 'Medium' },
  { key: 'hard', label: 'Hard' },
  { key: 'extreme', label: 'Extreme' },
]

function rankLabel(index: number): string {
  if (index === 0) return '🥇'
  if (index === 1) return '🥈'
  if (index === 2) return '🥉'
  return `#${index + 1}`
}

export function LeaderboardScreen() {
  const { state, dispatch, navigate, leaderboards } = useGame()
  const activeDiff = state.currentLBTab
  const entries = (leaderboards[activeDiff] ?? []).slice(0, 10)

  return (
    <div className="leaderboard">
      <h2>🏆 LEADERBOARD</h2>
      <div className="lb-tabs">
        {TABS.map(({ key, label }) => (
          <button key={key} className={`lb-tab ${activeDiff === key ? 'active' : ''}`} onClick={() => dispatch({ type: 'SET_LB_TAB', tab: key })}>{label}</button>
        ))}
      </div>
      <div className="lb-list">
        {entries.length === 0 ? (
          <div className="lb-empty">No scores yet. Be the first!</div>
        ) : (
          <>
            <div className="lb-row header"><span className="lb-rank">RANK</span><span>NAME</span><span>SCORE</span><span>CASES CLOSED</span><span>TIME</span></div>
            {entries.map((entry, i) => (
              <div key={i} className="lb-row">
                <span className="lb-rank">{rankLabel(i)}</span>
                <span>{entry.name}</span>
                <span className="lb-score">{entry.score} pts</span>
                <span>{entry.casesClosed}</span>
                <span>{formatTime(entry.time)}</span>
              </div>
            ))}
          </>
        )}
      </div>
      <div className="score-actions">
        <button className="btn-primary" onClick={() => navigate('nameGate')}>BACK TO HOME</button>
      </div>
    </div>
  )
}
