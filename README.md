# LandscapeCalc.com.au

A free online landscape materials calculator for Australian homeowners and landscapers.

## Features

- Calculate mulch, soil, gravel, sand, and roadbase quantities
- Results in cubic metres, tonnes, bags (25L), and bulka bags (1m³)
- Support for rectangular, circular, and triangular areas
- Multiple material subtypes with accurate Australian densities
- Shareable calculation links
- Copy results to clipboard
- Mobile-friendly, responsive design
- No dependencies, pure HTML/CSS/JS

## Materials Covered

- **Mulch**: Wood chip, bark, pine bark, cypress, eucalyptus, sugar cane
- **Soil**: Topsoil, garden mix, veggie mix, turf underlay, sandy loam, potting mix
- **Gravel**: Blue metal, crushed granite, river pebbles, sandstone, limestone, decorative
- **Sand**: Washed, brickies, plastering, paving, white, yellow, sandpit
- **Road Base**: DGB20, DGB10, FCR, recycled, quarry rubble, crusher dust

## Development

This is a static site with no build process required. Simply open `index.html` in a browser.

### File Structure

```
landscapecalc/
├── index.html                    # Homepage
├── mulch-calculator/index.html   # Mulch calculator page
├── soil-calculator/index.html    # Soil calculator page
├── gravel-calculator/index.html  # Gravel calculator page
├── sand-calculator/index.html    # Sand calculator page
├── roadbase-calculator/index.html # Road base calculator page
├── about/index.html              # About page
├── css/styles.css                # All styles
├── js/calculator.js              # Calculator logic
├── images/                       # Images and icons
├── robots.txt                    # Search engine instructions
├── sitemap.xml                   # XML sitemap
├── manifest.json                 # PWA manifest
├── CNAME                         # GitHub Pages custom domain
└── README.md                     # This file
```

## Deployment

This site is designed to be hosted on GitHub Pages with a custom domain.

1. Push to GitHub repository
2. Enable GitHub Pages in repository settings
3. Configure custom domain (landscapecalc.com.au)
4. DNS should point to GitHub Pages servers

## License

This project is provided as-is for educational and informational purposes.

## Disclaimer

This calculator is provided for estimation purposes only. Material densities can vary based on moisture content, particle size, and supplier. Always verify quantities with your supplier before placing orders.
