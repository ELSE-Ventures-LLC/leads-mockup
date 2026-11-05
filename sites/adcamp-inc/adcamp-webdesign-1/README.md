# AdCamp Inc. — design option 1

Vendored from the ELSE Ventures source repository:
[`ELSE-Ventures-LLC/adcamp-webdesign-1`](https://github.com/ELSE-Ventures-LLC/adcamp-webdesign-1)
at commit `5c839c1bb7e2719750ec3e14af913787a671c65a`.

This React/Vite design is integrated with the repository-wide site workflow.
The Cloudflare Worker serves Vite's generated `dist/` directory.

```sh
npm run build -- adcamp-webdesign-1
npm run dev -- adcamp-webdesign-1
npm run deploy:check -- adcamp-webdesign-1
npm run deploy -- adcamp-webdesign-1
```

Cloudflare worker name: `adcamp-webdesign-1`.
