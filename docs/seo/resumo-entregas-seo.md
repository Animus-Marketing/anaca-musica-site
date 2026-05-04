# Resumo de Entregas — SEO / AIEO / GEO

**Data:** 17 de abril de 2026
**Branch:** `seo/sprint-1-fundacoes-tecnicas`
**PR:** [#5](https://github.com/Animus-Marketing/anaca-musica-site/pull/5)
**Preview:** https://seo-sprint-1-fundacoes-tecnicas.anaca-musica-site.workers.dev

---

## Páginas Alteradas

### Cursos (conteúdo expandido + novas seções)

| Página | Link preview | O que mudou |
|--------|-------------|-------------|
| Canto | [/curso/canto/](https://seo-sprint-1-fundacoes-tecnicas.anaca-musica-site.workers.dev/curso/canto/) | Conteúdo expandido, FAQ (5 perguntas), seção "Para quem é", "O que você vai aprender", bloco citável, professores do curso |
| Bateria | [/curso/bateria/](https://seo-sprint-1-fundacoes-tecnicas.anaca-musica-site.workers.dev/curso/bateria/) | Conteúdo expandido, FAQ (5 perguntas), seção "Para quem é", "O que você vai aprender", bloco citável, professores do curso |
| Piano | [/curso/piano/](https://seo-sprint-1-fundacoes-tecnicas.anaca-musica-site.workers.dev/curso/piano/) | Conteúdo expandido, FAQ (5 perguntas), seção "Para quem é", "O que você vai aprender", bloco citável, professores do curso |
| Instrumentalização Infantil | [/curso/musicalizacao-infantil/](https://seo-sprint-1-fundacoes-tecnicas.anaca-musica-site.workers.dev/curso/musicalizacao-infantil/) | Conteúdo expandido (era quase vazio), FAQ (5 perguntas), seção "Para quem é", "O que você vai aprender", bloco citável |

### Páginas novas (Guias / Pillar Pages)

| Página | Link preview | Conteúdo |
|--------|-------------|----------|
| Como Escolher uma Escola de Música | [/guias/como-escolher-escola-de-musica/](https://seo-sprint-1-fundacoes-tecnicas.anaca-musica-site.workers.dev/guias/como-escolher-escola-de-musica/) | Guia completo (~2280 palavras) com critérios de escolha, comparativo escola vs particular vs online, dicas para pais e adultos, FAQ |
| Musicalização Infantil: Guia para Pais | [/guias/musicalizacao-infantil-guia-para-pais/](https://seo-sprint-1-fundacoes-tecnicas.anaca-musica-site.workers.dev/guias/musicalizacao-infantil-guia-para-pais/) | Guia completo (~2438 palavras) com benefícios, fases por idade, como escolher primeiro instrumento, como apoiar em casa, FAQ |
| Aprender Música na Vida Adulta | [/guias/aprender-musica-adulto/](https://seo-sprint-1-fundacoes-tecnicas.anaca-musica-site.workers.dev/guias/aprender-musica-adulto/) | Guia completo (~2639 palavras) com benefícios cognitivos, escolha de instrumento, como conciliar com rotina, depoimento de aluno, FAQ |

### Páginas com alterações técnicas (todas as páginas do site)

| Página | Link preview | O que mudou |
|--------|-------------|-------------|
| Home | [/](https://seo-sprint-1-fundacoes-tecnicas.anaca-musica-site.workers.dev/) | Title tag otimizado, meta description com credenciais e CTA |
| A Escola | [/a-escola/](https://seo-sprint-1-fundacoes-tecnicas.anaca-musica-site.workers.dev/a-escola/) | Title tag, meta description, H1 corrigido |
| Cursos | [/cursos/](https://seo-sprint-1-fundacoes-tecnicas.anaca-musica-site.workers.dev/cursos/) | Title tag com keywords, meta description |
| Professores | [/professores/](https://seo-sprint-1-fundacoes-tecnicas.anaca-musica-site.workers.dev/professores/) | Title tag com credenciais (Berklee, USP, Racionais), meta description |
| Eventos | [/eventos/](https://seo-sprint-1-fundacoes-tecnicas.anaca-musica-site.workers.dev/eventos/) | Title tag, meta description |
| Todos os cursos | [/curso/violao/](https://seo-sprint-1-fundacoes-tecnicas.anaca-musica-site.workers.dev/curso/violao/), etc. | Title tag "Aulas de X em São Paulo", schema Course + professores vinculados |
| Todos os professores | [/professor/andre-cortada/](https://seo-sprint-1-fundacoes-tecnicas.anaca-musica-site.workers.dev/professor/andre-cortada/), etc. | Schema Person com knowsAbout e worksFor |

---

## Arquivos de Crawl — O que foi adicionado/alterado

### llms.txt (NOVO)

**Link:** [/llms.txt](https://seo-sprint-1-fundacoes-tecnicas.anaca-musica-site.workers.dev/llms.txt)

Arquivo criado do zero para crawlers de IA (ChatGPT, Claude, Perplexity). Contém:
- Descrição da escola em formato estruturado
- Lista completa dos 15 cursos com URLs
- Lista das páginas principais com URLs
- Informações de contato (telefone, endereço, Instagram)

### robots.txt (ALTERADO)

**Link:** [/robots.txt](https://seo-sprint-1-fundacoes-tecnicas.anaca-musica-site.workers.dev/robots.txt)

Adicionadas permissões explícitas para crawlers de IA:
- `GPTBot` (ChatGPT/OpenAI)
- `ClaudeBot` (Claude/Anthropic)
- `PerplexityBot` (Perplexity)
- `Google-Extended` (Google AI/Gemini)
- `Amazonbot` (Alexa/Amazon)
- `FacebookBot` (Meta)

### Schema JSON-LD (NOVO — em todas as páginas)

Dados estruturados adicionados via componente SchemaOrg.astro, injetados no `<head>` de cada página:

| Schema | Onde aparece | O que contém |
|--------|-------------|--------------|
| **MusicSchool** (Organization) | Todas as 48 páginas | Nome, endereço, telefone, geo-coordenadas, horários, catálogo de cursos, sameAs (Instagram) |
| **BreadcrumbList** | Todas as 48 páginas | Navegação hierárquica (Home > Cursos > Bateria) |
| **Course** | 15 páginas de curso | Nome, descrição, provider (Anacã), instructors (professores vinculados), educationalLevel, courseMode |
| **Person** | 25 páginas de professor | Nome, foto, jobTitle, worksFor (Anacã), knowsAbout (modalidades), sameAs (Instagram) |
| **FAQPage** | 4 cursos top + 3 guias = 7 páginas | Perguntas e respostas estruturadas (32 FAQs no total) |

### Sitemap (ATUALIZADO AUTOMATICAMENTE)

**Link:** [/sitemap-index.xml](https://seo-sprint-1-fundacoes-tecnicas.anaca-musica-site.workers.dev/sitemap-index.xml)

Gerado automaticamente pelo @astrojs/sitemap. Agora inclui as 3 novas páginas de guia:
- `/guias/como-escolher-escola-de-musica/`
- `/guias/musicalizacao-infantil-guia-para-pais/`
- `/guias/aprender-musica-adulto/`

Total: **48 páginas** indexadas (eram 45).

---

## Resumo de Conteúdo por Números

| Métrica | Antes | Depois |
|---------|-------|--------|
| Total de páginas | 45 | 48 |
| Páginas com H1 | 1 | 48 |
| Schemas JSON-LD | 0 | MusicSchool + BreadcrumbList + Course + Person + FAQPage |
| FAQs com schema | 0 | 32 (20 nos cursos + 12 nos guias) |
| Palavras nos 4 cursos top (média) | ~170 | 800+ |
| Pillar pages | 0 | 3 (~7.350 palavras no total) |
| llms.txt | inexistente | criado |
| Crawlers IA no robots.txt | nenhum | 6 (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Amazonbot, FacebookBot) |
