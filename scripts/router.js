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

const EVIDENCE_PREVIEW_PLACEHOLDER = "assets/evidence-placeholder.png";
let pinPanelHideTimer = null;

if (typeof Image !== "undefined") {
  const evidencePreviewPreload = new Image();
  evidencePreviewPreload.src = EVIDENCE_PREVIEW_PLACEHOLDER;
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
          <img class="diff-card-avatar" src="assets/avatar-easy.png" alt="Applicant photo">
          <span class="diff-badge">EASY</span>
          <h3>Linda Walker</h3>
          <p class="case-desc">Standard personal loan packet. Corroborate declarations against supporting records as filed.</p>
          <div class="best-time">Best: ${getBestTime("easy")}</div>
        </div>

        <div class="diff-card medium" onclick="startCase('medium')">
          <img class="diff-card-avatar" src="assets/avatar-medium.png" alt="Applicant photo">
          <span class="diff-badge">MEDIUM</span>
          <h3>Pest O Ann Tara</h3>
          <p class="case-desc">Business facility request. Verify income, collateral, and operational consistency across uploads.</p>
          <div class="best-time">Best: ${getBestTime("medium")}</div>
        </div>

        <div class="diff-card hard" onclick="startCase('hard')">
          <img class="diff-card-avatar" src="assets/avatar-hard.png" alt="Applicant photo">
          <span class="diff-badge">HARD</span>
          <h3>Wai Fi Ni Peter</h3>
          <p class="case-desc">Unsecured loan with a busy file. Cross-check timeline, employment, and public footprint for alignment.</p>
          <div class="best-time">Best: ${getBestTime("hard")}</div>
        </div>

        <div class="diff-card extreme" onclick="startCase('extreme')">
          <img class="diff-card-avatar" src="assets/avatar-extreme.png" alt="Applicant photo">
          <span class="diff-badge">EXTREME</span>
          <h3>Ha Uac M. Angbit</h3>
          <p class="case-desc">High-volume dossier with extensive attachments. Review methodically before stamping a verdict.</p>
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
          <button class="btn-secondary evidence-btn" onclick="showEvidenceList()">
            📌 Evidence <span class="evidence-badge" id="evidenceBadge">0</span>
          </button>
          <button class="btn-primary" id="submitBtn" onclick="goToVerdict()" disabled>SUBMIT VERDICT →</button>
        </div>
      </div>

      <div class="inv-context">
        <div class="case-label">Case · ${applicant.name} · ${formatCurrency(applicant.loanAmount)}</div>
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

      <div id="pinPanel" class="pin-overlay hidden" onclick="handlePinOverlayClick(event)">
        <div class="evidence-preview-wrap">
          <div class="evidence-preview-card">
            <div class="evidence-preview-header">
              <span class="evidence-preview-badge">EVIDENCE PREVIEW</span>
              <span class="evidence-preview-platform" id="evidencePreviewPlatform">Facebook</span>
            </div>
            <div class="evidence-preview-frame">
              <button type="button" class="evidence-nav-btn evidence-nav-prev" onclick="event.stopPropagation(); navigateEvidence(-1)" aria-label="Previous post">&lsaquo;</button>
              <button type="button" class="evidence-nav-btn evidence-nav-next" onclick="event.stopPropagation(); navigateEvidence(1)" aria-label="Next post">&rsaquo;</button>
              <span class="evidence-nav-counter" id="evidenceNavCounter">1 / 3</span>
              <img
                id="evidencePreviewBackdrop"
                class="evidence-preview-backdrop"
                src="${EVIDENCE_PREVIEW_PLACEHOLDER}"
                alt=""
                aria-hidden="true"
              >
              <img
                id="evidencePreviewImage"
                class="evidence-preview-image"
                src="${EVIDENCE_PREVIEW_PLACEHOLDER}"
                alt="Evidence screenshot preview"
              >
            </div>
            <div class="evidence-preview-caption">
              <div class="evidence-preview-title" id="evidencePreviewTitle">Feed post screenshot placeholder</div>
              <div class="evidence-preview-meta" id="evidencePreviewMeta">You can replace this with the real screenshot later.</div>
              <div class="evidence-preview-excerpt" id="evidencePreviewExcerpt">Tap Save Evidence once classification is complete.</div>
            </div>
          </div>
        </div>
        <div class="pin-panel">
          <div class="pin-panel-header">
            <h3>📌 CLASSIFY EVIDENCE</h3>
            <button class="close-btn" onclick="closePinPanel()">✕</button>
          </div>

          <div class="pin-step">
            <div class="step-label">STEP 1 · WHY SUSPICIOUS?</div>
            <div class="radio-option" data-reason="contradiction" onclick="selectPinReason('contradiction')">
              <div class="radio-dot"></div>
              <div class="radio-text">No Match / Contradiction</div>
            </div>
            <div class="radio-option" data-reason="misinformation" onclick="selectPinReason('misinformation')">
              <div class="radio-dot"></div>
              <div class="radio-text">Misinformation</div>
            </div>
            <div class="radio-option" data-reason="other" onclick="selectPinReason('other')">
              <div class="radio-dot"></div>
              <div class="radio-text">Other Red Flag</div>
            </div>
          </div>

          <div class="pin-step">
            <div class="step-label">STEP 2 · WHICH FIELD?</div>
            <div class="chip-grid">
              <div class="chip" data-field="age" onclick="selectPinField('age')">Age</div>
              <div class="chip" data-field="address" onclick="selectPinField('address')">Address</div>
              <div class="chip" data-field="employer" onclick="selectPinField('employer')">Employer</div>
              <div class="chip" data-field="position" onclick="selectPinField('position')">Position</div>
              <div class="chip" data-field="tenure" onclick="selectPinField('tenure')">Tenure</div>
              <div class="chip" data-field="income" onclick="selectPinField('income')">Income</div>
              <div class="chip" data-field="purpose" onclick="selectPinField('purpose')">Purpose</div>
              <div class="chip" data-field="dependents" onclick="selectPinField('dependents')">Dependents</div>
            </div>
          </div>

          <div class="pin-step">
            <div class="step-label">STEP 3 · QUICK NOTE (OPTIONAL)</div>
            <textarea
              id="pinNote"
              class="pin-note"
              placeholder="e.g., Post says he's 17 but applicant declared 21..."
              oninput="updatePinNote(this.value)"
            ></textarea>
          </div>

          <div class="pin-footer">
            <div class="strength-preview">
              <span>Evidence strength</span>
              <span class="strength-stars" id="strengthStars">—</span>
            </div>
            <div class="pin-actions">
              <button class="btn-cancel" onclick="closePinPanel()">Cancel</button>
              <button class="btn-save" onclick="saveEvidence()">SAVE EVIDENCE →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  renderFeed();
  updateBadges();
}

