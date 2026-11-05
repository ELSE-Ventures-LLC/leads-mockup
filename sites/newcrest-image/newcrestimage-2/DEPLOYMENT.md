# Cloudflare deployment

This design is vendored from ELSE Ventures' [`newcrestimage-2`](https://github.com/ELSE-Ventures-LLC/newcrestimage-2) repository.

It is a TanStack Start server-rendered app. Build it and deploy the generated
Cloudflare Worker from this directory:

```sh
node tools/build.mjs
npx wrangler deploy --config dist/server/wrangler.json
```

The build generates a deploy-ready Worker configuration at
`dist/server/wrangler.json`; the Worker is named `newcrestimage-2`.
