# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Contexto
Site institucional da escola de música Anacã Música (São Paulo).
Migração de WordPress para Astro estático.
Referência do design original em `docs/referencias/wp-export/`.
Logos e favicon em `docs/brand/`.

## Comandos
```bash
pnpm install        # instalar dependências
pnpm dev            # dev server (localhost:4321)
pnpm build          # build de produção → dist/
pnpm preview        # preview do build
```

## Deploy
- **Cloudflare Workers** (assets estáticos via `wrangler.toml`)
- **URL:** https://anacamusica.com.br
- Push na `main` → build automático

## Arquitetura

### Stack
- Astro 5 (`output: 'static'`) — sem SSR
- CSS puro com variáveis CSS (sem Tailwind runtime — variáveis definidas em `src/styles/global.css`)
- Swiper para carrosséis
- @astrojs/sitemap

### Content model
Conteúdo em Markdown com frontmatter (`src/content/{cursos,professores,eventos}/`). Cada `.md` define campos como `titulo`, `slug`, `categoria`, `ativo`, `ordem`, etc. Não usa Astro Content Collections API — os arquivos são lidos diretamente via `Astro.glob()` ou `import.meta.glob()`.

### Routing
- Listagens: `src/pages/cursos/index.astro`, `src/pages/professores/index.astro`, `src/pages/eventos/index.astro`
- Detalhe: `src/pages/curso/[slug].astro`, `src/pages/professor/[slug].astro`, `src/pages/evento/[slug].astro` (singular)
- Estáticas: `src/pages/index.astro`, `src/pages/a-escola.astro`

### Layout
`BaseLayout.astro` — wrapper único com Header, Footer, SEO component e GTM (GTM-MCRPMZ7).

### Shared constants
`src/lib/categorias.ts` — categorias de cursos, URLs do WhatsApp/Instagram, endereço e telefone. Alterar dados de contato aqui.

### Design system
- Fontes: Darker Grotesque (headings), Poppins (body) — via Google Fonts
- Cor accent: `#FF6530` (laranja)
- Variáveis CSS em `src/styles/global.css` extraídas do Elementor original

## Regras
- Site é **estático** (`output: 'static'`), não usar SSR
- Design deve seguir referência do WordPress original (`docs/referencias/wp-export/`)
- Conteúdo em português brasileiro (pt-BR)
- Build assets em `_assets/` (configurado em `astro.config.mjs`)