function goToVerdict() {
  if (state.timerInterval) {
    clearInterval(state.timerInterval);
    state.timerInterval = null;
  }
  showScreen("verdict");
}

function renderVerdict() {
  const verdictScreen = document.getElementById("screen-verdict");
  if (!verdictScreen) return;

  const applicantName =
    state.currentCase && state.currentCase.applicant && state.currentCase.applicant.name
      ? state.currentCase.applicant.name
      : "Applicant";
  const approveSelected = state.selectedVerdict === "approve";
  const rejectSelected = state.selectedVerdict === "reject";

  verdictScreen.innerHTML = `
    <div class="verdict">
      <h2>YOUR VERDICT</h2>
      <p class="verdict-intro">Based on your investigation, what's your recommendation for ${applicantName}?</p>

      <div class="verdict-options">
        <div class="verdict-option approve ${approveSelected ? "selected" : ""}" id="verdictApproveCard" onclick="selectVerdict('approve')">
          <div class="verdict-icon">✓</div>
          <div class="verdict-title">APPROVE</div>
          <div class="verdict-desc">Application is clean. Proceed with disbursement.</div>
        </div>

        <div class="verdict-option reject ${rejectSelected ? "selected" : ""}" id="verdictRejectCard" onclick="selectVerdict('reject')">
          <div class="verdict-icon">✕</div>
          <div class="verdict-title">REJECT</div>
          <div class="verdict-desc">Material misrepresentation found. Deny application.</div>
        </div>
      </div>

      <button class="btn-primary" id="submitVerdictBtn" onclick="submitVerdict()" ${
        state.selectedVerdict ? "" : "disabled"
      }>
        SUBMIT VERDICT
      </button>
    </div>
  `;
}

