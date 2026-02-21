# Claude Code – Projektanweisungen

## Gemini Code Assist Reviews

Nach jedem Pull Request oder wenn an einem bestehenden PR gearbeitet wird, **automatisch** die Gemini Code Assist Kommentare prüfen:

### Workflow

1. **Kommentare abrufen**: Nutze `gh pr view <PR_NUMBER> --comments` und `gh api repos/{owner}/{repo}/pulls/{pr}/reviews` um alle Review-Kommentare zu lesen
2. **Gemini-Kommentare filtern**: Achte auf Kommentare von `gemini-code-assist[bot]` oder `gemini-code-assist`
3. **Bewertung erstellen**: Für jeden Gemini-Kommentar bewerte:
   - **Relevanz**: Ist der Hinweis für dieses Projekt relevant?
   - **Priorität**: Hoch / Mittel / Niedrig
   - **Umsetzbarkeit**: Kann/sollte die Änderung jetzt umgesetzt werden?
   - **Empfehlung**: Umsetzen / Ignorieren / Später behandeln
4. **Umsetzung**: Relevante Hinweise mit hoher Priorität direkt umsetzen, sofern sie keine Breaking Changes verursachen

### Schnellbefehl

Um die Gemini-Kommentare für einen PR zu prüfen, kann das Script verwendet werden:

```bash
./scripts/check-gemini-reviews.sh <PR_NUMBER>
```

### Bewertungskriterien

Gemini-Kommentare **umsetzen**, wenn sie:
- Sicherheitslücken aufzeigen
- Echte Bugs oder Logikfehler finden
- Performance-Probleme identifizieren, die messbar sind
- Best Practices betreffen, die den Code deutlich verbessern

Gemini-Kommentare **ignorieren**, wenn sie:
- Rein stilistische Vorschläge sind, die dem Projektstandard widersprechen
- Übertriebene Abstraktion oder Over-Engineering vorschlagen
- Auf Patterns bestehen, die für ein MVP nicht relevant sind
- Falsch-positive Warnungen sind (z.B. bei absichtlichem Design)

## Projekt-Kontext

- **Tech Stack**: React 19, Vite 7, Tailwind CSS 4, Framer Motion
- **Sprachen**: DE / EN / SE (i18n via LanguageContext)
- **Environments**: Staging (GitHub Pages) / Production (IONOS via FTPS)
- **Branches**: `main` (Produktion), `dev` (Staging)
