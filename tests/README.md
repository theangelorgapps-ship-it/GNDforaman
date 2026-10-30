# Manual failure verification

Start the existing Vite development command and open `/tests/qa.html#/profile`.
This development-only fixture replaces storage **in that page only** with disposable memory data; it never reads or clears a real browser profile. It is not an entry point in the production build.

Use its visible controls to simulate render/chunk failure, blocked writes and one-key reset failure. Verify the real App's warning/recovery UI, the absence of editor/navigation controls after partial reset, and unrelated memory-key preservation. `/tests/qa.html?corrupt=1#/notes` seeds one valid and one malformed note: saving a new session note must leave the original raw notes unchanged, observable through Inspect memory notes. Use a new fixture document to reset all simulated state.

The regular local site is used for URL/history, mobile layout, form-loading and keyboard checks. Never clear live user data or submit hosted payment/contact forms as a test. Unit behavior checks run through `npm test`; the manual fixture complements them.