function selectVerdict(verdict) {
  state.selectedVerdict = verdict;

  const approveCard = document.getElementById("verdictApproveCard");
  const rejectCard = document.getElementById("verdictRejectCard");
  const submitVerdictBtn = document.getElementById("submitVerdictBtn");

  if (approveCard) {
    approveCard.classList.toggle("selected", verdict === "approve");
  }
  if (rejectCard) {
    rejectCard.classList.toggle("selected", verdict === "reject");
  }
  if (submitVerdictBtn) {
    submitVerdictBtn.disabled = !state.selectedVerdict;
  }
}

function submitVerdict() {
  if (!state.selectedVerdict) return;
  const confirmed = confirm("Submit your verdict? This cannot be undone.");
  if (!confirmed) return;

  if (state.timerInterval) {
    clearInterval(state.timerInterval);
    state.timerInterval = null;
  }

  calculateAndShowScore();
}

function calculateAndShowScore() {
  if (!state.currentCase) return;

  const breakdown = window.calculateFinalScore(
    state.currentCase,
    state.pinnedEvidence,
    state.selectedVerdict
  );
  const isCorrect = state.selectedVerdict === state.currentCase.correctVerdict;

  state.sessionScore += breakdown.total;
  state.casesClosed += 1;

  const rawName = prompt("Enter your name for the leaderboard:", "Player");
  const cleanedName = typeof rawName === "string" ? rawName.trim() : "";
  const playerName = (cleanedName || "Player").slice(0, 20);

  window.addLeaderboardEntry(
    state.currentCase.id,
    playerName,
    breakdown.total,
    state.elapsedSeconds
  );

  state.latestScoreBreakdown = breakdown;
  state.latestVerdictCorrect = isCorrect;

  renderScore(breakdown, isCorrect);
  showScreen("score");

  if (!isCorrect) {
    setTimeout(showConsequence, 1500);
  }
}

function renderScore(breakdown, isCorrect) {
  const scoreScreen = document.getElementById("screen-score");
  if (!scoreScreen) return;

  const resolvedBreakdown = breakdown || state.latestScoreBreakdown;
  const resolvedIsCorrect =
    typeof isCorrect === "boolean" ? isCorrect : Boolean(state.latestVerdictCorrect);

  if (!resolvedBreakdown || !state.currentCase || !state.currentCase.applicant) {
    scoreScreen.innerHTML = `
      <div class="score-screen">
        <h2>CASE CLOSED</h2>
        <p class="score-subtitle">No score available yet.</p>
      </div>
    `;
    return;
  }

  const applicantName = state.currentCase.applicant.name || "Applicant";
  const difficulty = state.currentCase.difficulty || "";
  const evidenceCount = state.pinnedEvidence.length;
  const verdictStateLabel = resolvedIsCorrect ? "IDEAL" : "WRONG";
  const verdictPillText = resolvedIsCorrect ? "✓ CORRECT VERDICT" : "✕ WRONG VERDICT";
  const verdictPillClass = resolvedIsCorrect ? "correct" : "wrong";

  function formatSigned(value) {
    const numeric = Number(value) || 0;
    return numeric > 0 ? "+" + numeric : String(numeric);
  }

  scoreScreen.innerHTML = `
    <div class="score-screen">
      <h2>CASE CLOSED</h2>
      <p class="score-subtitle">${applicantName} · ${difficulty}</p>
      <div class="verdict-result ${verdictPillClass}">${verdictPillText}</div>
      <div class="score-big">${resolvedBreakdown.total} PTS</div>
      <div class="score-time">⏱ ${formatTime(state.elapsedSeconds)}</div>

      <div class="score-breakdown">
        <div class="score-row"><span>Evidence pinned (${evidenceCount})</span><span>${formatSigned(
          resolvedBreakdown.evidencePoints
        )}</span></div>
        <div class="score-row"><span>Classification accuracy</span><span>${formatSigned(
          resolvedBreakdown.classificationBonus
        )}</span></div>
        <div class="score-row"><span>Field targeting</span><span>${formatSigned(
          resolvedBreakdown.fieldBonus
        )}</span></div>
        <div class="score-row"><span>Verdict: ${verdictStateLabel}</span><span>${formatSigned(
          resolvedBreakdown.verdictPoints
        )}</span></div>
        <div class="score-row"><span>TOTAL</span><span>${resolvedBreakdown.total} pts</span></div>
      </div>

      <div class="score-actions">
        <button class="btn-secondary" onclick="showScreen('leaderboard')">VIEW LEADERBOARD</button>
        <button class="btn-primary" onclick="showScreen('home')">BACK TO HOME</button>
      </div>
    </div>
  `;
}

