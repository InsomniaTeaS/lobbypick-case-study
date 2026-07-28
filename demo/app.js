const form = document.querySelector("#finder-form");
const partySize = document.querySelector("#party-size");
const mood = document.querySelector("#mood");
const device = document.querySelector("#device");
const freePrivate = document.querySelector("#free-private");
const resetButton = document.querySelector("#reset-button");
const randomButton = document.querySelector("#random-button");
const grid = document.querySelector("#game-grid");
const resultSummary = document.querySelector("#result-summary");
const emptyState = document.querySelector("#empty-state");
const cards = [...document.querySelectorAll(".game-card")];

function readList(card, key) {
  return card.dataset[key].split(",").map((value) => value.trim());
}

function scoreCard(card) {
  const selectedParty = partySize.value === "any" ? null : Number(partySize.value);
  const minimumPlayers = Number(card.dataset.minPlayers);
  const maximumPlayers = Number(card.dataset.maxPlayers);
  const supportedDevices = readList(card, "devices");
  const moods = readList(card, "moods");
  let score = 35;

  // Party size and device support are hard requirements.
  if (
    selectedParty !== null &&
    (selectedParty < minimumPlayers || selectedParty > maximumPlayers)
  ) {
    return null;
  }

  if (device.value !== "any" && !supportedDevices.includes(device.value)) {
    return null;
  }

  if (freePrivate.checked && card.dataset.private !== "true") {
    return null;
  }

  // Mood is a preference. A close alternative can still remain visible.
  if (mood.value !== "any") {
    score += moods.includes(mood.value) ? 28 : -14;
  }

  if (selectedParty !== null) {
    score += 18;
  }

  if (device.value !== "any") {
    score += 14;
  }

  if (freePrivate.checked) {
    score += 12;
  }

  return score;
}

function matchText(score) {
  if (score >= 90) return "Excellent match";
  if (score >= 70) return "Strong match";
  if (score >= 50) return "Good match";
  return "Possible match";
}

function updateResults() {
  cards.forEach((card) => card.classList.remove("is-random-pick"));

  const rankedCards = cards
    .map((card) => ({ card, score: scoreCard(card) }))
    .sort((a, b) => {
      if (a.score === null) return 1;
      if (b.score === null) return -1;
      return b.score - a.score || a.card.dataset.title.localeCompare(b.card.dataset.title);
    });

  let visibleCount = 0;

  rankedCards.forEach(({ card, score }) => {
    const isVisible = score !== null && score >= 0;
    card.hidden = !isVisible;

    if (isVisible) {
      visibleCount += 1;
      card.querySelector(".match-label").textContent = matchText(score);
    }

    grid.append(card);
  });

  resultSummary.textContent =
    visibleCount === 1
      ? "1 game meets the current requirements."
      : `${visibleCount} games meet the current requirements.`;

  emptyState.hidden = visibleCount !== 0;
  randomButton.disabled = visibleCount === 0;
}

function resetChoices() {
  form.reset();
  updateResults();
  partySize.focus();
}

function pickRandomGame() {
  const visibleCards = cards.filter((card) => !card.hidden);

  cards.forEach((card) => card.classList.remove("is-random-pick"));

  if (!visibleCards.length) return;

  const selectedCard =
    visibleCards[Math.floor(Math.random() * visibleCards.length)];

  selectedCard.classList.add("is-random-pick");
  selectedCard.scrollIntoView({ behavior: "smooth", block: "center" });
  resultSummary.textContent = `Random pick: ${selectedCard.dataset.title}`;
}

form.addEventListener("change", updateResults);
resetButton.addEventListener("click", resetChoices);
randomButton.addEventListener("click", pickRandomGame);

updateResults();

