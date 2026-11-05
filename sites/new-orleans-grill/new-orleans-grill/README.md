# New Orleans Grill

**Concept: "Roux &amp; Rivet."** Deep roux-brown and cast-iron color palette,
copper rivet accents, and French Quarter wrought-iron scrollwork as section
dividers — grounded in real New Orleans/Cajun material culture (cast iron,
ironwork balconies, hand-painted po-boy-shop signage, kitchen order tickets)
rather than the generic purple/gold Mardi Gras cliché. Typography: **Rye**
(hand-painted diner-sign display face), **Spectral** (warm literary serif for
body copy), **IBM Plex Mono** (order-ticket / receipt numerals for prices,
labels, and hours).

Recurring motifs, built as pure CSS/SVG (no stock photography, since none is
verified to belong to this restaurant):
- **Order ticket** — the menu is a torn guest-check with perforated edges,
  dot-leader prices, and monospace type; testimonials sit in a "guest book."
- **Cast-iron skillet** — CSS radial/conic gradients, used in the About
  section.
- **Wrought-iron divider** — a repeating SVG scrollwork pattern between
  every section.
- **Hanging sign hero** — the hero headline sits in a routed wooden sign
  hung from two short chains.

## Easter eggs
- **Live kitchen-status ticket** (hero, right side): reads the visitor's
  local clock against the real posted hours (breakfast Tue–Sat 8–11, lunch
  Mon–Sat 11–2, dinner Mon–Sat 5–9, closed Sunday) and says whether the
  kitchen is open right now, what's being served, and when it opens/closes
  next — including the Monday-has-no-breakfast quirk and the 2–5pm
  between-lunch-and-dinner gap. Refreshes every minute.
- A small kitchen-ticket ASCII art + note prints to the browser console
  (`view-source... on us`).

## Grounded facts used (sources)

From `data/leads.json` (New Orleans Grill):
- Business name: New Orleans Grill
- Phone: (601) 924-7305
- Owner / contact email: Billy Causey, billycausey@aol.com
- Current site: https://www.nawlinsgrill.com/
- Google rating: 3.7 stars / 87 reviews
- Lead score: 9
- Pain points: outdated site design/free template, no ads campaign running
  vs. competitors

Sourced live from **nawlinsgrill.com** (accessed 2026-07-02, not in
leads.json, used because the ground rules call for real facts and the
existing site is the primary source for a same-lead redesign):
- Address: 228 Clinton Blvd, Clinton, MS 39056
- Hours: Breakfast 8–11 AM Tue–Sat · Brunch 8 AM–2 PM Sat · Lunch 11 AM–2 PM
  Mon–Sat · Dinner 5–9 PM Mon–Sat · closed Sunday
- Cuisine positioning: "New Orleans Style Restaurant" — steaks, seafood,
  burgers, pasta

Sourced from **allmenus.com**'s listing of the restaurant's real menu
(accessed 2026-07-02) — dish names and prices shown on the site (Cajun
Popcorn, Jumbo Crab Claws, Seafood Gumbo, Crawfish &amp; Shrimp Bisque,
Po'Boys, N'awlins Burger, New Orleans Saints Chicken, Grouper Rockefeller,
Red Fish Pontchartrain, Catfish Creole, Shrimp Scampi, Rib Eye, Filet
Mignon, Blackened Redfish, etc.) are pulled verbatim from that aggregator,
not invented. Where the aggregator listed the same dish twice with two
prices (stale vs. current scrape), the more complete/plausible price was
kept and the duplicate dropped.

Sourced from **Tripadvisor**'s review page for this restaurant (accessed
2026-07-02) — used only as direct, attributed quotes (not laundered into
first-party marketing copy):
- Mitchell M., Oct 2023: "My wife and I are born and raised in New
  Orleans... This restaurant would do well back in New Orleans."
- Doris S., Aug 2020: "The chef was trained at Tujague's, the second oldest
  restaurant in New Orleans, so you know the food is great."
- (Tripadvisor's own aggregate at time of access: 4.0/5, 65 reviews — not
  shown on-site since `data/leads.json`'s Google figure, 3.7★/87 reviews, is
  the canonical rating stat displayed.)

**Not used / explicitly avoided:** no founding date, awards, certifications,
or chef biography were found from any source, so none are claimed on the
site. The signature-dish description (Red Fish Pontchartrain) is a factual
description of the classic preparation the dish name refers to, not a claim
about this kitchen's specific recipe or process.

**Why this restaurant:** Cafe Azteca (Brandon, MS) was the first one considered
for this mockup, and was dropped after research turned up strong signals it
has permanently closed (Yelp listing marked "CLOSED"; a local Facebook
community post describes the sign down and a paper "Closed" notice in the
window for 2+ months). New Orleans Grill is active and was still receiving
recent reviews as of June 2026.

## Local preview and deployment

Run the shared workflow from the repository root:

```sh
npm run dev -- new-orleans-grill
npm run deploy:check -- new-orleans-grill
npm run deploy -- new-orleans-grill
```

This is a static site with no dependency installation or build step.
