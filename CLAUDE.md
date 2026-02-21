# Claude Code – Projektanweisungen

## Gemini Code Assist Reviews

Nach jedem Pull Request oder wenn an einem bestehenden PR gearbeitet wird, **automatisch** die Gemini Code Assist Kommentare prüfen.

### Wichtig: Eigenständige Bewertung

**Gemini Code Assist ist NICHT der Richter.** Claude Code bewertet jeden Kommentar eigenständig:

- **Nicht blind übernehmen**: Geminis Einschätzung (z.B. "critical", "high severity") ist nur ein Hinweis, keine Wahrheit
- **Eigene Analyse**: Den betroffenen Code selbst lesen und den Kontext des Projekts berücksichtigen
- **Verifizieren statt vertrauen**: Prüfe ob das gemeldete Problem tatsächlich existiert
- **Falsch-Positive erkennen**: Gemini irrt sich regelmäßig – besonders bei projektspezifischen Patterns, absichtlichen Designentscheidungen und MVP-Trade-offs
- **Kontext schlägt Theorie**: Ein theoretisches Problem, das in diesem Projekt nicht auftreten kann, ist NIEDRIG – egal was Gemini sagt

**Beispiele für typische Gemini-Fehleinschätzungen:**
- Warnt vor "missing error handling" bei internem Code, der keine externen Inputs verarbeitet
- Schlägt Abstraktion vor, obwohl der Code nur einmal verwendet wird
- Markiert "security issue" bei Code, der nur im Build-Prozess läuft (nicht zur Laufzeit)
- Fordert TypeScript-Patterns in einem reinen JavaScript-Projekt

### Workflow

1. **Kommentare abrufen**: Nutze `gh pr view <PR_NUMBER> --comments` und `gh api repos/{owner}/{repo}/pulls/{pr}/reviews` um alle Review-Kommentare zu lesen
2. **Gemini-Kommentare filtern**: Achte auf Kommentare von `gemini-code-assist[bot]` oder `gemini-code-assist`
3. **Code selbst lesen**: Für jeden Kommentar den betroffenen Code öffnen und den Kontext verstehen
4. **Eigenständige Bewertung erstellen**: Für jeden Gemini-Kommentar drei Dimensionen bewerten (basierend auf eigener Analyse, NICHT auf Geminis Einschätzung):

   **Kritikalität:**
   | Stufe | Bedeutung | Beispiele |
   |-------|-----------|-----------|
   | KRITISCH | Sofort handeln | Sicherheitslücken, Breaking Changes, Datenverlust |
   | HOCH | Zeitnah beheben | Performance-Probleme, schlechte Architektur |
   | MITTEL | Verbessern | Code-Qualität, Best Practices |
   | NIEDRIG | Optional | Style, Formatierung, Kleinigkeiten |

   **Umsetzung erforderlich?**
   | Bewertung | Bedeutung |
   |-----------|-----------|
   | JA | Muss behoben werden |
   | OPTIONAL | Verbesserung empfohlen |
   | NEIN | Kann ignoriert werden |

   **Priorität für Auto-Fix:**
   | Priorität | Aktion |
   |-----------|--------|
   | SOFORT | Automatisch umsetzen, kein Review nötig |
   | MANUELL | Entwickler-Review nötig, Vorschlag machen |
   | IGNORIEREN | Nicht relevant für dieses Projekt |

4. **Umsetzung**: Basierend auf der Bewertung:
   - **SOFORT**: Direkt umsetzen ohne Rückfrage
   - **MANUELL**: Dem Entwickler die Bewertung zeigen und auf Entscheidung warten
   - **IGNORIEREN**: Kurz begründen, warum der Kommentar nicht relevant ist

### Schnellbefehl

Um die Gemini-Kommentare für einen PR zu prüfen, kann das Script verwendet werden:

```bash
./scripts/check-gemini-reviews.sh <PR_NUMBER>
```

### Bewertungsmatrix – Entscheidungslogik

```
KRITISCH + JA       → SOFORT   (automatisch fixen)
KRITISCH + OPTIONAL → MANUELL  (Vorschlag machen, Review abwarten)
HOCH + JA           → SOFORT   (automatisch fixen)
HOCH + OPTIONAL     → MANUELL  (Vorschlag machen)
MITTEL + JA         → MANUELL  (Vorschlag machen)
MITTEL + OPTIONAL   → IGNORIEREN (MVP-Scope, später behandeln)
NIEDRIG + *         → IGNORIEREN (Style/Formatierung nicht relevant)
* + NEIN            → IGNORIEREN (nicht umsetzen)
```

### Ausgabeformat

Für jeden Gemini-Kommentar diese Struktur ausgeben:

```
📝 Datei: <path> (Zeile <n>)
   Gemini sagt:   <Geminis Einschätzung zusammengefasst>
   Eigene Analyse: <was Claude Code nach eigener Prüfung des Codes feststellt>
   Kritikalität:  KRITISCH | HOCH | MITTEL | NIEDRIG
   Umsetzung:     JA | OPTIONAL | NEIN
   Auto-Fix:      SOFORT | MANUELL | IGNORIEREN
   Begründung:    <warum diese Bewertung – besonders wenn sie von Geminis Einschätzung abweicht>
   Aktion:        <was wird gemacht oder warum nicht>
```

### Regeln

Gemini-Kommentare mit **SOFORT** umsetzen, wenn sie:
- Sicherheitslücken aufzeigen (XSS, Injection, etc.)
- Breaking Changes oder Datenverlust verursachen können
- Echte Bugs oder Logikfehler finden
- Performance-Probleme identifizieren, die messbar sind

Gemini-Kommentare **IGNORIEREN**, wenn sie:
- Rein stilistische Vorschläge sind, die dem Projektstandard widersprechen
- Übertriebene Abstraktion oder Over-Engineering vorschlagen
- Auf Patterns bestehen, die für ein MVP nicht relevant sind
- Falsch-positive Warnungen sind (z.B. bei absichtlichem Design)

## Projekt-Kontext

- **Tech Stack**: React 19, Vite 7, Tailwind CSS 4, Framer Motion
- **Sprachen**: DE / EN / SE (i18n via LanguageContext)
- **Environments**: Staging (GitHub Pages) / Production (IONOS via FTPS)
- **Branches**: `main` (Produktion), `dev` (Staging)
