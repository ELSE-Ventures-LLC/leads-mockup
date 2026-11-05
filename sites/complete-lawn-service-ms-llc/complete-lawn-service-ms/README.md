# Complete Lawn Service MS — Website Mockup

**Lead:** Complete Lawn Service MS LLC · Lawn Care Service · Jackson, MS
**Score:** HOT (9) — outdated non-mobile site, no SSL, no contact form, socials inactive, 0 Google reviews, no ads
**Contact:** Michael Bowling · michael@completelawnservicems.com · (601) 497-8249
**Grounded facts used:** local lawn & landscape maintenance company serving the Jackson
Metro Area since 2009; greater Jackson + Ridgeland service area; 904 Euclid Ave, Jackson MS
39202; owner-run (Michael Bowling); services = mowing (push mowers for smaller/tight yards),
weed-eating around trees/flower beds/fences, edging where grass meets hard surfaces,
clean-up of all trimmings ("clean and manicured look"), landscape maintenance; active
Facebook page (facebook.com/completelawnservicems). No reviews/ratings/hours/licenses are
shown anywhere because none are verifiable — the "House Rules" section replaces
testimonials until real Google reviews exist.

## The concept — "Field-Built Organic Modernism"

A premium trade brand with the texture of the actual outdoors: bone paper, pine ink, and
**marking-paint orange** (the spray crews mark lawns with), survey/topographic motifs, film
grain, hand-drawn SVG accents. Type: Bricolage Grotesque (variable) display, Instrument
Serif italic accents, Spline Sans Mono survey labels — all self-hosted, zero external
requests. The magnolia line-mark is a Mississippi emblem, not a brand name.

2026 trends in play: kinetic variable-font type (hero letters gain weight near the cursor),
halftone "ghost" typography via background-clip:text (process numbers, footer wordmark; hero line 2
is solid moss for readability), scrollytelling with a measuring-tape progress rail, broken grids, grain + texture.

## What's in it

- **Intro wipe** — letter-cascade wordmark + paint-stroke line, once per session
- **Hero** — stacked kinetic headline (EVERY BLADE / EVERY EDGE halftone / *every season*
  serif with a hand-sprayed underline), rotating FREE QUOTES stamp, survey-stake eyebrow
- **Tilted services ticker**, pause on hover
- **Six field-tag service cards** — grounded service menu, stamped indexes, self-drawing
  icons, hand-drawn orange circle on hover (card 6 is an honest "Something else? Call" card)
- **The Proof** — hand-illustrated SVG before/after yard slider (kept vs. not), dragged by
  an orange survey stake; real `<input type="range">` underneath for a11y; a push mower
  parked mid-stripe on the "after" side
- **Process scrollytelling** — sticky halftone step number + serif word swap, measuring-tape
  rail fills with scroll (Walk → Quote → Cut → Wave)
- **Stats band** — grounded counters (2009 / 17 seasons / 100% local / 1 call)
- **House Rules** — tilted promise cards in place of testimonials (lead has 0 reviews)
- **Service-area survey map** — hand-drawn Jackson metro, Pearl River, dashed bounds,
  compass + scale bar; city list ↔ map pin hover sync
- **Quote section** — marking-paint orange, form with chip multi-select, rubber-stamp
  REQUEST RECEIVED success state (front-end demo only)
- **Footer** — giant halftone/solid wordmark, grass-blade silhouette rising into the orange
  section, drifting fireflies (Mississippi dusk), parked mower
- **Mobile** — sticky call bar (hides over form/footer), full-screen ink menu, touch slider

### Easter eggs
1. Click the **parked mower** in the footer — it drives across the screen leaving a stripe
2. Type `m` `o` `w` anywhere — same mower run
3. Open the **dev console** — a note from the crew

Accessibility: `prefers-reduced-motion` honored everywhere (intro skipped, reveals static,
marquee wraps), skip link, semantic landmarks, keyboard-driggable comparison slider,
focus-visible rings, JSON-LD LocalBusiness schema.

## Files

```
public/             deploy this folder (index.html + css/ + js/ + assets/fonts/ + favicon + og.png)
wrangler.jsonc      Cloudflare Workers static assets ("name" = complete-lawn-service-ms)
```

No build step — plain static. Run the shared workflow from the repository root:

```sh
npm run dev -- complete-lawn-service-ms
npm run deploy:check -- complete-lawn-service-ms
npm run deploy -- complete-lawn-service-ms
```

The quote form is a browser-only presentation mockup. It does not transmit or
retain submitted information.
