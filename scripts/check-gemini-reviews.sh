#!/usr/bin/env bash
# ============================================================================
# check-gemini-reviews.sh
# Liest Gemini Code Assist Kommentare von einem GitHub PR und gibt sie
# strukturiert aus, damit Claude Code sie bewerten kann.
#
# Nutzung:
#   ./scripts/check-gemini-reviews.sh <PR_NUMBER>
#   ./scripts/check-gemini-reviews.sh              # Findet aktiven PR automatisch
#
# Voraussetzung: gh CLI muss installiert und authentifiziert sein
# ============================================================================

set -euo pipefail

# Farben für Terminal-Ausgabe
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color
BOLD='\033[1m'

# Repository-Info aus Git ermitteln
REPO=$(gh repo view --json nameWithOwner -q '.nameWithOwner' 2>/dev/null)
if [[ -z "$REPO" ]]; then
    echo -e "${RED}Fehler: Konnte Repository nicht ermitteln. Bist du in einem Git-Repository mit gh CLI?${NC}"
    exit 1
fi

# PR-Nummer als Argument oder automatisch erkennen
if [[ -n "${1:-}" ]]; then
    PR_NUMBER="$1"
else
    # Versuche PR für den aktuellen Branch zu finden
    CURRENT_BRANCH=$(git branch --show-current)
    PR_NUMBER=$(gh pr list --head "$CURRENT_BRANCH" --json number -q '.[0].number' 2>/dev/null || echo "")

    if [[ -z "$PR_NUMBER" ]]; then
        # Alternativ: letzten offenen PR nehmen
        PR_NUMBER=$(gh pr list --state open --json number -q '.[0].number' 2>/dev/null || echo "")
    fi

    if [[ -z "$PR_NUMBER" ]]; then
        echo -e "${RED}Fehler: Kein PR gefunden. Bitte PR-Nummer als Argument angeben.${NC}"
        echo "Nutzung: $0 <PR_NUMBER>"
        exit 1
    fi
    echo -e "${CYAN}Automatisch erkannter PR: #${PR_NUMBER}${NC}"
fi

echo -e "\n${BOLD}========================================${NC}"
echo -e "${BOLD} Gemini Code Assist Reviews – PR #${PR_NUMBER}${NC}"
echo -e "${BOLD} Repository: ${REPO}${NC}"
echo -e "${BOLD}========================================${NC}\n"

# --- 1. PR-Zusammenfassung ---
echo -e "${BLUE}📋 PR-Info:${NC}"
gh pr view "$PR_NUMBER" --json title,state,author,url \
    --template '  Titel:  {{.title}}
  Status: {{.state}}
  Autor:  {{.author.login}}
  URL:    {{.url}}
' 2>/dev/null || echo "  Konnte PR-Info nicht laden"
echo ""

# --- 2. Review-Kommentare von Gemini Code Assist ---
echo -e "${YELLOW}🤖 Gemini Code Assist Review-Kommentare:${NC}"
echo -e "${YELLOW}------------------------------------------${NC}"

# Reviews (allgemeine PR-Reviews)
REVIEWS=$(gh api "repos/${REPO}/pulls/${PR_NUMBER}/reviews" \
    --jq '.[] | select(.user.login == "gemini-code-assist[bot]" or .user.login == "gemini-code-assist") | {id: .id, state: .state, body: .body}' \
    2>/dev/null || echo "")

if [[ -n "$REVIEWS" ]]; then
    echo -e "\n${GREEN}📝 Allgemeine Reviews:${NC}"
    echo "$REVIEWS" | jq -r '"
  Review-ID: \(.id)
  Status: \(.state)
  Kommentar:
\(.body | split("\n") | map("    " + .) | join("\n"))
  ---"' 2>/dev/null || echo "$REVIEWS"
else
    echo -e "  ${CYAN}Keine allgemeinen Review-Kommentare gefunden.${NC}"
fi

# --- 3. Inline-Kommentare (Code-spezifische Kommentare) ---
echo -e "\n${YELLOW}📌 Inline-Kommentare (Code-spezifisch):${NC}"
echo -e "${YELLOW}------------------------------------------${NC}"

INLINE_COMMENTS=$(gh api "repos/${REPO}/pulls/${PR_NUMBER}/comments" \
    --jq '.[] | select(.user.login == "gemini-code-assist[bot]" or .user.login == "gemini-code-assist") | {path: .path, line: .line, body: .body, created_at: .created_at}' \
    2>/dev/null || echo "")

if [[ -n "$INLINE_COMMENTS" ]]; then
    echo "$INLINE_COMMENTS" | jq -r '"
  📄 Datei: \(.path) (Zeile \(.line // "N/A"))
  📅 Datum: \(.created_at)
  💬 Kommentar:
\(.body | split("\n") | map("    " + .) | join("\n"))
  ---"' 2>/dev/null || echo "$INLINE_COMMENTS"
else
    echo -e "  ${CYAN}Keine Inline-Kommentare gefunden.${NC}"
fi

# --- 4. Issue-Kommentare (allgemeine PR-Diskussion) ---
echo -e "\n${YELLOW}💬 PR-Diskussionskommentare:${NC}"
echo -e "${YELLOW}------------------------------------------${NC}"

ISSUE_COMMENTS=$(gh api "repos/${REPO}/issues/${PR_NUMBER}/comments" \
    --jq '.[] | select(.user.login == "gemini-code-assist[bot]" or .user.login == "gemini-code-assist") | {body: .body, created_at: .created_at}' \
    2>/dev/null || echo "")

if [[ -n "$ISSUE_COMMENTS" ]]; then
    echo "$ISSUE_COMMENTS" | jq -r '"
  📅 Datum: \(.created_at)
  💬 Kommentar:
\(.body | split("\n") | map("    " + .) | join("\n"))
  ---"' 2>/dev/null || echo "$ISSUE_COMMENTS"
else
    echo -e "  ${CYAN}Keine Diskussionskommentare gefunden.${NC}"
fi

# --- 5. Zusammenfassung ---
REVIEW_COUNT=$(echo "$REVIEWS" | grep -c '"id"' 2>/dev/null || echo "0")
INLINE_COUNT=$(echo "$INLINE_COMMENTS" | grep -c '"path"' 2>/dev/null || echo "0")
ISSUE_COUNT=$(echo "$ISSUE_COMMENTS" | grep -c '"body"' 2>/dev/null || echo "0")
TOTAL=$((REVIEW_COUNT + INLINE_COUNT + ISSUE_COUNT))

echo -e "\n${BOLD}========================================${NC}"
echo -e "${BOLD} Zusammenfassung${NC}"
echo -e "${BOLD}========================================${NC}"
echo -e "  Reviews:             ${REVIEW_COUNT}"
echo -e "  Inline-Kommentare:   ${INLINE_COUNT}"
echo -e "  Diskussionskommentare: ${ISSUE_COUNT}"
echo -e "  ${BOLD}Gesamt:              ${TOTAL}${NC}"

if [[ "$TOTAL" -eq 0 ]]; then
    echo -e "\n  ${GREEN}✅ Keine Gemini Code Assist Kommentare für diesen PR.${NC}"
else
    echo -e "\n  ${YELLOW}⚠️  Bitte die obigen Kommentare auf Relevanz prüfen.${NC}"
fi

echo ""
