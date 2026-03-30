# Design System - Anacã Música

## CSS Custom Properties (src/styles/global.css)

```css
:root {
  /* Colors */
  --color-bg: #000000;
  --color-bg-alt: #0a0a0a;
  --color-text: #FFFFFF;
  --color-text-muted: #999999;
  --color-accent: #FF6530;
  --color-accent-hover: #FF7A4D;
  --color-border: #222222;

  /* Typography */
  --font-heading: 'Darker Grotesque', sans-serif;
  --font-body: 'Poppins', sans-serif;

  /* Font sizes - fluid */
  --text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  --text-sm: clamp(0.875rem, 0.8rem + 0.35vw, 1rem);
  --text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
  --text-lg: clamp(1.125rem, 1rem + 0.6vw, 1.375rem);
  --text-xl: clamp(1.5rem, 1.2rem + 1.5vw, 2.25rem);
  --text-2xl: clamp(2rem, 1.5rem + 2.5vw, 3.5rem);
  --text-3xl: clamp(2.5rem, 2rem + 3vw, 5rem);

  /* Spacing */
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 1.5rem;
  --space-lg: 3rem;
  --space-xl: 5rem;
  --space-2xl: 8rem;

  /* Layout */
  --container-max: 1200px;
  --container-padding: clamp(1rem, 3vw, 2rem);

  /* Effects */
  --radius-sm: 8px;
  --radius-md: 15px;
  --radius-lg: 24px;
  --transition: 0.3s ease;
}

/* Reset & Base */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; }

body {
  font-family: var(--font-body);
  font-weight: 300;
  font-size: var(--text-base);
  line-height: 1.7;
  color: var(--color-text);
  background-color: var(--color-bg);
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: 800;
  text-transform: uppercase;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

a { color: var(--color-accent); text-decoration: none; transition: color var(--transition); }
a:hover { color: var(--color-accent-hover); }

img { max-width: 100%; height: auto; display: block; }

/* Container */
.container {
  width: 100%;
  max-width: var(--container-max);
  margin: 0 auto;
  padding-inline: var(--container-padding);
}

/* Section */
.section {
  padding-block: var(--space-xl);
}

/* Hero */
.hero {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: var(--hero-bg, none) center/cover no-repeat;
  padding: var(--space-xl) var(--container-padding);
}
.hero::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.9) 100%);
  z-index: 0;
}
.hero__content { position: relative; z-index: 1; text-align: center; max-width: 800px; }
.hero__title { font-size: var(--text-3xl); margin-bottom: var(--space-md); }
.hero__subtitle { color: var(--color-accent); font-family: var(--font-heading); font-size: var(--text-lg); }
.hero--compact { min-height: 40vh; }

/* Buttons */
.btn {
  display: inline-block;
  padding: 0.875rem 2rem;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: var(--text-sm);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: var(--radius-sm);
  transition: all var(--transition);
  cursor: pointer;
  border: 2px solid var(--color-accent);
}
.btn--primary {
  background: var(--color-accent);
  color: var(--color-bg);
}
.btn--primary:hover {
  background: var(--color-accent-hover);
  color: var(--color-bg);
}
.btn--outline {
  background: transparent;
  color: var(--color-accent);
}
.btn--outline:hover {
  background: var(--color-accent);
  color: var(--color-bg);
}

/* Cards */
.card {
  background: var(--color-bg-alt);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: transform var(--transition), border-color var(--transition);
}
.card:hover {
  transform: translateY(-4px);
  border-color: var(--color-accent);
}
.card__image { aspect-ratio: 4/3; object-fit: cover; width: 100%; }
.card__body { padding: var(--space-md); }
.card__title { font-size: var(--text-lg); margin-bottom: var(--space-xs); }
.card__text { color: var(--color-text-muted); font-size: var(--text-sm); }

/* Grid */
.grid {
  display: grid;
  gap: var(--space-md);
}
.grid--2 { grid-template-columns: repeat(auto-fill, minmax(min(100%, 400px), 1fr)); }
.grid--3 { grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr)); }
.grid--4 { grid-template-columns: repeat(auto-fill, minmax(min(100%, 250px), 1fr)); }

/* Category Filter */
.category-filter {
  display: flex;
  gap: var(--space-xs);
  flex-wrap: wrap;
  margin-bottom: var(--space-lg);
}
.category-filter__btn {
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
  padding: 0.5rem 1.25rem;
  border-radius: 999px;
  font-family: var(--font-body);
  font-size: var(--text-sm);
  cursor: pointer;
  transition: all var(--transition);
}
.category-filter__btn:hover,
.category-filter__btn.active {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

/* Gallery */
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: var(--space-xs);
}
.gallery img {
  border-radius: var(--radius-sm);
  aspect-ratio: 1;
  object-fit: cover;
  width: 100%;
}
```

## Responsive Breakpoints

```css
/* Mobile-first. Add complexity for larger screens. */
@media (min-width: 768px) {
  /* Tablet adjustments */
}
@media (min-width: 1025px) {
  /* Desktop adjustments */
}
```

## Color Usage Guide

| Element | Color | Token |
|---------|-------|-------|
| Page background | #000000 | --color-bg |
| Card background | #0a0a0a | --color-bg-alt |
| Primary text | #FFFFFF | --color-text |
| Muted/secondary text | #999999 | --color-text-muted |
| Accent / CTA / Links | #FF6530 | --color-accent |
| Borders | #222222 | --color-border |

## Typography Guide

| Element | Font | Weight | Transform |
|---------|------|--------|-----------|
| h1 | Darker Grotesque | 800-900 | uppercase |
| h2-h3 | Darker Grotesque | 700-800 | uppercase |
| Body | Poppins | 300 | none |
| Buttons/Labels | Darker Grotesque | 700 | uppercase |
| Small text | Poppins | 400 | none |
