import { useState } from 'react'
import { useGame } from '../GameContext'
import { useTimer } from '../../hooks/useTimer'
import { formatTime, formatCurrency } from '../../domain/utils'
import { findPostById } from '../../domain/scoring'
import { PLATFORMS, EVIDENCE_FIELDS, EVIDENCE_REASONS } from '../../domain/constants'
import type { Platform, Post, EvidenceReason, EvidenceField } from '../../domain/types'

const PLATFORM_LABELS: Record<Platform, { icon: string; cls: string; label: string }> = {
  facebook: { icon: 'f', cls: 'fb', label: 'Facebook' },
  instagram: { icon: 'ig', cls: 'ig', label: 'Instagram' },
  linkedin: { icon: 'in', cls: 'li', label: 'LinkedIn' },
  twitter: { icon: 'X', cls: 'tw', label: 'X/Twitter' },
}

export function InvestigationScreen() {
  const { state, dispatch, navigate } = useGame()
  const caseData = state.currentCase
  const isTimerRunning = state.startTime !== null
  useTimer(isTimerRunning, dispatch)
  const [briefingOpen, setBriefingOpen] = useState(false)

  if (!caseData) return <div className="briefing"><p>No active case.</p></div>

  const { applicant } = caseData
  const posts = caseData.posts[state.activePlatform]
  const evidenceCount = state.pinnedEvidence.length

  const handlePostClick = (postId: string) => {
    const existing = state.pinnedEvidence.find((e) => e.postId === postId)
    if (existing) {
      if (confirm('Unpin this evidence?')) dispatch({ type: 'UNPIN_EVIDENCE', postId })
      return
    }
    dispatch({ type: 'OPEN_PIN', postId })
  }

  const handleSaveEvidence = () => {
    if (!state.pinDraft.reason || !state.pinDraft.field) {
      alert('Please complete Step 1 and Step 2 before saving.')
      return
    }
    dispatch({ type: 'SAVE_EVIDENCE' })
  }

  const goToVerdict = () => {
    dispatch({ type: 'STOP_TIMER' })
    navigate('verdict')
  }

  const activePost = state.activePin ? findPostById(caseData, state.activePin) : null
  const getStrengthLabel = () => {
    if (!state.pinDraft.reason || !state.pinDraft.field || !activePost) return '—'
    if (activePost.classification === 'strong') return '★★★ STRONG'
    if (activePost.classification === 'moderate') return '★★ MODERATE'
    if (activePost.classification === 'weak') return '★ WEAK'
    return '? UNCERTAIN'
  }

  const renderPostImage = (post: Post) => {
    const img = typeof post.image === 'string' ? post.image.trim() : ''
    const hasImage = img.startsWith('assets/') && /\.(png|jpe?g|webp|gif|svg)$/i.test(img)
    if (hasImage) return <img className="post-image" src={`/${img}`} alt={`${post.author} post`} loading="lazy" />
    return <div className="post-image-placeholder">No post photo provided</div>
  }

  const feedPosts = posts ?? []
  const activePostIndex = state.activePin ? feedPosts.findIndex((p) => p.id === state.activePin) : -1

  const navigateEvidence = (dir: number) => {
    if (feedPosts.length === 0 || activePostIndex === -1) return
    const next = (activePostIndex + dir + feedPosts.length) % feedPosts.length
    const nextPost = feedPosts[next]
    if (nextPost) dispatch({ type: 'OPEN_PIN', postId: nextPost.id })
  }

  return (
    <div className="investigation">
      <div className="inv-topbar">
        <div className="logo"><img className="logo-mark" src="/assets/OfficialLogo_AlgoPay.svg" alt="AlgoPay" /></div>
        <div className="inv-topbar-right">
          <div className="timer-display">{formatTime(state.elapsedSeconds)}</div>
          <button className="btn-secondary" onClick={() => setBriefingOpen(true)}>View Application</button>
          <button className="btn-secondary evidence-btn" onClick={() => { if (evidenceCount === 0) alert('No evidence pinned yet.') }}>
            📌 Evidence <span className="evidence-badge">{evidenceCount}</span>
          </button>
          <button className="btn-primary" disabled={evidenceCount === 0} onClick={goToVerdict}>SUBMIT VERDICT →</button>
        </div>
      </div>
      <div className="inv-context">
        <div className="case-label">Case · {applicant.name} · {formatCurrency(applicant.loanAmount)}</div>
      </div>
      <div className="inv-body">
        <div className="folder-tabs">
          {PLATFORMS.map((p) => {
            const info = PLATFORM_LABELS[p]
            return (
              <div key={p} className={`folder-tab ${state.activePlatform === p ? 'active' : ''}`} onClick={() => dispatch({ type: 'SWITCH_PLATFORM', platform: p })}>
                <span className={`platform-icon ${info.cls}`}>{info.icon}</span> {info.label}
              </div>
            )
          })}
        </div>
        <div className="folder-body">
          {feedPosts.map((post) => {
            const isPinned = state.pinnedEvidence.some((e) => e.postId === post.id)
            const contentText = post.image && !post.content ? 'See image for details' : post.content
            return (
              <div key={post.id} className={`post ${isPinned ? 'pinned' : ''}`} onClick={() => handlePostClick(post.id)}>
                {isPinned && <div className="pin-icon">📌</div>}
                <div className="post-header">
                  <div className="post-avatar">{post.author.charAt(0).toUpperCase()}</div>
                  <div><div className="post-author">{post.author}</div><div className="post-meta">{post.meta}</div></div>
                </div>
                {renderPostImage(post)}
                <div className="post-content">{contentText}</div>
                <div className="post-engagement"><span>👍 {post.likes}</span><span>💬 {post.comments}</span><span>↗ Share</span></div>
              </div>
            )
          })}
        </div>
      </div>

      {state.activePin && activePost && (
        <div className="pin-overlay is-visible" onClick={(e) => { if ((e.target as HTMLElement).classList.contains('pin-overlay')) dispatch({ type: 'CLOSE_PIN' }) }}>
          <div className="evidence-preview-wrap">
            <div className="evidence-preview-card">
              <div className="evidence-preview-header">
                <span className="evidence-preview-badge">EVIDENCE PREVIEW</span>
                <span className="evidence-preview-platform">{PLATFORM_LABELS[activePost.platform]?.label}</span>
              </div>
              <div className="evidence-preview-frame">
                <button type="button" className="evidence-nav-btn evidence-nav-prev" onClick={(e) => { e.stopPropagation(); navigateEvidence(-1) }}>‹</button>
                <button type="button" className="evidence-nav-btn evidence-nav-next" onClick={(e) => { e.stopPropagation(); navigateEvidence(1) }}>›</button>
                <span className="evidence-nav-counter">{activePostIndex + 1} / {feedPosts.length}</span>
                {activePost.image ? (
                  <img className="evidence-preview-image" src={`/${activePost.image}`} alt="Evidence" />
                ) : (
                  <img className="evidence-preview-image" src="/assets/evidence-placeholder.png" alt="Evidence placeholder" />
                )}
              </div>
              <div className="evidence-preview-caption">
                <div className="evidence-preview-title">{activePost.author} — {PLATFORM_LABELS[activePost.platform]?.label} post</div>
                <div className="evidence-preview-meta">{activePost.meta}</div>
                <div className="evidence-preview-excerpt">{activePost.previewDescription || activePost.content || 'No additional context.'}</div>
              </div>
            </div>
          </div>
          <div className="pin-panel">
            <div className="pin-panel-header"><h3>📌 CLASSIFY EVIDENCE</h3><button className="close-btn" onClick={() => dispatch({ type: 'CLOSE_PIN' })}>✕</button></div>
            <div className="pin-step">
              <div className="step-label">STEP 1 · WHY SUSPICIOUS?</div>
              {EVIDENCE_REASONS.map((r) => (
                <div key={r.value} className={`radio-option ${state.pinDraft.reason === r.value ? 'selected' : ''}`} onClick={() => dispatch({ type: 'SET_PIN_REASON', reason: r.value as EvidenceReason })}>
                  <div className="radio-dot" /><div className="radio-text">{r.label}</div>
                </div>
              ))}
            </div>
            <div className="pin-step">
              <div className="step-label">STEP 2 · WHICH FIELD?</div>
              <div className="chip-grid">
                {EVIDENCE_FIELDS.map((f) => (
                  <div key={f} className={`chip ${state.pinDraft.field === f ? 'selected' : ''}`} onClick={() => dispatch({ type: 'SET_PIN_FIELD', field: f as EvidenceField })}>{f.charAt(0).toUpperCase() + f.slice(1)}</div>
                ))}
              </div>
            </div>
            <div className="pin-step">
              <div className="step-label">STEP 3 · QUICK NOTE (OPTIONAL)</div>
              <textarea className="pin-note" placeholder="e.g., Post says he's 17 but applicant declared 21..." value={state.pinDraft.note} onChange={(e) => dispatch({ type: 'SET_PIN_NOTE', note: e.target.value })} />
            </div>
            <div className="pin-footer">
              <div className="strength-preview"><span>Evidence strength</span><span className="strength-stars">{getStrengthLabel()}</span></div>
              <div className="pin-actions">
                <button className="btn-cancel" onClick={() => dispatch({ type: 'CLOSE_PIN' })}>Cancel</button>
                <button className="btn-save" onClick={handleSaveEvidence}>SAVE EVIDENCE →</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {briefingOpen && (
        <div className="briefing-folder-overlay folder-visible" onClick={(e) => { if ((e.target as HTMLElement).classList.contains('briefing-folder-overlay')) setBriefingOpen(false) }}>
          <div className="briefing-folder">
            <div className="folder-interior">
              <div className="folder-content">
                <div className="folder-dossier-header">
                  <div className="folder-avatar"><img src={`/assets/avatar-${caseData.id}.png`} alt={applicant.name} /></div>
                  <div><div className="folder-dossier-name">{applicant.name}</div><div className="folder-dossier-sub">Age {applicant.age} · {applicant.civilStatus} · {applicant.location}</div></div>
                </div>
                <div className="folder-dossier-fields">
                  {[['EMPLOYER', applicant.employer], ['POSITION', applicant.position], ['TENURE', applicant.tenure], ['MONTHLY INCOME', formatCurrency(applicant.income)], ['LOAN AMOUNT', formatCurrency(applicant.loanAmount)], ['LOAN PURPOSE', applicant.loanPurpose], ['DEPENDENTS', String(applicant.dependents)], ['ADDRESS', applicant.address]].map(([l, v]) => (
                    <div key={l} className="folder-dossier-field"><div className="label">{l}</div><div className="value">{v}</div></div>
                  ))}
                </div>
                <button className="btn-primary folder-close-btn" onClick={() => setBriefingOpen(false)}>CLOSE FILE</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