function renderLeaderboard() {
  const leaderboardScreen = document.getElementById("screen-leaderboard");
  if (!leaderboardScreen) return;

  const activeDiff = state.currentLBTab || "easy";
  const entries = (state.leaderboards && state.leaderboards[activeDiff]
    ? state.leaderboards[activeDiff]
    : []
  ).slice(0, 10);

  function rankLabel(index) {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return "#" + (index + 1);
  }

  const listMarkup = entries.length
    ? `
      <div class="lb-row header">
        <span class="lb-rank">RANK</span>
        <span>NAME</span>
        <span>TIME</span>
        <span>SCORE</span>
      </div>
      ${entries
        .map(function renderEntry(entry, index) {
          return `
            <div class="lb-row">
              <span class="lb-rank">${rankLabel(index)}</span>
              <span>${entry.name || "Player"}</span>
              <span>${formatTime(entry.time)}</span>
              <span class="lb-score">${Number(entry.score) || 0} pts</span>
            </div>
          `;
        })
        .join("")}
    `
    : '<div class="lb-empty">No scores yet. Be the first!</div>';

  leaderboardScreen.innerHTML = `
    <div class="leaderboard">
      <h2>🏆 LEADERBOARD</h2>
      <div class="lb-tabs">
        <button class="lb-tab ${activeDiff === "easy" ? "active" : ""}" onclick="switchLBTab('easy')">Easy</button>
        <button class="lb-tab ${activeDiff === "medium" ? "active" : ""}" onclick="switchLBTab('medium')">Medium</button>
        <button class="lb-tab ${activeDiff === "hard" ? "active" : ""}" onclick="switchLBTab('hard')">Hard</button>
        <button class="lb-tab ${activeDiff === "extreme" ? "active" : ""}" onclick="switchLBTab('extreme')">Extreme</button>
      </div>
      <div class="lb-list">
        ${listMarkup}
      </div>
      <div class="score-actions">
        <button class="btn-primary" onclick="showScreen('home')">BACK TO HOME</button>
      </div>
    </div>
  `;
}

