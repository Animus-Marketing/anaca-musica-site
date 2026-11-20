// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://anacamusica.com.br',
  output: 'static',
  // /fotos/ = páginas internas de download: fora do sitemap (e com noindex na página)
  integrations: [sitemap({ filter: (page) => !page.includes('/fotos/') })],
  build: {
    assets: '_assets',
  },
});
