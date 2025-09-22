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
- `config/` — site metadata, navigation, and redirects map (schema-validated)
- `docs/` — documentation, ADRs, design notes (see `docs/adr/`)
- `tests/` — automated checks (structure depends on chosen stack)

## Getting Started
- Requires: Node.js 18+ and npm (or pnpm/yarn).
- Install deps: `npm install`
- Validate config: `npm run lint:config`
- Start dev server: `npm run dev`
- Build: `npm run build` (generates `dist/`)

Notes
- Site-wide metadata, primary navigation, and redirects are managed in `config/site.json` and `config/redirects.json`; run `npm run lint:config` to validate them against JSON Schema.
- Search uses Pagefind. The `pagefind` index is generated in `postbuild`; search UI assets are only available after `npm run build`.
- Content is managed via Astro Content Collections in `src/content/`. See schemas in `src/content/config.ts`.
- Optional external metadata: You can add `external.github` to a project entry to fetch the latest commit date at build time. Set `GITHUB_TOKEN` to raise rate limits; builds gracefully fall back if the API is unavailable.
 - Favicons: The UI attempts `https://{host}/favicon.ico` with a fallback to DuckDuckGo's icon service. For hosts that don't expose a fetchable favicon, you can override per link by adding `icon: "/icons/<name>.svg"` (or any URL) in the project's `links` array. Place local icons under `public/icons/`.
 - Playable demos: Provide a `links` entry with `rel: "demo"` and an `https://` URL to render the project inline via `<iframe>` on its detail page. The demo link still appears in the external links list for direct access.

## Content Model
See tech‑neutral fields and invariants in `AGENTS.md` (Projects, Tags/Categories, Site Metadata). Astro content schemas live in `src/content/config.ts`.
Projects are MDX files under `src/content/projects/`. Tags are JSON under `src/content/tags/`.

## Projekt‑Exporte und Import
- Agent‑Template: `docs/agent-templates/project-export.md` beschreibt, wie ein externer Agent alle Portfolio‑Daten sammelt und als Export bereitstellt.
- Ablage der Exporte: Lege jeden Export unter `portfolio-export/<slug>/project.json` ab; Medien relativ in `portfolio-export/<slug>/media/` (optional `social-card.png`).
- Import in diese Seite:
  - Alle Exporte importieren: `node scripts/import-portfolio-export.mjs`
  - Nur ein Projekt: `node scripts/import-portfolio-export.mjs --slug <slug>`
  - Vorhandene MDX überschreiben: `node scripts/import-portfolio-export.mjs --force`

Was der Import tut:
- Erzeugt `src/content/projects/<slug>.mdx` mit Frontmatter, die `src/content/config.ts` entspricht.
- Kopiert Medien nach `public/projects/<slug>/` und passt Pfade in der Frontmatter an.
- Mappt Link‑Objektform (`source`/`demo`/`docs`/`related`) zu `links[]` mit `rel`/`url`/`label`.

## Roadmap
High‑level milestones (M0–M4) are outlined in `AGENTS.md` under Features & Roadmap.

## Contributing
- Follow the guidelines in `AGENTS.md` (operating principles, DoD, validation).
- For notable decisions, add a short ADR under `docs/adr/`.

## Additional Documentation
- `docs/development/code-structure.md` — stack-specific overview (Astro layout, localization, search, scripts).

## Changelog
See `CHANGELOG.md` for notable changes.

## Deploy
- Cloudflare Pages (current production setup):
  - Build command: `npm run build`
  - Build output directory: `dist`
  - Deploy via the Pages UI or your connected Git repository.
