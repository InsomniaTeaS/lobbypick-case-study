# Project decisions

These are the decisions that changed LobbyPick the most. They are written as working notes rather than a feature list.

## Start with the group, not the genre

Most game directories begin with broad genres. That did not solve the actual problem I was targeting. A group usually knows how many people are present and how much time they have before it agrees on a genre.

Party size, session length, mood, and device support therefore appear early in the finder. Genre is still available, but it does not control the whole experience.

## Use preferences and dealbreakers differently

Some answers are preferences. A group may prefer a short game but still accept a medium-length one. Other answers are dealbreakers. A console player cannot use a game that does not support the device.

LobbyPick handles these differently:

- Preferences raise or lower a game's score.
- Dealbreakers remove the game from the results.

This avoids empty result pages while respecting requirements that cannot be compromised.

## Keep the site usable without an account

The main action should be finding a game, not registering. Shortlists and recent choices are stored locally in the browser. Filter states can be copied into a link and sent to friends.

An account system may be useful later, but it is not required for the current job.

## Load media only when it is needed

An early version tried to refresh media for the full catalog. With 200 games, that was wasteful and made the site depend too heavily on the Roblox media service.

The final approach uses a generated local manifest for the catalog. A current media request is made only after somebody opens a game's detail view or full guide. If that request fails, the local manifest remains available.

## Treat mobile as its own layout

Shrinking the desktop page was not enough. Cards became cramped, controls were too small, and long text was hard to scan.

The phone layout changed the structure:

- One main column
- Larger touch targets
- Shorter section spacing
- Stacked result actions
- Horizontal scrolling only where it helps
- Breakpoints for 320-pixel phones through larger portrait screens

## Keep creator links contextual

The creator directory could easily look like a list of endorsements. I changed the wording so each card explains that the channel is linked only where its normal coverage can help somebody understand a game or genre.

Creator cards also show the related games, link directly to the correct channel, and provide a prepared sharing link.

## Separate catalog depth from SEO depth

A 200-game finder does not need 200 thin pages. I created full pages for selected games and wrote focused guides around real searches such as party size, mobile support, short sessions, and low pay-to-win pressure.

The remaining catalog entries still work inside the finder and can receive full guides later when there is enough useful material.

