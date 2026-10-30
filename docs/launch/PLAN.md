<!-- /autoplan restore point: /Users/charlesfinney/.gstack/projects/theangelorgapps-ship-it-GNDforaman/codex-goodnews-local-autoplan-restore-20261029-235121.md -->
# GoodNews Daily MVP frontend and launch-readiness plan

Date: 29 October 2026 (Europe/London).
Repository: goodnews-daily-connect-local. Branch: codex/goodnews-local.

## User-confirmed premises

- Inspect the app page by page, with particular attention to Profile.
- This is an MVP; implementation is frontend-only. Backend code is outside scope.
- The business is not a charity. Partnerships support development of the free app and technology. Store purchases also support the work.
- Change product-card actions to “View” and use normal capitalization for devotional titles.
- Produce the documents/assets checklist for both stores, and list missing requirements that could cause rejection.
- Existing authorization covers updates to the private GNDforaman repository and gnd-test test site. It does not authorize submitting an app to Apple/Google.

## Intake

Inspect existing screens, data flows, outbound destinations and build configuration. Verify current Apple/Google policies using official sources. Distinguish implemented UI, future integrations, native-build requirements and facts requiring the owner.

## Planned sequence

1. Inventory and inspect all screen/overlay flows, including Profile, Store and partnership embed.
2. Strategy review, then design review, then engineering review; assess whether developer-facing scope exists.
3. Record a concrete frontend change plan, submission pack, rejection-risk register and verification plan.
4. Apply authorized frontend fixes; keep unsupported capabilities honest and preserve existing work.
5. Test, inspect, push and publish the verified web update. Record external launch blockers separately.

## Decision Audit Trail

| # | Phase | Decision | Classification | Principle | Rationale | Rejected |
|---|---|---|---|---|---|---|
| 1 | Intake | Preserve the user's frontend-only MVP and non-charity partnership premises | User-confirmed | P6 | Explicit current request establishes scope; no need to ask again | Backend build or charity fundraising assumptions |

## Research leaf contracts

The policy research leaves are intake work, not parallel autoplan phases. CEO → Design → Eng remains sequential. The parent owns all app source, the combined plan, screen audit, release notes and integration gates.

- Apple research leaf owns `docs/launch/APPLE-SUBMISSION.md` and `gates/launch-apple.md` only. Use current official Apple sources; classify mandatory/conditional/optional, distinguish app-review policy from legal advice, draft accurate metadata/review notes, and name facts the owner must provide. No app code, Git changes, installs or deployment.
- Google research leaf owns `docs/launch/GOOGLE-PLAY-SUBMISSION.md` and `gates/launch-google.md` only. Use current official Google sources and the same evidence rules. No app code, Git changes, installs or deployment.
- Do not invent publisher identity, support email, privacy representations, age targets, billing exemptions or native IDs. The current project is React/TypeScript/Vite web only, with localStorage, bible-api.com fetches, official product/document/article links, a hosted partnership form, and no native project, accounts backend or billing integration.
- Partnership business premise: not a charity; support funds free app and technology development. Physical books/clothing/accessories are sold. The owner confirmed no digital benefits; launch territories are unconfirmed. Treat payment rules conditionally and explain what must be settled before native release.

## Confirmed choices

- Partnerships are voluntary support; nothing digital is unlocked (owner answer).
- Replace external Log in / Sign up with a local reader profile (owner answer).
- Treat this as web MVP readiness work. No store approval guarantee, native app, real account deletion, notifications, payment processing or finished legal policy is implied.

## Phase 1 — CEO / strategy review

### Premise challenge and scope
The user is asking for a trustworthy MVP and submission preparation, not a native rewrite. A working web frontend is useful progress but cannot itself be uploaded as an iOS app or Android app bundle. Non-charity voluntary support is confirmed; lack of digital benefits alone does not establish a universal billing exemption. Keep the current web form, explain its purpose, and mark native payment handling as a release decision requiring territories and provider-flow review.

