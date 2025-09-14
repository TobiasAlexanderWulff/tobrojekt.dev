# AGENTS.md — tobrojekt.dev: Coding Agent Guidelines

This document defines general, tech‑agnostic guidelines for automated coding agents and contributors working on the tobrojekt.dev repository. It focuses on goals, quality bars, decision‑making, and workflow. Do not include language, framework, or tool‑specific instructions here; add those later in dedicated, stack‑specific docs.

## 1) Vision & Objectives
- Purpose: A personal hub for showcasing and managing all relevant projects, with room to grow into a broader digital garden/portfolio over time.
- Outcomes: Clear, accurate, and discoverable representation of projects; simple maintenance; space for future features (filters, search, feeds, timelines, notes, etc.).
- North Stars: Clarity, extensibility, accessibility, performance, and privacy.

## 2) Scope & Non‑Goals
- In‑Scope (initial):
  - Project listing and detail pages.
  - Basic organization (tags/categories/status), featured and archived sections.
  - Lightweight site metadata and page structure.
- Potential Future Scope:
  - Search/filtering, timelines, feeds (e.g., RSS/JSON), sitemaps, SEO enhancements.
  - Simple content editing or ingestion pipelines.
  - Integrations (e.g., external project sources) via interchangeable providers.
- Non‑Goals (for now):
  - Complex CMS features, user authentication, or dynamic multi‑user workflows.
  - Tech stack decisions in this file (keep this document stack‑agnostic).

## 3) Operating Principles
- Content‑first: Project information remains the source of truth; UI reflects it accurately.
- Extensible by design: Favor modular, swappable boundaries (e.g., data providers, theming, routing, analytics as optional modules).
- Accessibility: Meet WCAG fundamentals (headings, color contrast, focus, ARIA where needed, keyboard navigation).
- Performance: Prioritize fast initial load, sensible asset budgets, and minimal blocking work.
- Privacy‑respecting: No unnecessary tracking; avoid collecting PII; make analytics (if any) explicit and opt‑in.
- Maintainability: Small, focused changes; clear docs; stable interfaces and migration notes for breaking changes.

## 4) Information Architecture & Content Model
Define entities and shared fields in a tech‑neutral way. Add stack‑specific schemas elsewhere when chosen.

### 4.1 Entities
- Project:
  - id (stable unique identifier)
  - slug (URL‑safe, stable; changes require redirects policy)
  - title
  - summary (1–2 sentence overview)
  - description (rich content allowed)
  - status (planned | active | completed | archived)
  - tags (list of strings)
  - categories (optional list)
  - roles/skills (optional lists)
  - links (source, demo, docs, related)
  - media (images, video, social card; alt text required)
  - dates (created, updated, started, completed)
  - metrics (optional, e.g., stars, downloads; avoid scraping if unstable)
  - featured (boolean)
  - priority/order (number; lower is more prominent)
  - visibility (public | private)
- Tag/Category:
  - id/slug
  - label
  - description (optional)
- Site Metadata:
  - siteName, tagline, owner, description
  - primary navigation structure
  - social links (optional)
  - legal/privacy statements (optional)

### 4.2 Invariants & Conventions
- Slugs are unique and stable; if a slug changes, record a redirect.
- Each project has exactly one `id`; never reuse ids.
- All media includes alt text and dimensions (where known) to reduce layout shift.
- Avoid embedding secrets or tokens in content.

## 5) Features & Roadmap (Milestones)
- M0 — Repo Hygiene
  - Establish this AGENTS.md, a minimal README, and a CHANGELOG when relevant.
  - Define directories for content/assets/docs/tests as needed (stack‑agnostic path names are fine).
- M1 — Minimal Site
  - Home page with brief intro and featured projects.
  - Projects index listing with basic sort (e.g., recent/priority) and pagination if needed.
  - Project detail pages with rich content and links.
- M2 — Discoverability
  - Tag/category pages; simple filtering; optional search.
  - Sitemap and structured metadata; social preview images.
- M3 — Content Operations
  - Repeatable content model; migration notes when fields evolve.
  - Optional feeds (RSS/Atom/JSON) and project timeline views.
- M4 — Growth
  - Optional lightweight editing flows or ingestion from external sources.
  - Optional analytics/telemetry modules that respect privacy and can be disabled.

