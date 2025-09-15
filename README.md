# tobrojekt.dev

Personal projects hub and portfolio for tobrojekt.dev. This repository will evolve to manage, present, and grow Tobias’s projects over time.

This repo is intentionally tech‑agnostic at this stage. For overarching goals, workflow, and quality standards, see `AGENTS.md`.

## Vision
- Central, accurate source for all relevant projects.
- Simple to maintain, easy to extend as needs grow.
- Strong defaults for accessibility, performance, and privacy.

## Project Structure (initial)
- `content/projects/` — project entries and metadata placeholders
- `content/tags/` — tag/category metadata placeholders
- `public/` — public static assets (e.g., favicons, social images)
- `assets/` — raw media to prepare/optimize for `public/`
- `config/` — site metadata, feature flags, redirects map (future)
- `docs/` — documentation, ADRs, design notes (see `docs/adr/`)
- `tests/` — automated checks (structure depends on chosen stack)

## Getting Started
- Requires: Node.js 18+ and npm (or pnpm/yarn).
- Install deps: `npm install`
- Start dev server: `npm run dev`
- Build: `npm run build` (generates `dist/`)

Notes
- Search uses Pagefind. The `pagefind` index is generated in `postbuild`; search UI assets are only available after `npm run build`.
- Content is managed via Astro Content Collections in `src/content/`. See schemas in `src/content/config.ts`.
- Optional external metadata: You can add `external.github` to a project entry to fetch the latest commit date at build time. Set `GITHUB_TOKEN` to raise rate limits; builds gracefully fall back if the API is unavailable.
 - Favicons: The UI attempts `https://{host}/favicon.ico` with a fallback to DuckDuckGo's icon service. For hosts that don't expose a fetchable favicon, you can override per link by adding `icon: "/icons/<name>.svg"` (or any URL) in the project's `links` array. Place local icons under `public/icons/`.

## Content Model
See tech‑neutral fields and invariants in `AGENTS.md` (Projects, Tags/Categories, Site Metadata). Astro content schemas live in `src/content/config.ts`.
Projects are MDX files under `src/content/projects/`. Tags are JSON under `src/content/tags/`.

## Roadmap
High‑level milestones (M0–M4) are outlined in `AGENTS.md` under Features & Roadmap.

## Contributing
- Follow the guidelines in `AGENTS.md` (operating principles, DoD, validation).
- For notable decisions, add a short ADR under `docs/adr/`.

## Changelog
See `CHANGELOG.md` for notable changes.
