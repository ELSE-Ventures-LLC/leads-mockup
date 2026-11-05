## Goal

Rebuild NewcrestImage as an editorial, Index Ventures-style site: warm off-white canvas, serif display with italic emphasis, generous whitespace, large portrait/portfolio imagery in a horizontal scroll strip, and a thin red accent pulled from the existing NewcrestImage wordmark.

## Design system

- **Palette**: bg `#ECE8E0` (warm bone), ink `#111`, muted `#5b5b58`, accent red `#D43A2F` (from logo) — defined as oklch tokens in `src/styles.css`.
- **Type**: Display = "Instrument Serif" (with italic for emphasis like *"who you are"*). Body = "Inter" / "Work Sans". Small uppercase eyebrow labels with wide tracking.
- **Layout**: minimal top nav (logo left, links right), oversize serif H1 with italic phrase, horizontal image strip with caption pairs (NAME + *Company* in italic), generous vertical rhythm, thin pill outline buttons in accent red.
- **Logo**: pull existing wordmark from `https://newcrestimage.com/wp-content/...` (script "Image" + "Newcrest"). Copy into `src/assets/`.

## Pages (separate route files)

- `/` — Home: hero "We invest in *who they are,* not just what they do." → horizontal portfolio strip (American Bank, CoreStack, Coury Hospitality, DVC, Real Estate, Summit Hotel, Texana Bank) → intro paragraph + "See our philosophy" pill CTA → stats band (44 Hotel Transactions / $0.4B Real Estate / 23 Cities) → second editorial section "Ideas don't build businesses. People do." → footer.
- `/about` — Company narrative + stats, large editorial layout.
- `/investments` — Portfolio grid using the 7 portfolio thumbnails from the live site.
- `/contact` — Address, phone, email, careers link, conversation prompt.

Each route gets unique `head()` title + meta description.

## Implementation

- TanStack Start route files under `src/routes/` (`index.tsx`, `about.tsx`, `investments.tsx`, `contact.tsx`).
- Shared `SiteHeader` + `SiteFooter` components in `src/components/site/`.
- Replace placeholder index. Add Google Fonts via root `head()` links.
- Define color, font, radius, shadow tokens in `src/styles.css` (oklch). Use semantic tokens only — no raw hex in components.
- Horizontal portfolio strip = overflow-x scroll snap row of tall image cards with caption underneath.
- Pull portfolio thumbnails directly from newcrestimage.com CDN URLs (already linked above).
- Subtle motion: fade-up on section enter via framer-motion (already typical); keep restrained.

## Out of scope

No backend, no CMS, no forms wired to a server (contact form is presentational only).
