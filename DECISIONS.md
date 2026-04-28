# Decisions Log

Non-obvious choices made during the migration from vanilla JS/HTML to Vite + React + TypeScript.

---

## Architecture

### Styling: Global CSS (not CSS Modules)

**Decision:** Import the existing `tokens.css` + `main.css` as global stylesheets rather than decomposing into CSS Modules.

**Why:** The existing CSS is 2800+ lines of meticulous, token-referenced styles that already work perfectly. Converting to CSS Modules would mean:
- Renaming every className in every component to use `styles.something`
- Risk of visual regressions from missed class names
- No actual benefit — scoping isn't needed because class names are already unique and well-namespaced

CSS Modules would be the right call for a *new* project. For a *migration*, preserving the working CSS wholesale and importing it globally is the pragmatic choice.

**Revisit if:** The app grows to 30+ components and class name collisions start appearing.

---

### State: `useReducer` + Context (not Zustand/Redux)

**Decision:** Single `useReducer` with typed actions, shared via one React Context.

**Why:** The game has ~15 state fields and a linear screen flow. A reducer handles all transitions immutably with typed actions. Adding Zustand or Redux would be a dependency that doesn't earn its place at this scale.

**Revisit if:** The app adds multiplayer, server sync, or more than ~3 independent state slices.

---

## Features Cut

### Voucher System (Auto Checkout / Flash Deal)

**What:** The old `design-reference.html` had a voucher tray in the pin panel with "Auto Checkout" and "Flash Deal" cards.

**Why cut:** The production code (`router.js`) had already removed this feature entirely — no voucher elements are rendered in `renderInvestigation()`. It was dead code in the reference file. The vouchers had no defined mechanical effect on scoring.

**Bring back if:** A future spec defines what vouchers do (point multipliers? skip classification?) and playtesting shows they improve the game loop.

---

### Tailwind CDN

**What:** `<script src="https://cdn.tailwindcss.com">` in the original `index.html`.

**Why cut:** Zero Tailwind utility classes are used anywhere in the actual CSS or HTML. The entire design system is built on CSS custom properties. Pure dead weight (~80KB loaded for nothing).

---

### `console.log` in `main.js`

**What:** `console.log("AlgoPay Loan Investigator vBackup loaded")` — debug artifact.

**Why cut:** ESLint `no-console` rule enforced. Debug logging doesn't ship.

---

### Red Flag Counter

**What:** `🚩 Red flags found: <span id="flagCount">0</span>` from the old design reference.

**Why cut:** The production `router.js` already removed this. Only the evidence badge count remained, which we preserved.

---

## Features Kept (that looked like bloat but aren't)

### Rank Progression

**Suspected bloat:** Simple string label based on cumulative score — does it matter?

**Why kept:** It's wired to real score state, costs zero complexity (one pure function), and gives returning players a progression hook. The rank thresholds (Trainee → Junior → Field Agent → Senior → Chief) create a lightweight meta-game that encourages replaying cases. Keeping.

### Evidence Strength Preview (★★★ / ★★ / ★ / ?)

**Suspected bloat:** Shows classification strength in the pin panel before saving.

**Why kept:** Core to the learning loop. Without it, the player gets no feedback until the score screen. With it, they can self-correct during investigation. This is the teaching mechanism of the game.

### Optional Note Textarea

**What it does:** Free-text field in pin panel. Stored but never scored.

**Why kept:** It doesn't affect gameplay but lets the player articulate their reasoning. In a classroom or training setting, an instructor could review these notes. Zero cost, potential value.

---

## Library Choices

| Tool | Version | Why |
|------|---------|-----|
| Vite | 8.x | Fastest dev server, zero-config React/TS support |
| React | 19.x | Current stable, hooks-first API |
| TypeScript | 6.x | Strict mode, `noUncheckedIndexedAccess` for safety |
| Vitest | 3.x | Same config as Vite, fast, built-in coverage |
| ESLint | 10.x | Flat config, TS support via typescript-eslint |
| Prettier | 3.x | Formatting — no debates |