Existing leverage: reuse Profile, shared Modal/focus management, local state, appearance preferences, Journal, catalog/variant helpers, Bible loading/error views, language choices and horizontal Home rail. Avoid a second settings shell, fake account screens, an unnecessary state library or pretend server deletion. The new work should make current behavior clear and recoverable.

```
CURRENT: useful local reading/store preview + misleading account/support copy
   -> THIS PLAN: honest local profile + data controls + support information + tested flows
   -> 12-MONTH IDEAL: verified native builds, content pipeline, reviewed payment paths,
                     published policies, accessible offline reading and device QA
```

| Alternative | Effort | Benefit | Risk / decision |
|---|---|---|---|
| Copy-only patch + generic checklist | Small | Fast annotations fix | Leaves trust/data/navigation gaps; reject |
| Targeted frontend readiness + sourced submission pack | Medium | Reviewable MVP with explicit owner blockers | Selected; preserves app and user scope |
| Native rebuild + auth/payments/backend now | Large | Broader launch implementation | Unauthorized scope and unknown publisher/payment facts; defer |

Selective expansion accepts data export/reset, help/about, honest capability copy, share/navigation fixes, failure recovery and meaningful tests. These are within the current screens and their failure paths. Defer native packaging, content licensing negotiation, policy publication, account services, billing and background notifications. No unrelated analytics SDK, redesign or dependency installation.

### 1. Architecture
The app is a React/TypeScript/Vite client with hash routes and localStorage. Existing components handle screen-specific rendering; App currently mixes navigation and many modal bodies. Extract privacy/help/about into a small focused component rather than enlarge the modal chain, and centralize local-data operations in one tested utility.

```
UI -> App route + local reader state -> existing screen components
   -> local-data utility -> browser storage / JSON download
   -> explicit external destinations: Bible API / shop / partnership form
App shell -> error boundary -> recovery UI (never auto-clear data)
```

### 2. Error and rescue review
Storage can throw SecurityError/QuotaExceededError, and JSON can be malformed or the wrong shape. Export/reset must report failure and reset must only target this app's namespaced keys after explicit in-product confirmation. React rendering/lazy chunk failures need a recovery screen; iframe load does not prove the provider form is operational, so the fallback must remain visible.

| Operation | Failure | Rescue / user outcome |
|---|---|---|
| Local read / JSON parse | Denied, corrupt, wrong type | Safe validated fallback; no automatic deletion |
| Local write | Quota/denied | Session remains usable; visible persistence warning |
| Export | Storage or download failure | Explain and retry; never claim success without initiating file |
| Reset | Partial storage failure | Keep dialog/error; only reload after successful clear |
| Route / lazy render | Missing slug, runtime/chunk failure | Existing store fallback; root recovery boundary |
| Share | Clipboard unavailable | Selectable current-site URL |
| External form | Slow/blocked/offline | Explicit load, status and direct-link fallback |

### 3. Security and privacy
A local profile is not a server account, and no new credentials should be requested. Notes may contain sensitive reflections; export is user initiated and must warn that the file contains their data. External services still receive network requests, so remove blanket privacy claims and distinguish local reading data from provider/hosting traffic. Legal publisher/contact/retention facts must come from the owner before a complete public policy can be finalized.

### 4. Data integrity
Current export omits other app namespaces, while wholesale origin clearing could destroy unrelated data. Enumerate only owned namespaces and preserve unrelated keys; validate loaded shapes before components use arrays/objects. Reset affects this browser, not external shop orders or partnership records, and the confirmation copy must state that boundary.

### 5. Code quality
Use the existing Modal and CSS vocabulary instead of introducing another dialog framework. Small storage and route helpers can be behavior-tested without installing a test runner. Preserve existing catalog, language and theme work; avoid broad formatting or unrelated refactors.

### 6. Tests
Prioritize storage isolation, malformed values, blocked writes, export coverage, reset partial failure and route parsing/deep links. Run current shop/appearance tests plus production build verification. Browser checks cover all screens, local profile naming, privacy/help/about, form loading, narrow layouts and keyboard focus; backend/native behavior remains explicitly untested and outside this build.

