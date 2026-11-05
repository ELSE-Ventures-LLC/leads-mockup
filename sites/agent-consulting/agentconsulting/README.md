# Agent Consulting

## Origin

Vendored from [`ELSE-Ventures-LLC/agentconsulting`](https://github.com/ELSE-Ventures-LLC/agentconsulting),
a Lovable-generated site for a mergers & acquisitions consulting firm — modern,
reliable, and experienced positioning per the original brief.

## Structure — why this site differs from the vanilla-HTML ones

Like `sites/adcamp-inc/adcamp-inc-first-design/`, this is a full Vite + React +
TypeScript + Tailwind + shadcn/ui app, vendored **as-is** under `app/`:

```
app/            the vendored Vite/React project (own package.json, src/, etc.)
public/         BUILD OUTPUT — generated from app/dist by tools/build.mjs, committed
tools/build.mjs runs the Vite build in app/, then syncs app/dist/ → ../public/
wrangler.jsonc  Cloudflare Workers static-assets config, same shape as every other site
```

It plugs into the standard repo-wide CLI:

```sh
npm run dev    -- agentconsulting
npm run build  -- agentconsulting
npm run deploy:check -- agentconsulting
npm run deploy -- agentconsulting
```
