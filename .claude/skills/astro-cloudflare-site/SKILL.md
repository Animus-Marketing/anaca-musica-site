---
name: astro-cloudflare-site
description: >
  Build and manage the Anacã Música static site using Astro framework with Markdown/JSON content,
  deployed on Cloudflare Pages. Use when: (1) creating or editing pages, components, or layouts,
  (2) adding/modifying content (courses, professors, events), (3) working with the design system
  (dark theme, CSS custom properties), (4) deploying or configuring Cloudflare Pages, (5) optimizing
  SEO, images, or performance. Triggers on any task involving the anacamusica.com.br site rebuild,
  Astro components, Content Collections, or Cloudflare Pages deployment.
---

# Anacã Música - Astro Site

## Project Structure

```
anaca-musica/
├── astro.config.mjs
├── package.json
├── wrangler.toml
├── public/
│   ├── images/
│   │   ├── logo.svg
│   │   ├── cursos/
│   │   ├── professores/
│   │   └── eventos/
│   ├── _headers
│   └── _redirects
├── src/
│   ├── content/
│   │   ├── config.ts
│   │   ├── cursos/          # 15 .md files
│   │   ├── professores/     # 20 .md files
│   │   └── eventos/
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── Section.astro
│   │   ├── Button.astro
│   │   ├── CursoCard.astro
│   │   ├── ProfessorCard.astro
│   │   ├── CategoryFilter.astro
│   │   ├── Gallery.astro
│   │   └── SEO.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── a-escola.astro
│   │   ├── cursos/index.astro
│   │   ├── curso/[slug].astro
│   │   ├── professores/index.astro
│   │   ├── professor/[slug].astro
│   │   ├── eventos/index.astro
│   │   └── evento/[slug].astro
│   ├── lib/
│   │   └── categorias.ts
│   └── styles/
│       └── global.css
└── dist/
```

## Design Tokens

- **Background:** #000000 (dark), #0a0a0a (cards)
- **Text:** #FFFFFF (primary), #999999 (muted)
- **Accent:** #FF6530 (CTAs, links, highlights)
- **Fonts:** Darker Grotesque (headings, uppercase, 700-900), Poppins (body, 300-400)
- **Container:** max-width 1200px
- **Border-radius:** 15px cards, 8px buttons

## Content Editing

All content lives in `src/content/` as Markdown with YAML frontmatter.
Edit any `.md` file to update text. Edit frontmatter to update metadata.
See [references/content-collections.md](references/content-collections.md) for schemas and examples.

## Key Patterns

- **Zero JS by default** — only CategoryFilter uses a small inline script
- **Static output** — all pages pre-built, no SSR
- **WhatsApp CTA** — all "Marcar uma aula" buttons → `https://wa.me/5511942904444`
- **Category filtering** — client-side via `data-cat` attributes and vanilla JS
- **SEO** — each page has title, description, Open Graph via SEO component

## References

- **Content schemas & examples:** [references/content-collections.md](references/content-collections.md)
- **Component patterns & code:** [references/components.md](references/components.md)
- **Design system & CSS:** [references/design-system.md](references/design-system.md)
- **Deploy & config:** [references/deploy.md](references/deploy.md)

## Contact Info (used across site)

- Address: Av. Brasil, 649 – Jardim Paulista, São Paulo
- WhatsApp: (11) 94290-4444
- Instagram: @anacamusica
- Brand: Anacã Artes (copyright)

## Commands

```bash
npm run dev      # Dev server at localhost:4321
npm run build    # Build to dist/
npm run preview  # Preview build locally
npx wrangler pages deploy dist  # Deploy to Cloudflare
```
