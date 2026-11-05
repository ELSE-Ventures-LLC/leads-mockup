# AdCamp Inc. — design option 3

A Vite, React, TypeScript, and Tailwind design concept for AdCamp Inc. The
Cloudflare Worker serves the Vite-generated `dist/` directory.

Use the repository-wide workflow from the repository root:

```sh
npm run dev -- adcamp-webdesign-3-decent
npm run build -- adcamp-webdesign-3-decent
npm run deploy:check -- adcamp-webdesign-3-decent
npm run deploy -- adcamp-webdesign-3-decent
```

Install dependencies with `npm run install:sites` at the repository root, or
`npm ci` in this directory when working on this project alone.
