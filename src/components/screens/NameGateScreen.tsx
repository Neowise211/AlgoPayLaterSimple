import { useState, useEffect, useRef, type FormEvent } from 'react'
import { useGame } from '../GameContext'
import { NAME_GATE_LOG_POOL } from '../../data/nameGateLog'
import { STORAGE_KEYS, PLAYER_NAME_MAX_LENGTH } from '../../domain/constants'

export function NameGateScreen() {
  const { state, dispatch, navigate, saveProfile, startBgm } = useGame()
  const [logOffset, setLogOffset] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
    const interval = setInterval(() => {
      setLogOffset((prev) => (prev + 1) % NAME_GATE_LOG_POOL.length)
    }, 2700)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const raw = inputRef.current?.value.trim() ?? ''
    const name = (raw || 'Player').slice(0, PLAYER_NAME_MAX_LENGTH)
    dispatch({ type: 'SET_PLAYER_NAME', name })
    saveProfile(name, state.casesClosed, state.sessionScore)
    startBgm()
    localStorage.setItem(STORAGE_KEYS.ONBOARDED, '0')
    navigate('onboarding')
  }

  const lines = Array.from({ length: 8 }, (_, i) => {
    const idx = (logOffset + i) % NAME_GATE_LOG_POOL.length
    return NAME_GATE_LOG_POOL[idx] ?? ''
  })

  return (
    <div className="name-gate">
      <div className="name-gate-overlay" />
      <div className="name-gate-watermark">
        {Array.from({ length: 4 }, (_, i) => (
          <span key={i}>CASE FILE 01-A</span>
        ))}
      </div>
      <div className="name-gate-terminal" aria-hidden="true">
        {lines.map((line, i) => (
          <div key={i} className="typewriter-line">
            {'> ' + line}
          </div>
        ))}
      </div>
      <div className="name-gate-panel">
        <img
          className="name-gate-logo"
          src="/assets/OfficialLogo_AlgoPay.svg"
          alt="AlgoPay"
        />
        <p className="name-gate-caption">Investigator access</p>
        <form className="name-gate-form" onSubmit={handleSubmit}>
          <label className="name-gate-label" htmlFor="nameGateInput">
            Enter your name
          </label>
          <input
            id="nameGateInput"
            ref={inputRef}
            className="name-gate-input"
            type="text"
            placeholder="Analyst name"
            maxLength={PLAYER_NAME_MAX_LENGTH}
            defaultValue={state.playerName}
            required
            autoComplete="name"
          />
          <button type="submit" className="btn-primary name-gate-btn">
            Continue
          </button>
        </form>
        <div className="name-gate-stat">
          <div className="name-gate-stat-label">Total Cases Closed</div>
          <div className="name-gate-stat-value">{state.casesClosed}</div>
        </div>
      </div>
    </div>
  )
}
