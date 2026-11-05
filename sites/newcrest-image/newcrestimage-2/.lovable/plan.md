# NewcrestImage Website Refresh — Plan

A full multi-page refresh of newcrestimage.com built in TanStack Start, executed against the uploaded brand guide and brief. The existing wordmark logo is preserved; everything else (palette, typography, photography, structure) is rebuilt.

## Design system

Pulled directly from the uploaded brand guide mockup.

- **Palette** (added to `src/styles.css` as oklch tokens):
  - Navy `#0D1B2A` (primary surface for dark sections, footer)
  - Deep Teal `#1F3D3A` (secondary dark, hero overlays)
  - Sage `#6B7D6B` (muted accent)
  - Stone `#D9D6CF` (light neutral surfaces)
  - Sand `#F1EDE4` (page background)
  - Gold `#B5893C` (single accent — CTAs, eyebrows, link arrows)
- **Typography**: Display serif (Cormorant Garamond as a free Canela-substitute) for headings with italic emphasis on a second word ("Generational *perspective.*"); Inter for body and uppercase tracked labels.
- **Photography**: Two-tier — full-color, cinematic hero/lifestyle imagery (mountains, architecture, interiors); reserve desaturated b&w only for portrait/archive contexts. Generated via `imagegen` per page.
- **Motion**: restrained — fade/translate on scroll, gold underline grow on links. No parallax gimmicks.

## Information architecture

Replace the single-page site with the structure recommended in the brief:

```text
/                       Home
/about                  Our Story + principles
/about/leadership       Leadership bios
/approach               Investment Approach
/portfolio              Hotels & Real Estate portfolio overview
/insights               Press / news index
/contact                Contact + address + form
```

Each route is a separate file under `src/routes/` with its own `head()` (unique title, description, og tags, canonical). Top nav matches the mockup: About Us · Investment Approach · Portfolio · Insights · Our Team · Contact.

## Page-by-page content

1. **Home** — full-bleed hero photo with overlay headline "Generational perspective. *Enduring value.*", supporting paragraph, gold "Our Approach" CTA. Below: dark teal band "Partnership. Discipline. Discretion." block; "Investment Focus" 4-card row (Hotel Real Estate, Private Credit, Real Assets, Direct Investments) on stone cards; navy "Aligned interests. Lasting legacy." commitment band with paired image; proof-point stats strip (≈300 hotels, $3B+ transacted, 130 communities, 80+ awards); footer.
2. **About** — origin (2013 merger of Newcrest Management + Image Hospitality), ecosystem vision, four core principles (Integrity, Adaptability, Loyalty, Excellence), awards strip.
3. **Leadership** — Mehul Patel + team cards with bios and board credentials.
4. **Approach** — five-step investment process (sourcing → underwriting → capital → operations → exit), asset-class allocation table.
5. **Portfolio** — featured properties (Magnolia Hotel Dallas, AC Hotel Houston Downtown, Fisk Building Amarillo, Hotel Mockingbird Dallas, Grapevine SilverLake Crossings) as case-study cards.
6. **Insights** — press list, filterable by year/category.
7. **Contact** — split layout, address (1785 State Hwy 26, Suite 400, Grapevine TX 76051), phone, email, contact form (client-side only at this stage — no backend).

## Assets

- Existing logo wordmark: I'll recreate as inline SVG matching the uploaded reference (serif + italic "Image"), in white and navy variants — no external file needed and works on both light/dark sections. (If you have the original SVG/PNG, drop it in and I'll swap.)
- Hero, commitment, and category imagery: generated via `imagegen` (cinematic landscape, modern architecture, interiors, foliage) saved into `src/assets/`.

## Out of scope (this pass)

- No contact-form backend, no CMS, no Lovable Cloud — purely the front-end refresh. We can add a working form, LP portal link, or CMS in a follow-up.
- No analytics/SEO scanner integration yet.
- Old WordPress migration is not in scope; this is a new build.

## Technical notes

- TanStack Start file-based routes; each route uses `createFileRoute` with `head()` for SEO. Root `__root.tsx` keeps the html shell and sitewide JSON-LD Organization block.
- Tokens defined in `src/styles.css` `@theme` block as oklch; no raw hex in components.
- Google Fonts loaded via `<link>` in `__root.tsx` head (Cormorant Garamond + Inter).
- Responsive: mobile nav drawer, stacked sections, scaled type ramp.

Approve and I'll build it.
