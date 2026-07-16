const intensity = document.querySelector("#intensity");
const output = document.querySelector("#intensity-output");
const commentaryMeter = document.querySelector("#commentary-meter");
const jeopardyMeter = document.querySelector("#jeopardy-meter");
const muteButton = document.querySelector("#mute-button");
const transcript = document.querySelector(".transcript");
const panelState = document.querySelector("#panel-state");
const waitlistForm = document.querySelector(".waitlist-form");

function setIntensity(value) {
  const normalized = Number(value);
  const isMuted = muteButton.getAttribute("aria-pressed") === "true";
  output.textContent = `${normalized}%`;
  commentaryMeter.style.setProperty("--level", isMuted ? "12%" : `${Math.max(8, normalized)}%`);
  jeopardyMeter.style.setProperty("--level", `${Math.min(100, normalized + 19)}%`);
}

function setMuted(isMuted) {
  muteButton.classList.toggle("is-muted", isMuted);
  transcript.classList.toggle("is-muted", isMuted);
  muteButton.setAttribute("aria-pressed", String(isMuted));
  muteButton.lastChild.textContent = isMuted ? " Buxton muted" : " Engage Buxton mute";
  panelState.textContent = isMuted ? "Ducking" : "Monitoring";
  commentaryMeter.style.setProperty("--level", isMuted ? "12%" : `${intensity.value}%`);

  transcript.querySelectorAll("span").forEach((line) => {
    line.textContent = isMuted ? "[tastefully muted]" : line.dataset.original;
  });
}

intensity.addEventListener("input", (event) => {
  setIntensity(event.target.value);
});

muteButton.addEventListener("click", () => {
  setMuted(muteButton.getAttribute("aria-pressed") !== "true");
});

waitlistForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const button = waitlistForm.querySelector("button");
  button.textContent = "Beta request logged";
  button.disabled = true;
});

setIntensity(intensity.value);
