# Loan Investigator — Algo Pay

A narrative fraud-detection simulation game built for Algo Pay, a Philippine fintech. Players investigate loan applicants by reviewing their social media presence, collecting evidence of misrepresentation, and making approve/reject decisions.

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## Scripts

| Command | What it does |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Type-check + production build → `dist/` |
| `npm run preview` | Serve `dist/` locally |
| `npm run typecheck` | TypeScript strict mode check |
| `npm run lint` | ESLint (zero errors required) |
| `npm run format` | Prettier auto-format |
| `npm test` | Vitest — run all tests |
| `npm run test:watch` | Vitest in watch mode |

## Folder Structure

```
src/
├── main.tsx                  # React entry point
├── App.tsx                   # Root component, screen router, context provider
├── domain/                   # Pure TypeScript — zero React imports
│   ├── types.ts              # All type definitions (Case, Post, Score, etc.)
│   ├── constants.ts          # Named scoring values, thresholds, config
│   ├── scoring.ts            # Score calculation engine
│   ├── scoring.test.ts       # 24 unit tests
│   ├── rank.ts               # Rank calculation
│   ├── rank.test.ts          # 5 unit tests
│   └── utils.ts              # formatTime, formatCurrency, etc.
├── data/                     # Typed data objects — no logic
│   ├── cases.ts              # All 4 investigation cases
│   ├── onboarding.ts         # Tutorial slides + FAQs
│   └── nameGateLog.ts        # Terminal animation lines
├── hooks/                    # React hooks
│   ├── useGameState.ts       # Central game state (useReducer)
│   ├── useTimer.ts           # Investigation timer
│   ├── useLeaderboard.ts     # localStorage leaderboard
│   ├── usePlayerProfile.ts   # localStorage player profile
│   └── useBgm.ts             # Background music control
├── components/
│   ├── GameContext.ts         # React context for game state
│   └── screens/              # One component per game screen
│       ├── NameGateScreen     # Player name entry
│       ├── OnboardingScreen   # How-to-play tutorial
│       ├── HomeScreen         # Main menu
│       ├── DifficultyScreen   # Case selection
│       ├── BriefingScreen     # Applicant dossier
│       ├── InvestigationScreen # Core gameplay
│       ├── VerdictScreen      # Approve/reject decision
│       ├── ScoreScreen        # Results + consequence
│       └── LeaderboardScreen  # High scores
└── styles/
    ├── tokens.css             # Design system tokens
    └── global.css             # All component styles
```

## How to Add a New Case

1. Open `src/data/cases.ts`
2. Add a new entry to the `CASES` record with a new difficulty key
3. Add the `Difficulty` union member in `src/domain/types.ts`
4. Add case images to `public/assets/<Difficulty>/`
5. Add an avatar to `public/assets/avatar-<difficulty>.png`
6. Add the difficulty option in `DifficultyScreen.tsx`

The case data structure is self-documenting — follow the existing `easy` case as a template.

## Architecture

- **Domain logic is separate from UI.** Everything in `domain/` is pure TypeScript with zero React imports. Scoring, ranks, and utilities can be tested without rendering components.
- **Data is separate from code.** Cases live as typed data objects. Adding case #5 is a one-file change.
- **State is managed via `useReducer`.** Typed actions, immutable transitions, shared through a single React Context.
- **No external state libraries.** `useState` + `useReducer` + one Context is sufficient for this app's complexity.

## Tech Stack

- **Vite** — build tool + dev server
- **React 19** — UI framework
- **TypeScript 6** — strict mode (`strict: true`, `noUncheckedIndexedAccess: true`)
- **Vitest** — test runner (29 tests)
- **ESLint + Prettier** — code quality
