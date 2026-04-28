import { useState, useEffect } from 'react'
import { useGame } from '../GameContext'
import { ONBOARDING_SLIDES, ONBOARDING_FAQS } from '../../data/onboarding'
import { STORAGE_KEYS } from '../../domain/constants'

export function OnboardingScreen() {
  const { navigate } = useGame()
  const [activeTab, setActiveTab] = useState<'how-to-play' | 'faqs'>('how-to-play')
  const [slideIndex, setSlideIndex] = useState(0)
  const [expandedFaq, setExpandedFaq] = useState(-1)

  const hasSeenOnboarding = localStorage.getItem(STORAGE_KEYS.ONBOARDED) === '1'
  const maxSlide = ONBOARDING_SLIDES.length - 1

  useEffect(() => {
    if (activeTab !== 'how-to-play') return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); setSlideIndex((i) => Math.max(0, i - 1)) }
      if (e.key === 'ArrowRight') { e.preventDefault(); setSlideIndex((i) => Math.min(maxSlide, i + 1)) }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [activeTab, maxSlide])

  const handleStart = () => {
    localStorage.setItem(STORAGE_KEYS.ONBOARDED, '1')
    navigate('home')
  }

  return (
    <div className="onboarding">
      <div className="onboarding-shell">
        <div className="onboarding-header">
          <div>
            {hasSeenOnboarding && (
              <button type="button" className="onboarding-skip" onClick={() => navigate('home')}>
                Skip to menu
              </button>
            )}
          </div>
          <div className="onboarding-tabs" role="tablist">
            <button type="button" className={`onboarding-tab ${activeTab === 'how-to-play' ? 'active' : ''}`} role="tab" onClick={() => setActiveTab('how-to-play')}>How To Play</button>
            <button type="button" className={`onboarding-tab ${activeTab === 'faqs' ? 'active' : ''}`} role="tab" onClick={() => setActiveTab('faqs')}>FAQs</button>
          </div>
        </div>
        <div className="onboarding-panel">
          {activeTab === 'how-to-play' ? (
            <div className="onboarding-carousel">
              <div className="onboarding-slide-num">{slideIndex + 1} / {ONBOARDING_SLIDES.length}</div>
              <div className="onboarding-viewport">
                <div className="onboarding-track" style={{ transform: `translateX(-${slideIndex * 100}%)` }}>
                  {ONBOARDING_SLIDES.map((slide, i) => (
                    <section key={i} className="onboarding-slide">
                      <div className="onboarding-slide-icon" aria-hidden="true">{slide.icon}</div>
                      <h2 className="onboarding-slide-headline">{slide.headline}</h2>
                      <p className="onboarding-slide-body">{slide.body}</p>
                      {slide.platforms && (
                        <div className="onboarding-slide-platforms">
                          {slide.platforms.map((p) => <span key={p} className="onboarding-platform-badge">{p}</span>)}
                        </div>
                      )}
                      {slide.cta && (
                        <button type="button" className="btn-secondary onboarding-slide-cta" onClick={() => { setExpandedFaq(-1); setActiveTab('faqs') }}>{slide.cta}</button>
                      )}
                    </section>
                  ))}
                </div>
              </div>
              <div className="onboarding-controls">
                <button type="button" className="onboarding-arrow" disabled={slideIndex === 0} onClick={() => setSlideIndex((i) => Math.max(0, i - 1))}>‹</button>
                <div className="onboarding-dots">
                  {ONBOARDING_SLIDES.map((_, i) => (
                    <button key={i} type="button" className={`onboarding-dot ${i === slideIndex ? 'active' : ''}`} onClick={() => setSlideIndex(i)} aria-label={`Go to slide ${i + 1}`} />
                  ))}
                </div>
                <button type="button" className="onboarding-arrow" onClick={() => setSlideIndex((i) => Math.min(maxSlide, i + 1))}>›</button>
              </div>
            </div>
          ) : (
            <div className="onboarding-faqs">
              {ONBOARDING_FAQS.map((faq, i) => (
                <div key={i} className={`onboarding-faq ${expandedFaq === i ? 'expanded' : ''}`}>
                  <button type="button" className="onboarding-faq-q" onClick={() => setExpandedFaq(expandedFaq === i ? -1 : i)}>
                    <span>{faq.question}</span>
                    <span className="onboarding-faq-chevron" aria-hidden="true">⌄</span>
                  </button>
                  <div className="onboarding-faq-a">
                    <div className="onboarding-faq-a-inner">
                      {faq.answer.split('\n\n').map((p, j) => <p key={j}>{p}</p>)}
                    </div>
                  </div>
                </div>
              ))}
              <div className="onboarding-footer">
                <button type="button" className="btn-primary onboarding-cta" onClick={handleStart}>Start Investigation →</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
