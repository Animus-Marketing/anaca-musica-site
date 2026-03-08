// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://anacamusica.com.br',
  output: 'static',
  adapter: cloudflare(),
  integrations: [sitemap()],
  build: {
    assets: '_assets',
  },
});