### 7. Performance
No new network request is needed for local help/profile/privacy UI. Defer the third-party form until the user chooses to load it; this reduces unsolicited load and makes the external handoff understandable. Keep bundled images, lazy Store loading and existing reduced-motion support; no continuous background tasks or analytics added.

### 8. Observability
User-visible recovery is more useful here than a new telemetry service. Keep errors actionable without logging notes or personal data, and record reproducible browser/build checks in the release document. Future native crash reporting needs a provider/privacy decision and is deferred rather than silently added.

### 9. Deployment
Run tests and a final production build, inspect that build, then push the existing private branch and deploy to the existing gnd-test project. Record the new commit/deployment and check live copy/profile/routes. Rollback is a prior Cloudflare deployment or rebuilding the previous commit; no database migration or account data migration is introduced.

```
Tests -> production build -> browser verification -> private Git push -> Pages deploy -> live smoke
Failure before release -> fix locally; failed live smoke -> restore previous Pages deployment
```

### 10. Long-term trajectory
These changes keep the web MVP useful while exposing the native launch gap honestly. Local data format/versioning and a clear profile boundary make future sync migration easier, but there is no promise of future account transfer. The owner checklist names payment geography, business identity, age audience, rights and native packaging as required inputs; those decisions should precede native release work.

### 11. Design and user journey
Profile should first explain whose local space this is, then offer journal/saved reading, then settings/data/help. Remove account calls to action and outreach claims unsupported by real metrics. Keep the user's approved liquid glass theme and navigation; improve utility and states instead of replacing the visual direction.

```
Home -> Read -> save / journal -> Profile (local reader)
Profile -> Privacy & data -> export OR confirm reset -> success/recovery
Profile -> Help / About -> known official destinations
Partner -> purpose + external-form notice -> Load form -> provider / fallback
```

### Temporal interrogation / rollout cost
Hour 1: audit and owner premises prevent building the wrong account/payment model. Middle implementation: shared storage/export semantics and navigation deserve tests before UI polish, because hidden corruption undermines trust. Final hours: production/mobile verification and owner docs must be completed; native blockers remain visible even when the frontend gates pass.

### Decisions
| # | Phase | Decision | Classification | Principle | Rationale | Rejected |
|---|---|---|---|---|---|---|
| 2 | CEO | Local reader profile, no external auth CTA | User-confirmed | P6 | Owner selected local mode | Fake future account UI |
| 3 | CEO | Voluntary non-charity support with no unlocks | User-confirmed | P6 | Owner confirmed business model | Donation/charity claims |
| 4 | CEO | Targeted frontend readiness, native work deferred | Auto | P1/P3 | Complete within authorized scope | Native/backend expansion |
| 5 | CEO | Scoped export/reset with failure handling | Auto | P2/P5 | Current local data needs usable controls | Clear entire origin |
| 6 | CEO | Publish owner checklist, not invented legal facts | Auto | P6 | Policy truth depends on business/providers | Claim review-ready compliance |

External voice preflight: Claude CLI 2.1.177 is not authenticated, so no Claude review is claimed. Codex CLI 0.154.0 is authenticated; independent review follows. No dual-model consensus can be reported.


### CEO independent review result — codex-only
Independent Codex review completed successfully (raw result: `CEO-REVIEW.md`). Five concerns were accepted: date-aware content labeling, a firm frontend stopping rule, versioned export without implying import, explicit child-audience launch gate, and an optional native-support fallback. All fit the confirmed premises; no change to the user's requested business model is proposed. Claude was unavailable, so cross-model consensus is not claimed. CEO phase is complete; design follows.

## Phase 2 — design review

Classifier: app UI. Preserve the existing rounded glass surfaces, existing system typography, blue primary action, light/dark/system tokens and six-item bottom navigation. This task repairs trust and usability inside the approved design rather than changing the brand. The gstack designer executable is absent from the installed package; use the existing rendered app as the visual reference and a concrete Profile wireframe below, then verify actual implementation screenshots.

