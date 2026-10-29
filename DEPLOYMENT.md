# GND test deployment

Source: private GitHub repository `theangelorgapps-ship-it/GNDforaman`, branch `codex/goodnews-local`.
Target: Cloudflare Pages project `gnd-test`, in Theangelorgapps@gmail.com's account.

Live URL: https://gnd-test.pages.dev
First verified deployment: https://bc8cc824.gnd-test.pages.dev, application source commit `2f52eb3`.

Project creation used `wrangler pages project create gnd-test --production-branch codex/goodnews-local --force` because Wrangler 4.155 otherwise delegates new projects to Workers. The project now exists; normal Pages deployment commands require no force option.

## Environments and release

- Local: `npm run dev` on localhost:5173.
- Cloudflare test site: static Vite `dist/` output, deployed with Wrangler Direct Upload. This is a public test frontend; its source repository is private.
- Preview: deploy the same checked build with `wrangler pages deploy dist --project-name gnd-test --branch <preview-branch>`.

From this child repository, verify the working directory, branch and remote before Git or deployment operations. Run `npm test` and `npm run build`; inspect the catalog, product options/bag, phone layout and partnership form. Commit and push, then run `npm run deploy`. Wrangler uploads the committed build to the configured production branch for this test project.

No build-time secrets are required. GitHub CLI and Wrangler use the operator's existing authenticated sessions; credentials do not belong in the repository. `.env*`, `.wrangler`, build output and dependencies are ignored. Git pushes alone do not trigger deployment; Direct Upload is explicit.

## Health checks and rollback

After each release, confirm HTTP 200 for `/`, `/partnership.html`, the bundled JS/CSS, and a product image. Open `/#/store` and a product route in a browser, confirm images and no horizontal overflow, and check the partnership form loads without submitting it. Deployment history: `wrangler pages deployment list --project-name gnd-test`.

To roll back, select the previous successful production deployment in Cloudflare Pages and choose rollback. Alternatively, rebuild a known-good commit in an isolated checkout and run the same deployment command. Do not reset the active working tree. For a hotfix, make and verify the smallest correction, commit/push it, and deploy explicitly.

No paid monitoring or recurring automation is installed. Check Cloudflare deployment status and run the HTTP/browser smoke checks for each release; enable uptime alerts in the account if ongoing monitoring is later requested.

Cloudflare reference: https://developers.cloudflare.com/pages/get-started/direct-upload/
