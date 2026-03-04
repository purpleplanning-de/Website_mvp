# Projekt-Bestandsaufnahme — PurplePlanning MVP

> Erstellt am: 2026-03-04

---

## 1. Verzeichnisstruktur (2 Ebenen)

```
Website_mvp/
├── .github/
│   └── workflows/          # CI/CD Pipelines (ci, deploy, production, gemini-review)
├── public/
│   ├── api/                # PHP-Backend (checkout.php, config.php, .htaccess)
│   ├── .htaccess           # Apache-Rewrite-Regeln (IONOS)
│   ├── 404.html            # Statische 404-Fallback-Seite
│   └── logo.png            # Logo-Asset
├── scripts/
│   └── check-gemini-reviews.sh
├── src/
│   ├── components/         # Wiederverwendbare UI-Komponenten
│   │   ├── layout/         # Navbar, Footer, CartSidebar
│   │   └── ui/             # FeedbackToast, OptimizedImage, ProductCard
│   ├── contexts/           # React Context Provider (Cart, Cookie, Language, Theme, User)
│   ├── data/               # Statische Daten (Produkte, Übersetzungen, Styles, Rabattcodes)
│   ├── hooks/              # Custom Hooks (useCart, useLanguage, useTheme, etc.)
│   ├── pages/              # Seitenkomponenten (14 Seiten)
│   ├── App.jsx             # Hauptkomponente mit Routing & Layout
│   ├── main.jsx            # Einstiegspunkt (Provider-Wrapping)
│   └── index.css           # Globale CSS-Basis (Tailwind + Custom)
├── CLAUDE.md               # Claude Code Projektanweisungen
├── eslint.config.js        # ESLint-Konfiguration
├── index.html              # HTML-Einstiegspunkt
├── package.json            # Abhängigkeiten & Scripts
├── vercel.json             # Vercel-Konfiguration (SPA-Rewrite)
└── vite.config.js          # Vite Build-Konfiguration
```

---

## 2. package.json

| Feld         | Wert                                                       |
| ------------ | ---------------------------------------------------------- |
| **Name**     | `purpleplanning`                                           |
| **Version**  | `0.0.0`                                                    |
| **Type**     | `module` (ESM)                                             |

### Scripts

| Script             | Beschreibung                          |
| ------------------ | ------------------------------------- |
| `dev`              | Vite Dev-Server starten               |
| `build`            | Standard Vite Build                   |
| `build:staging`    | Build für GitHub Pages (mit `/Website_mvp/` Base) |
| `build:production` | Build für IONOS (Root `/`)            |
| `lint`             | ESLint ausführen                      |
| `preview`          | Vite Preview-Server                   |

### Dependencies

| Paket              | Version     | Zweck                          |
| ------------------ | ----------- | ------------------------------ |
| react              | ^19.2.0     | UI-Framework                   |
| react-dom          | ^19.2.0     | React DOM Renderer             |
| react-router-dom   | ^7.13.0     | Client-Side Routing            |
| framer-motion      | ^12.34.0    | Animationen & Übergänge        |
| lucide-react       | ^0.563.0    | Icon-Bibliothek                |
| react-helmet-async | ^2.0.5      | SEO Meta-Tags                  |

### DevDependencies

| Paket                         | Version    | Zweck                    |
| ----------------------------- | ---------- | ------------------------ |
| vite                          | ^7.3.1     | Build-Tool               |
| @vitejs/plugin-react          | ^5.1.1     | React Fast Refresh       |
| tailwindcss                   | ^4.1.18    | Utility-First CSS        |
| @tailwindcss/vite             | ^4.1.18    | Tailwind Vite Plugin     |
| eslint                        | ^9.39.1    | Linter                   |
| eslint-plugin-react-hooks     | ^7.0.1     | React Hooks Lint-Regeln  |
| eslint-plugin-react-refresh   | ^0.4.24    | React Refresh Lint       |
| terser                        | ^5.46.0    | JS-Minifizierung         |
| globals                       | ^16.5.0    | Globale Variablen-Defs   |
| @types/react / @types/react-dom | ^19.x   | TypeScript-Typen (IDE)  |

---

## 3. Routing-Struktur

Alle Routen werden in `src/App.jsx` definiert. Seiten sind **lazy-loaded** mit `React.lazy()` und in `<Suspense>` mit `<LoadingSpinner />` als Fallback gewrappt. Seitenübergänge nutzen Framer Motion `<AnimatePresence>`.

