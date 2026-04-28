import { useGame } from '../GameContext'
import { formatCurrency } from '../../domain/utils'

export function BriefingScreen() {
  const { state, dispatch, navigate } = useGame()
  const caseData = state.currentCase
  if (!caseData) return <div className="briefing"><p>No case selected.</p></div>

  const { applicant } = caseData
  const avatarSrc = `/assets/avatar-${caseData.id}.png`

  return (
    <div className="briefing">
      <h2>CASE BRIEFING</h2>
      <div className="dossier">
        <div className="dossier-header">
          <div className="dossier-avatar"><img src={avatarSrc} alt={applicant.name} /></div>
          <div>
            <div className="dossier-name">{applicant.name}</div>
            <div className="dossier-sub">Age {applicant.age} · {applicant.civilStatus} · {applicant.location}</div>
          </div>
        </div>
        <div className="dossier-fields">
          {[
            ['EMPLOYER', applicant.employer], ['POSITION', applicant.position],
            ['TENURE', applicant.tenure], ['MONTHLY INCOME', formatCurrency(applicant.income)],
            ['LOAN AMOUNT', formatCurrency(applicant.loanAmount)], ['LOAN PURPOSE', applicant.loanPurpose],
            ['DEPENDENTS', String(applicant.dependents)], ['ADDRESS', applicant.address],
          ].map(([label, value]) => (
            <div key={label} className="dossier-field">
              <div className="label">{label}</div><div className="value">{value}</div>
            </div>
          ))}
        </div>
      </div>
      <p className="briefing-quote">{caseData.briefingQuote}</p>
      <div className="briefing-actions">
        <button className="btn-secondary" onClick={() => navigate('difficulty')}>← BACK</button>
        <button className="btn-primary" onClick={() => dispatch({ type: 'START_INVESTIGATION' })}>BEGIN INVESTIGATION →</button>
      </div>
    </div>
  )
}
