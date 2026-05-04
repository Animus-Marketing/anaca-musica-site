import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const cursos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cursos' }),
  schema: z.object({
    titulo: z.string(),
    slug: z.string(),
    categoria: z.enum(['cordas', 'sopro', 'percussao', 'teclas', 'canto', 'kids']),
    descricao_curta: z.string(),
    imagem_hero: z.string().optional(),
    imagem_card: z.string().optional(),
    professores: z.array(z.string()).default([]),
    ordem: z.number().default(0),
    ativo: z.boolean().default(true),
    // Section 2: Tagline strip (eyebrow_heading_secao_1 / headline_secao_1 / subheading_secao_1)
    secao2_h6: z.string().optional(),
    secao2_h2: z.string().optional(),
    secao2_h4: z.string().optional(),
    // Section 3: Text left / Image right (secao_2 in CSV)
    secao3_h6: z.string().optional(),
    secao3_h2: z.string().optional(),
    secao3_h4: z.string().optional(),
    secao3_corpo: z.string().optional(),
    // Section 4: Image left / Text right (secao_3 in CSV)
    secao4_h6: z.string().optional(),
    secao4_h2: z.string().optional(),
    secao4_h4: z.string().optional(),
    secao4_corpo: z.string().optional(),
    // Section 5: CTA (secao_4 in CSV)
    cta_h6: z.string().optional(),
    cta_h2: z.string().optional(),
    cta_p: z.string().optional(),
    // SEO: FAQ section
    faq: z.array(z.object({
      pergunta: z.string(),
      resposta: z.string(),
    })).optional(),
    // SEO: Para quem é (target audience)
    para_quem: z.string().optional(),
    // SEO: O que você vai aprender (learning outcomes)
    o_que_aprende: z.array(z.string()).optional(),
    // SEO: Bloco citável para AIEO/GEO
    bloco_citavel: z.string().optional(),
  }),
});

const professores = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/professores' }),
  schema: z.object({
    nome: z.string(),
    slug: z.string(),
    foto: z.string().optional(),
    modalidades: z.array(z.string()).default([]),
    categorias: z.array(z.enum(['cordas', 'sopro', 'percussao', 'teclas', 'canto', 'kids'])).default([]),
    excerpt: z.string().optional(),
    instagram: z.string().optional(),
    tiktok: z.string().optional(),
    ordem: z.number().default(0),
    ativo: z.boolean().default(true),
  }),
});

const eventos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/eventos' }),
  schema: z.object({
    titulo: z.string(),
    slug: z.string(),
    data: z.string(),
    local: z.string(),
    horario: z.string().optional(),
    imagem_capa: z.string().optional(),
    imagem_wide: z.string().optional(),
    galeria: z.array(z.string()).optional(),
    destaque: z.boolean().default(false),
  }),
});

export const collections = { cursos, professores, eventos };