### Pass 1: information architecture (before 6/10, specified target 9/10)
Profile currently leads with two account calls to action that point elsewhere. Replace them with a short local-profile explanation and one Edit reader name action; retain journal and saved readings as primary tasks. Rename unsupported outreach metrics to Reading journey, and group Appearance, Settings, Privacy & data, Help, and About beneath them. A complete legal publisher identity is still an owner input, so the target score does not imply finished legal content.

```
PROFILE
  Your GoodNews story        settings / close
  Reader name               Local reader · this browser
  readings / streak         Edit reader name
  Reading journey           completed / saved
  My journal | Saved readings
  Partnership               free app development
  Appearance
  Settings
  Privacy & data            export / clear local data
  Help                      actual capabilities / official contact
  About                     version / sources / support model
```

### Pass 2: interaction states (before 5/10, specified target 9/10)
Local profile has no sign-in/loading state and should not pretend to authenticate. Data actions must distinguish no stored data, prepared export, failed storage access and destructive reset confirmation. Partnership starts with purpose/external-service notice, then explicit form loading and a persistent direct-link fallback; onload is not equivalent to successful submission.

| Feature | Loading | Empty | Error | Success | Partial |
|---|---|---|---|---|---|
| Reader profile | Immediate | Reader default | Persistence banner | Updated name | Session-only changes |
| Journal / saved | Immediate | Existing browse/add action | Recovery boundary | Saved locally | Export warning if persistence fails |
| Export | Short synchronous action | Empty versioned file allowed | Retry message | Download prepared | States persisted data only |
| Reset | Explicit confirmation | Nothing to remove | Clear failed; no false success | Reload defaults | Warn if some keys could not clear |
| Partnership | User-initiated loading status | Purpose panel | External fallback | Form displayed, provider owns submit | Slow/blocked form fallback stays visible |
| Bible | Existing loading UI | Search empty state | Existing retry/offline | Requested chapter | Translation/cached-source notice |
| Store | Bundled catalog | Search/saved filter reset | Image fallback | Product view | Price/stock confirmed externally |

### Pass 3: user journey (before 6/10, specified target 9/10)
Within five seconds readers should understand they can read without an account. Within five minutes they should save a reading, write a note and find both in their local profile. Over time they must understand data belongs to this browser and can disappear when storage is cleared; export is a portable record, not a tested restore workflow. Partnership is always optional and does not gate reading.

| Step | User action | Intended feeling | Concrete UI |
|---|---|---|---|
| 1 | Opens Home | Oriented | Correct title and dated/featured reading |
| 2 | Opens scripture | Confidence | Actual cited chapter, displayed available translation |
| 3 | Opens Profile | Ownership | Local reader wording, journal/saved counts |
| 4 | Exports / resets | Control | Data scope, file warning, explicit confirmation |
| 5 | Supports development | Informed choice | Non-charity purpose, no unlocked benefits, provider handoff |

### Pass 4: specificity / visual restraint (before 7/10, target 9/10)
Do not add decorative dashboards, badges or more promotional cards. The existing home carousel is explicitly requested and each card has a distinct task; preserve it. Use concise utility labels, normal devotional capitalization and View product buttons reduced to View. Information dialogs use headings and paragraphs, not repeated ornamental icon tiles.

### Pass 5: design system alignment (before 8/10, target 9/10)
Reuse Modal, glass-button, primary-button, muted text, setting rows and the app's variables. New data/help content needs readable line-height, wrapping for long URLs/names and action spacing, including dark mode. There is no DESIGN.md; document the reused decisions here instead of inventing a competing system. Keep prefixed backdrop-filter before the standard property, per prior production verification.

### Pass 6: responsive and accessibility (before 7/10, target 9/10)
Verify actual CSS widths near 360–393px and desktop; document viewport overrides separately because Codex zoom can change effective width. Buttons should have at least 44px hit areas where changed, focus styles and meaningful labels; dialog focus/escape must use the existing Modal. Respect reduced motion for Bible verse scrolling, preserve user-selected System appearance, and avoid hiding errors behind transient-only toasts. Final screenshots verify actual layout rather than assuming matching scroll widths proves visibility.

