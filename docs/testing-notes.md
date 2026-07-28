# Testing notes

LobbyPick changed often, so I kept the release checks practical. The goal was to catch problems a visitor would notice before publishing another package.

## Page checks

Every HTML page was checked for:

- A complete document structure
- A unique title and useful description
- Viewport metadata
- Valid local links and assets
- Unique element IDs
- Labels connected to the correct controls
- Structured data where the page required it

The final validation covered 53 HTML pages.

## Catalog and media checks

I confirmed:

- 200 unique games in the catalog
- 50 games marked as hidden gems
- One media record for every catalog entry
- An official icon URL for every media record
- No more than six screenshots stored for one game
- A fallback state when media cannot load

The catalog does not request refreshed media for all 200 games during the first page load. Opening one game's detail view requests that game's current media and caches it for the rest of the page session.

## Mobile checks

I tested the narrowest layout separately because several desktop fixes did not transfer cleanly.

Checks included:

- No horizontal page overflow
- Readable text at 320–390 pixel widths
- Buttons and controls at least 44–48 pixels tall
- One-column cards where two columns became cramped
- Stacked actions that remain easy to tap
- Game images that scale without leaving the card
- Modals and drawers that fit within the visible screen

## Readability checks

The site uses a dark theme, which made contrast failures easy to miss. I reviewed game-detail panels, creator cards, chips, buttons, guide text, and footer links after each color change.

The final tested guide and creator text combinations exceeded WCAG AA contrast requirements.

## Link checks

I manually reviewed the links most likely to create a bad impression:

- Roblox game destinations
- Full LobbyPick guide links
- Creator YouTube channels
- Share and copy-link actions
- Contribution and correction forms
- Privacy, terms, about, and methodology pages

This caught creator URLs that looked correct but pointed to the wrong channel, plus artwork that appeared clickable without opening the expected guide.

## Release checks

Before packaging, I ran:

- HTML structure and local-link validation
- JavaScript syntax checks
- JSON-LD parsing
- Sitemap and robots parsing
- Catalog and media-record counts
- Local HTTP response checks
- Focused tests for media fallback, sharing, analytics events, and submission validation

Passing automated checks did not replace opening the site. Visual issues were still reviewed on the rendered page.