function startCase(diff) {
  state.currentCase = CASES[diff];
  state.pinnedEvidence = [];
  state.selectedVerdict = null;
  state.activePin = null;
  state.pinDraft = { reason: null, field: null, note: "" };
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

  const feedArea = document.getElementById("feedArea");
  if (!feedArea) {
    renderFeed();
    return;
  }

  feedArea.classList.add("feed-fade-out");
  setTimeout(function swapFeed() {
    renderFeed();
    feedArea.classList.remove("feed-fade-out");
    feedArea.classList.add("feed-fade-in");
    setTimeout(function clearFeedFadeIn() {
      feedArea.classList.remove("feed-fade-in");
    }, 200);
  }, 120);
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
      const imageValue = typeof post.image === "string" ? post.image.trim() : "";
      const hasValidImagePath =
        imageValue.startsWith("assets/") && /\.(png|jpe?g|webp|gif|svg)$/i.test(imageValue);
      const imageMarkup = hasValidImagePath
        ? `<img class="post-image" src="${imageValue}" alt="${post.author} post image" loading="lazy">`
        : '<div class="post-image-placeholder">No post photo provided</div>';
      const contentValue = typeof post.content === "string" ? post.content.trim() : "";
      const contentText = hasValidImagePath && !contentValue ? "See image for details" : post.content;

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
          ${imageMarkup}
          <div class="post-content">${contentText}</div>
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

function navigateEvidence(direction) {
  if (!state.activePin || !state.currentCase) return;
  var posts = state.currentCase.posts[state.activePlatform] || [];
  if (posts.length === 0) return;
  var currentIndex = posts.findIndex(function findActive(post) {
    return post.id === state.activePin;
  });
  if (currentIndex === -1) return;
  var nextIndex = (currentIndex + direction + posts.length) % posts.length;
  openPinPanel(posts[nextIndex].id);
}

function openPinPanel(postId) {
  const post = findPostById(state.currentCase, postId);
  if (!post) return;

  const pinPanel = document.getElementById("pinPanel");
  const note = document.getElementById("pinNote");
  const previewBackdrop = document.getElementById("evidencePreviewBackdrop");
  const previewImage = document.getElementById("evidencePreviewImage");
  const previewPlatform = document.getElementById("evidencePreviewPlatform");
  const previewTitle = document.getElementById("evidencePreviewTitle");
  const previewMeta = document.getElementById("evidencePreviewMeta");
  const previewExcerpt = document.getElementById("evidencePreviewExcerpt");
  if (!pinPanel || !note || !previewBackdrop || !previewImage || !previewPlatform || !previewTitle || !previewMeta || !previewExcerpt) return;

  state.activePin = postId;
  state.pinDraft = { reason: null, field: null, note: "" };

  note.value = "";
  var hasImage = typeof post.image === "string" && post.image.trim() !== "";
  var imageSrc = hasImage ? post.image : EVIDENCE_PREVIEW_PLACEHOLDER;
  previewBackdrop.src = imageSrc;
  previewImage.src = imageSrc;
  var platformLabel = String(post.platform || state.activePlatform || "feed");
  previewPlatform.textContent = platformLabel;
  previewTitle.textContent = (post.author || "Applicant") + " — " + platformLabel + " post";
  previewMeta.textContent = post.meta || "";
  previewExcerpt.textContent =
    post.previewDescription || post.content || "No additional context available.";

  var feedPosts = state.currentCase.posts[state.activePlatform] || [];
  var currentIndex = feedPosts.findIndex(function findById(p) {
    return p.id === postId;
  });
  var counter = document.getElementById("evidenceNavCounter");
  if (counter && currentIndex >= 0) {
    counter.textContent = String(currentIndex + 1) + " / " + String(feedPosts.length);
  }

  document.querySelectorAll(".radio-option").forEach(function clearReason(option) {
    option.classList.remove("selected");
  });
  document.querySelectorAll(".chip").forEach(function clearField(chip) {
    chip.classList.remove("selected");
  });

  updateStrength();
  if (pinPanelHideTimer) {
    clearTimeout(pinPanelHideTimer);
    pinPanelHideTimer = null;
  }
  pinPanel.classList.remove("hidden");
  requestAnimationFrame(function showPinPanel() {
    pinPanel.classList.add("is-visible");
  });
}

function selectPinReason(reason) {
  state.pinDraft.reason = reason;
  document.querySelectorAll(".radio-option").forEach(function toggleReason(option) {
    option.classList.toggle("selected", option.dataset.reason === reason);
  });
  updateStrength();
}

function selectPinField(field) {
  state.pinDraft.field = field;
  document.querySelectorAll(".chip").forEach(function toggleField(chip) {
    chip.classList.toggle("selected", chip.dataset.field === field);
  });
  updateStrength();
}

function updatePinNote(noteValue) {
  state.pinDraft.note = noteValue;
}

function updateStrength() {
  const strengthStars = document.getElementById("strengthStars");
  if (!strengthStars) return;
  if (!state.pinDraft.reason || !state.pinDraft.field) {
    strengthStars.textContent = "—";
    return;
  }

  const post = findPostById(state.currentCase, state.activePin);
  if (!post) {
    strengthStars.textContent = "? UNCERTAIN";
    return;
  }

  if (post.classification === "strong") {
    strengthStars.textContent = "★★★ STRONG";
    return;
  }
  if (post.classification === "moderate") {
    strengthStars.textContent = "★★ MODERATE";
    return;
  }
  if (post.classification === "weak") {
    strengthStars.textContent = "★ WEAK";
    return;
  }
  strengthStars.textContent = "? UNCERTAIN";
}

function saveEvidence() {
  if (!state.activePin) return;

  if (!state.pinDraft.reason || !state.pinDraft.field) {
    alert("Please complete Step 1 and Step 2 before saving.");
    return;
  }

  const post = findPostById(state.currentCase, state.activePin);
  if (!post) return;

  state.pinnedEvidence.push({
    postId: post.id,
    reason: state.pinDraft.reason,
    field: state.pinDraft.field,
    note: state.pinDraft.note
  });

  closePinPanel();
  renderFeed();
  updateBadges();
}

function showEvidenceList() {
  if (state.pinnedEvidence.length === 0) {
    alert("No evidence pinned yet.");
    return;
  }

  const lines = state.pinnedEvidence
    .map(function mapEvidence(evidence, index) {
      const post = findPostById(state.currentCase, evidence.postId);
      if (!post) return null;
      const excerpt = post.content.length > 60 ? post.content.slice(0, 60) + "..." : post.content;
      const reasonLabel = evidence.reason || "auto";
      const fieldLabel = evidence.field || "auto";
      return (
        String(index + 1) +
        '. "' +
        excerpt +
        '"\n   → ' +
        reasonLabel +
        " · " +
        fieldLabel
      );
    })
    .filter(Boolean)
    .join("\n\n");

  alert("PINNED EVIDENCE:\n\n" + lines);
}

function handlePinOverlayClick(event) {
  if (!event || !event.target) return;
  if (event.target.id === "pinPanel") {
    closePinPanel();
  }
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
  const submitBtn = document.getElementById("submitBtn");

  const evidenceCount = state.pinnedEvidence.length;

  if (evidenceBadge) evidenceBadge.textContent = String(evidenceCount);
  if (submitBtn) submitBtn.disabled = evidenceCount <= 0;
}

function showBriefingModal() {
  if (!state.currentCase || !state.currentCase.applicant) return;
  var a = state.currentCase.applicant;
  var initial = (a.name || "?").charAt(0).toUpperCase();

  var modal = document.getElementById("briefingModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "briefingModal";
    document.body.appendChild(modal);
  }

  modal.className = "briefing-folder-overlay";
  modal.innerHTML = `
    <div class="briefing-folder">
      <div class="folder-front">
        <div class="briefing-folder-tab"></div>
        <div class="folder-clip">📎</div>
        <div class="folder-lines"></div>
      </div>
      <div class="folder-interior">
        <div class="folder-content">
          <div class="folder-dossier-header">
            <div class="folder-avatar">${initial}</div>
            <div>
              <div class="folder-dossier-name">${a.name}</div>
              <div class="folder-dossier-sub">Age ${a.age} · ${a.civilStatus} · ${a.address}</div>
            </div>
          </div>
          <div class="folder-dossier-fields">
            <div class="folder-dossier-field"><div class="label">EMPLOYER</div><div class="value">${a.employer}</div></div>
            <div class="folder-dossier-field"><div class="label">POSITION</div><div class="value">${a.position}</div></div>
            <div class="folder-dossier-field"><div class="label">TENURE</div><div class="value">${a.tenure}</div></div>
            <div class="folder-dossier-field"><div class="label">MONTHLY INCOME</div><div class="value">${formatCurrency(a.income)}</div></div>
            <div class="folder-dossier-field"><div class="label">LOAN AMOUNT</div><div class="value">${formatCurrency(a.loanAmount)}</div></div>
            <div class="folder-dossier-field"><div class="label">LOAN PURPOSE</div><div class="value">${a.loanPurpose}</div></div>
            <div class="folder-dossier-field"><div class="label">DEPENDENTS</div><div class="value">${a.dependents}</div></div>
            <div class="folder-dossier-field"><div class="label">ADDRESS</div><div class="value">${a.address}</div></div>
          </div>
          <button class="btn-primary folder-close-btn" onclick="closeBriefingModal()">CLOSE FILE</button>
        </div>
      </div>
    </div>
  `;

  modal.style.display = "flex";

  requestAnimationFrame(function startPhase1() {
    modal.classList.add("folder-visible");

    setTimeout(function startPhase2() {
      modal.classList.add("folder-open");
    }, 400);

    setTimeout(function startPhase3() {
      modal.classList.add("folder-content-visible");
    }, 900);
  });

  modal.addEventListener("click", function onBackdropClick(event) {
    if (event.target === modal) {
      closeBriefingModal();
    }
  });
}

function closeBriefingModal() {
  var modal = document.getElementById("briefingModal");
  if (!modal) return;

  modal.classList.remove("folder-content-visible");
  modal.classList.remove("folder-open");

  setTimeout(function fadeOut() {
    modal.classList.remove("folder-visible");
  }, 200);

  setTimeout(function hideModal() {
    modal.style.display = "none";
  }, 600);
}

function showConsequence() {
  if (!state.currentCase || !state.currentCase.consequences) return;

  const branch =
    state.selectedVerdict === "approve"
      ? state.currentCase.consequences.wrongApprove
      : state.currentCase.consequences.wrongReject;
  if (!branch) return;

  let consequenceModal = document.getElementById("consequenceModal");
  if (!consequenceModal) {
    consequenceModal = document.createElement("div");
    consequenceModal.id = "consequenceModal";
    document.body.appendChild(consequenceModal);
  }

  const trustValue = Number(branch.impact && branch.impact.trust) || 0;
  const trustText = trustValue > 0 ? "+" + trustValue : String(trustValue);
  const lossValue = Number(branch.impact && branch.impact.loss) || 0;

  consequenceModal.className = "consequence-overlay";
  consequenceModal.style.display = "flex";
  consequenceModal.innerHTML = `
    <div class="consequence-modal">
      <div class="consequence-header">
        <div class="consequence-sender">
          <div class="consequence-av">AV</div>
          <div class="consequence-sender-meta">
            <div class="consequence-sender-name">Ate Vivien Cruz</div>
            <div class="consequence-sender-role">Senior Risk Officer</div>
          </div>
        </div>
        <div class="consequence-time">2 weeks later</div>
      </div>

      <div class="consequence-subject">
        <div class="label">SUBJECT</div>
        <div class="text">${branch.subject}</div>
      </div>

      <div class="consequence-body">
        <p>${branch.body}</p>
        <div class="consequence-quote">${branch.pullquote}</div>
      </div>

      <div class="consequence-impact">
        <div class="impact-label">IMPACT REPORT</div>
        <div class="impact-grid">
          <div class="impact-card">
            <div class="lbl">DEFAULT LOSS</div>
            <div class="val">${formatCurrency(lossValue)}</div>
          </div>
          <div class="impact-card">
            <div class="lbl">TRUST POINTS</div>
            <div class="val">${trustText}</div>
          </div>
          <div class="impact-card">
            <div class="lbl">LESSON</div>
            <div class="val val-lesson">${branch.impact && branch.impact.lesson ? branch.impact.lesson : "—"}</div>
          </div>
        </div>
      </div>

      <div class="consequence-actions">
        <button class="btn-cancel" onclick="closeConsequence()">Next Case</button>
        <button class="btn-save" onclick="closeConsequence()">I'll Do Better</button>
      </div>
    </div>
  `;
}

function closeConsequence() {
  const consequenceModal = document.getElementById("consequenceModal");
  if (!consequenceModal) return;
  consequenceModal.style.display = "none";
}

function closePinPanel() {
  const pinPanel = document.getElementById("pinPanel");
  if (!pinPanel) return;
  pinPanel.classList.remove("is-visible");
  if (pinPanelHideTimer) {
    clearTimeout(pinPanelHideTimer);
  }
  pinPanelHideTimer = setTimeout(function hidePinPanel() {
    pinPanel.classList.add("hidden");
    pinPanelHideTimer = null;
  }, 620);
  state.activePin = null;
}

function switchLBTab(diff) {
  state.currentLBTab = diff;
  renderLeaderboard();
}

window.showScreen = showScreen;
window.startCase = startCase;
window.startInvestigation = startInvestigation;
window.updateTimer = updateTimer;
window.formatTime = formatTime;
window.switchPlatform = switchPlatform;
window.renderFeed = renderFeed;
window.handlePostClick = handlePostClick;
window.navigateEvidence = navigateEvidence;
window.openPinPanel = openPinPanel;
window.selectPinReason = selectPinReason;
window.selectPinField = selectPinField;
window.updatePinNote = updatePinNote;
window.updateStrength = updateStrength;
window.saveEvidence = saveEvidence;
window.showEvidenceList = showEvidenceList;
window.handlePinOverlayClick = handlePinOverlayClick;
window.updateBadges = updateBadges;
window.showBriefingModal = showBriefingModal;
window.closeBriefingModal = closeBriefingModal;
window.goToVerdict = goToVerdict;
window.renderVerdict = renderVerdict;
window.selectVerdict = selectVerdict;
window.submitVerdict = submitVerdict;
window.calculateAndShowScore = calculateAndShowScore;
window.renderScore = renderScore;
window.showConsequence = showConsequence;
window.closeConsequence = closeConsequence;
window.closePinPanel = closePinPanel;
window.switchLBTab = switchLBTab;
window.renderLeaderboard = renderLeaderboard;
