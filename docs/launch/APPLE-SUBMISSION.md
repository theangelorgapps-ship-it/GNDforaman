# Apple App Store submission pack — GoodNews Daily Connect

Research date: **29 October 2026, Europe/London**. Internal preparation document; no App Store submission, legal-policy publication, or approval is represented here. Recheck the linked Apple pages when the native release is ready. **M** = required for this release; **C** = required if the stated condition applies; **O** = optional/recommended.

## 1. Release position and evidence

**The current repository is a web MVP, not an uploadable iOS app.** `package.json` builds React/TypeScript with Vite. Intake found no Xcode project, native signing configuration, `Info.plist`, or `PrivacyInfo.xcprivacy`. A working website and a successful web build do not establish native release readiness.

Verified frontend evidence:

| Area | Evidence and submission implication |
| --- | --- |
| Profile and journal | `src/App.tsx`, `src/hooks.ts`, `src/components/Profile.tsx`, and `Journal.tsx`: reader name, notes, saved/completed readings, reading dates and preferences use localStorage. Journal supports creating, editing, searching and deleting notes. This is not an online account or cloud backup. |
| Reading | `Reader.tsx`: devotional reader, saved readings, completion, text controls and device speech synthesis. Treat speech playback as device-dependent; do not market recorded narration. |
| External services | `Bible.tsx`: unbundled chapters request `bible-api.com`. Collections link to published editions via external hosts, including DocDroid. Article and product links reach the official website. |
| Partnerships | `PartnershipModal.tsx` → `public/partnership.html` → hosted form and `form_embed.js` on `sub.goodnewsdailydevotional.com`. An embedded web payment flow remains part of the app experience. Processor practices and transaction behavior have not been audited. |
| Store | `src/catalog.json`: physical books, clothing and accessories. Check that any future digital download or paid app entitlement is classified separately. |
| Audiences | Adults, Teens and Kids are selectable content preferences. This does not verify age, obtain parental consent or implement a parental gate. |

User-confirmed business facts: partnership payments are **voluntary support for development of the free app and technology; nothing is unlocked; the business is not a charity**. These facts supersede the earlier uncertainty in the planning intake. Countries, publisher identity, native architecture and final payment implementation remain owner decisions.

## 2. Submission checklist: account, build and documents

