# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Marketing site for Fuzzy Software LLC (fuzzysoftwarellc.com). Plain static HTML/CSS/JS hosted on GitHub Pages (`CNAME`). No build step, no framework, no dependencies.

Tone: understated and professional. Avoid metrics, guarantees, timelines, prices, badges, and sales-style CTAs.

## Commands

- Preview locally: `python3 -m http.server 8000`, then open `http://localhost:8000/index.html`. GitHub Pages serves `/about` from `about.html`; the local server needs the `.html` suffix.
- Re-render PNG brand assets after editing an SVG, e.g. `rsvg-convert -w 1200 -h 630 assets/og-image.svg -o assets/og-image.png`.

## Architecture

- Pages: `index.html`, `capabilities.html`, `about.html`, `contact.html`. Internal links omit `.html` (e.g. `/about`).
- `services.html`, `process.html`, `faqs.html` are meta-refresh redirect stubs kept for old inbound links. Don't add content to them.
- The header (nav) and footer are duplicated in every page. Change them in all four pages together. The current page's nav link carries `aria-current="page"`.
- `assets/styles.css`: hand-written CSS, design tokens in `:root`. Fonts (Inter + Source Serif 4) load via a `<link>` in each page's `<head>`.
- Visual motif: hexagons from the logo mark. `assets/hex-pattern.svg` (dark sections), `hex-dots.svg` (`.section--tint`), `hero-mark.svg` (right side of `.hero`/`.page-head`), `hex-outline.svg` (`.hex-icon` frame). Header/footer use `logo-nav.svg` / `logo-nav-white.svg` (no tagline); `logo.svg` etc. are the full brand files.
- Photos live in `assets/img/` as `<name>.jpg` (1600w) and `<name>-800.jpg` (800w), used with `srcset`. Sources and license are in `assets/img/CREDITS.md`. The people pictured are not staff, so never caption them as the team.
- `assets/site.js`: copyright year, mobile nav toggle, contact form submit.
- Contact form posts to Formspree (`https://formspree.io/f/mnngpybq`). Required fields are listed in `site.js` (`name`, `email`, `message`) and must match the input ids in `contact.html`.
