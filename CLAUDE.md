# CLAUDE.md — anaca-musica-site

Padrão de documentação: `../CLAUDE.md` (orquestrador Anacã). Detalhe da lógica: `src/CLAUDE.md`.

## O que é

Site institucional da escola de música **Anacã Música** (São Paulo, Jardim Paulista).
É a migração do site antigo em WordPress para Astro estático.
Leva o visitante ao WhatsApp da escola por um link do Tintim (`src/lib/categorias.ts:12`).

## Stack e onde roda

- **Astro 5**, `output: 'static'`, sem SSR (`astro.config.mjs:7`, `package.json:13`).
- **CSS puro com variáveis CSS**. Sem Tailwind. Variáveis em `src/styles/global.css`, extraídas do Elementor do site original.
- **Content Collections do Astro** para cursos, professores e eventos (`src/content.config.ts`).
- **@astrojs/sitemap** (`astro.config.mjs:8`). Gera `sitemap-index.xml`, citado em `public/robots.txt:23`.
- **intl-tel-input** v29: só na página `/indique-e-ganhe` (`package.json:14`).
- Carrosséis são código próprio com CSS scroll-snap (`src/components/TabsCarousel.astro`). Não há Swiper.
- **Hospedagem:** Cloudflare Workers com assets estáticos (`wrangler.toml`). Worker `anaca-musica-site`, entrada `src/worker.ts`, assets em `./dist`.
- **Domínio:** https://anacamusica.com.br (`astro.config.mjs:6`).
- **Repositório:** `github.com/Animus-Marketing/anaca-musica-site`.
- **Banco:** não tem.
- Assets do build saem em `_assets/` (`astro.config.mjs:10`).
- Fontes via Google Fonts: Darker Grotesque (títulos) e Poppins (corpo) (`src/layouts/BaseLayout.astro:34`).
- Cor de destaque: `#FF6530` (laranja), `--color-accent` em `src/styles/global.css`.
- GTM: `GTM-MCRPMZ7`, em todas as páginas (`src/layouts/BaseLayout.astro:30`).

## Comandos

```bash
pnpm install        # instalar dependências
pnpm dev            # dev server (localhost:4321)
pnpm build          # build de produção → dist/
pnpm preview        # preview do build
```

Deploy: push na `main` → build automático no Cloudflare. Não há comando de deploy no `package.json`.
Não há testes nem migrations.

> ❓ Pergunta: existem `package-lock.json` e `pnpm-lock.yaml` na raiz. O `package-lock.json` ainda é usado por alguém (ex.: build do Cloudflare)?

## Mapa

| Pasta / arquivo | O que faz | Doc de módulo? |
|---|---|---|
| `src/pages/` | Rotas. Listagens no plural, detalhe no singular (ver abaixo). | Não pode (vira rota). Ver `src/CLAUDE.md` |
| `src/content/{cursos,professores,eventos}/` | Conteúdo em Markdown com frontmatter. | Não pode (quebra o build). Ver `src/CLAUDE.md` |
| `src/content.config.ts` | Schema das três coleções. | `src/CLAUDE.md` |
| `src/components/` | Componentes Astro (Header, Footer, SEO, SchemaOrg, TabsCarousel, Button...). | `src/CLAUDE.md` |
| `src/layouts/BaseLayout.astro` | Wrapper único: Header, Footer, SEO, SchemaOrg, GTM e animação de entrada (`data-reveal`). | `src/CLAUDE.md` |
| `src/lib/categorias.ts` | Constantes: categorias de cursos, URL do WhatsApp (Tintim), Instagram, endereço, telefone. **Alterar dados de contato aqui.** | `src/CLAUDE.md` |
| `src/styles/global.css` | Variáveis CSS e tipografia global. | Não |
| `src/worker.ts` | Worker do Cloudflare: serve os assets e põe `noindex` fora do domínio oficial. | `src/CLAUDE.md` |
| `public/` | Imagens, `robots.txt`, `llms.txt`, `_headers` (cache), favicon. | Não pode (é servido) |
| `docs/` | Marca, SEO, planos antigos, export do WordPress. | Não |
| `.claude/skills/` | Skills do Claude versionadas no repo (`.gitignore:30-31`). | Não |
| `Temp/` | Arquivos soltos, fora do git. | Não |

### Rotas

- Listagens: `src/pages/cursos/index.astro`, `src/pages/professores/index.astro`, `src/pages/eventos/index.astro`.
- Detalhe (singular): `src/pages/curso/[slug].astro`, `src/pages/professor/[slug].astro`, `src/pages/evento/[slug].astro`.
- Estáticas: `src/pages/index.astro`, `src/pages/a-escola.astro`.
- Guias de SEO: `src/pages/guias/*.astro` (3 páginas).
- Promoção: `src/pages/indique-e-ganhe.astro`.

