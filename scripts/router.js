function showScreen(screenName) {
  const screens = document.querySelectorAll(".screen");
  screens.forEach(function hideScreen(screenEl) {
    screenEl.classList.remove("active");
  });

  const activeScreen = document.getElementById("screen-" + screenName);
  if (activeScreen) {
    activeScreen.classList.add("active");
  }

  state.currentScreen = screenName;
  onScreenEnter(screenName);
}

function onScreenEnter(screenName) {
  switch (screenName) {
    case "home":
      renderHome();
      break;
    case "difficulty":
      renderDifficulty();
      break;
    case "briefing":
      renderBriefing();
      break;
    case "investigation":
      renderInvestigation();
      break;
    case "verdict":
      renderVerdict();
      break;
    case "score":
      renderScore();
      break;
    case "leaderboard":
      renderLeaderboard();
      break;
    default:
      break;
  }
}

function formatTime(seconds) {
  const safe = Math.max(0, Number(seconds) || 0);
  const mins = Math.floor(safe / 60)
    .toString()
    .padStart(2, "0");
  const secs = Math.floor(safe % 60)
    .toString()
    .padStart(2, "0");
  return mins + ":" + secs;
}

function formatCurrency(amount) {
  const value = Number(amount) || 0;
  return "₱" + value.toLocaleString("en-PH");
}

function getBestTime(difficulty) {
  const board = state.leaderboards[difficulty] || [];
  if (!board.length) return "—";
  return formatTime(board[0].time);
}

function renderHome() {
  const homeScreen = document.getElementById("screen-home");
  if (!homeScreen) return;

  homeScreen.innerHTML = `
    <div class="top-actions">
      <div class="logo">
        <img class="logo-mark" src="assets/OfficialLogo_AlgoPay.svg" alt="AlgoPay">
      </div>
      <div class="nav-links">
        <button class="nav-link" onclick="showScreen('home')">Home</button>
        <button class="nav-link" onclick="showScreen('leaderboard')">Leaderboard</button>
      </div>
    </div>

    <div class="home">
      <h1>LOAN INVESTIGATOR</h1>
      <p class="tagline">Catch the liar before you approve the loan.</p>

      <div class="stats">
        <div class="stat-card">
          <div class="label">CASES CLOSED</div>
          <div class="value">${state.casesClosed}</div>
        </div>
        <div class="stat-card">
          <div class="label">TOTAL SCORE</div>
          <div class="value">${state.sessionScore}</div>
        </div>
        <div class="stat-card">
          <div class="label">CURRENT RANK</div>
          <div class="value">${getRank(state.sessionScore)}</div>
        </div>
      </div>

      <button class="btn-start" onclick="showScreen('difficulty')">START INVESTIGATING</button>
    </div>
  `;
}

function renderDifficulty() {
  const difficultyScreen = document.getElementById("screen-difficulty");
  if (!difficultyScreen) return;

  difficultyScreen.innerHTML = `
    <div class="top-actions">
      <div class="logo">
        <img class="logo-mark" src="assets/OfficialLogo_AlgoPay.svg" alt="AlgoPay">
      </div>
      <div class="nav-links">
        <button class="nav-link" onclick="showScreen('home')">Home</button>
        <button class="nav-link" onclick="showScreen('leaderboard')">Leaderboard</button>
      </div>
    </div>

    <div class="difficulty-select">
      <h2>SELECT DIFFICULTY</h2>
      <div class="diff-grid">
        <div class="diff-card easy" onclick="startCase('easy')">
          <span class="diff-badge">EASY</span>
          <h3>Underage Applicant</h3>
          <p class="case-desc">A young applicant requesting a personal loan. Something does not add up.</p>
          <div class="best-time">Best: ${getBestTime("easy")}</div>
        </div>

        <div class="diff-card medium" onclick="alert('Pending Franco\\'s content')">
          <span class="coming-soon">TBD</span>
          <span class="diff-badge">MEDIUM</span>
          <h3>Pesto Case</h3>
          <p class="case-desc">Small business loan for a food venture. Real operation or staged profile?</p>
          <div class="best-time">Best: ${getBestTime("medium")}</div>
        </div>

        <div class="diff-card hard" onclick="alert('Pending Franco\\'s content')">
          <span class="coming-soon">TBD</span>
          <span class="diff-badge">HARD</span>
          <h3>Wi-Fi Thief</h3>
          <p class="case-desc">Neighborhood complaints clash with polished social presence.</p>
          <div class="best-time">Best: ${getBestTime("hard")}</div>
        </div>

        <div class="diff-card extreme" onclick="alert('Pending Franco\\'s content')">
          <span class="coming-soon">TBD</span>
          <span class="diff-badge">EXTREME</span>
          <h3>HUAC Case</h3>
          <p class="case-desc">Everything points one way. The truth may still be more complex.</p>
          <div class="best-time">Best: ${getBestTime("extreme")}</div>
        </div>
      </div>
    </div>
  `;
}

