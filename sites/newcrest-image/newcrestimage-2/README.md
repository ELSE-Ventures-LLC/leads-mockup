# NewcrestImage — design option 2

A TanStack Start SSR application deployed as the `newcrestimage-2` Cloudflare
Worker. The Cloudflare Vite plugin generates the deployable Worker and client
assets under `dist/`.

Use the repository-wide workflow from the repository root:

```sh
npm run dev -- newcrestimage-2
npm run build -- newcrestimage-2
npm run deploy:check -- newcrestimage-2
npm run deploy -- newcrestimage-2
```

The root workflow uses Bun and the committed `bun.lock`. For isolated work, run
`bun install --frozen-lockfile` in this directory. Forms are visual mockups and
do not transmit or retain submitted information.