| Class | Deliverable | What must be supplied or verified |
| --- | --- | --- |
| M | Apple Developer Program membership | Actual account holder, legal seller identity, two-factor authentication and team roles. Organization enrollment needs legal-entity verification and ordinarily D-U-N-S; an individual uses their legal name. Standard membership is USD 99/year or local pricing. [Enrollment](https://developer.apple.com/help/account/membership/program-enrollment/), [D-U-N-S](https://developer.apple.com/help/account/membership/D-U-N-S) |
| M | App record and identifiers | Owner-approved name, primary language, bundle ID matching the native project, internal SKU, category, version and build number. Apple generates the numeric app Apple ID. Do not derive these from the website name. [App information](https://developer.apple.com/help/app-store-connect/reference/app-information/app-information) |
| M | Signed native distribution build | Choose and build the iOS implementation, configure signing/provisioning and entitlements, archive, validate and upload. **Minimum today: Xcode 26 or later with iOS/iPadOS 26 SDK or later; deployment target iOS 13 or later.** SDK and deployment target are different settings. Xcode 27 uploads are now supported. [Current requirements](https://developer.apple.com/news/upcoming-requirements/), [Connect release notes](https://developer.apple.com/help/app-store-connect/release-notes/) |
| M | Public privacy-policy URL and in-app access | Owner-approved policy matching the final app and its external processors; see section 5. A local “Privacy & security” modal alone is not the public policy deliverable. [Manage app privacy](https://developer.apple.com/help/app-store-connect/manage-app-information/manage-app-privacy/) |
| M | Public support URL | Working page with genuine ways to contact the operator. Provide the support address and response owner; no invented email. [Version information](https://developer.apple.com/help/app-store-connect/reference/app-information/platform-version-information) |
| M | App Privacy answers | Final data inventory, collection purposes, linking/tracking decisions, third-party evidence and matching declarations in Connect. [Privacy details](https://developer.apple.com/app-store/app-privacy-details/) |
| M/C | Age rating / Kids / age assurance | Complete the current questionnaire for the entire app; choose Kids category only deliberately. Region-dependent age assurance may need native APIs. See section 4. |
| M/C | Encryption/export declaration | Answer for the complete native build, including platform HTTPS and SDKs; supply documentation only when the questionnaire requires it. Do not assume “web app” means no encryption. [Export compliance](https://developer.apple.com/help/app-store-connect/manage-app-information/overview-of-export-compliance/) |
| M/C | Trader and territory declarations | Declare DSA trader status even if not distributing in the EU. EU traders need verified public address, phone and email, and supporting identity/address documents. Confirm launch countries and any additional permits requested in Connect. [DSA requirements](https://developer.apple.com/help/app-store-connect/manage-compliance-information/manage-european-union-digital-services-act-trader-requirements) |
| M/C | Digital Goods and Services questionnaire | Complete it if displayed in Connect, using the actual free-content and payment arrangement. Do not submit EU payment choices casually: those choices are locked for 12 months. [Questionnaire](https://developer.apple.com/help/app-store-connect/manage-app-information/complete-the-digital-goods-and-services-questionnaire/) |
| C | Paid Apps agreement, tax/bank details and purchase records | Needed for the chosen IAP business model. Prepare product IDs, type, localized display text/prices, review screenshot and working purchase handling. Submit first IAPs with the app. [IAP setup](https://developer.apple.com/help/app-store-connect/configure-in-app-purchase-settings/overview-for-configuring-in-app-purchases/), [IAP submission](https://developer.apple.com/documentation/appstoreconnectapi/managing-in-app-purchases) |
| C | External-payment authorization and operations | Only for the actual eligible storefront/program: entitlement, agreement, native implementation, disclosures, reporting, fees, refunds, support and child safeguards. See section 3. |
| M/C | Content-rights evidence | Keep ownership/licence records for brand/logo, devotional text, translations, Bible versions, imagery, product photographs and hosted documents/services. Obtain publisher authority where the developer account differs from the rights holder; provide evidence if requested. [Guideline 5.2](https://developer.apple.com/app-store/review/guidelines/#intellectual-property) |
| O/C | Licence terms | Apple supplies a standard EULA. A custom EULA is optional; use one only after owner/legal review. External support-payment or shop terms must match their actual operators. [App information](https://developer.apple.com/help/app-store-connect/reference/app-information/app-information) |
| M | Reviewer contact and access | Real name, email and international-format phone number; notes explaining data, content and payment flows. Credentials only if the final app requires login. |

## 3. Voluntary support and merchandise: make the native payment decision

Apple explicitly permits IAP-based developer tips (3.1.1). It separately requires non-IAP payment for physical goods (3.1.3(e)). Approved-nonprofit fundraising and individual-to-individual gifts have narrower conditions (3.2.1(vi–vii)); this business has not established either exemption. US storefront external purchase links do not require the corresponding entitlement (3.1.1(a)). [Payment guidelines](https://developer.apple.com/app-store/review/guidelines/#business)

**Assessment for this app:** “voluntary,” “partnership,” and “nothing unlocked” describe the transaction but do not establish a blanket exemption for payments supporting the developer. Do not present the business as a charity, promise tax relief or claim Apple has approved this arrangement. The current general-purpose embed is an unresolved native-release risk, particularly across multiple storefronts.

| Route | Practical decision |
| --- | --- |
| Developer support through Apple IAP | The standard route to assess for native developer tips. Keep support optional and the existing app free. Prefer a straightforward one-off tip proposal; do not assume an auto-renewing “support subscription” without qualifying ongoing value will be accepted. Product setup and native transaction handling are new work. |
| US storefront external link | The link exception is geographically scoped. Do not treat it as automatic permission for the present embedded processor or apply it worldwide. Document the exact destination, storefront behavior and business explanation for review. |
| European Union alternative payments/offers | Current terms effective **1 October 2026** permit alternatives alongside Apple IAP. They require the StoreKit External Purchases or Offers Entitlement, applicable APIs/disclosures, financial reporting/fees and a 12-month payment-choice commitment across EU storefronts. Kids-category/under-13 users cannot receive out-of-app purchase offers; in-app alternatives require parental gates. Ages 13–17 require gates for alternatives/offers; higher regional consent ages can shift the threshold. [EU payment rules](https://developer.apple.com/support/payment-options-on-the-app-store-in-the-eu/) |
| Japan alternative payments/offers | Available for eligible Japan storefront iPhone apps on iOS 26.2+. Requires the entitlement and implementation; Apple IAP must also be offered under the stated program rules. Kids-category/under-13 users cannot receive out-of-app offers; in-app alternatives require a parental gate. Ages 13–17 require gates for both routes. [Japan payment rules](https://developer.apple.com/support/payment-options-on-the-app-store-in-japan/) |
| South Korea | Requires an approved entitlement/processor, a separate Korea-only app binary and native payment experience; the program does not permit a payment web view or Apple IAP alongside it. The current iframe is not that implementation. [South Korea requirements](https://developer.apple.com/support/storekit-external-entitlement-kr) |
| Other storefronts/programs | Apple also lists Brazil and Russia programs; assess each relevant program if those countries are selected. A Netherlands dating-app entitlement is irrelevant here. Do not infer a global allowance from any regional program. [Current program index](https://developer.apple.com/documentation/storekit/external-purchase), [Netherlands scope](https://developer.apple.com/support/storekit-external-entitlement/) |
| Reader-app account entitlement | Reading devotionals alone does not qualify this app. Apple's route requires eligible primary media functionality, account sign-in and previously purchased external content; it is not a general support-payment permission. [Reader entitlement](https://developer.apple.com/support/reader-apps/) |
| Physical Store | Preserve ordinary external checkout for genuine physical books/clothing/accessories. Apple Pay and IAP serve different uses. Verify seller, delivery/refund terms, accessibility and any child-facing gates. [Apple payment design guidance](https://developer.apple.com/design/human-interface-guidelines/apple-in-app-purchase) |

Native MVP recommendation: settle one compliant support route before enabling native payments, or launch the native app without the payment entry point until that work is complete. Keep every free feature accessible. The release review must exercise storefront restrictions and payment cancellation/failure, not just the success screen.

## 4. Children, teenagers and age declarations

**Three separate decisions:** intended audience, App Store content rating, and Kids category participation. The owner must state whether children under 13 are intended users and which bands, whether adults select content for children, and the launch territories. Do not select an older rating merely to bypass a child-directed product design.

- **M:** Answer the current rating questionnaire using all devotional/Bible content and reachable app capabilities. Current general ratings are 4+, 9+, 13+, 16+ and 18+, with regional differences. A faith app does not automatically receive 4+. Evaluate violence, mature themes, medical claims and whether any in-app browser permits unrestricted web access. External links alone do not prove unrestricted browsing. [Rating definitions](https://developer.apple.com/help/app-store-connect/reference/app-information/age-ratings-values-and-definitions/)
- **C — Kids category:** Choose 5-and-under, 6–8 or 9–11. Put purchasing, external links and adult areas behind an effective parental gate. The current Adults/Teens/Kids switch is easily changeable and does not meet that purpose. Scrutinize all third-party traffic, including adult areas, and the severe restrictions on identifiable/device information, analytics and advertising. [Apple child-safe design](https://developer.apple.com/kids/)
- **C — Kids commitment:** Once approved as Made for Kids, that selection cannot be changed; future updates retain the requirements. [Connect app information](https://developer.apple.com/help/app-store-connect/reference/app-information/app-information)
- **C — Age assurance:** Where legally required, Apple's guidance requires checking age through Declared Age Range; significant updates and revoked parental consent can require additional handling. Assess applicable regions before native implementation. A selected content audience, date-of-birth field or store rating is not a substitute. [Age assurance Q&A](https://developer.apple.com/support/age-assurance/)
- **M/C — Distinguish safeguards:** A parental gate limits actions; privacy consent concerns data collection and legal authority. One does not automatically satisfy the other. The EU/Japan alternative-payment child rules above can apply outside the Kids category too.

App-specific work: inspect Kids and Teens routes to Store, partnerships, DocDroid, external stories, sharing and any “original app” link; decide which are appropriate, gate where required, and verify that the hosted form does not load identifiers before the intended safeguard. This document does not certify child-privacy compliance.

## 5. Privacy, local data and accounts

Apple's label treats data processed only on the device differently from data transmitted and retained off-device. Embedded web-view collection must generally be included; optional collection has a narrow, cumulative exception. Therefore **do not choose “Data Not Collected” from the presence of localStorage alone**. [App Privacy definitions](https://developer.apple.com/app-store/app-privacy-details/)

| Flow to inventory | Facts established | Evidence still needed before declarations |
| --- | --- | --- |
| Reader profile, journal, history, preferences | Frontend localStorage; no account backend identified | Final native storage/backup behavior, local export/reset, retention, device-loss behavior, whether any telemetry ever includes these values |
| Bible requests | Requested reference/version sent to bible-api.com | Vendor logging/retention, IP/device metadata, terms and translation rights; final network trace |
| Partnership embed | Third-party form and remote script load inside the app | All fields, payment provider, cookies/identifiers, CRM/marketing integrations, retention, sharing, consent and deletion contacts; inspect before and after interaction without making a charge |
| Documents, stories, product sites and images | External hosts/destinations appear in source | Distinguish in-app embedded content from system-browser visits; inventory redirects, remote assets and collection; child suitability |
| Share, speech and reminders | Browser/device APIs appear in frontend | Final native implementation, permissions and SDK behavior; do not assume device voices or hosting collect nothing |
| Build dependencies | React, Radix, Framer Motion, Lucide and Vite in web project | Complete native SDK/plugin versions and transitive dependencies, analytics/crash SDKs if added, required-reason APIs and privacy report |

Prepare a data map with recipient, data type, purpose, linked/not-linked status, tracking status, retention and evidence. Potential form data categories are questions for the operator, not assertions that each is collected. Journal text may contain sensitive personal or religious information; avoid unnecessary upload or analytics exposure.

**M:** The owner-approved privacy policy needs operator/contact identity, the actual local-versus-server data model, third-party purposes, retention/deletion, consent choices and child handling. Link it in Connect and in the app. Publish only after these facts are settled. **C:** If tracking occurs, use AppTrackingTransparency and obtain permission before tracking; ordinary network access is not itself tracking. [Privacy declarations](https://developer.apple.com/help/app-store-connect/manage-app-information/manage-app-privacy/), [Tracking definition](https://developer.apple.com/app-store/app-privacy-details/#tracking), [Tracking permission](https://developer.apple.com/documentation/apptrackingtransparency)

**C — Native manifests:** Inspect the final archive for `PrivacyInfo.xcprivacy`, declared required-reason API use, and listed SDK manifests/signatures. Apple lists **Capacitor and Cordova** among affected SDKs; wrapping this site may introduce these obligations. Required-reason declarations cover app and SDK code; do not map browser localStorage automatically to native UserDefaults declarations. A manifest does not replace Connect labels or the public policy. [SDK rules](https://developer.apple.com/support/third-party-SDK-requirements/), [Manifest format](https://developer.apple.com/documentation/bundleresources/privacy-manifest-files)

**Accounts:** The current local reader profile does not establish an online account. Label it accurately and verify a usable local reset/export path in the release. If account creation is added, including account creation reached through a web link, users must be able to initiate account deletion from the app; ordinary apps cannot make contacting support the only path. Delete the account and associated data, not just a local session. Sign in with Apple requires token revocation when applicable. [Account-deletion guidance](https://developer.apple.com/help/app-review/guideline-reference/5-1-1-account-deletion/)

If a third-party/social login authenticates the primary account, evaluate the equivalent privacy-preserving login requirement; Sign in with Apple is a practical option. It is not universally mandatory for an account-free app or one using only its own login system. [Guideline 4.8](https://developer.apple.com/app-store/review/guidelines/#login-services)

## 6. Assets and metadata to prepare

**App icon — M:** 1024 × 1024 square source for iOS/iPadOS. Integrate it through Xcode's asset catalog or Icon Composer; it reaches Connect with the build. Inspect system masking and light/dark/tinted appearances rather than baking rounded corners into the artwork. Use Xcode validation for the chosen icon format; layered Icon Composer imagery has different transparency handling from a flat legacy icon. [Icon specifications](https://developer.apple.com/design/human-interface-guidelines/app-icons/), [Upload method](https://developer.apple.com/help/app-store-connect/manage-app-information/add-an-app-icon/)

**Screenshots — M/C:** 1–10 per supported device size, JPEG/JPG/PNG, no alpha/transparency. The live requirements section now calls for an iPhone **Dynamic Island medium-display** screenshot; accepted portrait sizes are **1179 × 2556** or **1206 × 2622**. Its table also retains large-display/fallback requirements. Prepare both medium and large sets: large accepts **1260 × 2736**, **1290 × 2796** or **1320 × 2868**. If omitting that large set, its Face ID large fallback is **1284 × 2778** or **1242 × 2688**. If supporting iPad, provide the required 13-inch set: **2064 × 2752** or **2048 × 2732**. Reverse dimensions for landscape. Check live Connect slots before capture; older cached summaries still say “6.9-inch.” [Live screenshot specification](https://developer.apple.com/help/app-store-connect/reference/app-information/screenshot-specifications/)

Capture the final native build, with fictional journal text and no personal data: (1) Home/available reading, (2) devotional reader and text controls, (3) Bible chapter, (4) saved readings, (5) journal, (6) profile/appearance. Show Kids only after the audience decision. Do not fabricate iOS functionality from a web mockup or imply unlimited archives, cloud sync or offline Bible coverage.

**Preview — O:** Up to three per device size/language, 15–30 seconds, maximum 500 MB, H.264 or ProRes 422 HQ, maximum 30 fps. Accepted portrait video resolutions include **886 × 1920** for current Dynamic Island iPhones and **1200 × 1600** for 13-inch iPad; video dimensions differ from screenshots. [Preview specifications](https://developer.apple.com/help/app-store-connect/reference/app-information/app-preview-specifications/)

| Metadata field | Current limit / requirement |
| --- | --- |
| App name | 2–30 characters; required |
| Subtitle | Up to 30 characters; optional |
| Description | Up to 4,000 characters; required, plain text |
| Keywords | Up to **100 bytes**, not simply 100 Unicode characters; required |
| Promotional text | Up to 170 characters; optional |
| What's New | Up to 4,000 characters for updates; not available for the first version |
| Review notes | Up to **4,000 bytes**; include relevant testing context |
| Additional fields | Support URL, privacy URL, actual copyright owner/year, category, language, availability and release mode; marketing URL optional |

Sources: [App-level fields](https://developer.apple.com/help/app-store-connect/reference/app-information/app-information), [Version/review fields](https://developer.apple.com/help/app-store-connect/reference/app-information/platform-version-information).

Accessibility: test VoiceOver, larger text, contrast, reduced motion and every modal/form before declaring supported features in Accessibility Nutrition Labels. The accessibility-information URL is optional. [Accessibility labels](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/overview-of-accessibility-nutrition-labels/), [Accessibility URL](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/manage-accessibility-nutrition-labels)

### Draft listing — owner approval and final-build reconciliation required

Name: `GoodNews Daily Connect`

Subtitle: `Devotionals, Bible & journal`

Keywords: `devotional,bible,scripture,faith,prayer,journal,reflection,christian`

Promotional text: `Make space for reflection with devotionals, Bible reading, saved readings and a personal journal.`

Description:

```text
Make space for faith and reflection with GoodNews Daily Connect.

Read the available GoodNews Daily devotionals, open Bible passages, save readings to revisit and write personal journal notes. Explore available editions and discover stories from the GoodNews Daily community.

Your reading space includes:
• Devotional readings and scripture references
• Bible chapter reading
• Saved devotionals and reading progress
• Journal notes you can create, edit, search and delete
• Text-size controls and light, dark or system appearance

Your reader name, journal and reading history are stored locally on your device. This version does not provide account sync or cloud backup. Some Bible passages and linked editions require an internet connection and open content from external services.
```

Draft intentionally leaves payment and age-target marketing until those release choices are settled. Do not add “complete Bible offline,” background prayer alerts, recorded audio, subscription benefits, live community posting, or account sync without verification. Suggested categories for owner selection: primary **Lifestyle**, secondary **Books** if that accurately reflects the final experience; these are proposals, not assigned values.

### Draft reviewer notes — replace every bracketed item

```text
GoodNews Daily Connect provides devotional reading, Bible passages, saved readings and a local journal.

Publisher/contact: [legal seller; review contact name, email and phone].
Build: [version/build; supported devices and minimum OS].

No login is required for the local reader experience. Reader name, notes, saved readings, completion history and preferences remain in local device storage. [Confirm final native data flows and specify reset/export paths.] There is no cloud synchronization in this version.

Suggested review: open a devotional, save it and mark it complete; open its Bible reference; create, edit, search and delete a journal note; revisit Saved and Profile; change text size and appearance. [Provide exact final navigation labels.] Unbundled Bible passages need network access. [Identify available content dates and any sample readings.] External editions may open on DocDroid; physical products open the official store.

Business model: the app is free. Voluntary support funds development of the free app and technology; nothing is unlocked and the operator is not a charity. [Describe the implemented support route, product IDs or exact permitted storefronts/entitlements; if absent, say the native build has no support-payment entry point.] Store purchases are physical merchandise. [Confirm no digital entitlement is bundled.] [Give payment testing instructions without requiring a real charge.]

Audience: [intended ages; Kids category decision; parental-gate steps and territory-specific safeguards]. [Identify privacy policy and support URLs.] [Attach content authorization if needed.]
```

This is a template, not a claim that those release conditions are already implemented. Remove unused branches and all brackets before submission; recheck the 4,000-byte limit. A review demo account is only needed if the release introduces login. Keep services reachable during review.

## 7. App-specific rejection-risk register

Apple expects complete, functional submissions (2.1), utility beyond a repackaged website (4.2), and accurate presentation (2.3). The app's native value must be demonstrated, not inferred from a wrapper. [Review guidelines](https://developer.apple.com/app-store/review/guidelines/)

| Priority | Finding / risk | Required exit evidence |
| --- | --- | --- |
| Blocker | No native project/build in this repository | Signed archive accepted by Connect; on-device run and supported-device matrix |
| High | Hosted support form has no established native billing route | Written storefront/payment decision; implementation and sandbox/error/cancel tests; no paid unlocks introduced |
| High | Mixed Adults/Teens/Kids UI with external forms/links | Intended-age/category decision; child-safe navigation and network checks; required parental/age controls |
| High | Privacy declaration cannot be completed from localStorage alone | Audited data map, processor answers, final native manifests and approved public policy/support pages |
| High | Profile intake shows “Log in” / “Sign up” opening a local-reader/original-app explanation | Final buttons accurately describe implemented behavior; avoid implying working authentication or requiring another app |
| High | Wrapper/link-collection risk | Final binary demonstrates persistent useful reading/journaling, reliable navigation, appropriate iOS integrations and graceful network failures; a token native feature does not guarantee acceptance |
| High | Content breadth and publication dates may be limited | Content owner verifies every title/date/translation, sample labels, current coverage and future-content plan; accurate screenshots and description |
| High | Rights and operator identity are unprovided | Evidence folder for texts, Bible editions, logo/images, documents and service terms; actual seller authority |
| Medium | Device speech and foreground reminder behavior could be overstated | Real-device lifecycle/permission tests; wording reflects demonstrated capability |
| Medium | localStorage loss or write failure can surprise users | Verify persistence on restart/update, deletion/reset/export and clear limits; don't advertise encrypted backup without evidence |
| Conditional | Future login, community posting, subscriptions or digital merchandise changes scope | Repeat deletion, login, moderation, billing and privacy review before enabling them |

The intake findings must be reconciled with the parent's frontend fixes. This research leaf does not mark app-code findings fixed or certify App Store approval.

## 8. Native verification and release sequence

1. **M:** Resolve publisher, countries, audience, rights, privacy and payment decisions; build the native app. Complete every mandatory item above and applicable conditional item.
2. **M:** Test the release build on real supported devices: cold launch, navigation/back/keyboard/safe areas, light/dark/text sizing, rotation where supported, offline/error/slow network, Bible requests, document/browser return, local journal data lifecycle and all links. Exercise blocked/declined permissions and purchases.
3. **O, strongly recommended:** Use TestFlight for independent testing; external testing can require Beta App Review and is distinct from App Store approval. Provide useful test instructions. [TestFlight](https://developer.apple.com/help/app-store-connect/test-a-beta-version/testflight-overview/)
4. **M:** Capture the final binary, fill metadata, select the processed build, clear export/compliance issues, reconcile privacy answers and attach reviewer context. If using IAP, include its first submission with the app.
5. **M:** Owner authorizes actual store submission separately. In Connect, adding the version for review and submitting the review package are distinct steps. Recommend manual release for the first launch so support readiness and announcements can be checked after approval. [Submit an app](https://developer.apple.com/help/app-store-connect/manage-submissions-to-app-review/submit-an-app/), [Release settings](https://developer.apple.com/help/app-store-connect/reference/app-information/platform-version-information)

## 9. Owner-input checklist

- [ ] Legal seller/entity, Developer Program status, authorized account holder and content owner relationship.
- [ ] Final app name, bundle ID/SKU/version, languages, categories, iPhone/iPad support and countries.
- [ ] Intended age bands, child-directed use, Kids category choice, parental/age-assurance requirements by territory.
- [ ] Native support-payment choice, one-off/recurring design, processor/operator, fees/refunds and permitted storefronts. “Nothing unlocked” is already confirmed.
- [ ] Physical merchandise seller, support/return terms and confirmation that no digital entitlement is bundled.
- [ ] Public support contact and URL; policy operator/contact, actual retention/deletion and processor facts.
- [ ] Rights/licences for every devotional, Bible translation, illustration/photo, hosted edition and brand use.
- [ ] Current/future content coverage and maintenance owner; real release date and reviewer contact.
- [ ] Native SDK inventory, final privacy labels/manifests, encryption answers, DSA status and any territory permits.
- [ ] Final icon/screenshots, reviewed listing, truthful accessibility claims and TestFlight/device-test evidence.

No identity, email, tax status, territory approval, age classification, native ID or privacy assurance has been invented. This checklist distinguishes Apple submission requirements from legal determinations that depend on the operator and countries.

## 10. Research verification log

- **Pass 1 — evidence intake:** Read `docs/launch/PLAN.md`, Apple gate contract, package/config inventory and the relevant frontend files. Confirmed web-only architecture, local data and outbound services; adopted the user's explicit support-payment clarification.
- **Pass 2 — official-source synthesis:** Read live Apple guidelines, current upload requirements, screenshot/metadata references, privacy/manifests, child/age guidance, payment programs, enrollment/compliance and release documentation. Drafted classified checklist and metadata without unsupported feature claims.
- **Pass 3 — adverse-case review:** Checked that no-unlock support is not treated as a charity exemption; separated US links from embedded payments and EU/Japan rules; accounted for October 2026 EU changes, screenshot-page changes, children outside Kids category, byte limits and local-data/collection distinctions.
- **Pass 4 — final checks:** Validated draft metadata limits and citation domains; checked required sections and unresolved owner inputs. Gates below confirm completion of research deliverables only; native build, payment eligibility, legal documents and device testing remain release work.
