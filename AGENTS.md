# LandscapeCalc agent guidance

## Purpose and authority

Operate https://landscapecalc.com.au as an experimental, evidence-led SEO product for Australian homeowners and landscapers. Autonomous commits and pushes directly to `main` are explicitly authorized after all relevant checks pass. Do not require a pull request.

Use `$manage-landscapecalc-growth` for Search Console or Analytics reviews, SEO work, content expansion, calculator UX changes, and recurring growth runs.

## Repository shape

- Pure static GitHub Pages site; there is no package manager, build step, backend, or automated deployment workflow.
- `CNAME` and production canonicals must remain `landscapecalc.com.au`.
- `js/calculator.js` contains material definitions, calculator state, formulas, preset loading, and shared UI behavior.
- `css/styles.css` is global. Header, footer, calculator, and related-link markup is duplicated across hand-authored HTML pages, so global changes require a full-site consistency check.
- Long-tail pages initialize the shared calculator through `<body data-material ... data-subtype ... data-shape ...>` attributes. URL query parameters can override those presets.

## Data identifiers

- Search Console: `sc-domain:landscapecalc.com.au`
- Analytics property: `527618923`
- Measurement ID embedded in HTML: `G-MSK7HS9TW3`
- AdSense publisher ID embedded in HTML: `ca-pub-2538773959178920`

Do not alter tracking IDs or credentials unless the owner explicitly requests it.

## Privacy and consent invariant

- Keep `/privacy/` free of AdSense, Google Analytics/Tag Manager, Google CMP or Funding Choices, and any other script, font, image, or remote asset that requires consent. It may contain ordinary external links, but loading the page must request only same-origin assets until a visitor chooses a link.
- Tracking and ad tags remain required on the calculator and content pages; `/privacy/` is the deliberate exception. Never blanket-inject tracking across every HTML file without preserving that exception.
- Preserve the privacy-specific assertions in `validate_site.py`. If tracking, consent messaging, or duplicated page templates change, verify both that ordinary pages retain their required tags and that `/privacy/` remains tag-free.
- Browser-test `/privacy/` on desktop and mobile, inspect its network requests and console, and verify the live production route after deployment. Do not treat a source-only string check as sufficient.

## Content and product invariants

- Use Australian English, metric measurements, cubic metres, tonnes, kilograms, and clear estimator disclaimers. Keep cubic metres as the primary ordering result; treat weight as a secondary estimate. Spell out "tonnes" and "tonnes per cubic metre" in user-facing copy instead of abbreviating them as "t" or "t/m³".
- Preserve trailing-slash routes, root-relative local assets, absolute HTTPS canonicals, useful breadcrumbs, and internal links.
- Keep one useful H1, a unique title and description, canonical/OG consistency, valid JSON-LD, and visible FAQ answers that agree with FAQ schema.
- Preserve the `MATERIALS` category/subtype IDs and each page's body-data contract. A preset must resolve to a supported subtype in its selected material.
- Treat material densities, bag sizes, coverage/depth recommendations, prices, standards, and safety claims as sensitive facts. Verify authoritative current sources before changing them.
- Never fabricate ratings, reviews, credentials, first-hand experience, or schema-only content.

## Approval-readiness and trust invariants

- Keep `/about/`, `/contact/`, `/methodology/`, and `/privacy/` indexable but AdSense-free. `/privacy/` remains the only page that must also omit Analytics and all consent-dependent remote assets.
- Monetise only the homepage and five maintained material calculator routes listed in the validator.
- Keep the soil, sand, and gravel cubic-metre-weight resources indexable and AdSense-free. They must explain the selected planning coefficient, link to `/methodology/`, and avoid unsourced transport or safety claims.
- Keep the other 45 project/example routes for old links, but mark them `noindex, follow`, remove AdSense, and exclude them from `sitemap.xml`. Do not present them as a large search-targeted content library during approval.
- Keep `/methodology/` aligned with the calculator formulas, density coefficients, rounding, 20 kg and 1 m³ equivalence outputs, supplier-source links, limitations, and review date.
- Treat the depth buttons as editable calculator presets, not universal recommendations. Do not claim that LandscapeCalc uses “Australian standards” or supplier-specific densities unless a visible current source supports the exact statement.
- Preserve these boundaries in `validate_site.py` whenever tracking, shared markup, page inventory, or monetisation changes.

## Before editing

1. Run `git status --short --branch`; preserve unrelated changes.
2. If clean, update with `git pull --ff-only origin main`.
3. Read the growth skill's data-access and architecture references.
4. Use finalized Search Console data plus comparable Analytics periods. Prefer high-impression queries/pages with a clear intent, CTR, ranking, engagement, or usability opportunity.
5. Avoid retuning a page changed within the last 28 days unless correcting a bug, indexing problem, accessibility issue, or clear regression.

## Required validation

Run all of these before committing:

```bash
node --check js/calculator.js
python3 .agents/skills/manage-landscapecalc-growth/scripts/validate_site.py
git diff --check
```

Serve the repository over HTTP and browser-test every changed calculator flow on desktop and mobile. Check material/subtype presets, all affected shapes, query-string overrides, result units and rounding, invalid input behavior, navigation, layout, and the browser console. `js/calculator.js` touches `document` during startup, so a plain Node `require()` is not a valid unit test without a DOM harness.

Update sitemap `lastmod` only for materially changed URLs. If any required check fails, fix it or leave the run uncommitted and report the failure.

## Shipping

- Review the diff for scope and duplicated-template inconsistencies.
- Commit a coherent change with a terse message, then `git push origin main`.
- If upstream moved, use `git pull --ff-only` when possible. Rebase or resolve only unambiguous conflicts; report instead of guessing.
- Report the evidence used, pages changed, checks run, and final commit hash. A justified no-op is a successful run.
