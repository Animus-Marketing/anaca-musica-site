# Task Plan: Responsiveness Review + GitHub/Cloudflare Deploy

## Goal
Review and fix all responsive issues across the Anacã Música Astro site, then push to GitHub for Cloudflare Pages deployment.

## Phase 1: Responsiveness Review ⬅ IN PROGRESS

### Issues Found & Fixes

| # | File | Issue | Severity | Status |
|---|------|-------|----------|--------|
| 1 | global.css | `--section-padding: 80px` never reduced on mobile | Medium | |
| 2 | index.astro | `.hero` min-height 80vh too tall on mobile | Medium | |
| 3 | a-escola.astro | `.som-section` min-height 700px not reduced for mobile | Medium | |
| 4 | a-escola.astro | `.quem-somos-section` min-height 600px not reduced for mobile | Medium | |
| 5 | curso/[slug].astro | `.kids-quem__inner` padding-bottom 250px on mobile excessive | Medium | |
| 6 | Header.astro | Mobile submenus always visible, no toggle | Medium | |
| 7 | index.astro | `.cta-banner` h2 max-width not reduced on mobile | Low | |
| 8 | evento/[slug].astro | Gallery columns:4 ok with existing breakpoints | OK | |

## Phase 2: GitHub Setup
- [ ] Create .gitignore
- [ ] Init repo in anaca-musica/
- [ ] Initial commit
- [ ] Push to GitHub

## Phase 3: Cloudflare Deploy (User)
- [ ] User creates Cloudflare Pages project
- [ ] User validates deploy