function renderBriefing() {
  const briefingScreen = document.getElementById("screen-briefing");
  if (!briefingScreen) return;

  if (!state.currentCase || !state.currentCase.applicant) {
    briefingScreen.innerHTML = `
      <div class="briefing">
        <h2>CASE BRIEFING</h2>
        <p class="briefing-quote">No case selected yet. Choose a difficulty first.</p>
      </div>
    `;
    return;
  }

  const applicant = state.currentCase.applicant;
  const avatar = (applicant.name || "?").charAt(0).toUpperCase();

  briefingScreen.innerHTML = `
    <div class="briefing">
      <h2>CASE BRIEFING</h2>
      <div class="dossier">
        <div class="dossier-header">
          <div class="dossier-avatar">${avatar}</div>
          <div>
            <div class="dossier-name">${applicant.name}</div>
            <div class="dossier-sub">Age ${applicant.age} · ${applicant.civilStatus} · ${applicant.address}</div>
          </div>
        </div>

        <div class="dossier-fields">
          <div class="dossier-field"><div class="label">EMPLOYER</div><div class="value">${applicant.employer}</div></div>
          <div class="dossier-field"><div class="label">POSITION</div><div class="value">${applicant.position}</div></div>
          <div class="dossier-field"><div class="label">TENURE</div><div class="value">${applicant.tenure}</div></div>
          <div class="dossier-field"><div class="label">MONTHLY INCOME</div><div class="value">${formatCurrency(applicant.income)}</div></div>
          <div class="dossier-field"><div class="label">LOAN AMOUNT</div><div class="value">${formatCurrency(applicant.loanAmount)}</div></div>
          <div class="dossier-field"><div class="label">LOAN PURPOSE</div><div class="value">${applicant.loanPurpose}</div></div>
          <div class="dossier-field"><div class="label">DEPENDENTS</div><div class="value">${applicant.dependents}</div></div>
          <div class="dossier-field"><div class="label">ADDRESS</div><div class="value">${applicant.address}</div></div>
        </div>
      </div>

      <p class="briefing-quote">${state.currentCase.briefingQuote}</p>

      <div class="briefing-actions">
        <button class="btn-secondary" onclick="showScreen('difficulty')">← BACK</button>
        <button class="btn-primary" onclick="startInvestigation()">BEGIN INVESTIGATION →</button>
      </div>
    </div>
  `;
}

function renderInvestigation() {
  const investigationScreen = document.getElementById("screen-investigation");
  if (!investigationScreen) return;
  const applicant = state.currentCase && state.currentCase.applicant ? state.currentCase.applicant : null;
  if (!applicant) {
    investigationScreen.innerHTML = `
      <div class="briefing">
        <h2>INVESTIGATION</h2>
        <p class="briefing-quote">No active case. Go back and select a difficulty first.</p>
      </div>
    `;
    return;
  }

  investigationScreen.innerHTML = `
    <div class="investigation">
      <div class="inv-topbar">
        <div class="logo">
          <img class="logo-mark" src="assets/OfficialLogo_AlgoPay.svg" alt="AlgoPay">
        </div>
        <div class="inv-topbar-right">
          <div class="timer-display" id="timer">${formatTime(state.elapsedSeconds)}</div>
          <button class="btn-secondary" onclick="showBriefingModal()">View Application</button>
          <button class="btn-secondary evidence-btn">
            📌 Evidence <span class="evidence-badge" id="evidenceBadge">0</span>
          </button>
          <button class="btn-primary" id="submitBtn" disabled>SUBMIT VERDICT →</button>
        </div>
      </div>

      <div class="inv-context">
        <div class="case-label">Case · ${applicant.name} · ${formatCurrency(applicant.loanAmount)}</div>
        <div class="flags">🚩 Red flags found: <span id="flagCount">0</span></div>
      </div>

      <div class="inv-body">
        <div class="folder-tabs">
          <div class="folder-tab active" data-platform="facebook" onclick="switchPlatform('facebook')">
            <span class="platform-icon fb">f</span> Facebook
          </div>
          <div class="folder-tab" data-platform="instagram" onclick="switchPlatform('instagram')">
            <span class="platform-icon ig">ig</span> Instagram
          </div>
          <div class="folder-tab" data-platform="linkedin" onclick="switchPlatform('linkedin')">
            <span class="platform-icon li">in</span> LinkedIn
          </div>
          <div class="folder-tab" data-platform="twitter" onclick="switchPlatform('twitter')">
            <span class="platform-icon tw">X</span> X/Twitter
          </div>
        </div>
        <div class="folder-body" id="feedArea"></div>
      </div>
    </div>
  `;

  renderFeed();
  updateBadges();
}

