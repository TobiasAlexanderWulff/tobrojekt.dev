# Code Structure

This document captures the current stack-specific implementation details that complement the tech-neutral guidance in `AGENTS.md`.

## Build Overview
- [Astro](https://astro.build/) drives the site. Components live under `src/components/`, layouts under `src/layouts/`, and routes under `src/pages/`.
- Styling uses Tailwind (configured in `tailwind.config.mjs`) with global resets in `src/styles/global.css`.
- TypeScript is enabled across server/runtime code. Set `strict` flags in `tsconfig.json` remain on.
- The dev server runs via `npm run dev`; production builds use `npm run build` and output to `dist/`.

## Content Pipeline
- Content is stored as Astro Content Collections. Schemas are defined in `src/content/config.ts` and mirror the shared model in `AGENTS.md`.
- Project entries are MDX files under `src/content/projects/`. Use localized fields when more than one locale is required.
- Tags live in `src/content/tags/` as JSON. Add metadata here to populate the tags index.
- `getCollection()` is the single source for content in routes and components. Keep computed data in frontmatter or utilities rather than duplicating in multiple pages.

## Localization
- Supported locales are maintained in `src/lib/i18n.ts`. Add copy for both `en` and `de` when expanding text keys.
- Use `resolveLocalizedValue()` inside components/layouts to pick a language-specific variant while maintaining sensible fallbacks.
- `LangToggle.astro` keeps the current path when switching locales and stores the preference under `preferred-locale` in `localStorage`.
- Route helpers `localizePath()` and `stripLocaleFromPath()` ensure URLs stay canonical. Prefer them over manual string concatenation.

## Search & Metadata
- The search page (`src/pages/search.astro`) is a shell around Pagefind. Assets in `/pagefind/` only exist after `npm run build`; the UI guards against missing assets during development.
- `src/pages/sitemap.xml.ts` builds a localized sitemap at build time, merging project timestamps with optional GitHub commit dates.
- `src/pages/robots.txt.ts` references the sitemap and allows all crawlers by default.
- When adding new routes, update the sitemap handler if they should be indexed.

## Automation & Scripts
- `scripts/import-portfolio-export.mjs` imports project exports into content collections, rewrites media paths, and keeps YAML tidy. See the header comment for usage examples (`--slug`, `--force`).
- Keep new scripts colocated under `scripts/` with a short usage block at the top.

## Conventions
- Prefer small utilities under `src/lib/` with JSDoc docstrings to explain contract and fallback behaviour.
- When introducing new dictionaries or content schemas, document the intent and expected shape either inline (via JSDoc) or in this folder.
- Update `CHANGELOG.md` for user-visible changes once they land on `main`.
