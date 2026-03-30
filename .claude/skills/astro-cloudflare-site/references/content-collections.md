# Content Collections - Anacã Música

## Directory Structure

```
src/content/
├── config.ts              # Collection schemas
├── cursos/                # 15 course markdown files
│   ├── violao.md
│   ├── piano.md
│   └── ...
├── professores/           # 20 professor markdown files
│   ├── gabriel-guerra.md
│   └── ...
├── eventos/               # Event markdown files
│   └── show-case-2025.md
└── modalidades/           # 20 modality JSON/MD files
    └── ...
```

## Schema Definitions (src/content/config.ts)

```typescript
import { defineCollection, z } from 'astro:content';

const cursos = defineCollection({
  type: 'content',
  schema: z.object({
    titulo: z.string(),
    slug: z.string(),
    categoria: z.enum(['cordas', 'sopro', 'percussao', 'teclas', 'canto', 'kids']),
    subtitulos: z.array(z.string()).optional(), // e.g. ["Som e expressão", "popular e versátil"]
    descricao_curta: z.string(),
    imagem_hero: z.string(),
    imagem_card: z.string().optional(),
    professores: z.array(z.string()), // slugs dos professores
    ordem: z.number().default(0),
    ativo: z.boolean().default(true),
  }),
});

const professores = defineCollection({
  type: 'content',
  schema: z.object({
    nome: z.string(),
    slug: z.string(),
    foto: z.string(), // path to /public/images/professores/
    instrumentos: z.array(z.string()), // slugs dos cursos que ensina
    categorias: z.array(z.enum(['cordas', 'sopro', 'percussao', 'teclas', 'canto', 'kids'])),
    estilos: z.array(z.string()).optional(), // e.g. ["MPB", "Rock", "Reggae"]
    formacao: z.string().optional(),
    ordem: z.number().default(0),
    ativo: z.boolean().default(true),
  }),
});

const eventos = defineCollection({
  type: 'content',
  schema: z.object({
    titulo: z.string(),
    slug: z.string(),
    data: z.string(), // ISO date
    local: z.string(),
    horario: z.string().optional(),
    imagem_capa: z.string().optional(),
    galeria: z.array(z.string()).optional(), // paths to gallery images
    destaque: z.boolean().default(false),
  }),
});

export const collections = { cursos, professores, eventos };
```

## Example: Curso Markdown (src/content/cursos/violao.md)

```markdown
---
titulo: "Violão"
slug: "violao"
categoria: "cordas"
subtitulos: ["Som e expressão", "popular e versátil", "Som em movimento"]
descricao_curta: "Um dos instrumentos mais populares e versáteis da música"
imagem_hero: "/images/cursos/violao-hero.webp"
imagem_card: "/images/cursos/violao-card.webp"
professores: ["gabriel-guerra", "lucas-venutti"]
ordem: 1
ativo: true
---

## A linguagem musical do violão

O violão é um dos instrumentos mais populares e versáteis da música. Ele acompanha,
cria e sustenta canções, desenvolvendo harmonia, ritmo, coordenação e independência musical.

## Prática, teoria e repertório integrados

Na Anacã, o aprendizado é personalizado e construído colaborativamente entre aluno
e professor, respeitando o ritmo e os objetivos individuais de cada um.

Desde a primeira aula, a prática, a teoria e o repertório caminham juntos — de forma
leve e integrada — para que o aluno viva uma experiência musical autêntica, com foco
no prazer em tocar.
```

## Example: Professor Markdown (src/content/professores/gabriel-guerra.md)

```markdown
---
nome: "Gabriel Guerra"
slug: "gabriel-guerra"
foto: "/images/professores/gabriel-guerra.webp"
instrumentos: ["bateria", "violao", "ukulele"]
categorias: ["percussao", "cordas", "kids"]
estilos: ["MPB", "Rock", "Reggae"]
formacao: "Licenciatura em Educação Musical pela FIAM-FAAM"
ordem: 1
ativo: true
---

Gabriel é formado em Educação Musical pela FIAM-FAAM. Ensina bateria, violão,
ukulele, musicalização infantil e prática de conjunto. Também atua como músico
e professor de música em escolas regulares. Atualmente é baterista do musical
infantil "Parlendô".

"Ensinar música é guiar o aluno num caminho de descobertas e de construção de
recursos para que ele possa comunicar algo de dentro para fora."
```

## Example: Evento Markdown (src/content/eventos/show-case-2025.md)

```markdown
---
titulo: "Show Case 2025"
slug: "show-case-2025"
data: "2025-11-15"
local: "House of Legends, Vila Madalena"
horario: "14h às 21h"
imagem_capa: "/images/eventos/showcase-2025-capa.webp"
galeria:
  - "/images/eventos/showcase-2025-01.webp"
  - "/images/eventos/showcase-2025-02.webp"
destaque: true
---

O showcase aconteceu em novembro de 2025 na House of Legends, em Vila Madalena,
das 14h às 21h. O evento foi inteiramente dedicado à música.

Dividido em cinco blocos com repertórios variados, o evento demonstrou o
crescimento dos alunos, sua técnica e expressividade ao longo do ano.
```

## Querying Collections in Pages

```astro
---
// src/pages/cursos/index.astro
import { getCollection } from 'astro:content';
const cursos = (await getCollection('cursos'))
  .filter(c => c.data.ativo)
  .sort((a, b) => a.data.ordem - b.data.ordem);
---
```

```astro
---
// src/pages/curso/[slug].astro
import { getCollection } from 'astro:content';
export async function getStaticPaths() {
  const cursos = await getCollection('cursos');
  return cursos.map(curso => ({
    params: { slug: curso.data.slug },
    props: { curso },
  }));
}
const { curso } = Astro.props;
const { Content } = await curso.render();
---
```

## Categories Map

```typescript
// src/lib/categorias.ts
export const categorias = {
  cordas: { label: 'Cordas', slug: 'cordas' },
  sopro: { label: 'Sopro', slug: 'sopro' },
  percussao: { label: 'Percussão', slug: 'percussao' },
  teclas: { label: 'Teclas', slug: 'teclas' },
  canto: { label: 'Canto', slug: 'canto' },
  kids: { label: 'Kids & Teens', slug: 'kids' },
} as const;
```
