# Max Littlejohn

A Vite, React, and TypeScript personal site. Source lives in this
directory; `tools/build.mjs` produces the committed `public/` snapshot used by
the Cloudflare Worker.

Use the repository-wide workflow from the repository root:

```sh
npm run dev -- maxlittlejohn
npm run build -- maxlittlejohn
npm run deploy:check -- maxlittlejohn
npm run deploy -- maxlittlejohn
```

Install dependencies with `npm run install:sites` at the repository root, or
`npm ci` in this directory when working on this project alone. Do not edit the
generated `public/index.html` or `public/assets/` directly.
