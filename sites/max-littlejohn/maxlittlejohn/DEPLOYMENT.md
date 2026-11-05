# Cloudflare deployment

This design is vendored from ELSE Ventures' [`maxlittlejohn`](https://github.com/ELSE-Ventures-LLC/maxlittlejohn) repository.

Use the shared workflow from the repository root:

```sh
npm run build -- maxlittlejohn
npm run deploy -- maxlittlejohn
```

The Vite production bundle is copied to `public/` and served by the
`maxlittlejohn` Cloudflare Workers static-assets site.
