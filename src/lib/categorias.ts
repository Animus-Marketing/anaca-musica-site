export const categorias = {
  cordas: { label: 'Cordas', slug: 'cordas' },
  canto: { label: 'Canto', slug: 'canto' },
  percussao: { label: 'Bateria', slug: 'percussao' },
  sopro: { label: 'Sopro', slug: 'sopro' },
  teclas: { label: 'Teclas', slug: 'teclas' },
  kids: { label: 'Instrumentalização Infantil', slug: 'kids' },
} as const;

export type Categoria = keyof typeof categorias;

export const whatsappUrl = 'https://tintim.link/whatsapp/c3a08811-1dec-4386-b701-3f5ec0957175/76ef0c6e-6b30-44dd-b8c2-9ddc8afb38f1';
export const instagramUrl = 'https://www.instagram.com/anacamusica/';
export const endereco = 'Av. Brasil, 649 – Jardim Paulista, São Paulo';
export const telefone = '(11) 98913-7875';
