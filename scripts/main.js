document.addEventListener("DOMContentLoaded", function onReady() {
  const app = document.getElementById("app");
  if (!app) return;

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
});
