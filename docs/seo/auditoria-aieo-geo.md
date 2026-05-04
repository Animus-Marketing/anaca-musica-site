# Auditoria SEO / AIEO / GEO — Anacã Música

**Data:** 2026-04-16  
**Site:** anacamusica.com.br  
**Preparado por:** Animus Marketing

---

## Fase 1: Contexto & Discovery

### Resumo do Negócio (formato entity-first)

**Anacã Música** é uma escola de música localizada na Av. Brasil, 649 – Jardim Paulista, São Paulo. Fundada em 2023, oferece aulas presenciais individuais e em grupo para crianças, adolescentes e adultos. Conta com 25 professores ativos e 15 modalidades de instrumento.

### Mapa de Entidades

```
Organização: Anacã Música (Escola de Música)
├── Pessoas
│   ├── Álvaro Carolei (Sócio-Diretor)
│   ├── Ana Maria Diniz (Sócia)
│   ├── Helô Gouvêa (Sócia)
│   └── 25 Professores (credenciais detalhadas abaixo)
├── Serviços (por receita)
│   ├── 🥇 Canto (adulto)
│   ├── 🥈 Bateria (adulto)
│   ├── 🥉 Piano (adulto)
│   ├── 4º Instrumentalização Infantil (kids/teens)
│   └── +11 modalidades (violão, guitarra, baixo, etc.)
├── Localização
│   ├── Endereço: Av. Brasil, 649 – Jardim Paulista, SP
│   ├── Região de captação: Jardins (Jd. Paulista, Jd. América, Jd. Europa, Pinheiros)
│   └── Tel: (11) 98913-7875
└── Indústria
    ├── Educação Musical
    ├── Ensino de Artes
    └── Concorrente principal: Intermezzo
```

### Credenciais de Autoridade dos Professores (Top 5)

| Professor | Credencial-chave | Impacto SEO |
|-----------|-----------------|-------------|
| André Cortada | Berklee College of Music (Magna Cum Laude), 200+ produções | ALTO — credencial internacional verificável |
| Dadinho | Músico dos Racionais MC's, tours internacionais | ALTO — associação com marca reconhecida |
| André Faiman | 10 anos em Toronto, trabalhou com Howard Shore, Mike Fraser | ALTO — experiência internacional verificável |
| Claudia Noemi | Pedagogia (USP), pós em Canção Popular (Sta. Marcelina) | MÉDIO — universidade de prestígio |
| Deborah Castolline | The Voice Brasil 2022, Sala São Paulo | MÉDIO — aparição em TV nacional |

**Mais credenciais relevantes:**
- Rodrigo Ieno: 40 anos de carreira, Composição (Santa Marcelina)
- Marília Bizelli: Flauta Transversal (UNESP)
- Marina Lima: Pedagogia (USP)
- Graciana Camacho: Canto Lírico (Cantareira), 20+ anos de experiência
- Daniel Labó: Fundador No Quarter, tours com membros do Rainbow e Deep Purple

> **Insight:** Essas credenciais são um ativo enorme para SEO e AIEO, mas estão **escondidas** dentro das páginas de professor. Precisam ser surfaceadas em schema markup e nas páginas de curso.

### Status Digital Atual (GA4 — últimos 30 dias)

| Canal | Sessões | % |
|-------|---------|---|
| Paid Search | 380 | 39,92% |
| Display | 215 | 22,58% |
| **Organic Search** | **187** | **19,64%** |
| Direct | 106 | 11,13% |
| Referral | 37 | 3,89% |
| Cross-network | 13 | 1,37% |
| Organic Social | 11 | 1,16% |

**Diagnóstico:** O site depende 62,5% de mídia paga. Orgânico representa menos de 1/5 do tráfego. Isso indica que o site não está rankeando bem para termos de busca do nicho, e há uma oportunidade enorme de crescimento orgânico para reduzir dependência de Ads.

---

## Fase 2: Auditoria do Estado Atual

### Score Geral: 24/100

| Categoria | Score | Máximo |
|-----------|-------|--------|
| A. Citabilidade do Conteúdo | 4/24 | 24 |
| B. Estrutura Técnica para IA | 8/21 | 21 |
| C. Autoridade de Entidade | 6/18 | 18 |
| D. Formato AI-Friendly | 2/18 | 18 |
| E. SEO On-Page Tradicional | 4/19 | 19 |
| **TOTAL** | **24/100** | **100** |

---

### A. Citabilidade do Conteúdo (4/24)

