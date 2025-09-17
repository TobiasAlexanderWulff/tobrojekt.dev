# Changelog

All notable changes to this project will be documented in this file.

The format is inspired by Keep a Changelog. Semantic Versioning will be adopted once releases begin.

## [Unreleased]
### Added
- Tech‑agnostic repo scaffolding: directories and placeholders under `content/`, `public/`, `assets/`, `config/`, `docs/`, `tests/`.
- Initial `AGENTS.md` with goals, workflows, and quality standards.
- Minimal `README.md` and `CHANGELOG.md`.
- JSON Schemas for `Project`, `Tag`, and `SiteMetadata` under `config/schemas/`.
- Example content: `content/projects/tobrojekt-dev.json` and tags under `content/tags/`.
- ADR template and ADR 0001 documenting the content model and schemas.
- Astro scaffold with MDX, Tailwind, and Pagefind integration:
  - `package.json`, `astro.config.mjs`, `tsconfig.json`, `tailwind.config.mjs`, `postcss.config.cjs`.
  - Content Collections in `src/content/config.ts`.
  - Example MDX project at `src/content/projects/tobrojekt-dev.mdx`.
  - Tags data at `src/content/tags/`.
  - Pages: home, projects list, project detail, tags, search.
- Sitemap and robots endpoints: `src/pages/sitemap.xml.ts`, `src/pages/robots.txt.ts`.
- Project detail page now shows tags, status, and dates.
- Tetris project entry updated with `dates.updated` and `priority`.
- Optional GitHub integration: Fetch latest commit date for projects with `external.github` metadata.
 - Link icons: You can provide a per-link `icon` to override favicon fetching; added `public/icons/tetris.svg` and set it for the Tetris demo link.
- Project detail hero image: Renders `media.social_card` as a centered hero with a max width.
- Project gallery: Renders `media.images` as a responsive grid below the content (lazy-loaded).
 - Project detail pages inline an `<iframe>` demo when a project provides a secure `links` entry with `rel: "demo"`.
  - Docs: Updated `docs/agent-templates/project-export.md` to use `media.social_card` and `media.images` with guidance on sizes and alt text.
