# Component Patterns - Anacã Música

## Directory Structure

```
src/
├── layouts/
│   └── BaseLayout.astro       # HTML shell, head, fonts, global CSS
├── components/
│   ├── Header.astro           # Nav + logo + mobile menu
│   ├── Footer.astro           # Contact, social, copyright
│   ├── Hero.astro             # Full-width hero with bg image
│   ├── Section.astro          # Reusable page section wrapper
│   ├── CursoCard.astro        # Course card for listings
│   ├── ProfessorCard.astro    # Professor card for listings
│   ├── EventoCard.astro       # Event card for listings
│   ├── CategoryFilter.astro   # Tab/filter by category
│   ├── Button.astro           # CTA button (WhatsApp link)
│   ├── SEO.astro              # Meta tags + Open Graph
│   └── Gallery.astro          # Image gallery (events)
└── styles/
    └── global.css             # Design tokens + base styles
```

## BaseLayout.astro

```astro
---
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import SEO from '../components/SEO.astro';
import '../styles/global.css';

interface Props {
  title: string;
  description?: string;
  image?: string;
}

const { title, description, image } = Astro.props;
---
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <SEO title={title} description={description} image={image} />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Darker+Grotesque:wght@700;800;900&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet" />
</head>
<body>
  <Header />
  <main>
    <slot />
  </main>
  <Footer />
</body>
</html>
```

## Hero.astro

```astro
---
interface Props {
  title: string;
  subtitles?: string[];
  backgroundImage?: string;
  compact?: boolean;
}
const { title, subtitles = [], backgroundImage, compact = false } = Astro.props;
---
<section
  class:list={['hero', { 'hero--compact': compact }]}
  style={backgroundImage ? `--hero-bg: url(${backgroundImage})` : ''}
>
  <div class="hero__content">
    {subtitles.length > 0 && (
      <div class="hero__subtitles">
        {subtitles.map(s => <span class="hero__subtitle">{s}</span>)}
      </div>
    )}
    <h1 class="hero__title">{title}</h1>
    <slot />
  </div>
</section>
```

## CategoryFilter.astro (Client-side filtering)

```astro
---
import { categorias } from '../lib/categorias';
interface Props {
  active?: string;
}
const { active = 'todos' } = Astro.props;
---
<nav class="category-filter" data-filter>
  <button
    class:list={['category-filter__btn', { active: active === 'todos' }]}
    data-category="todos"
  >Todos</button>
  {Object.entries(categorias).map(([key, cat]) => (
    <button
      class:list={['category-filter__btn', { active: active === key }]}
      data-category={key}
    >{cat.label}</button>
  ))}
</nav>

<script>
  // Vanilla JS filtering - no framework needed
  document.querySelectorAll('[data-filter]').forEach(nav => {
    const buttons = nav.querySelectorAll('[data-category]');
    const items = document.querySelectorAll('[data-cat]');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.dataset.category;
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        items.forEach(item => {
          if (cat === 'todos' || item.dataset.cat?.includes(cat)) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  });
</script>
```

## Button.astro (WhatsApp CTA)

```astro
---
interface Props {
  text?: string;
  href?: string;
  variant?: 'primary' | 'outline';
}
const {
  text = 'MARCAR UMA AULA',
  href = 'https://wa.me/5511942904444',
  variant = 'primary'
} = Astro.props;
---
<a
  class:list={['btn', `btn--${variant}`]}
  href={href}
  target="_blank"
  rel="noopener noreferrer"
>{text}</a>
```

## Navigation Structure

```
Home
A Escola
Cursos
  ├── Cordas (Violão, Guitarra, Baixo, Cavaco, Ukulele, Violino, Violoncelo)
  ├── Canto
  ├── Percussão (Bateria)
  ├── Sopro (Flauta Doce, Flauta Transversal, Saxofone)
  ├── Teclas (Piano, Acordeon)
  └── Kids & Teens
Professores
Eventos
```
