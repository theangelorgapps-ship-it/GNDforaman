# GoodNews Daily — Google Play submission pack

Research checked: **29 October 2026, Europe/London**. This is a preparation checklist and draft submission copy, not a submitted release, published privacy policy, legal opinion, or approval guarantee. Recheck the linked requirements against Play Console immediately before submission.

**Current status: not ready to submit to Google Play.** This repository produces a React/TypeScript/Vite website. It does not yet produce the signed Android App Bundle that Play requires. The frontend can be prepared now; native packaging, device verification, policy decisions, publisher information and Console work remain separate release work.

Classification: **Required** = baseline submission requirement; **Conditional** = required if the stated condition applies; **Recommended** = release-quality evidence, not a universal Console upload requirement. Unchecked boxes represent work still to verify or supply.

## 1. Facts, boundaries and immediate decisions

Observed at research intake: Home/reader, Collections with Adults/Teens/Kids, Bible chapter requests to `bible-api.com`, local reader preferences, journal, saved readings and reading history, product catalogue, official document/article links, and a partnership form embedded through `public/partnership.html`. Local state uses browser `localStorage`; it is not an authenticated cloud account. The form loads code and an iframe from `sub.goodnewsdailydevotional.com`. An Android implementation may change storage, backups, networking and disclosures; inspect the final bundle again.

Owner-confirmed business model: **the app is free; voluntary support unlocks nothing and supports app/technology development; the business is not a charity.** The Store sells physical books, clothing and accessories. The remaining unknowns are legal publisher, payment recipient/flow, processors, actual third-party data practices, territories and intended ages.

| Release decision | Required evidence / action |
| --- | --- |
| Android implementation | Choose and build the Android delivery approach; prove useful reading, saving and journaling behavior on real Android devices. A wrapper alone does not demonstrate acceptable functionality. |
| Partnership payments | Resolve §4 before exposing payment entry points in Android. The no-benefits premise is confirmed; recipient/100%-to-creator eligibility is not. |
| Kids/Teens | Decide exact intended age bands and regions; complete Families assessment. The current audience selector is a content preference, not age verification. |
| Local reader vs account | Remove misleading sign-in promises, or implement genuine account behavior. Audit any external sign-up route before declaring that the app does not create accounts. |
| Privacy | Obtain an accurate owner-approved policy and third-party inventory; the current local-storage explanation alone is insufficient for submission. |

## 2. Publisher, Android build and Console setup

### Publisher documents and account

