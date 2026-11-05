# Brandon L. Comer — "Editorial Authority"

Static HTML/CSS port of **Concept 02** from the
[`ELSE-Ventures-LLC/brandoncomer`](https://github.com/ELSE-Ventures-LLC/brandoncomer)
repo's design-exploration history (`src/pages/ConceptOne.tsx`, present through
commit `de18695`, removed in `4a24504`). The repo's `main` branch ultimately
shipped a different concept (the warm "Community & Capital Hub" direction);
this is one of the two directions that were **not** chosen.

Dark navy + warm gold, Playfair Display serif headings, structured luxury —
sticky nav, a gold hairline top border, a framed grayscale portrait, and a
card-grid "Key Ventures" section.

## Source of truth

All copy (ventures, achievements, education, board service) is carried over
verbatim from the original `ConceptOne.tsx` component — no facts were
invented. Original color tokens came from that repo's `.theme-editorial`
CSS class in `src/index.css`, hand-ported here to plain CSS custom
properties (zero build step, zero npm deps, per this repo's convention).

## Local preview

```sh
npm run dev -- editorial-authority
```

## Deploy

```sh
npm run deploy:check -- editorial-authority
npm run deploy -- editorial-authority
```