## 6) UX & Content Guidelines
- Voice & tone: Clear, concise, professional; emphasize outcomes and impact.
- Structure: Use consistent headings; lead with a summary; include clear calls to action (e.g., “View source”).
- Accessibility: Provide text alternatives, keyboard support, sensible focus order, and color contrast.
- Responsiveness: Ensure layouts adapt gracefully to small, medium, and large screens.
- Performance: Avoid unbounded asset sizes; prefer progressive enhancement; limit blocking resources.
- SEO basics: Unique titles, meta descriptions, canonical URLs, and structured data where appropriate.

## 7) Data & Configuration
- Configuration should be explicit and versioned. Include defaults and allow overrides without breaking consumers.
- Content storage should be human‑readable and diff‑friendly. Prefer stable filenames and folders.
- IDs are immutable once published. Slugs change only with recorded redirects.
- Feature flags: Prefer simple, explicit toggles for optional features (e.g., analytics, feeds).
- Visibility controls: Respect `visibility` for excluding private items from public surfaces.

## 8) Quality & Validation
- Testing strategy (tech‑agnostic):
  - Unit: Content/model utilities, data shaping, sorting/filtering logic.
  - Integration: Listing pages, detail rendering, basic navigation flows.
  - E2E (optional): Key user journeys (home → project → external link).
- Accessibility checks: Headings, landmarks, labels, keyboard traps, color contrast.
- Link integrity: Validate internal links and flag broken external links.
- Performance sanity: Keep initial load small; avoid unnecessary render work.
- Feeds & metadata: If implemented, validate feed formats and structured metadata.
- Definition of Done:
  - Meets acceptance criteria; no known critical accessibility or performance regressions.
  - Documentation updated (README, content model references, migration notes if needed).
  - Changelog entry for user‑visible changes.

## 9) Security & Privacy
- No secrets in the repository or logs. Use environment configuration or secret stores outside VCS.
- Avoid collecting PII; document any data collected and make it opt‑in.
- Respect third‑party asset licenses; store attribution where required.
- Treat external integrations as untrusted; sanitize inputs/outputs and handle failures gracefully.

## 10) Workflow for Agents
- Before you start:
  - Clarify ambiguous requirements; confirm acceptance criteria and constraints.
  - Propose a short plan with milestones and risks.
- While implementing:
  - Make small, focused changes; avoid mixing unrelated concerns.
  - Keep changes consistent with existing conventions and directory structure.
  - Update documentation alongside code/content changes.
  - Provide migration notes for breaking changes to models or URLs.
- After implementing:
  - Re‑run validation (accessibility, links, performance sanity, feeds if applicable).
  - Update CHANGELOG and any relevant docs. Seek review where appropriate.

## 11) Repository Conventions (Suggested, Tech‑Neutral)
- Suggested directories (adapt as needed):
  - `content/projects/` — project entries and metadata
  - `content/tags/` — tag/category metadata (optional)
  - `public/` — static public assets (favicons, social images)
  - `assets/` — raw media to be optimized/published
  - `config/` — site metadata, feature flags, redirects map
  - `docs/` — documentation, ADRs, design notes
  - `tests/` — automated checks (structure depends on chosen stack)
- Architectural notes:
  - Separate content, presentation, and data access boundaries.
  - Use provider interfaces for swappable data sources (local files vs. external APIs).
  - Keep URL structure human‑readable and stable.

## 12) Observability (Optional, Privacy‑Respecting)
- If analytics/telemetry are added, they must be:
  - Clearly documented and easy to disable.
  - Minimal by default, aggregated, and privacy‑respecting.
  - Resilient to failure and network variability.

## 13) Decision Records
- For meaningful architectural or content‑model changes, add a short ADR in `docs/adr/` recording context, options, and decision.
- Keep ADRs concise and focused on trade‑offs and reversibility.

## 14) Clarifications & Requests
- When requirements are ambiguous or competing, pause and request clarification rather than guessing.
- Offer 1–2 clear options with pros/cons if a trade‑off is involved (e.g., simplicity vs. flexibility).

## 15) Appendix: Project Field Reference (Tech‑Neutral)
- Minimal required fields: `id`, `slug`, `title`, `summary`, `visibility`.
- Recommended fields: `description`, `status`, `tags`, `links`, `media`, `dates`, `featured`, `priority`.
- URL rules: Slugs are lowercase, hyphenated, ASCII; avoid collisions; record redirects when changed.
- Media rules: Provide alt text and dimensions; prefer modern formats; avoid oversized assets.

---

This document is technology‑agnostic by design. Add stack‑specific details (build, deploy, frameworks, commands) in separate docs without weakening the principles and workflows defined here.