### Pass 7: unresolved decisions
Owner settled local profile and no-benefit support. Publisher identity, final support contact ownership, privacy/terms URLs, supported territories and direct-child vs adult-mediated target remain launch inputs; do not fake these in the UI. Keep known official contact/source links clearly labeled, and state current storage/network behavior factually. Native commercial entry points may need a separate audience/payment design and are not declared solved by this web patch.

Design decisions auto-adopted under autoplan: one local identity, explicit storage boundaries, no account affordances, utility dialogs, minimum touch targets, honest external handoff. These preserve user choices and use existing components. No additional taste approval is needed for these repairs.

### Design independent review result — codex-only
Independent Codex raised five concrete gaps; all are accepted into engineering scope: capture/restore modal opener reliably, preserve Saved/reader history, reconcile reset state, propagate local name to Home, and guard dirty journal dismissal. For reset, any failure locks further edits behind an actionable recovery screen and reloads from actual remaining storage when the reader chooses; never leave stale in-memory notes editable. The journal will keep its draft open and offer Keep editing / Discard changes. Design phase is complete; actual rendering still requires verification, so no 10/10 visual claim is made.

## Phase 3 — engineering review

### 1. Architecture and scope
Reuse React state and the existing hash router, with a small typed route helper for reader IDs, Saved filters and Bible references. No router library or API service is justified for this MVP. The change spans more than eight files because each requested screen has its own component, but only one small storage utility and one information-dialog module are new responsibilities; reduce by assigning disjoint edits rather than creating a platform layer. Root owns App/routes/profile/data utility; a bounded worker may own Bible/Reader correctness and another Store controls.

Actual defects are verified in source: `App.tsx` openLibrary/openBible only set state; `bible-data.ts` anchored regex rejects parenthetical translation labels; `hooks.ts` casts parsed JSON with no validation; `Profile.tsx` exposes external account UI. These are confidence 10/10 code findings, not inferred compliance failures. Missing native artifacts are a separate build deliverable and remain outside implementation.

```
location.hash -> parse route -> screen + reader/product/ref/filter
  invalid route -> Home; invalid product -> Store; invalid reader -> Library
  action -> pushState + same parsed state -> back/hashchange restore
storage -> parse -> shape guard -> state; invalid -> fallback + warning
state update -> attempted persistence -> state + persistent warning on failure
export -> owned entries only -> versioned JSON -> local download
reset -> confirmation -> remove owned entries -> reload
  failure -> block edits + retry OR reload remaining stored state
```

### 2. Code quality and failure ownership
Keep keys centralized by owned prefix `gnd-local-`; inspect shop keys before assuming this includes all data. Add per-type guards for reader arrays, notes, audience and reminder configuration without silently dropping valid user fields. Storage failure warning must outlive a four-second toast; never log note bodies. Export includes raw owned stored values and schema version, and is labeled a data export with no restore feature promised. Invalid data is not automatically cleared; users can export it first.

Modal needs a pre-close veto for dirty Journal drafts, reliable focus fallback and disabled-field exclusion. Native beforeunload confirmation protects dirty notes if the user leaves the page, while the local dialog handles Escape/backdrop. ErrorBoundary should offer reload and Home without data deletion. Existing provider iframe must remain cross-origin and no attempt will be made to inspect submitted sensitive data.

### 3. Test review
Existing tests are plain Node assertions using strip-types; extend that pattern for pure logic instead of adding Vitest/Playwright dependencies. Meaningful tests cover malformed/wrong-shaped storage, all app namespaces, unrelated-key preservation, blocked reads/writes, partial clear, Bible suffixes/ranges and route parsing. Browser verification covers cross-component flows on a fresh local origin and observes user-visible results; never clear the user's live data or submit payment/contact forms. Production verification checks generated CSS and local assets as well as TypeScript.

