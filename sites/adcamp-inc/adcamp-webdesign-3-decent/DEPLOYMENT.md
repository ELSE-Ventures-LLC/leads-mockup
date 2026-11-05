# Cloudflare deployment

This is the vendored ELSE Ventures design repository
[`adcamp-webdesign-3-decent`](https://github.com/ELSE-Ventures-LLC/adcamp-webdesign-3-decent).

It deploys through the shared repository workflow:

```sh
npm run build -- adcamp-webdesign-3-decent
npm run deploy -- adcamp-webdesign-3-decent
```

The Vite bundle is generated into `public/` and served as a Cloudflare Workers
static-assets site. The Worker is named `adcamp-webdesign-3-decent`.
