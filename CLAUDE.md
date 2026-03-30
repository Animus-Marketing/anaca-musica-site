# Anacã Música — Site Institucional

## Contexto
Site institucional da escola de música Anacã Música.
Migração de WordPress para Astro estático.
Veja `docs/referencias/wp-export/` para referência do design original.
Veja `docs/brand/` para logos e favicon.

## Stack
- Astro 5 (output: static)
- Tailwind CSS (via Vite plugin)
- Swiper (carrossel)
- @astrojs/sitemap

## Comandos
```bash
pnpm install        # instalar dependências
pnpm dev            # dev server
pnpm build          # build de produção
pnpm preview        # preview do build
```

## Deploy
- **Plataforma:** Cloudflare Workers (assets estáticos)
- **Worker name:** `anaca-musica-site` (ver `wrangler.toml`)
- **URL:** https://anacamusica.com.br
- **Deploy:** push na `main` → build automático no Cloudflare

## Estrutura
```
src/
├── components/     # 16 componentes (Header, Footer, HeroSlider, etc.)
├── content/        # conteúdo estruturado (cursos, professores)
├── layouts/        # BaseLayout.astro
├── lib/            # utilitários
├── pages/          # 11 páginas
└── styles/         # estilos globais
docs/
├── brand/          # logo.svg, favicon.svg
├── referencias/    # wp-export (referência do design WP)
├── progresso.md    # histórico de progresso da migração
├── findings.md     # descobertas durante desenvolvimento
└── task-plan.md    # plano de tarefas
```

## Regras
- Site é estático (`output: 'static'`), não usa SSR
- Design deve seguir referência do WordPress original (`docs/referencias/wp-export/`)
- GTM (GTM-MCRPMZ7) configurado em `BaseLayout.astro`
