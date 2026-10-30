# Frontend release verification

30 October 2026. Target: private GNDforaman repository, branch codex/goodnews-local; existing Cloudflare Pages project gnd-test. This release does not submit an app to either mobile store.

## Implemented

Local reader Profile replaces external account buttons; Home uses the local name. Added Help/About and accurate Privacy & data with versioned export and scoped, confirmed reset. Partnerships describe voluntary non-charity app/technology support with no unlocks and deliberate hosted-form loading. Product buttons say View; Saved products is accessible; price/stock snapshot limits are visible. Reading titles use normal capitalization; stale readings show their date. Scripture links open the correct chapter and identify translation differences. Primary hash routes survive reload/Back. Unreadable local data stays protected, blocked storage shows a persistent warning, failed screens recover, and dirty journal drafts require a decision. Profile shortcuts no longer cover content.

## Automated checks

- `npm test`: shop state, appearance, local-data/routes and reading suites pass.
- `npm run build`: TypeScript, production Vite build and `BUILD_VERIFIED` asset/CSS checks pass.
- `git diff --check`: passes.
- Tests cover invalid/blocked/partial storage, corrupt-original preservation, unrelated key isolation, versioned export, route round trips/malformed paths, citation suffixes/ranges/highlight bounds and date-aware badges.

## Browser verification

CUA inspected all primary screens and relevant dialogs on the live baseline, then verified changes against a separate local origin. No live notes, bag items or highlights were deleted and no hosted form or payment was submitted.

- Actual narrow CSS viewports **360px and 393px**, document scroll width matched each; Home, Profile, Store/Product, partnership and Bible inspected visually. At 360px all six Bible selection actions measured **44 × 44px**. Profile shortcuts are static in page flow.
- Desktop Chrome observed **1800 × 958 CSS px**, no document horizontal overflow. In-app browser viewport overrides sometimes affected only its selected tab or were clamped; no requested width is reported as actual without DOM measurement.
- Local name updates appear in Home/Profile; ordinary and nested-dialog close restore focus to connected controls/main context.
- Reader refresh and cited Proverbs route work; available ASV is distinguished from quoted ISV. Back returns to the reader and Home. Saved Library filter survives refresh.
- Saved Store empty state, one saved product, no-match search and Clear search and filters preserve the saved context. Product hides bottom navigation.
- Journal Escape/Back protect an unsaved disposable draft. Repeated Back → Keep editing → Back → Discard preserves Profile in history; prior Home remains reachable.
- Development-only `tests/qa.html` replaces storage with disposable memory data. Simulated render and lazy-load failures show recovery; Home/Reload recover. Blocked writes show persistent warning. Partial reset removes only owned keys, retains the failing key/unrelated key and removes editor/navigation UI until retry/reload. A corrupt-note fixture stays intact after a new session-only note; deleting a fixture note clears stale discard state.
- Data export prepares a JSON download; reset confirmation can be cancelled. Real user storage was not cleared for testing.
- Partnership contains no iframe before Load partnership form; after action it uses the supplied same-origin wrapper/provider URL and retains the direct fallback. Provider payment/submit behavior is not tested.

## Limits and remaining launch requirements

See LAUNCH-READINESS.md and OWNER-INPUTS.md. No native binaries, store submission, real-device accessibility certification, payment eligibility approval, final public legal policy, content-rights clearance or automatic content pipeline is claimed. Export does not restore data. Article/issue details and in-screen Bible picker state are not fully permalinked. Child-targeting and native commercial paths require a deliberate launch decision.

Production preview additionally confirmed Help/About/Light-Dark-System and available Collection year; desktop Store heading does not overlap pause control. Final production entry: `assets/index-DxoPn7g4.js`, stylesheet `assets/index-onmZdUo6.css`.

## Release record

Application commit, deployment and live smoke evidence are recorded below after publication.
