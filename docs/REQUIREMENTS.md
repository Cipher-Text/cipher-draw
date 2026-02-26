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
