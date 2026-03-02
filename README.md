# Purple Planning - Digital Planner E-Commerce MVP

An e-commerce platform for digital planners, journals, and productivity tools. Built with React 19, Vite 7, and Tailwind CSS 4.

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 19.2 | UI framework (lazy loading, Suspense) |
| Vite | 7.3 | Build tool & dev server |
| Tailwind CSS | 4.1 | Utility-first styling |
| Framer Motion | 12.x | Page transitions & animations |
| React Router | 7.x | Client-side routing |
| React Helmet Async | 2.x | SEO / meta tag management |
| Lucide React | 0.563 | Icon library |

## Getting Started

```bash
npm install
npm run dev
```

The dev server starts at `http://localhost:5173`.

## Scripts

```bash
npm run dev              # Local dev server
npm run build            # Production build
npm run build:staging    # Build for GitHub Pages
npm run build:production # Build for IONOS
npm run lint             # ESLint
npm run preview          # Preview production build
```

## Project Structure

```
src/
├── main.jsx                    # Bootstrap: providers, router, error boundary
├── App.jsx                     # Route definitions, layout, page transitions
├── index.css                   # Global styles, Tailwind, animations
│
├── pages/                      # All pages (lazy-loaded)
├── components/                 # Reusable UI components
│   ├── layout/                 # Navbar, Footer, CartSidebar
│   └── ui/                     # ProductCard, OptimizedImage, FeedbackToast
├── contexts/                   # React Context providers (Theme, Language, Cart, User)
├── hooks/                      # Custom React hooks
└── data/                       # Static data, translations, styles
```

## Key Features

- **Shopping Cart** — Add/remove products, adjust quantities, discount codes, localStorage persistence
- **Checkout** — Lemon Squeezy integration (Merchant of Record) via PHP backend
- **Bundle System** — Quiz-based bundle recommendation with automatic discounts
- **i18n** — German (default), English, Swedish
- **Theme** — Dark/light mode with system preference detection
- **User Profile** — Loyalty tier system with points

## Environments

| Branch | Environment | Hosting |
|--------|-------------|---------|
| `main` | Production | IONOS (FTPS) |
| `dev` | Staging | GitHub Pages |

## CI/CD

| Workflow | Trigger | Action |
|---|---|---|
| `ci.yml` | PR to main/dev, push to dev | Lint + build check |
| `deploy.yml` | Push to `dev` | Build staging → GitHub Pages |
| `production.yml` | Push to `main` | Build production → IONOS (FTPS) |

## Performance

- Code splitting with lazy-loaded pages and vendor chunk splitting
- Responsive images via Unsplash CDN (WebP, srcset, lazy loading)
- Tailwind CSS purging, Terser minification, tree shaking

## Accessibility

- Skip-to-content links
- ARIA labels on interactive elements
- Keyboard navigation (ESC to close menus/modals)
- Focus-visible styles, screen reader support
- Reduced motion support (`prefers-reduced-motion`)
