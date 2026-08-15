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

Do not alter tracking IDs or credentials unless the owner explicitly requests it.

## Content and product invariants

- Use Australian English, metric measurements, cubic metres, tonnes, kilograms, and clear estimator disclaimers.
- Preserve trailing-slash routes, root-relative local assets, absolute HTTPS canonicals, useful breadcrumbs, and internal links.
- Keep one useful H1, a unique title and description, canonical/OG consistency, valid JSON-LD, and visible FAQ answers that agree with FAQ schema.
- Preserve the `MATERIALS` category/subtype IDs and each page's body-data contract. A preset must resolve to a supported subtype in its selected material.
- Treat material densities, bag sizes, coverage/depth recommendations, prices, standards, and safety claims as sensitive facts. Verify authoritative current sources before changing them.
- Never fabricate ratings, reviews, credentials, first-hand experience, or schema-only content.

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
