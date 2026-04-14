const state = {
  currentScreen: "home",
  currentCase: null,
  activePlatform: "facebook",
  pinnedEvidence: [],
  activePin: null,
  pinDraft: { reason: null, field: null, note: "", vouchers: {} },
  selectedVerdict: null,
  startTime: null,
  elapsedSeconds: 0,
  timerInterval: null,
  sessionScore: 0,
  casesClosed: 0,
  leaderboards: { easy: [], medium: [], hard: [], extreme: [] }
};

function loadLeaderboards() {
  const empty = { easy: [], medium: [], hard: [], extreme: [] };
  try {
    const raw = localStorage.getItem("algopay_lb");
    if (!raw) return empty;
    const parsed = JSON.parse(raw);
    return {
      easy: Array.isArray(parsed.easy) ? parsed.easy : [],
      medium: Array.isArray(parsed.medium) ? parsed.medium : [],
      hard: Array.isArray(parsed.hard) ? parsed.hard : [],
      extreme: Array.isArray(parsed.extreme) ? parsed.extreme : []
    };
  } catch (error) {
    return empty;
  }
}

function saveLeaderboards() {
  localStorage.setItem("algopay_lb", JSON.stringify(state.leaderboards));
}

function addLeaderboardEntry(difficulty, name, score, time) {
  if (!state.leaderboards[difficulty]) {
    state.leaderboards[difficulty] = [];
  }

  state.leaderboards[difficulty].push({
    name,
    score,
    time
  });

  state.leaderboards[difficulty].sort(function sortEntries(a, b) {
    if (b.score !== a.score) return b.score - a.score;
    return a.time - b.time;
  });

  state.leaderboards[difficulty] = state.leaderboards[difficulty].slice(0, 10);
  saveLeaderboards();
}

function getRank(score) {
  if (score >= 300) return "Chief Risk Officer";
  if (score >= 200) return "Senior Investigator";
  if (score >= 120) return "Field Agent";
  if (score >= 50) return "Junior Investigator";
  return "Trainee Analyst";
}

state.leaderboards = loadLeaderboards();

window.state = state;
window.loadLeaderboards = loadLeaderboards;
window.saveLeaderboards = saveLeaderboards;
window.addLeaderboardEntry = addLeaderboardEntry;
window.getRank = getRank;
