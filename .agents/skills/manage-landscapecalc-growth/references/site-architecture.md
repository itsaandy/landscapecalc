# LandscapeCalc architecture and invariants

## Static site

- Production domain: `https://landscapecalc.com.au`
- Deployment: GitHub Pages from `main`; no build step or dependency manifest.
- Shared logic and material data: `js/calculator.js`.
- Shared presentation: `css/styles.css`.
- Material families: mulch, soil, gravel, sand, and roadbase.
- HTML pages are hand-authored. Shared header, footer, calculator, and related-link markup is duplicated rather than generated.

## Preset contract

Long-tail pages seed calculator state with body attributes such as:

```html
<body data-material="sand" data-subtype="washed" data-shape="rectangle" data-length="10" data-width="1" data-depth="30">
```

Each `data-material` must exist in `MATERIALS`; each `data-subtype` must belong to that material; shapes must be `rectangle`, `circle`, or `triangle`. URL query parameters override body presets. Test both paths whenever preset parsing or state changes.

`js/calculator.js` references `document` during module startup. `node --check` is useful for syntax, but a plain Node `require()` does not prove calculator behavior without a DOM. Use a browser or a deliberate DOM harness.

## SEO contract

- Use `lang="en-AU"`, Australian English, and metric units.
- Use trailing-slash public routes and absolute `https://landscapecalc.com.au/...` canonicals.
- Keep canonical, Open Graph URL, sitemap, breadcrumbs, navigation, and internal links consistent.
- Keep one H1, useful unique titles/descriptions, valid JSON-LD, and matching visible/schema FAQ content.
- Preserve GA4 `G-MSK7HS9TW3` unless explicitly asked to migrate it.
- Update sitemap dates only for materially edited pages.

## Calculation contract

The calculator reports cubic metres, tonnes, 20 kg bags, and 1 m³ bulka bags for rectangle, circle, and triangle areas. Densities and depth presets vary by material. When changing them, keep `MATERIALS`, visible content, long-tail presets, result labels, sharing/query behavior, and disclaimers consistent. Moisture, compaction, grading, and supplier products vary, so do not present estimates as guaranteed order quantities.
