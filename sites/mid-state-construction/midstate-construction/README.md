# Mid-State Construction — Website Mockup

**Lead:** Mid-State Construction · Commercial Construction · Jackson, MS
**Score:** HOT (9) — outdated text-heavy site, no CTA, no mobile, 2 Google reviews, no ads
**Contact:** William Ware · pgb@msconst.com · (601) 956-9500
**Grounded facts used:** founded 1958, one of Mississippi's oldest locally-owned construction
firms, clients across the Southeast, services = preconstruction / estimating / design-build /
construction management / general contracting, jobsite tech = weekly aerial photos + real-time
field reporting, HQ at 300 Briarwood West Dr, Jackson MS 39206.

## The concept — "The Working Drawing"

The whole site is art-directed as a living set of construction documents. Every section is a
numbered sheet (G-000 Cover, A-101 Specifications, A-201–205 Drawing Set, S-301 Sequence,
A-401 Field Record, A-501 Transmittal, A-001 Title Block). Warm drafting-paper palette, ink
hairlines, safety-orange accents, mono annotations, dimension lines, rubber stamps with a real
ink-bleed filter, and isometric line-drawn buildings generated from exact 30° geometry.

2026 trends in play: fit-to-width kinetic display type on variable-font axes, scrollytelling,
guided scroll progress, grain + texture, editorial broken grids, motion with a job to do.

## What's in it

- **Preloader** — "mobilizing site" progress bar (skipped under reduced motion)
- **Cover-sheet hero** — JS-fitted flush wordmark, dimension line measuring the type,
  self-drawing isometric mid-rise + tower crane, ISSUED FOR CONSTRUCTION stamp, marquee
- **Stats band** — animated counters (1958 / 68 years / 100% local / 5 services)
- **Scope of Work** — spec-book accordion, full-row ink hover, SOW references
- **The Drawing Set** — pinned horizontal scroll-scrub through 5 sector sheets
  (healthcare, education, civic, retail, worship), each a generated technical drawing;
  swipeable snap carousel on touch
- **Critical Path** — scroll-filled construction schedule with phase nodes
- **Field Record** — heavyweight display pull-quote, Mississippi map with Jackson
  crosshair + radius rings
- **Transmittal** — RFP form styled like a construction document (corner-bracket focus
  states, stamped RECEIVED state on submit — front-end demo only)
- **Title-block footer** — a real drawing title block (PROJECT / CLIENT / SHEET / SCALE / DATE)
- **CAD cursor** — full-viewport crosshair, legible on light & dark (difference blend);
  X/Y readout appears over the cover sheet and the drawings; context labels (OPEN, CALL…)
- **404** — "RFI-404: sheet not in set" + SUPERSEDED stamp

### Easter eggs
1. **↑ ↑ ↓ ↓ ← → ← → B A** — reissues the whole site as a **cyanotype blueprint** (Rev B)
2. Click the **hard hat** in the footer title block 3× — hard-hat rain
3. Open the **dev console** — ASCII crane

Accessibility: full `prefers-reduced-motion` fallbacks, keyboard accordion + focus rings,
skip link, semantic landmarks, native cursor preserved on touch / coarse pointers.

## Files

```
public/         deploy this folder as Cloudflare Worker static assets
src/            index.template.html — edit content here, not in public/index.html
tools/
  iso-art.mjs   isometric drawing generator (exact 30° projection, true drafting style)
  build.mjs     injects generated SVG into the template → public/index.html
```

Edit content → `npm run build -- midstate-construction` from the repo root. All colors live in CSS custom
properties at the top of `public/css/main.css` (`:root` + `:root.blueprint`).

## Deploy

```sh
npm run deploy:check -- midstate-construction
npm run deploy -- midstate-construction
```

The deployment target is the `midstate-construction` Cloudflare Worker. Wrangler
authentication is needed only for the real deployment command.

Fonts are self-hosted (Archivo variable + JetBrains Mono variable, ~173 KB total).
No frameworks, no trackers, no build dependencies at runtime — one HTML, one CSS, one JS.
