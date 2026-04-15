const state = {
  currentScreen: "home",
  currentCase: null,
  activePlatform: "facebook",
  pinnedEvidence: [],
  activePin: null,
  pinDraft: { reason: null, field: null, note: "" },
  selectedVerdict: null,
  startTime: null,
  elapsedSeconds: 0,
  timerInterval: null,
  playerName: "",
  sessionScore: 0,
  casesClosed: 0,
  leaderboards: { easy: [], medium: [], hard: [], extreme: [] },
  currentLBTab: "easy"
};

function loadLeaderboards() {
  const empty = { easy: [], medium: [], hard: [], extreme: [] };
  try {
    const raw = localStorage.getItem("algopay_lb");
    if (!raw) return empty;
    const parsed = JSON.parse(raw);
    function normalizeEntries(entries) {
      if (!Array.isArray(entries)) return [];
      return entries.map(function normalizeEntry(entry) {
        return {
          name: entry && typeof entry.name === "string" ? entry.name : "Player",
          score: Number(entry && entry.score) || 0,
          casesClosed: Number(entry && entry.casesClosed) || 0,
          time: Number(entry && entry.time) || 0
        };
      });
    }
    return {
      easy: normalizeEntries(parsed.easy),
      medium: normalizeEntries(parsed.medium),
      hard: normalizeEntries(parsed.hard),
      extreme: normalizeEntries(parsed.extreme)
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
    casesClosed: state.casesClosed,
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

function loadPlayerProfile() {
  try {
    const raw = localStorage.getItem("algopay_player");
    if (!raw) return { name: "", casesClosed: 0, totalScore: 0 };
    const p = JSON.parse(raw);
    return {
      name: typeof p.name === "string" ? p.name : "",
      casesClosed: Number(p.casesClosed) || 0,
      totalScore: Number(p.totalScore) || 0
    };
  } catch (e) {
    return { name: "", casesClosed: 0, totalScore: 0 };
  }
}

function savePlayerProfile() {
  localStorage.setItem("algopay_player", JSON.stringify({
    name: state.playerName,
    casesClosed: state.casesClosed,
    totalScore: state.sessionScore
  }));
}

state.leaderboards = loadLeaderboards();

var profile = loadPlayerProfile();
state.playerName = profile.name;
state.casesClosed = profile.casesClosed;
state.sessionScore = profile.totalScore;

window.state = state;
window.loadLeaderboards = loadLeaderboards;
window.saveLeaderboards = saveLeaderboards;
window.addLeaderboardEntry = addLeaderboardEntry;
window.getRank = getRank;
window.loadPlayerProfile = loadPlayerProfile;
window.savePlayerProfile = savePlayerProfile;
