# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Marco Gaudio (reinsurance pricing actuary), hosted on GitHub Pages at **marcogaudio.github.io**. Based on the Start Bootstrap "Agency" theme with Bootstrap 3, jQuery, and custom JavaScript.

## Build System

Uses Gulp (v3 syntax) for build tasks. Note: there is no `package.json` checked in — vendor libraries (Bootstrap, Font Awesome, jQuery, jQuery Easing) are committed directly in `vendor/`.

- **Compile SCSS to CSS:** `gulp css` (compiles `scss/` → `css/agency.css` → `css/agency.min.css`)
- **Minify JS:** `gulp js` (minifies `js/*.js` → `js/*.min.js`)
- **Dev server with live reload:** `gulp dev` (watches SCSS, JS, and HTML files)
- **Full build:** `gulp` (runs css, js, and vendor copy tasks)

## Architecture

- **`index.html`** — Main single-page portfolio (sections: header, about/timeline, portfolio, contact, etc.)
- **`index_2.html`** — Alternative/draft version of the homepage
- **`scss/`** — SCSS source files, one per section (e.g., `_navbar.scss`, `_masthead.scss`, `_portfolio.scss`). Entry point is `agency.scss` which imports all partials. Variables and theme colors are in `_variables.scss` (primary color: `$primary: #fed136`).
- **`css/agency.min.css`** — Compiled output referenced by HTML pages
- **`js/`** — JavaScript files:
  - `agency.js` — Core Bootstrap theme JS (navbar collapse, scroll spy)
  - `waves.js` — Animated wave background effect
  - `particles.js` — Particle animation background
  - `tree.js` — Tree visualization
  - `appHome.js` / `app.js` — App initialization
  - `portfolio.js` — Portfolio modal handling
  - `contact_me.js` / `jqBootstrapValidation.js` — Contact form logic
- **`blog/`** — R Markdown blog posts (`.Rmd` files) with associated JS libraries
- **`PDF/`** — Teaching materials (PDFs and rendered HTML from R)
- **`img/`** — Images including team photos and logos
- **`teaching.html`**, **`blog.html`** — Standalone pages for teaching and blog sections

## Key Details

- HTML pages load CSS/JS from `vendor/` (committed, not from node_modules) and `css/`/`js/` directories
- Leaflet.js is loaded from CDN (unpkg) for map functionality in index.html
- Google Analytics tracking is embedded in the HTML head
- The site uses inline `<style>` blocks in `index.html` for timeline animations and wave effects alongside the compiled SCSS
