# NewcrestImage — editorial concept

An editorial NewcrestImage redesign with a warm canvas, serif display type,
portfolio imagery, and a red accent derived from the wordmark. The original
design brief remains in `.lovable/plan.md` for provenance.

This is a TanStack Start SSR application deployed as the
`newcrestimage-mockup` Cloudflare Worker. The Cloudflare Vite plugin generates
the deployable Worker and client assets under `dist/`.

Use the repository-wide workflow from the repository root:

```sh
npm run dev -- newcrestimage-mockup
npm run build -- newcrestimage-mockup
npm run deploy:check -- newcrestimage-mockup
npm run deploy -- newcrestimage-mockup
```

The root workflow uses Bun and the committed `bun.lock`. For isolated work, run
`bun install --frozen-lockfile` in this directory. Forms are visual mockups and
do not transmit or retain submitted information.
