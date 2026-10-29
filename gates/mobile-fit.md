# Gates: Phone viewport fit correction
Scope: Keep home content and navigation within the phone viewport without partial side cards.

- [x] M1: Phone cards use the available width and no card content is cut off horizontally.
  EVIDENCE: Browser checks at 320, 393 and 430 CSS pixels report matching page widths, column card layout and no card/header/dock outside the viewport. Screenshot: evidence/mobile-fit-393.jpg.
- [x] M2: Header and fixed navigation fit narrow phone widths; navigation blur is not blocked by its parent.
  EVIDENCE: Same checks include header/audience children and fixed dock/orb bounds; all outside-element arrays empty. Dock parent filter is none and blur remains on the surfaces. Desktop at 1024px retains row cards and also passes width bounds.
- [x] M3: TypeScript and production build pass after the responsive correction.
  CHECK: npm run build
  EXPECT: BUILD_VERIFIED
  EVIDENCE: ✓ built in 273ms | BUILD_VERIFIED
