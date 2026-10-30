# Gates: MVP frontend and mobile-store readiness

Scope: Inspect every user-facing screen, fix the annotated copy and frontend gaps, complete the requested planning reviews, document Apple/Google submission requirements, and publish the verified web MVP update. No backend or native-store submission is authorized by this task.

- [x] L1: Product actions say View; devotional titles use normal capitalization.
  EVIDENCE: src/data.ts and ui/product-card-1.tsx updated; browser confirms Don’t Sleep!, I Am in Charge and View. npm test reading suite passes.
- [x] L2: Every app screen and Profile flow has an evidence-based frontend audit with missing states and priorities.
  EVIDENCE: docs/launch/SCREEN-AUDIT.md records every primary screen and relevant overlay with browser/code evidence, implementation follow-through and deferred inner detail routes.
- [x] L3: Autoplan strategy, design, engineering and applicable developer-experience reviews run sequentially; decisions, test plan and unresolved owner choices are written.
  EVIDENCE: docs/launch/PLAN.md contains sequential CEO → Design → Eng reviews, independent Codex outputs in CEO-REVIEW/DESIGN-REVIEW/ENGINEERING-REVIEW, explicit unavailable Claude voice and justified DX skip, decision trail, tasks, test plan and TODO/owner register.
- [x] L4: Apple and Google submission documents, assets, declarations, metadata and testing requirements are sourced from current official guidance.
  EVIDENCE: APPLE-SUBMISSION.md and GOOGLE-PLAY-SUBMISSION.md plus combined LAUNCH-READINESS.md; leaf ledgers checked. Parent spot-checked current Apple upload/privacy/payment and Google API36/payment sources on30Oct2026.
- [x] L5: Rejection risks and remaining launch blockers are clearly separated from frontend fixes; no approval guarantee or invented legal/account facts.
  EVIDENCE: LAUNCH-READINESS.md, OWNER-INPUTS.md and RELEASE.md explicitly keep native builds, policies/provider facts, payment eligibility, child targeting, rights and device testing open; no native submission/approval claimed.
- [x] L6: Frontend improvements and partnership copy reflect a non-charity business supporting free app/technology development and physical-goods purchases.
  EVIDENCE: Local Profile, Help/About/Privacy & data, scoped export/reset, deliberate provider loading, non-charity/no-unlock copy, accurate reading/share/store behavior implemented; RELEASE.md records browser evidence.
- [x] L7: Changed flows pass meaningful behavior checks, TypeScript/build, mobile/desktop and accessibility review.
  CHECK: npm test && npm run build
  EXPECT: BUILD_VERIFIED
  EVIDENCE: npm test passes all four behavior suites; npm run build returns BUILD_VERIFIED; git diff --check passes. Production browser uses index-DxoPn7g4.js. Actual360/393px mobile checks plus1800px desktop, keyboard/focus/history, memory-only partial reset/corruption/write/render/chunk failures verified. RELEASE.md documents limits.
- [x] L8: Verified update and launch documents are pushed to the private project and deployed to the existing GND test site; live changes are checked.
  EVIDENCE: Application commit448d118 pushed to verified private GNDforaman/codex/goodnews-local; Cloudflare deployment8a066289 serves gnd-test.pages.dev. Live HTML/JS/CSS byte-match local build; Home/Profile/partnership/20 View buttons checked at393px, no horizontal overflow or captured error logs. RELEASE.md and evidence/launch-20261030 record proof. Launch documents shipped with the application commit.
