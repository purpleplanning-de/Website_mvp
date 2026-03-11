# Claude Code – Projektanweisungen

## Projekt-Kontext

- **Tech Stack**: React 19, Vite 7, Tailwind CSS 4, Framer Motion
- **Sprachen**: DE / EN / SE (i18n via LanguageContext)
- **Environments**: Staging (GitHub Pages) / Production (IONOS via FTPS)
- **Branches**: `main` (Produktion), `dev` (Staging/Entwicklung)
- **Payment**: Lemon Squeezy (Merchant of Record), PHP-Backend auf IONOS

## Git-Workflow

- **Direkt auf `dev` pushen** — kein Feature-Branch, kein PR nötig
- Commits mit klaren Messages (was + warum)
- PRs nur wenn explizit gewünscht oder für `dev` → `main` Merges
- `main` niemals direkt pushen — nur über PR von `dev`

## Wissen & Dokumentation

### ADR (Architecture Decision Records)
Wichtige Entscheidungen werden in `docs/decisions/` dokumentiert.

- **Bei Sessionstart**: ADRs lesen für gewachsenen Kontext (`docs/decisions/`)
- **Bei bedeutenden Entscheidungen**: Neue ADR anlegen (`NNN-kurzer-titel.md`)
- **Wann eine ADR anlegen?**
  - Technische Architekturentscheidungen (z.B. Bibliothek X statt Y)
  - Organisatorische Entscheidungen (z.B. dieser Workflow hier)
  - Erkenntnisse aus längeren Sessions die über Sessions hinweg relevant bleiben
  - Bewusste Trade-offs (z.B. MVP-Entscheidungen die später überarbeitet werden)

### Sensitive Informationen
- `CLAUDE.local` (gitignored) für Keys, interne URLs, sensitive TODOs
- Niemals Credentials oder Infrastruktur-Details in `CLAUDE.md`

## Gemini Code Assist Reviews

Bei PRs (insbesondere `dev` → `main`) die Gemini-Kommentare eigenständig bewerten:

- **Nicht blind übernehmen** — Geminis Severity ist nur ein Hinweis
- **Code selbst lesen** und Projekt-Kontext berücksichtigen
- **Bewerten** nach: Kritikalität (KRITISCH/HOCH/MITTEL/NIEDRIG) + Umsetzung (JA/OPTIONAL/NEIN)
- **SOFORT fixen**: Echte Security-Issues, Bugs, Datenverlust
- **IGNORIEREN**: Style-Vorschläge, Over-Engineering, MVP-irrelevante Patterns, Falsch-Positive
- **Dokumentieren**: Bewertung als PR-Kommentar posten, Fix-Commits mit `[gemini-review]` Prefix
- Gemini-Kommentare abrufen via `gh api repos/{owner}/{repo}/pulls/{pr}/reviews`
