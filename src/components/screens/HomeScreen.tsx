import { useGame } from '../GameContext'

export function HomeScreen() {
  const { state, navigate } = useGame()
  const welcomeName = state.playerName.trim() || 'Agent'

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
      <div className="home home--with-welcome">
        <p className="home-welcome">Hi, {welcomeName}</p>
        <h1>LOAN INVESTIGATOR</h1>
        <p className="tagline">Catch the liar before you approve the loan.</p>
        <div className="stats">
          <div className="stat-card">
            <div className="label">CASES CLOSED</div>
            <div className="value">{state.casesClosed}</div>
          </div>
        </div>
        <button className="btn-start" onClick={() => navigate('difficulty')}>
          START INVESTIGATING
        </button>
      </div>
    </>
  )
}
