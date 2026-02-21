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

## Project Structure

```
src/
├── main.jsx                    # Bootstrap: providers, router, error boundary
├── App.jsx                     # Route definitions, layout, page transitions
├── index.css                   # Global styles, Tailwind, animations
│
├── pages/                      # All pages (lazy-loaded)
│   ├── HomePage.jsx            # Hero, manifesto, featured products
│   ├── ShopPage.jsx            # Product grid (9 products)
│   ├── ProductDetailPage.jsx   # Single product view with tabs
│   ├── BundlePage.jsx          # Quiz → bundle recommendation
│   ├── AboutPage.jsx           # Brand story, team
│   ├── BlogPage.jsx            # Blog article list
│   ├── ContactPage.jsx         # Contact form (simulated)
│   ├── RoadmapPage.jsx         # Feature roadmap (Q2/Q3 2026)
│   ├── ProfilePage.jsx         # User dashboard, loyalty levels
│   ├── ImpressumPage.jsx       # Legal / Impressum
│   ├── DatenschutzPage.jsx     # Privacy policy
│   └── NotFoundPage.jsx        # 404 page
│
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx          # Header: nav, theme toggle, language, cart icon
│   │   ├── Footer.jsx          # Footer with legal links
│   │   └── CartSidebar.jsx     # Slide-out cart drawer
│   ├── ui/
│   │   ├── ProductCard.jsx     # Product card for grid views
│   │   ├── OptimizedImage.jsx  # Responsive images, WebP, lazy loading
│   │   └── FeedbackToast.jsx   # Toast notifications
│   ├── ErrorBoundary.jsx       # React error boundary
│   ├── LoadingSpinner.jsx      # Suspense fallback spinner
│   ├── OfflineBanner.jsx       # Online/offline detection banner
│   └── SEO.jsx                 # React Helmet wrapper
│
├── contexts/                   # Global state (React Context API)
│   ├── ThemeContext.jsx        # Dark/light mode + color tokens
│   ├── LanguageContext.jsx     # i18n (DE/EN/SE) + translation function
│   ├── CartContext.jsx         # Cart, discounts, totals, persistence
│   └── UserContext.jsx         # User profile, loyalty level system
│
├── hooks/                      # Custom React hooks
│   ├── useTheme.js             # Access ThemeContext
│   ├── useLanguage.js          # Access LanguageContext + t()
│   ├── useCart.js              # Access CartContext
│   ├── useUser.js              # Access UserContext
│   └── useTypewriter.js        # Typewriter animation state machine
│
└── data/                       # Static data & constants
    ├── products.js             # 9 products (name, price, images, rating)
    ├── translations.js         # ~1500 keys across DE/EN/SE
    ├── discountCodes.js        # Valid discount codes + percentages
    └── styles.js               # Font family definitions
```

## Architecture

### Provider Hierarchy

```
BrowserRouter
  └── ErrorBoundary
        └── HelmetProvider
              └── ThemeProvider          → useTheme()
                    └── LanguageProvider → useLanguage(), t()
                          └── CartProvider    → useCart()
                                └── UserProvider   → useUser()
                                      └── App (Routes)
```

### Routing

All 12 pages are lazy-loaded with `React.lazy()` and `<Suspense>`. Page transitions use Framer Motion's `<AnimatePresence>`. The base URL adapts per environment:

- **Staging:** `/Website_mvp/` (GitHub Pages)
- **Production:** `/` (IONOS)

### State Management

All state lives in React Context (no external state library). Persistent state uses localStorage:

| Key | Context | Stores |
|---|---|---|
| `purpleplanning_theme` | ThemeContext | Dark mode preference |
| `purpleplanning_language` | LanguageContext | Selected language |
| `purpleplanning_cart` | CartContext | Cart items array |
| `purpleplanning_discount` | CartContext | Applied discount code |

### Data Flow

```
ProductCard / ProductDetailPage
  → useCart().addToCart(product)
    → CartContext updates cart state
      → localStorage persists cart
      → CartSidebar reflects changes
      → FeedbackToast shows confirmation

BundlePage (quiz)
  → useCart().addBundleToCart(products, code, percent)
    → CartContext adds all products + applies discount
      → CartSidebar opens with bundle
```

