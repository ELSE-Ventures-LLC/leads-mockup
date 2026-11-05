# Leads Mockup Sites

Website concepts and lead mockups maintained by ELSE Ventures and deployed to
Cloudflare Workers. The repository contains several generations of sites: plain
static HTML, generated static sites, Vite React SPAs, and TanStack Start Workers.

`tools/sites.registry.mjs` is the source of truth for how each project is built,
previewed, and deployed. Do not infer a site's architecture from whether it has a
`public/` directory.

## Repository layout

```text
data/
  leads.json              Generated export of leads and prospects
  source/                 Original lead spreadsheet
sites/
  <company>/<site>/       One company's mockup (several, if it has design options)
tools/
  sites.registry.mjs      Explicit inventory and commands for all sites
  site.mjs                Unified build, preview, and deployment CLI
```

`<company>` is a slug of the company's name in the admin app (`public.customers`):
lower case, `&` written as `and`, punctuation removed. Site folder names are the
deploy slugs and stay as they are when a company has more than one design.

`data/leads.json` is generated from that table (leads and prospects only) by
`npm run export:leads` in the ak-os repo. Do not edit it by hand. Companies at
other stages can still have sites here; they are just not rows in that file.

## Current inventory

| Company | Site | Type |
|---|---|---|
| Adcamp Inc. | `adcamp-inc-first-design` | Generated Vite SPA snapshot |
| Adcamp Inc. | `adcamp-webdesign-1` | Vite SPA |
| Adcamp Inc. | `adcamp-webdesign-3-decent` | Vite SPA |
| Agent Consulting | `agentconsulting` | Generated Vite SPA snapshot |
| Brandon Comer | `editorial-authority` | Static |
| Brandon Comer | `typographic-minimal` | Static |
| Mid State Construction | `midstate-construction` | Generated static |
| Buford Plumbing Company, Inc. | `buford-plumbing` | Static |
| Newcrest Image | `newcrestimage-2` | TanStack Start Worker |
| Newcrest Image | `newcrestimage-mockup` | TanStack Start Worker |
| Complete Lawn Service MS LLC | `complete-lawn-service-ms` | Static |
| Max Littlejohn | `maxlittlejohn` | Generated Vite SPA snapshot |
| New Orleans Grill | `new-orleans-grill` | Static |
| Custom Carting | `customcarting` | TanStack Start Worker |

Run `npm run sites` for the authoritative, registry-generated list.

## Requirements

- Node.js 22.9 or newer
- npm 11.9 (declared in `package.json`)
- Bun 1.3.14 for TanStack projects
- Cloudflare credentials only when performing a real deployment

Install the pinned root tooling and each site's locked dependencies:

```sh
npm ci
npm run install:sites
```

Older Vite projects use npm lockfiles. TanStack projects use Bun lockfiles. Keep
one package-manager lock format per project and use the registry commands instead
of choosing an installer ad hoc.

## Standard workflow

```sh
npm run sites
npm run check
npm run build
npm run generated:check

npm run dev -- <slug> [<slug> ...]
npm run deploy:check -- <slug> [<slug> ...]
npm run deploy -- <slug> [<slug> ...]
```

- `dev` runs static sites with the contained local server and framework sites
  with their native dev command. With no slug in a terminal, it opens a picker.
- `deploy:check` builds and runs Wrangler's non-publishing dry run.
- `generated:check` verifies that tracked deploy snapshots still match their
  source builds. CI runs it immediately after the full build.
- `deploy` requires at least one explicit slug so a broad deployment cannot happen
  accidentally.
- Use `--port 9000` to select another preview base port. Multiple selected sites
  use consecutive ports.

The preview server binds to the local network for phone testing. Request paths are
decoded and checked against the selected site's output directory before files are
served.

## Mockup form behavior

Forms in this repository are presentation-only demos. They validate and preview a
confirmation state locally, but do not transmit, store, email, or otherwise retain
the entered information. Keep that limitation explicit in form copy and success
states. A real submission backend is outside this repository's scope.

## Adding a site

1. Create `sites/<company>/<slug>/`, using the company slug from the admin app,
   and document the design and grounded facts in that site's README.
2. Add an explicit entry to `tools/sites.registry.mjs`, including its type,
   deterministic install command, build command, output, dev mode, and deployment
   configuration.
3. Keep Cloudflare's `compatibility_date` current. Static sites should use a
   `wrangler.jsonc`; framework builds may generate the deployable config.
4. Run `npm run check`, build the new slug, and run its deployment dry run.
5. Refresh `data/leads.json` from ak-os (`npm run export:leads`) when the company
   is a lead or prospect, and update this inventory.

## Design ground rules

- Use grounded lead facts from `data/leads.json`; do not fabricate reviews,
  ratings, awards, certifications, dates, or business claims.
- Each company's site is its own design. Do not reuse another company's visual
  system.
- Preserve a clear source/build boundary. Generated output must be reproducible
  from committed source and a locked dependency graph.
- Optimize large images and keep essential branding/social assets under project
  control instead of depending on temporary editor-hosted URLs.

GitHub Actions installs dependencies from their lockfiles, validates the registry
and preview path handling, builds the full inventory, rejects stale committed
snapshots, and runs a non-publishing Wrangler deployment check for every site on
pushes and pull requests.
