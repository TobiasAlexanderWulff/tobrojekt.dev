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
