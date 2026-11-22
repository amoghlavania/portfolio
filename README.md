# Amogh Lavania — Portfolio

Personal portfolio built with **Angular** (standalone components, signals, zoneless) and plain SCSS — no UI libraries.

## Features

- **Pull-cord theme switch** — click the brass pendant hanging at the top right (or drag it down and let go) to toggle light / dark mode, with a circular reveal from the cord. The choice is remembered.
- Flip-calendar role ticker and a flippable "ability card" in the hero
- "Magic happens behind the doors" expertise section — hover or tap a door to open it
- Scroll-driven "Let's go back in time" story timeline
- Key project, skills, certifications and contact sections
- Fully responsive, respects `prefers-reduced-motion`

## Editing content

All copy lives in [`src/app/data/portfolio.data.ts`](src/app/data/portfolio.data.ts).
To replace the photo, overwrite `public/images/amogh.jpg` (4:5 portrait works best).

## Development

```bash
npm install
npm start          # http://localhost:4200 — rebuilds on save, refresh the browser to see changes
npm run serve      # standard `ng serve` with live reload (only works if the path has no "#")
npm run build      # outputs to dist/portfolio/browser
```

> `npm start` uses `scripts/dev.mjs` instead of `ng serve`, because Angular's Vite dev server shows a blank
> page when the project path contains a `#` (e.g. `D:\#projects\...`).

## Deploying to Vercel

`vercel.json` is already configured. Import the GitHub repo in Vercel and deploy — no extra settings needed
(build: `npm run build`, output: `dist/portfolio/browser`).
