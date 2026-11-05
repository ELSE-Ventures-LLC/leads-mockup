## What I'll build

A polished one-page website for **Custom Carting** — backdoor concierge trash pickup on Fripp Island, SC — using the "Coastal concierge" direction you picked (navy `#0F172A`, sky-blue accent `#0284C7`, light sand background, Inter typography). Deployable to **Netlify** with a working **Netlify-managed contact form**.

## Sections (single page, anchor-scroll nav)

1. **Sticky nav** — logo + "Custom Carting", phone link, "Request Pickup" pill button (anchors to form)
2. **Hero** — "Fripp Island Backdoor Trash Pickup, Handled for You." with Fripp Island home photo, dual CTAs (Request Pickup / Call 843-441-7804)
3. **The Backdoor Advantage** — 4-card audience grid (Homeowners / Seasonal / Rental Owners / Property Managers)
4. **Why backdoor pickup on Fripp Island** — short editorial paragraph block
5. **How It Works** (dark navy section) — 3 numbered steps (Connect → Confirm → Relax) + seasonal Mon/Thu note
6. **FAQ + Request Pickup form** — two-column layout with quick FAQ and a real **Netlify contact form** (name, email, phone, property address, property type, message); plus tap-to-call and email links
7. **Footer** — logo, copyright, Fripp Island, SC

## Netlify forms setup

- The form is rendered as a real `<form name="request-pickup" method="POST" data-netlify="true" netlify-honeypot="bot-field">` so Netlify's build-time form detection picks it up
- Hidden inputs: `form-name` (required by Netlify) and `bot-field` (honeypot for spam)
- Because this is a TanStack Start app (not a fully static HTML build), Netlify needs a static HTML file with the same form fields for detection. I'll add `public/__forms.html` containing a duplicate of the form markup — Netlify scans it at deploy time and registers the form, then accepts POSTs from the live React form
- On submit: client-side validation with **zod** (name, email, phone, address length limits + email format), then POST `application/x-www-form-urlencoded` to `/` with `form-name=request-pickup`. Show success/error states inline
- No backend, no secrets, no Lovable Cloud needed — Netlify handles submissions and emails them from the Netlify dashboard

## Files

- `src/routes/index.tsx` — full landing page; SEO meta (title, description, og:*, canonical, og:image)
- `src/components/RequestPickupForm.tsx` — Netlify-wired form with zod validation and submit handler
- `src/assets/custom-carting-logo.png` — copy of your uploaded logo (nav + footer)
- `src/assets/fripp-island-home.jpg` — hero image (already generated)
- `src/styles.css` — add brand tokens (`--brand-navy`, `--brand-accent`, `--brand-sand`) and register in `@theme inline`
- `public/__forms.html` — static form duplicate for Netlify form detection
- `public/robots.txt` — `User-agent: *` / `Allow: /`
- `src/routes/sitemap[.]xml.ts` — server route, `/` entry, relative URLs

## Technical notes

- Tailwind v4 brand tokens in oklch so `bg-brand-navy` etc. work
- Real `tel:` and `mailto:` links on every CTA
- Logo via ES6 import; hero `<img>` has explicit width/height, no `loading="lazy"` (LCP)
- All copy verbatim from your brief
- After deploy on Netlify, form submissions appear in **Site → Forms** in the Netlify dashboard; you can enable email notifications there

Switch to build mode and I'll ship it.