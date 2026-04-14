document.addEventListener("DOMContentLoaded", function onReady() {
  const app = document.getElementById("app");
  if (!app) return;

  console.log("AlgoPay Loan Investigator vBackup loaded");

  state.leaderboards = loadLeaderboards();

  app.innerHTML = `
    <div id="screen-home" class="screen"></div>
    <div id="screen-difficulty" class="screen"></div>
    <div id="screen-briefing" class="screen"></div>
    <div id="screen-investigation" class="screen"></div>
    <div id="screen-verdict" class="screen"></div>
    <div id="screen-score" class="screen"></div>
    <div id="screen-leaderboard" class="screen"></div>
  `;

  showScreen("home");

  document.addEventListener("keydown", function handleEscape(event) {
    if (event.key !== "Escape") return;
    const pinPanel = document.getElementById("pinPanel");
    if (!pinPanel || pinPanel.classList.contains("hidden")) return;
    if (typeof closePinPanel === "function") {
      closePinPanel();
    }
  });
});
