# Gates: Home and reader
Scope: Match reference homepage and functional devotional reader.

- [x] H1: Home reproduces audience tabs, sunset hero, reminder, verse/stories rail and action controls.
  EVIDENCE: Parent inspected evidence/local-mobile.jpg and evidence/local-desktop.jpg against live reference; verified audience change to I AM IN CHARGE and explicit Kids sample. Reference geometry and correction history in evidence/reference.md and evidence/browser-verification.md.
- [x] H2: Reader displays full supplied text, saving, completion, options, and real browser narration with unavailable-state handling.
  EVIDENCE: Live UI tests verified Save -> Remove saved devotional, Mark as complete -> Reading completed, persisted100% progress and Saved filter after reload; font18px ->20px ->18px; Listen -> Pause reading -> Resume reading -> Stop audio; native Share dialog with actual scripture. Full supplied article and study links visible in DOM.
- [x] H3: Responsive styling and accessible controls are implemented; improvement pass complete.
  EVIDENCE: No horizontal overflow at390px or962px; source includes labelled buttons and reduced-motion controls. Parent visual correction pass fixed dark contrast, card minimum width and dialog centering. Production TypeScript/build pass after final formatting; browser console error list empty.
