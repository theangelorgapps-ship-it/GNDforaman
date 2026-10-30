# Gates: GoodNews Daily Connect TypeScript replica

Scope: Recreate the supplied GoodNews Daily Connect app in a new local TypeScript project and serve it locally for review.

- [x] G1: Reference layout, assets, and major interactions are inspected and documented.
  EVIDENCE: evidence/reference.md records the live home, reader, library, collections, Bible and profile; original artwork in public/assets.

- [x] G2: The isolated project contains editable TypeScript source and passes type checking.
  CHECK: npm run typecheck
  EXPECT: > tsc --noEmit
  EVIDENCE: > goodnews-daily-connect-local@1.0.0 typecheck | > tsc --noEmit

- [x] G3: The application produces a successful production web build.
  CHECK: npm run build
  EXPECT: BUILD_VERIFIED
  EVIDENCE: ✓ built in 235ms | BUILD_VERIFIED

- [x] G4: Home, audience selection, reading, library, Bible, profile, and theme controls work locally.
  EVIDENCE: evidence/browser-verification.md records completed live UI tests for audience, read/save/complete/reload, library search and empty state, collections, Bible chapters/version/highlights, journal persistence, narration controls, theme, reminders and share link.

- [x] G5: Desktop and mobile layouts are visually compared with the reference and defects corrected.
  EVIDENCE: evidence/local-mobile.jpg and evidence/local-desktop.jpg captured after reference comparisons; measured no horizontal overflow at 390px, 962px and 1800px; final browser console error list empty.

- [x] G6: The local server is reachable and the user receives the URL, source location, and run instructions.
  CHECK: node scripts/check-server.mjs
  EXPECT: LOCAL_SERVER_VERIFIED
  EVIDENCE: README.md contains source directory and npm run dev/build/preview commands; evidence/server.json tracks retained PID31894; local preview opened and marked deliverable.

## Active refinement ledger

The current browser-annotation and motion work is tracked in `gates/annotation-motion.md`.

The MVP frontend and app-store readiness work is tracked in `gates/mvp-launch-readiness.md`.
