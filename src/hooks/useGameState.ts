import { useReducer, useCallback } from 'react'
import type {
  Case,
  Difficulty,
  EvidenceField,
  EvidenceReason,
  PinnedEvidence,
  Platform,
  ScoreBreakdown,
  ScreenName,
  Verdict,
} from '../domain/types'
import { CASES } from '../data/cases'

export interface GameState {
  screen: ScreenName
  currentCase: Case | null
  activePlatform: Platform
  pinnedEvidence: PinnedEvidence[]
  activePin: string | null
  pinDraft: { reason: EvidenceReason | null; field: EvidenceField | null; note: string }
  selectedVerdict: Verdict | null
  startTime: number | null
  elapsedSeconds: number
  playerName: string
  sessionScore: number
  casesClosed: number
  currentLBTab: Difficulty
  latestBreakdown: ScoreBreakdown | null
  latestVerdictCorrect: boolean | null
}

export type GameAction =
  | { type: 'SET_SCREEN'; screen: ScreenName }
  | { type: 'START_CASE'; difficulty: Difficulty }
  | { type: 'START_INVESTIGATION' }
  | { type: 'SWITCH_PLATFORM'; platform: Platform }
  | { type: 'OPEN_PIN'; postId: string }
  | { type: 'CLOSE_PIN' }
  | { type: 'SET_PIN_REASON'; reason: EvidenceReason }
  | { type: 'SET_PIN_FIELD'; field: EvidenceField }
  | { type: 'SET_PIN_NOTE'; note: string }
  | { type: 'SAVE_EVIDENCE' }
  | { type: 'UNPIN_EVIDENCE'; postId: string }
  | { type: 'SELECT_VERDICT'; verdict: Verdict }
  | { type: 'TICK_TIMER' }
  | { type: 'STOP_TIMER' }
  | { type: 'SET_PLAYER_NAME'; name: string }
  | { type: 'RECORD_SCORE'; breakdown: ScoreBreakdown; isCorrect: boolean }
  | { type: 'SET_LB_TAB'; tab: Difficulty }
  | { type: 'RESTORE_PROFILE'; name: string; casesClosed: number; totalScore: number }

export function createInitialState(): GameState {
  return {
    screen: 'nameGate',
    currentCase: null,
    activePlatform: 'facebook',
    pinnedEvidence: [],
    activePin: null,
    pinDraft: { reason: null, field: null, note: '' },
    selectedVerdict: null,
    startTime: null,
    elapsedSeconds: 0,
    playerName: '',
    sessionScore: 0,
    casesClosed: 0,
    currentLBTab: 'easy',
    latestBreakdown: null,
    latestVerdictCorrect: null,
  }
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_SCREEN':
      return { ...state, screen: action.screen }

    case 'START_CASE': {
      const caseData = CASES[action.difficulty]
      return {
        ...state,
        currentCase: caseData,
        pinnedEvidence: [],
        selectedVerdict: null,
        activePin: null,
        pinDraft: { reason: null, field: null, note: '' },
        elapsedSeconds: 0,
        startTime: null,
        latestBreakdown: null,
        latestVerdictCorrect: null,
        screen: 'briefing',
      }
    }

    case 'START_INVESTIGATION':
      return {
        ...state,
        screen: 'investigation',
        activePlatform: 'facebook',
        startTime: Date.now(),
        elapsedSeconds: 0,
      }

    case 'SWITCH_PLATFORM':
      return { ...state, activePlatform: action.platform }

    case 'OPEN_PIN':
      return {
        ...state,
        activePin: action.postId,
        pinDraft: { reason: null, field: null, note: '' },
      }

    case 'CLOSE_PIN':
      return { ...state, activePin: null }

    case 'SET_PIN_REASON':
      return { ...state, pinDraft: { ...state.pinDraft, reason: action.reason } }

    case 'SET_PIN_FIELD':
      return { ...state, pinDraft: { ...state.pinDraft, field: action.field } }

    case 'SET_PIN_NOTE':
      return { ...state, pinDraft: { ...state.pinDraft, note: action.note } }

    case 'SAVE_EVIDENCE': {
      if (!state.activePin || !state.pinDraft.reason || !state.pinDraft.field) return state
      const newEvidence: PinnedEvidence = {
        postId: state.activePin,
        reason: state.pinDraft.reason,
        field: state.pinDraft.field,
        note: state.pinDraft.note,
      }
      return {
        ...state,
        pinnedEvidence: [...state.pinnedEvidence, newEvidence],
        activePin: null,
        pinDraft: { reason: null, field: null, note: '' },
      }
    }

    case 'UNPIN_EVIDENCE':
      return {
        ...state,
        pinnedEvidence: state.pinnedEvidence.filter((e) => e.postId !== action.postId),
      }

    case 'SELECT_VERDICT':
      return { ...state, selectedVerdict: action.verdict }

    case 'TICK_TIMER': {
      if (!state.startTime) return state
      return { ...state, elapsedSeconds: Math.floor((Date.now() - state.startTime) / 1000) }
    }

    case 'STOP_TIMER':
      return { ...state, startTime: null }

    case 'SET_PLAYER_NAME':
      return { ...state, playerName: action.name }

    case 'RECORD_SCORE':
      return {
        ...state,
        sessionScore: state.sessionScore + action.breakdown.total,
        casesClosed: state.casesClosed + 1,
        latestBreakdown: action.breakdown,
        latestVerdictCorrect: action.isCorrect,
        screen: 'score',
      }

    case 'SET_LB_TAB':
      return { ...state, currentLBTab: action.tab }

    case 'RESTORE_PROFILE':
      return {
        ...state,
        playerName: action.name,
        casesClosed: action.casesClosed,
        sessionScore: action.totalScore,
      }

    default:
      return state
  }
}

export function useGameState() {
  const [state, dispatch] = useReducer(gameReducer, undefined, createInitialState)

  const navigate = useCallback((screen: ScreenName) => {
    dispatch({ type: 'SET_SCREEN', screen })
  }, [])

  return { state, dispatch, navigate } as const
}
