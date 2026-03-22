# Contributing to Yoga with Nancy

## Project Overview

A single-page website for Nancy Jamello's yoga practice, built with React 18, Chakra UI v3, and TypeScript. Deployed to GitHub Pages via GitHub Actions.

**Live site:** https://nancyjamello.github.io/site/

## Tech Stack

- **React 18** + TypeScript (Vite)
- **Chakra UI v3** — component library and styling
- **Playwright** — end-to-end testing
- **GitHub Actions** — CI/CD to GitHub Pages
- **Self-hosted Livory font** (serif, personal use license)

## Getting Started

```bash
# Clone
git clone git@github.com:nancyjamello/site.git
cd site

# Install (Node 20+ required)
npm install

# Run locally
npm run dev
# Opens http://localhost:3000

# Build for production
npm run build

# Run e2e tests (starts dev server automatically)
npm run test:e2e

# Run e2e tests with UI
npm run test:e2e:ui
```

## Project Structure

```
src/
  App.tsx           — Main single-page layout (header, hero, about, photos, DVDs, contact, footer)
  VideoSection.tsx  — Password-gated video library (SHA-256 auth, YouTube RSS feed)
  index.tsx         — React entry point with Chakra v3 provider
  index.css         — Global styles, @font-face declarations, animations

public/
  fonts/            — Self-hosted Livory woff2 files
  images/           — Site images (hero, class photos)
  index.html        — HTML template

e2e/
  homepage.spec.ts  — Main e2e test suite (16 tests)
  font-debug.spec.ts — Font loading verification tests

.github/workflows/
  deploy.yml        — GitHub Actions: build and deploy to Pages
```

## Key Design Decisions

### Password Gate
The video section uses client-side SHA-256 hashing to gate access. This is **not real security** — it prevents casual browsing only. The hash is visible in the source code. The password is `hathayoga`. To change it:

1. Open the browser console on the site
2. Run `sha256("newpassword").then(console.log)`
3. Paste the output into `PASSWORD_HASH` in `src/VideoSection.tsx`

### YouTube Videos
After password unlock, videos are fetched from the `@NancyJamello` YouTube channel via RSS feed, proxied through public CORS services (`api.allorigins.win`, `corsproxy.io`). These are free services with no SLA — if they go down, the video grid shows "No videos found."

### Font
The site uses **Livory**, a serif typeface by HVD Fonts. The font files in `public/fonts/` are for **personal use only** under the Befonts license. A commercial license must be purchased from MyFonts for any commercial use.

### Colors
- Steel blue: `#94a7ab` — used for About, DVDs, and Contact sections
- Wine: `rgb(192, 85, 118)` — header logo and nav links
- Dark text: `#2d2d2d`
- Secondary text: `#6b6560`

## Deployment

Pushing to `main` triggers automatic deployment to GitHub Pages via the workflow in `.github/workflows/deploy.yml`. The Vite config sets `base: "/site/"` for production builds since the site is served from `nancyjamello.github.io/site/`.

### Manual deploy
```bash
npm run build
# The `build/` folder contains the deployable static site
```

## Testing

```bash
# Run all 18+ e2e tests
npm run test:e2e

# Run with browser visible
npx playwright test --headed

# Run a specific test
npx playwright test -g "password"
```

Tests cover: page load, navigation, hero, about section, photo gallery, password gate (6 tests including lockout), DVDs, contact, footer, and font loading.

## Common Tasks

### Update DVD listings
Edit the `DVDS` array in `src/App.tsx`.

### Update contact info
Edit the Contact section in `src/App.tsx` (search for `id="contact"`).

### Add/remove nav sections
Edit the `NAV_ITEMS` array in `src/App.tsx` and add the corresponding section with a matching `id`.

### Update images
Replace files in `public/images/`. Image filenames are referenced in `src/App.tsx`.

## Known Limitations

- YouTube video fetching depends on third-party CORS proxies.
