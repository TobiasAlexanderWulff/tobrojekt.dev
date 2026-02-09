# Project Header Design Philosophy

## Goal
The project header should help visitors answer three questions in under a few seconds:

1. What is this project?
2. What is its current state?
3. What should I click next?

## Core Principles

### 1) Hierarchy over density
The title and summary carry narrative value and always come first. Metadata and links support that narrative and are visually secondary.

### 2) Information lanes
The header is structured in lanes to reduce scanning cost:

1. `Identity lane`: title + status badge.
2. `Context lane`: summary.
3. `Utility lane`: timeline metadata (left) + actions (right).
4. `Taxonomy lane`: lightweight tags.

### 3) Action clarity
Actions are split by intent:

1. Primary actions (for example demo/source) use filled buttons.
2. Secondary actions use neutral ghost-style buttons.

This keeps the main CTA obvious without hiding additional links.

### 4) Quiet taxonomy
Tags are intentionally non-clickable metadata chips in the current stage. They provide classification context without implying navigation that does not exist yet.

### 5) Framing and separation
A subtle bordered/gradient surface around the header separates project metadata from the long-form body. This improves rhythm and prevents visual blending with article content.

### 6) Responsive by default
Desktop: metadata and actions sit side by side.  
Mobile: they stack in reading order (context first, actions after).

## Accessibility Notes

1. Keep text contrast high for title, summary, and metadata values.
2. Preserve clear focus states on action buttons.
3. Keep icon+label combinations for actions; icon-only controls are avoided in the header.
4. Use semantic metadata (`dl`, `dt`, `dd`) for date/status value pairs.

## Current Scope and Future Evolution

Current scope intentionally excludes tag pages and filter routes.  
When discoverability features are implemented, tags can become links again, but only together with actual destination pages and sitemap support.
