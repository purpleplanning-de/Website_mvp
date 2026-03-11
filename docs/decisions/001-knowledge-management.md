# ADR 001 – Wissens- und Kontext-Management mit Claude Code

**Status:** accepted
**Datum:** 2026-03-11

## Kontext

Claude Code hat kein Gedächtnis zwischen Sessions. Lange Sessions werden automatisch
komprimiert wenn das Kontextfenster voll wird. Erkenntnisse, Entscheidungen und
hergeleitetes Wissen gehen so verloren – auch wenn die Chat-History in der App
noch sichtbar ist.

Zusätzlich wird das Projekt auf mehreren Geräten (PC, iPad, mobil) und über
verschiedene Apps (Claude App, Browser) genutzt.

## Entscheidung

Dreigliedriges System:

1. **`CLAUDE.md`** (im Repo) – operative Regeln und Konventionen
   - Workflow-Regeln (PR-Format, Gemini Review, etc.)
   - Tech Stack und Projekt-Kontext
   - KEINE sensitiven Infos, KEIN gewachsenes Wissen

2. **`docs/decisions/`** (im Repo) – technische und organisatorische Entscheidungen
   - Warum wurde etwas so gemacht?
   - Welche Alternativen wurden verworfen?
   - Langlebiges Wissen, das über Sessions hinweg relevant bleibt

3. **`CLAUDE.local`** (gitignored) – gerätespezifische und sensitive Infos
   - Passwörter, Keys, interne URLs
   - TODOs die nicht öffentlich sichtbar sein sollen

## Begründung

- `CLAUDE.md` allein reicht nicht – zu viel Kontext für operative Regeln ungeeignet
- GitHub Issues sind flüchtig und schwer zu durchsuchen
- ADRs sind versioniert, strukturiert und von Claude Code direkt lesbar
- `CLAUDE.local` löst das Problem sensibler Infos in public Repos

## Konsequenzen

- Nach bedeutenden Sessions: relevante Erkenntnisse als ADR festhalten
- Beim Device-Wechsel: `git pull` + ADRs kurz überfliegen reicht als Kontext-Refresh
- Claude Code kann in neuen Sessions gebeten werden: "Lies die ADRs und fasse den Kontext zusammen"
- Sensitive Infos niemals in `CLAUDE.md` – immer in `CLAUDE.local`