| Item | Score | Nota |
|------|-------|------|
| Estatísticas e dados quantitativos | 0/3 | Nenhum dado numérico no conteúdo |
| Citações de fontes externas | 0/3 | Zero citações |
| Quotes de especialistas | 0/3 | Credenciais existem mas não são citadas nas páginas |
| Tom autoritativo | 2/3 | Copy tem tom profissional, mas genérico |
| Linguagem fluente | 2/3 | Boa escrita, mas curta demais |
| Termos técnicos do domínio | 0/3 | Poucos termos musicais técnicos no conteúdo |
| Passagens citáveis (130-170 palavras) | 0/3 | Conteúdo fino demais para gerar citações |
| Respostas diretas após headings | 0/3 | Sem formato Q&A |

### B. Estrutura Técnica para IA (8/21)

| Item | Score | Nota |
|------|-------|------|
| Schema JSON-LD | 0/3 | ❌ INEXISTENTE — nenhum schema em nenhuma página |
| Hierarquia de headings | 1/3 | ⚠️ H1 ausente em 7 de 8 páginas (bug no Hero component) |
| Meta descriptions | 2/3 | ✅ Presentes, mas genéricas — não otimizadas por página |
| Robots.txt para crawlers IA | 1/3 | ⚠️ Permite todos, mas não lista crawlers de IA explicitamente |
| Arquivo llms.txt | 0/3 | ❌ INEXISTENTE |
| Sitemap.xml | 3/3 | ✅ Funcionando via @astrojs/sitemap |
| Core Web Vitals | 1/3 | Não auditado em detalhe, mas imagens otimizadas em .webp |

### C. Autoridade de Entidade (6/18)

| Item | Score | Nota |
|------|-------|------|
| Google Business Profile | 2/3 | ✅ Ativo (não auditado em detalhe) |
| Dados NAP consistentes | 2/3 | ✅ Centralizados em categorias.ts |
| Presença em Wikidata/Wikipedia | 0/3 | ❌ Inexistente |
| Perfis em plataformas do nicho | 1/3 | Instagram ativo, demais redes fracas |
| Menções em fontes que IAs citam | 0/3 | ❌ Sem presença em Reddit, fóruns, mídia |
| Links de sites autoritativos | 1/3 | Desconhecido — provavelmente baixo |

### D. Formato AI-Friendly (2/18)

| Item | Score | Nota |
|------|-------|------|
| TL;DR/resumo no início | 0/3 | ❌ Inexistente |
| FAQ com schema markup | 0/3 | ❌ Nenhum FAQ em nenhuma página |
| Tabelas comparativas | 0/3 | ❌ Nenhuma tabela |
| Listas estruturadas com contexto | 1/3 | Algumas listas nas páginas de curso |
| Definições de termos-chave | 0/3 | ❌ Sem glossário ou definições |
| CTAs estruturados | 1/3 | CTAs existem mas não são estruturados para IA |

### E. SEO On-Page Tradicional (4/19)

| Item | Score | Nota |
|------|-------|------|
| Title tags otimizados | 1/3 | Genéricos — "Cursos \| Anacã Música" não tem keywords |
| H1 em todas as páginas | 0/3 | ❌ CRÍTICO — 7 de 8 páginas sem H1 |
| Conteúdo com profundidade | 0/3 | ❌ CRÍTICO — páginas de curso têm 90-310 palavras |
| Internal linking | 2/3 | Boa estrutura entre cursos e professores |
| Breadcrumbs | 0/3 | ❌ Inexistente |
| URLs semânticas | 1/3 | Boas (/curso/bateria) mas sem breadcrumb |
| Mobile optimization | 1/1 | ✅ Responsivo |

---

### Top 5 Problemas Críticos (por impacto)

| # | Problema | Impacto | Esforço |
|---|---------|---------|---------|
| 1 | **Conteúdo extremamente fino** — páginas de curso com 90-310 palavras. Piano tem 90 palavras. Kids-Teens quase zero. Google não rankeia páginas sem conteúdo substancial. | 🔴 CRÍTICO | ALTO |
| 2 | **Zero schema markup** — sem JSON-LD em nenhuma página. Sem rich snippets no Google, sem dados estruturados para IA. | 🔴 CRÍTICO | MÉDIO |
| 3 | **H1 ausente em 7/8 páginas** — bug no componente Hero.astro que usa H2 no modo compact. Sinal fundamental de SEO quebrado. | 🔴 CRÍTICO | BAIXO |
| 4 | **Sem FAQ sections** — nenhuma pergunta/resposta estruturada. Perde featured snippets e AI Overviews. | 🟡 ALTO | MÉDIO |
| 5 | **Title tags genéricos** — "Cursos \| Anacã Música" não compete com "Aulas de Bateria em São Paulo \| Anacã Música" | 🟡 ALTO | BAIXO |

