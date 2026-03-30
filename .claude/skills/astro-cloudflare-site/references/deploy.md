# Deploy - Cloudflare Pages

## astro.config.mjs

```javascript
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://anacamusica.com.br',
  output: 'static',
  adapter: cloudflare(),
  integrations: [
    sitemap({
      i18nLocales: { pt: 'pt-BR' },
    }),
  ],
  build: {
    assets: '_assets',
  },
});
```

## Package Dependencies

```json
{
  "dependencies": {
    "astro": "^5.x",
    "@astrojs/cloudflare": "^12.x",
    "@astrojs/sitemap": "^3.x"
  }
}
```

## Cloudflare Pages Config (wrangler.toml)

```toml
name = "anaca-musica"
compatibility_date = "2026-02-01"
pages_build_output_dir = "./dist"
```

## Build & Deploy Commands

```bash
# Local dev
npm run dev

# Build
npm run build

# Preview locally
npm run preview

# Deploy (via wrangler or git push)
npx wrangler pages deploy dist
```

## package.json scripts

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  }
}
```

## Static Output Mode

For pure static site (no SSR needed), use `output: 'static'`.
This generates all pages at build time into `/dist`.
Cloudflare Pages serves these as static files with edge caching.

If SSR is needed later (e.g., form handling), switch to `output: 'server'`
and use the Cloudflare adapter for Workers runtime.

## Image Optimization

For static sites, optimize images at build time:
- Use `<img>` with explicit width/height for CLS
- Use `loading="lazy"` for below-fold images
- Store images as WebP in /public/images/
- Consider `@astrojs/image` if build-time optimization is needed

## Custom Domain

After deploy, add custom domain in Cloudflare Pages dashboard:
1. Pages project → Custom domains → Add domain
2. Point anacamusica.com.br DNS to Pages
3. SSL is automatic

## Headers & Redirects

Create `public/_headers` for cache control:
```
/images/*
  Cache-Control: public, max-age=31536000, immutable

/_assets/*
  Cache-Control: public, max-age=31536000, immutable
```

Create `public/_redirects` if needed:
```
/home / 301
```