- [ ] **Required:** Account owner at least 18, authorized Google account, accepted Developer Distribution Agreement, and the one-time US$25 registration fee if creating an account. Complete identity/contact verification. Personal accounts may require Android-device verification through the Play Console mobile app. [Get started with Play Console](https://support.google.com/googleplay/android-developer/answer/6112435?hl=en)
- [ ] **Required:** Choose the real publisher and correct personal/organization account type. Supply legal name/address, public developer name, verified contact email/phone and public developer contact details. Organization registration additionally needs organization details, website and normally a D-U-N-S number; identity/organization evidence must match the payments profile. Supply requested documents through Google's secure verification flow, not this repository. [Required developer information](https://support.google.com/googleplay/android-developer/answer/13628312?hl=en)
- [ ] **Conditional:** Complete merchant/bank/tax verification if using paid distribution or Play Billing; complete regional trader/consumer-contact information requested by Console for selected territories. Select distribution countries only after owner approval and payment/children/content checks.
- [ ] **Required:** Verify Android developer identity and package registration status. Google's current rule requires Play packages to be registered from **30 September 2026**; auto-registration is attempted, but verify the actual status and follow manual registration instructions if necessary. [Registering Play package names](https://support.google.com/googleplay/android-developer/answer/16984799?hl=en)

### Native deliverables

- [ ] **Required:** Release `.aab`; new Play apps use Android App Bundles. A Vite `dist/` folder, website URL or PWA manifest is not this artifact. [Android App Bundles](https://developer.android.com/guide/app-bundle)
- [ ] **Required:** Owner-approved permanent package/application ID, release version name and incrementing version code, minimum supported Android version, app label, launch icon and tested launch behavior. Configure free distribution, default language and an appropriate category. [Create and set up an app](https://support.google.com/googleplay/android-developer/answer/9859152?hl=en)
- [ ] **Required:** For a new phone/tablet app on this research date, target **Android 16 / API 36 or higher**, effective 31 August 2026. The published extension date is 1 November 2026; do not assume this unpublished app has an extension. Other form factors have different requirements. [Target API requirements](https://support.google.com/googleplay/android-developer/answer/11926878?hl=en)
- [ ] **Required:** Configure Play App Signing, securely retain the upload keystore, sign the release bundle and record the certificate fingerprints used by integrations. Google signs delivered APKs using the app-signing key; it differs from the developer-held upload key. Do not commit keys or passwords. [Play App Signing](https://support.google.com/googleplay/android-developer/answer/9842756?hl=en)
- [ ] **Required compatibility check:** Support 16 KB memory pages on 64-bit devices for API 35+; inspect any native libraries introduced by the wrapper/SDKs and test the final artifact. Current Android guidance states a **1 February 2027 update-blocking deadline**; it does not establish that this new app is exempt today. Use current Console diagnostics rather than an old deadline checklist. Pure Java/Kotlin dependencies support the page size, but testing is still advised. [16 KB support](https://developer.android.com/guide/practices/page-sizes)
- [ ] **Conditional native-library check:** If the Android app/wrapper includes native libraries, include the corresponding 64-bit architecture for each supported 32-bit architecture and test on 64-bit devices. [64-bit requirements](https://developer.android.com/google/play/requirements/64-bit)
- [ ] **Conditional:** Inspect release permissions, native SDKs, backup behavior, deep links, notification behavior and any native-code ABI requirements. Justify only permissions actually used; complete any sensitive-permission declaration Console requests. Foreground web reminder behavior must not be advertised as reliable background/native notification delivery without implementation and testing.

## 3. Documents and declarations

| Status | Item | GoodNews Daily preparation |
| --- | --- | --- |
| Required | Public privacy policy and in-app access | Publish an app-specific, accessible HTTPS webpage with publisher/contact, data access/use/sharing, security, retention/deletion and relevant providers. No login, geographical restriction or PDF-only policy. |
| Required | Data safety form | Complete from the final Android app and all embedded third-party flows, not merely the local React state. See §5. |
| Required | App access/reviewer instructions | Declare unrestricted access only if all features actually are accessible. Provide durable review access to any restricted area. See §9. |
| Required | Ads declaration | Audit embedded destinations and SDKs before answering. A physical Store by itself is not proof of third-party advertising; a hosted document/form may introduce advertising or tracking. |
| Required | Target audience/content | Choose real age bands; distinguish audience targeting from IARC content rating. See §6. |
| Required | IARC content questionnaire | Answer for all accessible content, commerce and sharing features; retain resulting ratings rather than inventing an age rating. |
| Required | Financial features declaration | All published apps, including closed/open tests, must answer, even when no financial features exist. Ordinary retail is not automatically a financial-services product; assess the support flow honestly, including any crowdfunding functionality. [Financial declaration](https://support.google.com/googleplay/android-developer/answer/13849271?hl=en) |
| Required | Health apps declaration | All published apps, including closed/open tests, must answer. Devotional reading is not by itself a medical feature; inspect any health/therapy/meditation claims before selecting “no health features.” [Health declaration](https://support.google.com/googleplay/android-developer/answer/14738291?hl=en) |
| Conditional | News & Magazines declaration | “GoodNews” and edition/article content may trigger a Console question. Assess whether this is principally devotional Books & Reference content; do not falsely claim journalism or assume the name cannot trigger review. In-scope apps need current sources/contact information and regularly updated content. [Scope guidance](https://support.google.com/googleplay/android-developer/answer/10523915?hl=en), [News & Magazines policy](https://support.google.com/googleplay/android-developer/answer/9935326?hl=en) |
| Conditional | Account deletion URL and in-app path | Required when app-account creation is offered, including directing users to an external account-creation flow. See §5. |
| Conditional | Billing products/program documents | Only after deciding the partnership/payment classification and launch territories. Store physical-goods payments are separate. |
| Conditional | Permission/SDK declarations | Complete items surfaced by the actual release bundle, including advertising-ID and restricted-permission questions where applicable. Do not request broad storage/location/contacts merely to support this MVP. |
| Required evidence; upload if requested | Content/brand rights | Keep authorization for name/logo, covers, devotional text/translations, pictures, product photography, media, fonts and linked/embedded editions. “Official link” alone is not evidence of redistribution rights. [Intellectual Property](https://support.google.com/googleplay/android-developer/answer/9888072?hl=en) |

Google's review setup lists privacy, ads, app access, target audience, sensitive permissions and content ratings among the App content tasks. The public privacy-policy requirement applies even when an app collects no personal data. [Prepare for review](https://support.google.com/googleplay/android-developer/answer/9859455?hl=en)

## 4. Voluntary support, physical goods and billing

**Keep the confirmed meaning:** voluntary support funds the free app and technology; it buys no content, premium features, badges, member-only editions or enhanced service. Do not label this tax-deductible or charity fundraising.

| Flow | Policy consequence | Release action |
| --- | --- | --- |
| Physical books, clothing and accessories | Play Billing must not be used for payments primarily for physical goods. | Use the merchant's physical-goods checkout. Clearly identify seller, products, shipping/returns and external destination. Audit any product that bundles a digital entitlement separately. |
| Digital editions/features or subscriptions, if introduced | Baseline is Play Billing unless a specific policy exception or enrolled regional program applies. | This is outside the confirmed current offer. Reassess before adding. |
| Tax-exempt donation | A listed exemption exists. | **Not established for this business; do not claim it.** |
| No-benefit contribution to a creator | Google's FAQ treats it as peer-to-peer when **100% goes to the creator and no digital goods/services are granted**. | Verify actual recipient, intermediary share, processor treatment and whether this developer/business-support arrangement qualifies. The confirmed no-benefits condition alone does not answer every condition. |

These distinctions come from the [Payments policy](https://support.google.com/googleplay/android-developer/answer/9858738?hl=en) and [payments FAQ](https://support.google.com/googleplay/android-developer/answer/10281818?hl=en). The latter is a specific creator-tip rule; it is not an unconditional exemption for every payment labelled “support.”

**Recommended Android release decision:** retain the support entry only after documenting an applicable exemption or implementing the appropriate billing/program route. If the developer-support classification remains unresolved, obtain a Play support determination with the exact recipient/flow, or omit that payment entry from the Android release while keeping the free reader useful. This is a recommendation arising from the unresolved facts, not a claim that all voluntary support must use Play Billing.

An embedded form, browser button, account page or website redirect does not itself create a billing exemption. Regional permissions depend on the user's market and successful enrollment, not merely the publisher being in the UK:

- **UK:** Current billing-choice guidance covers alternative in-app billing and external web links, with a choice including Play Billing, enrollment, APIs and transaction reporting. [Billing choice](https://support.google.com/googleplay/android-developer/answer/17161464?hl=en)
- **EEA:** The same guidance identifies billing-choice/alternative-billing routes and a separate external-offers program for external links. Confirm exact eligibility and current terms in Console for the chosen offer. [Market availability](https://support.google.com/googleplay/android-developer/answer/17161464?hl=en)
- **US:** The current external-content-links program requires approval/enrollment, US-only availability, APIs/information screens and operational obligations. Its page states transaction reporting/service fees began 1 October 2026; its separate successful-app-download reporting deadline is 1 February 2027. An ordinary physical-product link is not automatically a digital-purchase program link. [US external-content links](https://support.google.com/googleplay/android-developer/answer/16470497?hl=en)
- **Other markets:** Check the applicable program and Payments policy before using a non-Play route for covered digital transactions. Do not generalize US/EEA/UK permissions globally. [Payments exceptions and enrollment](https://support.google.com/googleplay/android-developer/answer/9858738?hl=en)

Regional program terms change. These are conditional routes, not a recommendation to enroll a physical-goods store unnecessarily.

**If Play Billing is implemented:** use a currently supported library and test purchase, cancellation, pending payment, duplicate/replayed delivery and recovery behavior. On this date, the version-7 new-app/update deadline has passed (31 August 2026); use version 8 or later rather than assuming a version-7 extension. [Billing Library deadlines](https://developer.android.com/google/play/billing/deprecation-faq)

## 5. Privacy, Data safety and deletion

Data safety is required on closed/open/production tracks even for an app that collects nothing; internal-only testing has an exemption. Collection means transmission off-device and includes SDKs and app-controlled WebViews. Open-web browsing has a different treatment. Ephemeral transmission still belongs in the form assessment; “third-party” does not automatically mean outside scope. [Data safety guidance](https://support.google.com/googleplay/android-developer/answer/10787469?hl=en)

Create and verify this inventory before choosing final answers:

| Data/flow observed | Current evidence | Owner/native audit needed |
| --- | --- | --- |
| Reader name, journal text, saves, highlights, history, preferences | Stored locally by the frontend; no cloud authentication demonstrated | Check native backups, export/share destinations and any added analytics. Explain local persistence/loss and implement usable local deletion controls. |
| Bible passage request | Reference and translation are sent to `bible-api.com`; normal network metadata accompanies requests | Confirm provider logs, retention and data categories; avoid “no data ever leaves the device.” |
| Partnership form | Remote script/iframe is intentionally embedded | Inspect all fields, cookies, downstream endpoints and processor behavior without submitting real personal/payment information. Obtain provider disclosure/retention/deletion evidence. |
| Store, DocDroid and article links | Users navigate to third-party or merchant destinations | Distinguish app-controlled embed from open browser, and audit tracking, ads, account creation and checkout. |
| Native wrapper/SDKs | Not implemented here | Inventory crash/analytics/push/payment SDKs, permissions and backup; update declarations accordingly. |

The owner-approved policy must identify the app/developer, disclose actual handling and parties, provide privacy contact and describe retention/deletion and security. Do not publish placeholders, a false “nothing collected” claim, or unverified assertions about encryption/server deletion. [User Data policy](https://support.google.com/googleplay/android-developer/answer/10144311?hl=en)

**Accounts decision:** an offline-only reader profile is outside Google's app-account definition. However, Google includes directing a user to an external app-account creation flow. At intake, Profile's “Log in”/“Sign up” opened a local-reader modal containing an original-app link; reassess the final frontend before declaring no account creation. If genuine app accounts are offered, provide a discoverable in-app deletion request and a functional public deletion webpage/URL, delete associated data and disclose legitimate retention. Deactivation is insufficient. [Account deletion requirements](https://support.google.com/googleplay/android-developer/answer/13327111?hl=en)

**Local reset is distinct:** removing local reader data is valuable even without accounts, but cannot delete partnership/merchant/provider records. State that distinction and provide the correct contact route when those records exist.

## 6. Kids, Teens and mixed audience

Google assesses actual imagery/terminology as well as declared ages. If children are a target audience, Families requirements apply; mixed-audience apps must protect children and users of unknown age, assess SDK/API suitability and limit relevant data/advertising. An unsuitable API may need a neutral age screen or implementation that collects no child data. Families monetization rules also cover commercial content, not only ad-network banners. [Families policy](https://support.google.com/googleplay/android-developer/answer/9893335?hl=en)

For this app, **Kids content, Kids product imagery and the Adults/Teens/Kids selector require a deliberate decision**, not an unsupported “adults only” declaration. Select only ages for whom the experience is actually designed. A reader choosing “Adults” does not prove their age. Target-age selection and content ratings are separate decisions. [Target audience settings](https://support.google.com/googleplay/android-developer/answer/9867159?hl=en)

- [ ] Owner confirms intended ages by launch country, including whether children directly use the app or adults choose material for them.
- [ ] Review all child-accessible text, imagery and outbound destinations, including DocDroid advertising, Store and partnership form.
- [ ] Establish a child-safe handling strategy before third-party forms/SDKs can collect information; do not assume an iframe or cookie-consent attribute supplies parental consent.
- [ ] Recommended: keep commerce/support clearly distinguishable and place any adult-only path behind an appropriate adult interaction, with the actual legal/policy requirements reviewed for the chosen markets. A generic checkbox must not be represented as verified parental consent.
- [ ] If social/freeform community features are added, reassess child-specific controls and UGC policies. A local journal alone is not a public social network; draft metadata must not promise one.

## 7. Listing assets and metadata checklist

These are specifications for assets still to create/verify; this document does not contain a completed Android screenshot set.

| Item | Status | Specification |
| --- | --- | --- |
| App name | Required | Maximum 30 characters |
| Short description | Required | Maximum 80 characters |
| Full description | Required | Maximum 4,000 characters |
| Public support email | Required | Owner-supplied, monitored; website/phone where appropriate |
| Store icon | Required | 512 × 512 px, 32-bit PNG with alpha, maximum 1,024 KB |
| Feature graphic | Required | 1,024 × 500 px, JPEG or 24-bit PNG without alpha |
| Screenshots | Required | At least two; JPEG or 24-bit PNG without alpha; 320–3,840 px; longest side no more than twice shortest; up to eight per device type |
| Strong phone screenshot set | Recommended | Four or more actual screenshots, 1,080 × 1,920 portrait or 1,920 × 1,080 landscape |
| Tablet/other form factors | Conditional | Supply accurate device-specific captures and meet the selected form factor's current requirements |
| Preview video | Optional | Eligible YouTube video showing the actual app; no ads; follow current video guidance |

Sources: [Listing fields and limits](https://support.google.com/googleplay/android-developer/answer/9859152?hl=en), [Preview asset specifications](https://support.google.com/googleplay/android-developer/answer/9866151?hl=en). Use truthful UI captures, readable labels and meaningful screenshot alt text. Avoid ranking/download-count claims, unsupported awards, price promotions or screenshots of unimplemented functionality.

Recommended capture storyboard, after Android QA: (1) Home devotional; (2) reader and save action; (3) Bible passage view; (4) journal entry; (5) saved readings; (6) local profile/preferences. Capture Kids/Teens only after the audience decision. Use fictional local demonstration data; exclude real names, journals, credentials and payment details.

### Draft listing copy — owner review required

**Name:** `GoodNews Daily` (14 characters)

**Short description:** `Read devotionals and Bible passages, save readings and keep a personal journal` (78 characters)

**Suggested category:** Books & Reference, subject to owner confirmation and the News & Magazines assessment above. **Default language:** owner to confirm; current draft is English. Do not select countries, publisher identity or age bands from this document automatically.

**Full description draft:**

> Make time for devotional reading with GoodNews Daily.
>
> Explore devotional readings and Bible passages, save readings to revisit, and write personal notes in your journal. Use your reading history and local profile preferences to make the experience your own.
>
> Browse available devotional collections and follow links to GoodNews editions and articles. The Store lets you view physical books, clothing and accessories through the linked shop.
>
> Reader preferences, saved readings and journal notes are stored on your device in this edition. They are not a cloud backup or a synced account. External Bible passages, documents, articles and shop pages need an internet connection. External services have their own privacy practices.

This draft intentionally makes no claim about full offline access, native notifications, login/sync, NFC functionality, public community, comprehensive translations or perpetual daily content updates. Revalidate every sentence against the final Android build. Add the approved support description only if that flow remains in the release and its policy route is resolved.

## 8. Testing tracks and app-specific acceptance checklist

**Personal accounts created after 13 November 2023:** run a closed test with at least **12 testers continuously opted in for the preceding 14 days**, then apply for production access and answer Google's testing/readiness questions. This is not automatic approval. Keep genuine engagement, feedback and fixes; additional testing may be requested. Internal testing does not satisfy that closed-test requirement. Open testing becomes available after production access for these accounts. The specific 12/14 requirement is not imposed by this policy on organization accounts or earlier personal accounts. [Personal-account testing requirements](https://support.google.com/googleplay/android-developer/answer/14151465?hl=en)

**Recommended sequence:** internal smoke test → closed test with documented device coverage/feedback → resolve findings and review pre-launch report → verify declarations/listing against candidate bundle → submit production access/review as applicable. An organization account should still test; choose account type based on the actual publisher, not to bypass testing.

Record device/model/OS, build version, date, tester result, issue and retest evidence for each acceptance item:

- [ ] Clean install, cold start, relaunch, update with existing local data, back navigation, rotation, background/resume, keyboard/insets and text scaling work without crash or data loss.
- [ ] Home/reader/Collections display real available content; no fake current-date promise, repeated placeholder passages or broken editions.
- [ ] Save/unsave, reading completion, history counts and journal create/edit/delete persist accurately across restart.
- [ ] Profile labels match local capabilities; no dead login/signup, unimplemented support or deceptive “community” action.
- [ ] Bible handles slow network, failed requests, empty results and cached versus uncached chapters truthfully.
- [ ] Links open/return correctly; PDF/document reading is usable; external browser and WebView behavior are understood.
- [ ] Store shows the right physical product/variant/currency and identifies external checkout; cancellations/back navigation are safe. Do not place a real order during ordinary QA.
- [ ] Support form, if retained, follows the approved payment/data/age path; test with provider-sanctioned test mode only.
- [ ] Privacy link, local data controls/export, and account deletion (if applicable) work and match the policy.
- [ ] No child path inadvertently initializes prohibited tracking/advertising or sends a user into an unsuitable commerce/form destination.
- [ ] TalkBack labels/order, touch targets, contrast, enlarged text and dark/light themes remain usable.
- [ ] Final release has no unnecessary permissions, debug endpoints, placeholder metadata or personal test data; inspect Android pre-launch results and resolve material crashes/ANRs.

**Minimum functionality risk:** Google prohibits unstable apps and apps with only limited/static text/PDF functionality. This app's reading controls, local saves, journal and navigation can provide useful functionality, but their existence in a web preview is not proof of Android quality. Demonstrate the complete mobile reading journey and avoid a thin link directory or merely embedded website. [Functionality policy](https://support.google.com/googleplay/android-developer/answer/9898783?hl=en)

## 9. Reviewer access draft

Use after the Android candidate passes §8. Replace bracketed instructions with verified facts; never submit placeholders.

> GoodNews Daily provides devotional reading, Bible passages, saved readings, a personal journal and local reader preferences.
>
> [Confirm for this exact build: the core reader requires no login or subscription.] To test: open Home and a reading; save it; open Saved readings; add/edit/delete a journal entry; open Profile and change the reader name/appearance; open Bible and a passage. Local state persists on the device and does not represent a cloud-synced account.
>
> Internet access is needed for uncached Bible passages and external editions, articles and shop pages. The Store contains physical goods and opens the linked merchant experience.
>
> [If support remains: specify its location, approved payment/program classification, recipient, that no digital benefit is granted, and how reviewers can inspect safely without making a real payment. If removed, omit this paragraph.]
>
> [If anything is restricted: give permanent working reviewer credentials, full steps, any QR/access material and an approved bypass for OTP/2FA/location restrictions.]
>
> Privacy policy: [approved public URL]. Support contact: [monitored owner-supplied email]. Account deletion: [working URL if applicable; otherwise confirm the final app has no app-account creation flow].

Review access must cover all restricted areas; inaccurate credentials or access instructions can delay review. Do not require reviewers to purchase a physical product or make a contribution to reach core functionality. [Prepare for review](https://support.google.com/googleplay/android-developer/answer/9859455?hl=en)

## 10. Owner input and release blockers

The owner must provide/confirm:

1. Legal publisher/entity, organization vs personal account, account creation date and verification status, authorized Console owner, D-U-N-S if applicable.
2. Public support email, developer contact details, website, privacy contact, privacy-policy URL and approved retention/deletion statements.
3. Final app name/brand rights, permanent Android ID, signing-key custodian, release countries, default language and genuinely supported locales/devices.
4. Intended age bands/child usage by territory and the third-party safety/consent approach.
5. Support payment recipient, complete fund flow, processor fees/intermediary share, refunds/recurrence/cancellation, no-benefit confirmation across all linked pages, and applicable Play exemption/program evidence. No charity status is assumed.
6. Provider inventory and actual logs/cookies/data handling for the form, Bible API, document viewer, shop, hosting and any added native SDKs; all external account-creation behavior.
7. Permission/licence evidence for devotional content, Bible versions/translations, editions, covers, photographs, logos and media in both app and listing.
8. Real Android AAB, Android test results, completed assets, Console declarations and testing/production-access evidence appropriate to the publisher account.

**Blocking now:** no Android release artifact; unresolved publisher/territories/ages; no verified public privacy policy/Data safety inventory; payment classification/implementation unresolved; native reviewer/asset/testing evidence absent. UI fixes can improve readiness, but cannot complete these owner/native requirements. Approval remains Google's decision.

## Research completion record

1. **Pass 1 — evidence:** read the repository contract and source flows; consulted current official Play/Android pages for account, build, policy, assets and testing requirements.
2. **Pass 2 — app fit:** separated physical commerce, no-benefit support, local state, external accounts, mixed audience and third-party collection; identified missing Android evidence.
3. **Pass 3 — usable pack:** wrote conditional declarations, precise asset specifications, metadata/reviewer drafts and an owner/test checklist without invented publisher details or approval promises.
4. **Pass 4 — adversarial check:** rechecked API 36, 2026 package registration, current 16 KB guidance, 12-testers/14-days scope, creator-tip conditions, external-sign-up deletion scope, regional enrollment and metadata limits. Research gates indicate document completion, **not** launch approval.