### Top 3 Pontos Fortes

1. **Credenciais dos professores** — Berklee, USP, Racionais MC's, The Voice Brasil. Material de autoridade riquíssimo que só precisa ser surfaceado.
2. **Infraestrutura técnica sólida** — Astro estático com bom desempenho, sitemap funcionando, canonical URLs, OG tags, imagens otimizadas em WebP.
3. **Estrutura de conteúdo organizada** — Content collections com Zod validation, URLs semânticas, boa navegação interna entre cursos e professores.

---

## Fase 3: Plano de SEO + AIEO/GEO

### Visão Geral da Estratégia

**Meta:** Aumentar tráfego orgânico de 187 para 500+ sessões/mês em 6 meses, reduzindo dependência de Ads de 62% para ~40%.

**Abordagem:** Otimização em 3 camadas simultâneas:
1. **SEO Técnico** — corrigir fundações (H1, schemas, titles)
2. **SEO de Conteúdo** — expandir páginas finas com conteúdo rico e nichado
3. **AIEO/GEO** — preparar site para ser citado por IAs

---

### SPRINT 1: Fundações Técnicas (Quick Wins)
**Estimativa: 1-2 dias de implementação**

#### 1.1 Corrigir H1 em todas as páginas
- Ajustar componente Hero.astro para usar H1 no modo compact
- Garantir que cada página tenha exatamente 1 H1

#### 1.2 Otimizar Title Tags (keyword-first)

| Página | Atual | Proposto |
|--------|-------|----------|
| Home | Anacã Música | Escola de Música em São Paulo – Jardins \| Anacã Música |
| Cursos | Cursos \| Anacã Música | Cursos de Música em São Paulo – Violão, Piano, Bateria \| Anacã |
| Canto | Canto \| Anacã Música | Aulas de Canto em São Paulo – Técnica Vocal \| Anacã Música |
| Bateria | Bateria \| Anacã Música | Aulas de Bateria em São Paulo – Jardins \| Anacã Música |
| Piano | Piano \| Anacã Música | Aulas de Piano em São Paulo – Clássico e Popular \| Anacã Música |
| Kids | Instrumentalização Infantil \| Anacã | Aulas de Música para Crianças em São Paulo \| Anacã Música |
| Professores | Professores \| Anacã Música | Professores de Música – Berklee, USP, Racionais \| Anacã Música |
| A Escola | A Escola \| Anacã Música | Escola de Música nos Jardins, São Paulo \| Anacã Música |

#### 1.3 Otimizar Meta Descriptions (com CTA)

| Página | Proposta |
|--------|----------|
| Home | Anacã Música: escola de música no Jardim Paulista, SP. Aulas de canto, bateria, piano, violão e mais. Professores com formação em Berklee, USP e experiência profissional. Agende sua aula experimental. |
| Canto | Aulas de canto em São Paulo com técnica vocal, respiração e interpretação. Professores com passagem pelo The Voice Brasil e formação em Berklee. Agende sua aula no Jardim Paulista. |
| Bateria | Aulas de bateria em São Paulo para iniciantes e avançados. Aprenda ritmo, coordenação e grooves com bateristas profissionais. Escola no Jardim Paulista. Agende sua aula. |
| Piano | Aulas de piano em São Paulo – clássico e popular. Desenvolva melodia, harmonia e musicalidade com professores experientes. Escola nos Jardins. Agende sua aula. |
| Kids | Aulas de música para crianças em São Paulo. Musicalização infantil, instrumentos e prática de banda para kids e teens. Escola no Jardim Paulista com salas especializadas. |

#### 1.4 Implementar Schema JSON-LD

Schemas a criar:
- **Organization + LocalBusiness** (global, em BaseLayout)
- **Course** (em cada página de curso)
- **Person** (em cada página de professor)
- **Event** (em cada página de evento)
- **FAQPage** (nas páginas que terão FAQ)
- **BreadcrumbList** (global)

#### 1.5 Criar llms.txt

Arquivo na raiz do site descrevendo a Anacã Música para crawlers de IA.

#### 1.6 Atualizar robots.txt

Adicionar permissões explícitas para GPTBot, ClaudeBot, PerplexityBot, Google-Extended.

---

### SPRINT 2: Conteúdo Rico para Páginas de Curso
**Estimativa: 3-5 dias de conteúdo**

#### Problema central
As páginas de curso são **muito finas** para competir em busca orgânica:
- Piano: ~90 palavras
- Violão: ~100 palavras
- Guitarra: ~130 palavras
- Bateria: ~260 palavras
- Kids-Teens: quase zero