| Route                | Komponente            | Beschreibung                              |
| -------------------- | --------------------- | ----------------------------------------- |
| `/`                  | `HomePage`            | Startseite mit Hero, Typewriter, Produkte |
| `/shop`              | `ShopPage`            | Produktübersicht / Shop-Grid              |
| `/product/:id`       | `ProductDetailPage`   | Produktdetails mit Bildkarussell          |
| `/bundle`            | `BundlePage`          | Quiz-basierter Bundle-Finder              |
| `/about`             | `AboutPage`           | Über uns, Gründergeschichte, Team         |
| `/blog`              | `BlogPage`            | Blog-Beiträge (statisch)                  |
| `/contact`           | `ContactPage`         | Kontaktformular                           |
| `/roadmap`           | `RoadmapPage`         | Feature-Roadmap mit Timeline              |
| `/profile`           | `ProfilePage`         | Benutzerprofil, Treuepunkte, Bestellungen |
| `/impressum`         | `ImpressumPage`       | Impressum (rechtlich)                     |
| `/datenschutz`       | `DatenschutzPage`     | Datenschutzerklärung (DSGVO)              |
| `/agb`               | `AGBPage`             | AGB & Widerrufsbelehrung                  |
| `/checkout/success`  | `CheckoutSuccessPage` | Checkout-Bestätigungsseite                |
| `*`                  | `NotFoundPage`        | 404-Seite                                 |

**Layout-Struktur:** Alle Seiten teilen sich `Navbar` (fixed oben), `Footer`, `CartSidebar` (Drawer rechts), `FeedbackToast`, `OfflineBanner` und `CookieBanner`.

---

## 4. Build- & Style-Konfiguration

### vite.config.js

```js
export default defineConfig(({ mode }) => {
  const isStaging = mode === 'staging';
  return {
    base: isStaging ? '/Website_mvp/' : '/',       // GitHub Pages vs. IONOS
    plugins: [react(), tailwindcss()],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'animation-vendor': ['framer-motion'],
            'icons-vendor': ['lucide-react'],
          },
        },
      },
      chunkSizeWarningLimit: 1000,
      sourcemap: false,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: !isStaging,   // Console-Logs nur in Staging behalten
          drop_debugger: !isStaging,
        },
      },
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'lucide-react'],
    },
  };
});
```

**Highlights:**
- Staging (GitHub Pages): Base-URL `/Website_mvp/`, Console-Logs bleiben
- Production (IONOS): Base-URL `/`, Console-Logs werden entfernt
- Manuelles Chunk-Splitting für optimale Cachebarkeit
- Terser-Minifizierung statt esbuild

### Tailwind CSS 4 (kein tailwind.config)

Tailwind CSS 4 benötigt **keine separate `tailwind.config`-Datei** mehr. Die Konfiguration erfolgt über:
- `@tailwindcss/vite` Plugin in `vite.config.js`
- `@import "tailwindcss"` in `src/index.css`
- Globale Styles in `@layer base` (Fluid Typography, Scrollbar-Styling, Fokus-Styles)

---

## 5. Komponentenverzeichnis

### Komponenten (`src/components/`)

| Datei                          | Zweck                                                                              |
| ------------------------------ | ---------------------------------------------------------------------------------- |
| `CookieBanner.jsx`            | DSGVO-konformes Cookie-Banner mit granularen Einstellungen (Notwendig/Analytics/Marketing) |
| `ErrorBoundary.jsx`           | React Error Boundary mit Fehleranzeige und Debug-Info (nur Dev)                    |
| `LoadingSpinner.jsx`          | Animierter Ladekreisel mit Größenvarianten und Dark-Mode-Unterstützung             |
| `OfflineBanner.jsx`           | Erkennt Online/Offline-Status und zeigt animiertes Verbindungs-Banner              |
| `SEO.jsx`                     | Helmet-basierter Meta-Tag-Manager für Open Graph, Twitter Cards und SEO            |
| `layout/Navbar.jsx`           | Fixierte Navigation mit Desktop/Mobile-Menü, Sprachauswahl, Theme-Toggle, Warenkorb-Badge |
| `layout/Footer.jsx`           | Zentrierter Footer mit Logo, rechtlichen Links und Copyright                       |
| `layout/CartSidebar.jsx`      | Seitlicher Warenkorb-Drawer mit Mengensteuerung, Rabattcodes und Lemon Squeezy Checkout |
| `ui/FeedbackToast.jsx`        | Animierte Toast-Benachrichtigung für Warenkorb-Feedback                            |
| `ui/OptimizedImage.jsx`       | Responsive Bildkomponente mit Lazy Loading, WebP/JPEG Srcsets und Lade-Skeleton    |
| `ui/ProductCard.jsx`          | Animierte Produktkarte mit Hover-Effekten, Bildgalerie und Warenkorb-Button        |

### Seiten (`src/pages/`)

