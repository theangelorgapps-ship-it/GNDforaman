# Gates: Annotated home, appearance and collection refinements

Scope: Address browser comments 1–10, add coherent accessible motion, and publish the verified revision.

- [x] M1: Home Store CTA is a liquid-glass button; title reads GoodNews Daily Store; the Store icon and home-preview prices are removed.
  EVIDENCE: Browser confirmed renamed card, no storefront icon or prices, 18px glass blur and functional Store CTA; evidence/annotation-verification.md.

- [x] M2: Verse label tracking is natural and Verse/Store/Blogs scroll side by side on phones without page overflow, with accurate card navigation.
  EVIDENCE: Measured CSS widths 319–960px without document overflow; carousel reached 1/3, 2/3 and 3/3; verse tracking 0.1px. See verification notes.

- [x] M3: Appearance offers Light, Dark and System, persists preference, and System follows OS theme changes.
  EVIDENCE: Light/Dark/System browser activation and reload verified; APPEARANCE_VERIFIED covers live MediaQueryList events, migration and cleanup.

- [x] M4: Collections exposes a language selector and tapping an issue opens it; choices lead to verified editions or an explicit availability state.
  EVIDENCE: Issue activation, language search, French/Kids Spanish/Teens French links, English reading and missing Amharic state verified; source links and sampled document titles recorded.

- [x] M5: Page, modal, card and control motion follows a consistent calm style; keyboard, pause controls and reduced-motion behavior are preserved.
  EVIDENCE: Calm timing and reduced-motion overrides reviewed; keyboard arrows, modal focus wrap/Escape/restoration and product pause verified.

- [x] M6: TypeScript, production build and behavior tests pass; phone/desktop visuals are inspected.
  CHECK: npm test && npm run build
  EXPECT: BUILD_VERIFIED
  EVIDENCE: npm test and npm run build passed with SHOP_STATE_VERIFIED, APPEARANCE_VERIFIED, BUILD_VERIFIED; mobile/desktop screenshots inspected.

- [ ] M7: Changes are pushed to the existing private repository, deployed to gnd-test, and verified on the live URL.
  EVIDENCE: pending