```
local-data [unit]              routes [unit]              Bible [unit]
 owned keys / invalid JSON     home / saved / reader      suffix / alias / bad book
 export raw + schema           bad id / encoded ref       chapter / reversed range
 failures / partial clear      history restore            reduced motion [browser]

Profile -> name -> Home [browser]
Profile -> data -> export -> confirmation/recovery [browser; no live deletion]
Journal -> edit -> Escape -> keep/discard [browser; isolated disposable draft]
Store -> saved filter -> product -> bag [browser; no checkout]
Partner -> disclosure -> load -> close/fallback [browser; no submit]
Reader -> scripture -> correct book/chapter -> back [browser]
```

| Failure mode | Handling | Verification | Reader sees |
|---|---|---|---|
| Corrupt local JSON/type | Validated fallback, preserved raw export | Unit | Defaults + storage notice |
| Storage blocked/full | Session-only state, warning | Unit + UI inspection | Persistent warning |
| Reset partly fails | Locked recovery; retry or reload remaining data | Unit + UI inspection | Exact scope and recovery actions |
| Wrong/unknown route | Safe screen fallback | Unit + reload/back browser | Usable Home/Store/Library |
| Scripture suffix | Normalize terminal translation label | Unit + browser | Cited chapter in available version |
| Dirty draft dismissed | Pre-close veto / beforeunload | Browser | Keep editing / discard |
| Chunk/render failure | Error boundary | Build + source review | Reload / Home, no data loss |
| Hosted form blocked | Visible fallback/status | Browser normal path; blocked behavior code review | Link/retry, no fake success |
| External Bible fails | Existing timed retry/cache | Existing code review + browser normal load | Retry/offline explanation |

### 4. Performance
Owned storage scans happen only for user-requested export/reset; normal rendering reads each small value once. The fixed 20-product catalog makes a wishlist filter inexpensive and requires no indexing system. Preserve lazy Store chunking, clear timers/listeners on unmount, and do not add a background watcher or service worker. The hosted form is the slowest optional path; delaying it until a deliberate action improves both loading and privacy clarity.

### DX scope assessment
No public API, SDK, developer tool, library package or CLI interface is being changed. Internal tests and launch documents support this consumer frontend and do not create a developer-facing product. Phase 3.5 is therefore skipped; existing npm commands are reused and documented. No false claim of running a DX review.

### Tasks and verification ownership
- T1 (P1): Root — local Profile, Help/About/Privacy controls, scoped export/reset, truthful support copy and failure recovery.
- T2 (P1): Root — hash navigation/share destinations, local state validation, modal focus and dirty Journal protection.
- T3 (P1): Reading worker — normal titles, date-aware Home badge/name, Bible reference parsing and bounds, truthful reading-plan label, reduced motion.
- T4 (P2): Store worker — View label, saved-products filter, catalog availability disclosure and changed-control hit areas.
- T5 (P1): Root + research evidence — submission packs, screen audit, owner blocker register and release evidence.
- T6 (P1): Root — integration tests/build, narrow/wide rendered checks, private push, existing Pages deployment and live smoke.

Parallel lanes are disjoint specific files despite sharing src/components; workers must not touch App, package.json, Modal, Journal, Profile or each other's files. Root performs integration only after both return. Independent engineering review follows before implementation.

### Engineering independent review result — codex-only
Five concerns accepted: reset lock must unmount the App subtree (including direct Bible writers), route/history integration must go beyond parsing, draft veto must precede animation and include in-document navigation, recovery must reload rather than retain a rejected lazy component, and parser tests must be wired into npm test. Reset runs from the root-owned App; on partial failure it renders only a locked recovery surface, leaving ShopProvider mounted but no editable descendants. Retry operates only on remaining owned keys; Reload reconciles all providers from actual storage. Root ErrorBoundary wraps ShopProvider and Suspense; Home recovery performs a full same-origin navigation/reload, preserving storage.

