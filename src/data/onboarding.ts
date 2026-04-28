export interface OnboardingSlide {
  readonly icon: string
  readonly headline: string
  readonly body: string
  readonly platforms?: readonly string[]
  readonly cta?: string
}

export const ONBOARDING_SLIDES: readonly OnboardingSlide[] = [
  { icon: '🗂️', headline: 'Welcome, Investigator', body: 'Step into the world of loan investigation. You are a loan officer at Algo Pay reviewing real-looking applications and checking whether applicants are telling the truth.' },
  { icon: '📄', headline: 'Read the Case File', body: 'Open the folder. Each case starts with an applicant profile: name, age, job, income, loan amount, and purpose. Read carefully. This is what they claim to be true.' },
  { icon: '🌐', headline: 'Investigate 4 Platforms', body: 'Follow the digital footprint. Check their Facebook, Instagram, LinkedIn, and Twitter/X. Each platform reveals a different part of the story.', platforms: ['Facebook', 'Instagram', 'LinkedIn', 'Twitter/X'] },
  { icon: '📌', headline: 'Collect Evidence, Avoid Red Herrings', body: 'Pin the suspicious posts. Some posts look suspicious but are actually innocent jokes, old posts, or sarcasm. Wrong evidence means point penalties.' },
  { icon: '⚖️', headline: 'Submit Your Verdict', body: 'Make your decision. Choose Approve or Reject, then support that verdict with strong evidence. Your decision and evidence quality determine your score.' },
  { icon: '🏅', headline: 'Learn & Rank Up', body: 'Every case has a lesson. Get scored on evidence quality and verdict accuracy, see the consequence of your decision, and climb from Trainee Analyst to Chief Risk Officer.', cta: 'Next: Read the FAQs →' },
]

export interface OnboardingFaq {
  readonly question: string
  readonly answer: string
}

export const ONBOARDING_FAQS: readonly OnboardingFaq[] = [
  { question: 'Why does this game exist?', answer: "To flip the perspective. By putting you in the investigator's seat, you'll see how exposed your own digital life really is — and why that should concern you." },
  { question: 'Do loan companies really lurk on social media?', answer: 'Yes — and so does almost everyone else. Hiring managers, insurance companies, and background checkers screen candidates this way. Some predatory lending apps have been caught scraping contacts and using public posts to harass borrowers.' },
  { question: 'What kind of data can actually be pulled from my digital footprint?', answer: "More than you'd expect. Location tags, check-ins, and photos reveal where you live, work, and spend money. Old posts, job titles, and complaints can be cross-referenced to build a full profile." },
  { question: 'Who could use this against me?', answer: 'Anyone with time, motive, and an internet connection. Hiring managers, hackers, scammers, predatory lenders, stalkers, and opposition researchers.' },
  { question: 'How can I protect myself?', answer: "Assume everything you post is public and permanent. Audit old posts, don't geotag your home, and never share photos of IDs or documents. Be skeptical of any app that demands access to your contact list." },
]