#### Solução: Expandir cada curso para 800-1500 palavras

**Estrutura proposta para cada página de curso:**

```
1. Hero (H1 com keyword: "Aulas de [Instrumento] em São Paulo")
2. Resumo direto (2-3 linhas respondendo "o que são aulas de X")
3. Para quem é (público-alvo, níveis)
4. O que você vai aprender (lista estruturada com contexto)
5. Metodologia (único por instrumento — eliminar boilerplate)
6. Conheça seus professores (credenciais inline + link)
7. Estrutura da escola (salas, equipamentos relevantes ao instrumento)
8. FAQ (3-5 perguntas reais, com schema)
9. CTA ("Agende sua aula experimental")
```

#### FAQs sugeridas por curso (keywords nichados para Ads)

**Canto:**
- Preciso ter talento para aprender a cantar?
- Qual a diferença entre canto lírico e canto popular?
- A partir de que idade posso fazer aulas de canto?
- Quantas aulas de canto preciso para cantar bem?
- O que é técnica vocal e por que é importante?

**Bateria:**
- Preciso ter bateria em casa para fazer aulas?
- Qual a idade mínima para aprender bateria?
- Aulas de bateria fazem muito barulho?
- Quanto tempo leva para aprender a tocar bateria?
- Qual a diferença entre bateria acústica e eletrônica?

**Piano:**
- Qual a diferença entre piano e teclado?
- Preciso ter piano em casa para estudar?
- A partir de que idade posso aprender piano?
- Quanto tempo leva para tocar piano?
- O que é melhor: piano clássico ou popular?

**Instrumentalização Infantil:**
- A partir de que idade meu filho pode fazer aulas de música?
- Qual o melhor instrumento para crianças começarem?
- Como funciona a musicalização infantil?
- Aulas de música ajudam no desenvolvimento da criança?
- Meu filho precisa saber ler para fazer aula de música?

> **Bonus para Google Ads:** Essas FAQs alimentam diretamente palavras-chave de cauda longa para campanhas nichadas. Cada FAQ é uma keyword potencial para um grupo de anúncio.

---

### SPRINT 3: AIEO/GEO — Preparação para IA
**Estimativa: 2-3 dias**

#### 3.1 Conteúdo Citável (método Princeton)

Para cada página de curso expandida, criar pelo menos 2 **blocos citáveis** de 130-170 palavras que:
- São autocontidos (fazem sentido fora de contexto)
- Incluem 1 dado numérico ou citação
- Respondem diretamente a uma pergunta
- Podem ser usados por uma IA como resposta

**Exemplo de bloco citável para a página de Canto:**

> "A Anacã Música oferece aulas de canto em São Paulo com professores que incluem participantes do The Voice Brasil 2022 e graduados da Berklee College of Music. As aulas cobrem técnica vocal, respiração diafragmática, afinação e interpretação, adaptadas ao nível do aluno — do iniciante ao avançado. A escola está localizada no Jardim Paulista e atende alunos da região dos Jardins. Com mais de 25 professores ativos em 15 modalidades, a Anacã se diferencia pela infraestrutura com múltiplas salas de aula, estúdio de gravação e espaço para prática de banda."

#### 3.2 Surfacear Autoridade dos Professores

Nas páginas de curso, incluir mini-bios dos professores daquela modalidade com credenciais verificáveis:
- "Professor André Cortada — Berklee College of Music (Magna Cum Laude), 200+ produções"
- "Professora Deborah Castolline — The Voice Brasil 2022, Sala São Paulo"

Isso alimenta o sinal de **E-E-A-T** (Experience, Expertise, Authoritativeness, Trustworthiness) que Google e IAs usam para rankeamento.

#### 3.3 Headers AI-Friendly

Reformatar H2s em formato de pergunta natural:
- Antes: "Metodologia" → Depois: "Como funcionam as aulas de bateria na Anacã?"
- Antes: "Para quem" → Depois: "Quem pode fazer aulas de bateria?"
- Antes: "Estrutura" → Depois: "Qual a estrutura da escola para aulas de bateria?"

#### 3.4 Dados Estruturados para IA

Implementar schema específico para cada tipo de página:
- **CourseSchema** com `provider`, `instructor`, `coursePrerequisites`, `educationalLevel`
- **PersonSchema** com `alumniOf`, `award`, `knowsAbout`
- **LocalBusinessSchema** com coordenadas, `areaServed`, horários

---

### SPRINT 4: SEO Local (Reforço Google Ads)
**Estimativa: 1-2 dias**