| Datei                    | Zweck                                                                          |
| ------------------------ | ------------------------------------------------------------------------------ |
| `HomePage.jsx`           | Hero mit Typewriter-Effekt, Manifest-Karten und Featured Products              |
| `ShopPage.jsx`           | Produktraster mit Hero-Bild und animiertem Eingang                             |
| `ProductDetailPage.jsx`  | Produktdetails mit Bildkarussell, Tabs (Beschreibung/Details/Versand), Bewertungen |
| `BundlePage.jsx`         | Quiz-basierter System-Finder (3 Fragen → Bundle-Empfehlung mit Rabattcode)    |
| `AboutPage.jsx`          | Gründergeschichte, Team-Bios, Social-Media-Links, Traumprojekte               |
| `BlogPage.jsx`           | Blog-Beiträge mit Datum, Vorschau und Read-More (statischer Content)           |
| `ContactPage.jsx`        | Kontaktformular mit Validierung, Erfolgs-/Fehlerstatus                         |
| `RoadmapPage.jsx`        | Feature-Timeline mit Status-Badges (kommende Features)                         |
| `ProfilePage.jsx`        | Benutzer-Dashboard: Treuepunkte, Bestellhistorie, Adressbuch, Kontoeinstellungen |
| `CheckoutSuccessPage.jsx`| Checkout-Bestätigung mit Feier-Animation und Zurück-zum-Shop-Button            |
| `NotFoundPage.jsx`       | 404-Seite mit animiertem Hintergrund und Schnellnavigation                     |
| `ImpressumPage.jsx`      | Rechtliche Firmeninformationen (Platzhalter-Felder vorhanden)                  |
| `DatenschutzPage.jsx`    | DSGVO-Datenschutzerklärung mit Cookie-Erklärung und Nutzerrechten              |
| `AGBPage.jsx`            | AGB & Widerrufsbelehrung für digitale Produkte                                 |

### Contexts (`src/contexts/`)

| Datei                     | Zweck                                                                          |
| ------------------------- | ------------------------------------------------------------------------------ |
| `LanguageContext.jsx`     | i18n-Provider für DE/EN/SE mit localStorage-Persistenz und Browser-Erkennung   |
| `ThemeContext.jsx`        | Dark-Mode-Context mit localStorage, Systemerkennung und berechneten Theme-Werten |
| `UserContext.jsx`         | Benutzerprofil-State (Name, E-Mail, Adresse, Newsletter, Punkte) mit 4-Stufen Treueprogramm |
| `CookieConsentContext.jsx`| Cookie-Einwilligungs-State mit granularer Zustimmungsverwaltung                |
| `CartContext.jsx`         | Warenkorb-Logik mit Lemon Squeezy Integration, Rabattvalidierung und Preisberechnung |

### Hooks (`src/hooks/`)

| Datei                | Zweck                                                           |
| -------------------- | --------------------------------------------------------------- |
| `useCart.js`         | Context-Consumer für `CartContext` mit Error Boundary            |
| `useCookieConsent.js`| Context-Consumer für `CookieConsentContext` mit Error Boundary   |
| `useLanguage.js`     | Context-Consumer für `LanguageContext` mit Error Boundary        |
| `useTheme.js`        | Context-Consumer für `ThemeContext` mit Error Boundary           |
| `useUser.js`         | Context-Consumer für `UserContext` mit Error Boundary            |
| `useTypewriter.js`   | Typewriter-Animations-Hook mit Tippen/Pause/Löschen-Phasen     |

### Daten (`src/data/`)

| Datei               | Zweck                                                                       |
| ------------------- | --------------------------------------------------------------------------- |
| `products.js`       | Produktkatalog (9 Items) mit ID, Name, Preis, Farben, Beschreibung, Bildern |
| `translations.js`   | i18n-Objekt mit DE/EN/SE Übersetzungen für alle UI-Strings und Inhalte      |
| `styles.js`         | Font-Definitionen (Playfair Display serif, Plus Jakarta Sans sans-serif)    |
| `discountCodes.js`  | Rabattcodes: WELCOME10 (10%), BALANCE15 (15%), CEO20 (20%), CREATOR15 (15%) |

---

## Zusammenfassung

**PurplePlanning** ist ein React 19 + Vite 7 + Tailwind CSS 4 E-Commerce-MVP für handgefertigte digitale Planer. Das Projekt bietet:

- **14 Seiten** mit Lazy Loading und animierten Übergängen (Framer Motion)
- **Mehrsprachigkeit** (DE/EN/SE) über Context-basiertes i18n
- **Dark Mode** mit System-Präferenz-Erkennung
- **Warenkorb** mit Rabattcode-System und Lemon Squeezy Payment-Integration
- **Treueprogramm** mit 4-Stufen Loyalitätssystem
- **DSGVO-Compliance** (Cookie-Banner, Datenschutz, Impressum, AGB)
- **SEO-Optimierung** über React Helmet
- **Dual-Deployment**: Staging (GitHub Pages) und Production (IONOS via FTPS)
- **PHP-Backend** für Checkout-Verarbeitung auf IONOS
