# Findings & Decisions

## Requirements
- Reconstruir anacamusica.com.br em Astro + Markdown
- Deploy no Cloudflare Workers/Pages
- Conteúdo editável via Claude Code (arquivos .md e .json)
- Manter identidade visual: fundo preto, texto branco, accent laranja (#FF6530)
- Melhorar código e UX (não é cópia pixel-perfect, é melhoria)
- Assets extraídos via scraping do site atual

## Site Atual - Stack
- WordPress 6.x + Hello Elementor theme v3.4.6
- Elementor Pro v3.35.0
- Yoast SEO (sitemap, schema)
- Happy Elementor Addons v3.21.0
- jQuery 3.7.1 + Swiper v8.4.5
- Cloudflare CDN já em uso
- Imagens em WebP otimizadas

## Site Atual - Sitemap Completo

### Páginas estáticas (5)
| Página | URL | Última atualização |
|--------|-----|-------------------|
| Home | / | 2026-02-11 |
| Eventos | /eventos/ | 2025-11-25 |
| Cursos | /cursos/ | 2026-02-04 |
| A Escola | /a-escola/ | 2026-02-06 |
| Professores | /professores/ | 2026-02-11 |

### Cursos (15)
| Curso | Slug |
|-------|------|
| Acordeon | /curso/acordeon/ |
| Baixo | /curso/baixo/ |
| Bateria | /curso/bateria/ |
| Canto | /curso/canto/ |
| Cavaco | /curso/cavaco/ |
| Flauta Doce | /curso/flauta-doce/ |
| Guitarra | /curso/guitarra/ |
| Flauta Transversal | /curso/flauta-transversal/ |
| Saxofone | /curso/saxofone/ |
| Ukulele | /curso/ukulele/ |
| Violão | /curso/violao/ |
| Violino | /curso/violino/ |
| Violoncelo | /curso/violoncelo/ |
| Piano | /curso/piano/ |
| Kids Teens | /curso/kids-teens/ |

### Professores (20)
Gabriel Guerra, Luciana Carla, Andie Souza, Claudia Noemi, Marina Lima, Daniel Labo, Alessandra Fernandes, Andre Faiman, Marilia, Carlos CJazz, Cassio Cordeiro, Christofer Viana, Eziel, Julia Pagano, Lucas Venutti, Rodrigo Ieno, Zabe, Weslley Charles, Graciana Camacho, Dadinho

### Eventos (1)
- Show Case 2025 (/evento/show-case-2025/)

### Modalidades (20) - organizadas por categoria
**Cordas:** Baixo, Cavaco, Guitarra, Ukulele, Violão, Violino, Violoncelo
**Sopro:** Flauta Doce, Flauta Transversal, Saxofone
**Percussão:** Bateria
**Teclas:** Acordeon, Piano
**Canto:** Canto
**Kids:** Musicalização Baby, Musicalização Infantil

## Design System

### Cores
| Token | Valor | Uso |
|-------|-------|-----|
| --color-bg | #000000 | Fundo principal |
| --color-text | #FFFFFF | Texto principal |
| --color-accent | #FF6530 | Botões, destaques, CTAs |
| --color-accent-hover | (derivar) | Hover states |

### Tipografia
| Fonte | Uso | Peso |
|-------|-----|------|
| Darker Grotesque | Headings (uppercase) | 700-900 |
| Poppins | Body text | 300-400 |
| Conduit ITC | Accent text (verificar) | - |

### Layout
- Container max-width: 1200px
- Breakpoints: mobile ≤767px, tablet 768-1024px, desktop 1025px+
- Border-radius: 15px (cards)
- Flexbox-based grid

## Estrutura de Página: Curso Individual
- Hero com título e subtítulos estilizados
- Seção "A linguagem musical do [instrumento]" com descrição
- Filosofia do curso
- CTA: "MARCAR UMA AULA" → WhatsApp
- Professores que ensinam este curso

## Estrutura de Página: Professor Individual
- Foto 1080x1080px
- Nome + título
- Bio completa
- Instrumentos que ensina (tags)
- Estilos musicais
- CTA: "AGENDE SUA AULA"

## Estrutura de Página: Evento
- Título + data/local
- Descrição do evento
- Galeria de fotos (20+ imagens)
- Informações de contato

## Contato / Informações Gerais
- Endereço: Av. Brasil, 649 – Jardim Paulista, São Paulo
- WhatsApp: (11) 94290-4444
- Instagram: @anacamusica
- Marca: Anacã Artes (copyright)

## Technical Decisions
| Decision | Rationale |
|----------|-----------|
| Astro 5.x | Melhor SSG atual, Content Collections, zero JS default |
| @astrojs/cloudflare | Adapter oficial para Cloudflare Pages |
| Content Collections | Schema tipado para cursos, professores, eventos |
| CSS puro (custom properties) | Sem Tailwind/framework, manter controle total, site simples |
| Fontes via Google Fonts link | Simplidade, CDN do Google |
| Imagens em /public/images/ | Servidas diretamente, otimizáveis depois |
| Conteúdo em /src/content/ | Padrão Astro, editável via Claude |

## Resources
- Site atual: https://anacamusica.com.br/
- Astro docs: https://docs.astro.build/
- Cloudflare Pages + Astro: https://docs.astro.build/en/guides/deploy/cloudflare/
- Schema.org já usado no site (Organization, BreadcrumbList)