Reading navigation captures the full previous hash for close/back and encodes reader IDs, library entry filters and initial Bible references. In-screen Bible picker/search remains internal; full verse/chapter permalinks and article/issue deep detail URLs are deferred and documented instead of claiming a fully URL-driven app. Journal dirty state registers a navigation guard with App; pop/hash transitions are rejected/restored while a dirty editor is open, and beforeunload covers leaving the document.

Phase 3 complete. Phase 3.5 skipped: no developer-facing product scope. Primary and independent Codex reviews both identified data truth, navigation continuity and explicit external boundaries across phases; these are same-model independent corroboration, not dual-model consensus. Claude remained unavailable. All implementation tasks are within the user's explicit instruction to sort the frontend MVP; no new approval gate is introduced.

## Implementation leaf ownership contract

- Root: App.tsx, Profile/profile.css, Modal, Journal, hooks, local-data utility, routes, information dialogs, PartnershipModal, main/error boundary, root styles, package scripts, integration tests/docs/gates/release. Root alone operates Git/deploy/browser.
- Reading leaf: Home.tsx/home.css/HomeStoreCard if needed, Reader.tsx, data.ts, bible-data.ts, Bible.tsx/bible.css, Collections.tsx, and scripts/test-reading.mjs only. Add optional readerName prop to Home, parent supplies it. No App/hooks/Modal/package edits.
- Store leaf: Store.tsx, ui/product-card-1.tsx, ui/ecommerce-04.tsx, shop.css and store-specific test helper if needed only. No shop-state/hooks/App/package edits.
- Docs leaf: combined docs/launch/LAUNCH-READINESS.md and docs/launch/OWNER-INPUTS.md only. Reconcile official packs/current scope, link evidence, never imply native or legal completion.

Each leaf must preserve other edits, inspect its full changes and report verification/remaining limits. Root integrates tests, builds and independently verifies changed flows before release.

## Integration review and final decisions

The independent final code review found three regressions; all were fixed and rechecked. Unreadable local keys are now write-protected for the session so fallback-derived edits cannot overwrite originals before export. Journal deletion resets all editor/queued-navigation state. Browser Back cancellation restores the original history position using entry indices instead of replacing the previous entry; the Home → Profile → Notes → Back → Keep → Back → Discard → Profile → Back → Home flow passed in browser.

Mobile visual inspection found the Profile shortcuts overlay obscured journal content. Shortcuts now remain in page flow, and the decorative header is shorter. The Store pause control grew to a 44px hit target; the adjacent heading now reserves enough width. Nested main landmarks were replaced with sections so App owns the main region.

| # | Phase | Decision | Classification | Principle | Rationale | Rejected |
|---|---|---|---|---|---|---|
| 7 | Design | Preserve local identity across Home/Profile | Auto | P2 | Same user-facing name must agree | Hardcoded Reader on Home |
| 8 | Design | Protect draft closure and restore focus | Auto | P1 | Prevent lost reflections and keyboard dead ends | Silent discard |
| 9 | Eng | Scoped key enumeration, raw export, partial-reset lock | Auto | P1 | Prevent unrelated deletion and stale writes | Whole-origin clear |
| 10 | Eng | Typed hash routes and indexed history restoration | Auto | P2 | Preserve reload/Back for primary journeys | State-only navigation |
| 11 | Eng | Corrupt keys stay session-only until explicit reset | Auto | P1 | Keep originals exportable | Overwrite invalid data |
| 12 | Design | Inline Profile shortcuts and reserved Store control space | Auto | P2 | Fix observed mobile overlap | Floating duplicate chrome |
| 13 | Eng | Native/payment/privacy/content-owner work remains explicit | Auto | P3 | Depends on external facts and separate implementation | Claim store approval |

### Aggregated task disposition
T1–T4 implemented and behavior-tested; T5 research/audit/owner deliverables completed; T6 build/browser verification passes, release recorded separately in RELEASE.md. These statements describe web MVP work. The open items in TODOS.md and OWNER-INPUTS.md are not silently counted as implemented native or legal requirements.
