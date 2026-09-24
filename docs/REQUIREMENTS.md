# Product Requirements Document (PRD)

## Product
Cipher Draw

## Problem Statement
Technical users need a fast way to draft, preview, and share diagrams and documentation in one place. Existing tools often focus on a single format (Markdown-only or Mermaid-only) or require account setup for basic sharing.

## Goal
Provide a browser-first playground that supports Markdown, Mermaid, SVG, and mixed content, with instant preview and shareable state via URL.

## Target Users
- Developers documenting system design.
- Technical writers producing architecture notes.
- Students and teams sharing diagrams quickly without backend setup.

## Phase 1 (Current MVP)
### In Scope
- Editor + live preview for:
  - Markdown
  - Mermaid
  - SVG
  - Mixed Markdown + Mermaid fences
- URL hash sharing with compressed state (`mode`, `content`, `theme`)
- Export options (PNG, SVG, PDF)
- Sanitization for Markdown, SVG, and Mermaid output

### Out of Scope
- User authentication
- Cloud persistence
- Multi-user collaboration
- Document history/version timeline

## Phase 2+ (Scaffolded)
- Auth
- Save/load dashboard
- Versioning/history

## Planned Authoring and Import Capabilities (not implemented)
- Preserve the existing Mermaid source editor and Markdown live preview as first-class authoring modes.
- Add a visual SVG editor with source/canvas synchronization, selection and transforms, text/style editing, grouping, layers, snapping/alignment, zoom/pan, and SVG/PNG/PDF export.
- Import PNG, JPG/JPEG, and WebP diagrams and offer distinct paths for raster-to-vector tracing, image-to-structured editable diagrams, and image-to-diagram code.
- Recognize boxes, arrows, labels, and relationships; extract text; let users review and correct the resulting editable graph.
- Initially target Editable Canvas, SVG, and Mermaid output; consider D2 and PlantUML adapters later.
- Include image cleanup to remove AI tags/labels. Product design must specify if “tag” means embedded metadata, a visible mark, or both.
- Use a shared internal diagram representation (nodes, edges, groups, metadata) as the interchange layer for image and format conversion.
- Treat the following as candidate later inputs, not first-release scope: SQL/schema and ORM models; OpenAPI, GraphQL, AsyncAPI, and Postman; source repositories/code; Terraform, Kubernetes/Helm, Compose, cloud infrastructure, and CI pipelines.
- Treat D2, PlantUML, Graphviz/DOT, Structurizr DSL/C4, draw.io, Excalidraw, Lucidchart, Visio, and Figma SVG as candidate formats/importers, with partial support explicitly documented.
- Candidate outputs beyond the current exports include WebP, Mermaid, D2, PlantUML, DOT, HTML, and portable diagram JSON.
- Later engineering workflows may include source/model/visual diffs, Git and PR integration, architecture drift checks, and MCP tools for coding agents.
- AI-assisted edits should be expressed as reviewable changes to the diagram model (nodes, relationships, groups, layout), not just regenerated pictures.
- Provide templates for common software architecture and engineering diagrams, plus general diagrams such as mind maps, org charts, BPMN, timelines, and user journeys.

### Planned conversion quality requirements
- Declare support by source format, target format, and diagram type; do not imply universal round-trip fidelity.
- Preserve original source and import provenance when a conversion loses unsupported syntax or semantics.
- For image recognition, expose uncertain/missing labels and relationships for user review before finalizing the diagram.
- Measure round-trip preservation and recognition quality on supported subsets.

Feature flags:
- `NEXT_PUBLIC_FEATURE_AUTH`
- `NEXT_PUBLIC_FEATURE_SAVE`

## Functional Requirements
1. User can switch editor mode between Markdown, Mermaid, SVG, and Mixed.
2. Preview updates quickly after content changes.
3. User can generate a share link that restores exact editor state.
4. User can export rendered output to PNG/SVG/PDF where supported.
5. Unsafe content is sanitized before render to reduce XSS risk.

## Non-Functional Requirements
1. App runs as a static-friendly Next.js frontend in `apps/web`.
2. Core interactions should feel responsive on modern desktop browsers.
3. Rendering failures should fail safely with clear feedback.
4. Share links should be deterministic and decode correctly.

## Success Metrics
- Share link success rate (decode + restore) >= 99%.
- Preview render errors < 1% of render attempts.
- Median editor-to-preview update latency under 300ms for common docs.

## Risks
- Complex sanitization edge cases can break legitimate content.
- Very large documents can stress client-side compression/rendering.
- Mermaid parser/runtime changes can impact compatibility.

## Open Decisions
- Versioning model for Phase 2 (snapshot-only vs diff-based).
- Persistence backend design once save is enabled.
- Permission model for shared documents after auth rollout.
- Exact behavior and scope of AI tag removal (metadata, visible mark, or both).
- Whether PDF page import belongs in the first image-conversion release.
- Which diagram types and format conversions the first structured image recognition release must support.
- Which Mermaid diagram types can be represented and round-tripped without loss in the first model adapter.
- Which later format/importer has sufficient user demand to follow Mermaid, image, and SVG foundations.
