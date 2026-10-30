# Frontend verification plan

Branch codex/goodnews-local; project GNDforaman; 30 October 2026.

- Automated: existing shop/appearance tests, new storage/route/Bible tests, TypeScript and production build asset/CSS verifier.
- Home: all audience titles, date-aware badge, reader name; no horizontal clipping at narrow CSS width; rail remains side by side; reduced motion supported.
- Reader: open/reload/back; scripture reference opens correct chapter and available version; saved/completed behavior remains; share URL is current app.
- Library/Collection: Saved entry preserves route; search empty/reset; issue opens language chooser; available years only.
- Bible: primary citations, invalid parser inputs, selected chapter/version/loading/source; reduced-motion scrolling implementation.
- Store: View label, Saved products toggle and empty recovery, product options/bag, current-price disclosure, product nav hidden.
- Profile: local name, no external auth CTA; reading counts, journal/saved, Appearance Light/Dark/System; Help/About and actual sources.
- Data: versioned owned-data export; confirmation before clearing; unrelated storage preserved by unit test; blocked/partial operations have recovery. Never clear live/user data during browser verification.
- Journal: create disposable unsaved draft on isolated local origin, Escape opens Keep editing/Discard, then discard only the agent-created draft; do not touch user notes.
- Partnership: explicit purpose/no-unlocks/non-charity text before iframe; load/close/fallback work. Do not submit personal/payment data.
- Accessibility: keyboard activation and modal focus restoration; inspect changed 44px hit targets and light/dark text; actual screenshots plus document/viewport widths.
- Production: final build, preview served temporarily on a distinct local port, live deployment smoke and commit/hash recording. Stop verification processes and close temporary tabs afterward.
