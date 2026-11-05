# Brandon L. Comer — "Typographic Minimal"

Static HTML/CSS port of **Concept 03** from the
[`ELSE-Ventures-LLC/brandoncomer`](https://github.com/ELSE-Ventures-LLC/brandoncomer)
repo's design-exploration history (`src/pages/ConceptThree.tsx`, present
through commit `de18695`, removed in `4a24504`). The repo's `main` branch
ultimately shipped a different concept (the warm "Community & Capital Hub"
direction); this is one of the two directions that were **not** chosen.

Swiss-poster minimalism — cream background, oversized black uppercase name
treatment with a dashed vertical grid behind it, a scroll cue, and clean
label/value rows for ventures, timeline, and education.

## Source of truth

All copy (about, ventures, timeline, education) is carried over verbatim from
the original `ConceptThree.tsx` component — no facts were invented. The
component styled itself with inline values rather than the repo's shared
theme classes, so this port needed no CSS-variable translation — just a
plain-CSS rebuild (zero build step, zero npm deps, per this repo's
convention).

## Local preview

```sh
npm run dev -- typographic-minimal
```

## Deploy

```sh
npm run deploy:check -- typographic-minimal
npm run deploy -- typographic-minimal
```