function renderVerdict() {}
function renderScore() {}
function renderLeaderboard() {}

function startCase(diff) {
  state.currentCase = CASES[diff];
  state.pinnedEvidence = [];
  state.selectedVerdict = null;
  state.activePin = null;
  state.pinDraft = { reason: null, field: null, note: "", vouchers: {} };
  showScreen("briefing");
}

function updateTimer() {
  if (!state.startTime) return;
  state.elapsedSeconds = Math.floor((Date.now() - state.startTime) / 1000);
  const timerEl = document.getElementById("timer");
  if (timerEl) {
    timerEl.textContent = formatTime(state.elapsedSeconds);
  }
}

function startInvestigation() {
  if (state.timerInterval) {
    clearInterval(state.timerInterval);
  }
  state.startTime = Date.now();
  state.elapsedSeconds = 0;
  state.activePlatform = "facebook";
  state.timerInterval = setInterval(updateTimer, 1000);
  showScreen("investigation");
}

function switchPlatform(platformName) {
  state.activePlatform = platformName;

  const tabs = document.querySelectorAll(".folder-tab");
  tabs.forEach(function toggleActive(tab) {
    tab.classList.toggle("active", tab.dataset.platform === platformName);
  });

  renderFeed();
}

function renderFeed() {
  const feedArea = document.getElementById("feedArea");
  if (!feedArea || !state.currentCase || !state.currentCase.posts) return;

  const posts = state.currentCase.posts[state.activePlatform] || [];
  feedArea.innerHTML = posts
    .map(function mapPost(post) {
      const isPinned = state.pinnedEvidence.some(function matchPinned(evidence) {
        return evidence.postId === post.id;
      });

      return `
        <div class="post ${isPinned ? "pinned" : ""}" onclick="handlePostClick('${post.id}')">
          ${isPinned ? '<div class="pin-icon">📌</div>' : ""}
          <div class="post-header">
            <div class="post-avatar">${post.author.charAt(0).toUpperCase()}</div>
            <div>
              <div class="post-author">${post.author}</div>
              <div class="post-meta">${post.meta}</div>
            </div>
          </div>
          ${post.image ? `<div class="post-image">[${post.image}]</div>` : ""}
          <div class="post-content">${post.content}</div>
          <div class="post-engagement">
            <span>👍 ${post.likes}</span>
            <span>💬 ${post.comments}</span>
            <span>↗ Share</span>
          </div>
        </div>
      `;
    })
    .join("");
}

function openPinPanel(postId) {
  alert("Pin panel will be implemented in A.10.\nSelected post: " + postId);
}

function handlePostClick(postId) {
  const existing = state.pinnedEvidence.find(function findPinned(evidence) {
    return evidence.postId === postId;
  });

  if (existing) {
    const shouldUnpin = confirm("Unpin this evidence?");
    if (!shouldUnpin) return;
    state.pinnedEvidence = state.pinnedEvidence.filter(function filterPinned(evidence) {
      return evidence.postId !== postId;
    });
    renderFeed();
    updateBadges();
    return;
  }

  openPinPanel(postId);
}

function updateBadges() {
  const evidenceBadge = document.getElementById("evidenceBadge");
  const flagCount = document.getElementById("flagCount");
  const submitBtn = document.getElementById("submitBtn");

  const evidenceCount = state.pinnedEvidence.length;
  const redFlagCount = state.pinnedEvidence.reduce(function countFlags(total, evidence) {
    const post = findPostById(state.currentCase, evidence.postId);
    if (!post) return total;
    return post.classification === "strong" || post.classification === "moderate" ? total + 1 : total;
  }, 0);

  if (evidenceBadge) evidenceBadge.textContent = String(evidenceCount);
  if (flagCount) flagCount.textContent = String(redFlagCount);
  if (submitBtn) submitBtn.disabled = evidenceCount <= 0;
}

function showBriefingModal() {
  if (!state.currentCase || !state.currentCase.applicant) return;
  const a = state.currentCase.applicant;
  alert(
    "DECLARED INFO:\n\n" +
      a.name +
      ", " +
      a.age +
      "\n" +
      a.employer +
      " — " +
      a.position +
      "\n" +
      a.tenure +
      " tenure\n" +
      formatCurrency(a.income) +
      "/month\n" +
      formatCurrency(a.loanAmount) +
      " loan for " +
      a.loanPurpose +
      "\n" +
      a.dependents +
      " dependents"
  );
}

window.showScreen = showScreen;
window.startCase = startCase;
window.startInvestigation = startInvestigation;
window.updateTimer = updateTimer;
window.formatTime = formatTime;
window.switchPlatform = switchPlatform;
window.renderFeed = renderFeed;
window.handlePostClick = handlePostClick;
window.updateBadges = updateBadges;
window.showBriefingModal = showBriefingModal;
