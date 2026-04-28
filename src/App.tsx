import { useEffect } from 'react'
import { GameContext } from './components/GameContext'
import { useGameState } from './hooks/useGameState'
import { useLeaderboard } from './hooks/useLeaderboard'
import { usePlayerProfile, loadPlayerProfile } from './hooks/usePlayerProfile'
import { useBgm } from './hooks/useBgm'
import { NameGateScreen } from './components/screens/NameGateScreen'
import { OnboardingScreen } from './components/screens/OnboardingScreen'
import { HomeScreen } from './components/screens/HomeScreen'
import { DifficultyScreen } from './components/screens/DifficultyScreen'
import { BriefingScreen } from './components/screens/BriefingScreen'
import { InvestigationScreen } from './components/screens/InvestigationScreen'
import { VerdictScreen } from './components/screens/VerdictScreen'
import { ScoreScreen } from './components/screens/ScoreScreen'
import { LeaderboardScreen } from './components/screens/LeaderboardScreen'

function ScreenRouter({ screen }: { screen: string }) {
  switch (screen) {
    case 'nameGate': return <NameGateScreen />
    case 'onboarding': return <OnboardingScreen />
    case 'home': return <HomeScreen />
    case 'difficulty': return <DifficultyScreen />
    case 'briefing': return <BriefingScreen />
    case 'investigation': return <InvestigationScreen />
    case 'verdict': return <VerdictScreen />
    case 'score': return <ScoreScreen />
    case 'leaderboard': return <LeaderboardScreen />
    default: return <NameGateScreen />
  }
}

export default function App() {
  const { state, dispatch, navigate } = useGameState()
  const { leaderboards, addEntry, getBestTime } = useLeaderboard()
  const { saveProfile } = usePlayerProfile()
  const { setAudioElement, startBgm } = useBgm()

  useEffect(() => {
    const profile = loadPlayerProfile()
    if (profile.name) {
      dispatch({ type: 'RESTORE_PROFILE', name: profile.name, casesClosed: profile.casesClosed, totalScore: profile.totalScore })
    }
  }, [dispatch])

  return (
    <GameContext.Provider value={{
      state, dispatch, navigate, leaderboards,
      addLeaderboardEntry: addEntry, getBestTime, saveProfile, startBgm,
    }}>
      <div className="screen active">
        <ScreenRouter screen={state.screen} />
      </div>
      <video
        ref={setAudioElement}
        className="bgm-video"
        playsInline
        loop
        preload="auto"
        aria-hidden="true"
      >
        <source src="/assets/bgm-loop.mp4" type="video/mp4" />
      </video>
    </GameContext.Provider>
  )
}