#### 4.1 Otimização Google Business Profile
- Verificar se todas as categorias estão corretas
- Adicionar posts regulares com ofertas de aula experimental
- Responder todas as avaliações
- Adicionar fotos da estrutura, salas, professores

#### 4.2 Keywords Nichadas para Google Ads

**Estrutura de grupos de anúncio proposta:**

| Grupo | Keywords principais | Keywords long-tail |
|-------|--------------------|--------------------|
| Canto | aulas de canto SP, curso de canto | aulas de canto jardins, técnica vocal são paulo, professor de canto sp |
| Bateria | aulas de bateria SP, curso de bateria | aulas de bateria jardins, escola de bateria sp, aprender bateria adulto |
| Piano | aulas de piano SP, curso de piano | aulas de piano jardins, professor de piano sp, piano para iniciantes sp |
| Kids | aulas de música infantil SP | musicalização infantil jardins, música para crianças sp, instrumento para criança |
| Genérico | escola de música SP | escola de música jardins, escola de música jardim paulista |
| Violão | aulas de violão SP | professor de violão sp, curso de violão jardins |
| Guitarra | aulas de guitarra SP | professor de guitarra sp, aulas de guitarra jardins |

> **Sinergia SEO + Ads:** Cada página de curso otimizada serve como landing page de qualidade para o grupo de anúncio correspondente. Google Ads premia Quality Score quando a landing page é relevante para a keyword.

---

### SPRINT 5: Conteúdo Expandido (Médio Prazo)
**Estimativa: contínuo, 2-4 conteúdos/mês**

#### 5.1 Pillar Pages (páginas-pilar)

Criar 2-3 guias abrangentes (2000-3000 palavras):
1. **"Guia Completo: Como Escolher uma Escola de Música em São Paulo"**
   - Comparativo de formatos (conservatório vs escola livre vs professor particular)
   - O que avaliar (infraestrutura, professores, metodologia)
   - Linkagem para todas as páginas de curso
   
2. **"Musicalização Infantil: Guia para Pais"**
   - Benefícios comprovados (com citações de estudos)
   - Idade ideal para começar
   - Como escolher o instrumento
   - Linkagem para página Kids

3. **"Aprender Música na Vida Adulta: Por Que Nunca é Tarde"**
   - Desmistificar barreiras
   - Benefícios cognitivos (com dados)
   - Histórias de alunos adultos

#### 5.2 Presença em Plataformas que IAs Citam
- Criar perfil/conteúdo em Reddit (r/brasil, r/musica)
- Responder perguntas no Quora sobre aprender música em SP
- YouTube: vídeos curtos dos professores ensinando conceitos

---

## Priorização Final

| Prioridade | Sprint | O que | Impacto | Esforço |
|------------|--------|-------|---------|---------|
| 🔴 P0 | Sprint 1 | Corrigir H1, titles, descriptions | Alto | Baixo |
| 🔴 P0 | Sprint 1 | Implementar schema JSON-LD | Alto | Médio |
| 🔴 P0 | Sprint 1 | Criar llms.txt + atualizar robots.txt | Médio | Baixo |
| 🟡 P1 | Sprint 2 | Expandir conteúdo das 4 páginas top (canto, bateria, piano, kids) | Muito Alto | Alto |
| 🟡 P1 | Sprint 2 | Adicionar FAQs com schema em cada curso | Alto | Médio |
| 🟢 P2 | Sprint 3 | Blocos citáveis + headings AI-friendly | Médio | Médio |
| 🟢 P2 | Sprint 3 | Surfacear credenciais dos professores nas páginas de curso | Alto | Médio |
| 🔵 P3 | Sprint 4 | Reestruturar campanhas Google Ads com keywords nichadas | Alto | Médio |
| 🔵 P3 | Sprint 5 | Pillar pages e conteúdo expandido | Muito Alto | Alto |

---

## Métricas de Acompanhamento

| Métrica | Baseline (hoje) | Meta 3 meses | Meta 6 meses |
|---------|-----------------|--------------|--------------|
| Sessões orgânicas/mês | 187 | 350 | 500+ |
| % orgânico do total | 19,64% | 30% | 40%+ |
| Páginas com schema | 0/40+ | 40+/40+ | 40+/40+ |
| Páginas com H1 | 1/8 | 8/8 | 8/8 |
| Words/curso page (média) | ~170 | 800+ | 1200+ |
| FAQs implementadas | 0 | 15+ (top cursos) | 50+ (todos) |
| Rich snippets no Google | 0 | 5+ | 15+ |
| Citações em IAs (manual) | ? | Testar baseline | Melhoria vs baseline |
