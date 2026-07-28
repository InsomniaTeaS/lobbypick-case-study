/*
  Simplified example of LobbyPick's matching approach.
  The production catalog and application state are intentionally omitted.
*/

export function scoreGame(game, choices) {
  let score = 35;

  // Hard requirements remove a game instead of merely lowering its rank.
  if (choices.device !== "any" && !game.devices.includes(choices.device)) {
    return null;
  }

  if (choices.partySize < game.minimumPlayers) {
    return null;
  }

  if (choices.freePrivateServer && !game.freePrivateServer) {
    return null;
  }

  // Preferences affect the order but still allow reasonable alternatives.
  if (choices.mood !== "any") {
    score += game.moods.includes(choices.mood) ? 24 : -12;
  }

  if (choices.sessionLength !== "any") {
    score += game.sessionLength === choices.sessionLength ? 18 : -7;
  }

  if (choices.lowPayToWin) {
    score += game.payToWinPressure === "low" ? 14 : -20;
  }

  return score;
}

export function rankGames(games, choices) {
  return games
    .map((game) => ({ ...game, matchScore: scoreGame(game, choices) }))
    .filter((game) => game.matchScore !== null && game.matchScore >= 0)
    .sort((a, b) => b.matchScore - a.matchScore);
}