## Key Features

### Shopping Cart
- Add/remove products, adjust quantities
- Discount codes: `WELCOME10` (10%), `BALANCE15` (15%), `CEO20` (20%), `CREATOR15` (15%)
- Free shipping over 50 EUR, otherwise 4.90 EUR
- Full localStorage persistence
- Checkout button present (no payment integration yet)

### Bundle System (Quiz)
Three-step quiz that recommends one of three bundles:

| Bundle | Products | Discount Code |
|---|---|---|
| CEO Mindset | Digital Planner + Strategy Deck + Finance Tracker | CEO20 (20%) |
| Creator Studio | Creator Kit + Sticker Set + Vision Board | CREATOR15 (15%) |
| Balance Ritual | Focus Journal + Meal Planner + Deep Work | BALANCE15 (15%) |

### Internationalization (i18n)
- Languages: German (default), English, Swedish
- Detection: localStorage → browser language → German fallback
- Usage: `const { t } = useLanguage(); t('section', 'key')`
- All product descriptions, UI labels, and pages are translated

### Theme System
- Dark mode / light mode toggle
- System preference detection on first visit
- Flash prevention: inline `<script>` in `index.html` sets background before React loads
- Color tokens provided via ThemeContext (Tailwind classes)

### User Profile & Loyalty
Four loyalty tiers based on points:

| Level | Points | Benefit |
|---|---|---|
| Traveler | 0+ | Standard downloads |
| Explorer | 100+ | 5% discount + early access |
| Creator | 300+ | Free monthly stickers |
| Visionary | 600+ | Coaching + retreat invite |

## Products

9 digital products (all instant download):

| # | Product | Price |
|---|---|---|
| 1 | Digital Planner V.1 | 24.90 EUR |
| 2 | Sticker Set "Minimal" | 9.90 EUR |
| 3 | Focus Journal | 18.50 EUR |
| 4 | Vision Board Pro | 12.00 EUR |
| 5 | Meal Planner Kit | 14.90 EUR |
| 6 | Finance Tracker | 19.90 EUR |
| 7 | Content Creator Kit | 29.90 EUR |
| 8 | Executive Strategy Deck | 39.90 EUR |
| 9 | Deep Work Workbook | 16.50 EUR |

## Environments & Deployment

### Branches
- `main` → Production (IONOS via FTPS)
- `dev` → Staging (GitHub Pages)

### CI/CD (GitHub Actions)

| Workflow | Trigger | Action |
|---|---|---|
| `ci.yml` | PR to main/dev, push to dev | Lint + build check |
| `deploy.yml` | Push to `dev` | Build staging → GitHub Pages |
| `production.yml` | Push to `main` | Build production → IONOS (FTPS) |

### Scripts

```bash
npm run dev              # Local dev server
npm run build            # Production build
npm run build:staging    # Build for GitHub Pages
npm run build:production # Build for IONOS
npm run lint             # ESLint
npm run preview          # Preview production build
```

## Getting Started

```bash
npm install
npm run dev
```

The dev server starts at `http://localhost:5173`.

## Performance

- **Code splitting:** All pages lazy-loaded; vendor chunks split (react, framer-motion, lucide)
- **Images:** Unsplash CDN with responsive srcset, WebP format, lazy loading
- **CSS:** Tailwind CSS purging + minification
- **JS:** Terser minification, tree shaking, console/debugger removal in production
- **Fonts:** Google Fonts with preconnect hints

## Accessibility

- Skip-to-content links
- ARIA labels on interactive elements
- Keyboard navigation (ESC to close menus/modals)
- Focus-visible styles
- Screen reader text (sr-only)
- Reduced motion support (`prefers-reduced-motion`)

## Not Yet Implemented

- Payment integration (checkout button is a placeholder)
- Backend API (contact form is simulated)
- Blog detail pages (list only)
- User authentication / session management
- Profile settings persistence
- Legal page details (VAT ID, registration number placeholders)