### Conteúdo

Cada `.md` em `src/content/` tem frontmatter com campos como `titulo`, `slug`, `categoria`, `ativo`, `ordem`.
Os campos são validados pelo schema em `src/content.config.ts`. As páginas leem com `getCollection()` de `astro:content`.

## Ligações com outros projetos Anacã

| Liga com | O que | Onde está aqui |
|---|---|---|
| Tintim (WhatsApp) | Todo botão de contato abre o link `tintim.link/whatsapp/...`. O Tintim rastreia o lead. | `src/lib/categorias.ts:12`, usado por `src/components/Button.astro` e `src/components/Footer.astro` |
| `dash-anaca` e `gestor-trafego-anaca` | Leem os leads que o Tintim grava (via n8n → Supabase). Não leem nada deste repo. | — |
| GTM | Container `GTM-MCRPMZ7`. O form do Indique e Ganhe dispara o evento `indique_ganhe_submit`. | `src/layouts/BaseLayout.astro:30`, `src/pages/indique-e-ganhe.astro` |
| n8n (Animus) | O form do Indique e Ganhe faz POST direto do navegador para `https://n8n.animusmkt.com.br/webhook/anaca-musica-indique-ganhe`. | `src/pages/indique-e-ganhe.astro` (`WEBHOOK_URL`) |

Mudou o link do Tintim? Avise o orquestrador: toca também o `dash-anaca` (ver `../CLAUDE.md`).

- **UTM:** este repo não tem código de UTM (o link do Tintim é fixo). A captura de UTM é feita no GTM, fora do repo (confirmado pelo dono em 10/11/2026).
- **Indique e Ganhe:** o n8n grava as indicações em uma planilha do Google Sheets (confirmado pelo dono em 10/11/2026).

## Regras de produção

- **Push na `main` = deploy.** Nunca sem o dono dizer "pode". Vale também para commit de doc.
- Site é **estático** (`output: 'static'`). Não usar SSR.
- O design segue a referência do WordPress original (`docs/referencias/wp-export/`).
- Conteúdo em português brasileiro (pt-BR).
- Assets do build ficam em `_assets/` (`astro.config.mjs`). O cache longo em `public/_headers` depende desse nome.
- Nunca criar `.md` solto em `src/content/**` (o schema quebra o build), nem em `src/pages/**` ou `public/**` (vira página ou arquivo público).
- Segredos: o repo não usa nenhum. `.env`, `.env.production` e `.dev.vars` estão no `.gitignore`. Não abrir.
- Preview de branch: `https://<branch>-anaca-musica-site.anac.workers.dev`, com a barra do nome da branch virando hífen (ex.: `feat/nome` → `feat-nome`). O Worker marca essas URLs como `noindex` (`src/worker.ts:14-18`). A URL em `docs/seo/resumo-entregas-seo.md:6` está em formato antigo.
- A página `/indique-e-ganhe` fica no ar. O texto diz que a promoção vale só em junho e julho de 2026 (`src/pages/indique-e-ganhe.astro:208`), mas ninguém pediu para desligar (dono, 10/11/2026). Não remover sem pedido.

## Documentos

| Arquivo | O que é | Estado |
|---|---|---|
| `src/CLAUDE.md` | Lógica do site: coleções, regras de ligação curso ↔ professor, Worker, form. | Atual |
| `docs/brand/` | Logo e favicon em SVG. | Atual |
| `docs/referencias/wp-export/` | Export do site WordPress original. Referência de design. | Referência |
| `docs/seo/auditoria-aieo-geo.md` | Auditoria de SEO / AIEO / GEO (16/04/2026). | Histórico |
| `docs/seo/plano-seo-aprovacao-cliente.md` | Plano de SEO, sprints 2 a 5 (16/04/2026). | Histórico |
| `docs/seo/resumo-entregas-seo.md` | Resumo do que foi entregue de SEO (17/04/2026, PR #5). | Histórico |
| `docs/findings.md` | Levantamento do site WordPress antes da migração (fev/2026). | **Desatualizado** (telefone, adapter Cloudflare, lista de professores) |
| `docs/progresso.md` | Log da primeira sessão (23/02/2026). | **Desatualizado** |
| `docs/task-plan.md` | Plano de revisão de responsividade e primeiro deploy. | **Desatualizado** (fala em Cloudflare Pages) |
| `README.md` | Modelo padrão do Astro, com comandos `npm`. | **Desatualizado** (usar este arquivo) |
| `.claude/skills/astro-cloudflare-site/` | Skill do projeto. | **Parte desatualizada** (fala em Cloudflare Pages; hoje é Workers) |
