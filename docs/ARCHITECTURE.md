# Architecture

## Repository Structure
- `apps/web`: Primary Next.js 14 App Router frontend (active product surface).
- `packages/shared`: Shared types and cross-package contracts.
- `server`: NestJS scaffold for future backend features.

## Frontend Architecture (`apps/web`)

## Core Layers
1. UI Layer
   - App Router pages/layout (`app/`)
   - Editor/preview components (`components/`)
2. State Layer
   - Document state store (`store/useDocStore.ts`)
3. Rendering Layer
   - Mode-specific renderers (`components/preview/renderers/`)
4. Safety Layer
   - Sanitization utilities (`lib/sanitize/sanitize.ts`)
5. Share/Export Layer
   - Hash codec (`lib/share/codec.ts`, `lib/share/hash.ts`)
   - Export utilities (`lib/export/`)

## Data Flow
1. User edits content in Monaco editor.
2. Doc state updates in store (`mode`, `content`, `theme`).
3. Preview pane selects renderer by mode.
4. Renderer transforms content to HTML/SVG output.
5. Output passes through sanitization before DOM injection.
6. Share flow serializes state, compresses, and writes URL hash.
7. Restore flow decodes hash and rehydrates store state.

## Mode Rendering
- Markdown: markdown parser -> sanitized HTML
- Mermaid: mermaid render -> sanitized SVG/HTML fragment
- SVG: raw SVG validation/sanitization -> injected output
- Mixed: fenced block parsing for Markdown + Mermaid composition

## Planned Diagram Model and Conversion Architecture

The current app stores mode-specific source content and renders it to HTML/SVG. A canonical editable diagram model is a future architectural track; it is not implemented yet.

```text
Input adapters (Mermaid, SVG, image, SQL/API/code/infrastructure)
                         ↓
       Versioned Diagram JSON (nodes, edges, groups,
         styles, layout, semantics, source metadata)
                         ↓
        Canvas editor · source editor · AI operations
                         ↓
Output adapters (SVG, Mermaid, D2, PlantUML, DOT,
                    PNG, PDF, Markdown, HTML)
```

Design constraints for this track:
- Use explicit, versioned import/export adapters; avoid direct pairwise converters as the architecture grows.
- Preserve source text and provenance so lossy or unsupported mappings can be surfaced and original content remains recoverable.
- Define round-trip support per format and per diagram type. “Supported” must not imply perfect equivalence for every feature.
- Treat image recognition as a proposal with confidence and human review; OCR, geometry, and relationship inference produce different kinds of evidence.
- Keep SVG sanitization on every untrusted import and render path.
- Add format adapters incrementally: begin with the canvas model and a Mermaid subset, then prioritize D2/PlantUML, Graphviz, and structured engineering inputs from observed demand.

## Security Boundaries
- Untrusted user input is never injected without sanitization.
- Markdown and Mermaid outputs are sanitized before render.
- Raw SVG content is sanitized before display/export.

## Feature Flag Strategy
Future features are scaffolded and controlled using:
- `NEXT_PUBLIC_FEATURE_AUTH`
- `NEXT_PUBLIC_FEATURE_SAVE`

This allows incremental rollout without destabilizing MVP flows.

## Future Backend Architecture (Planned)
- NestJS API in `server/` for auth, document persistence, and versioning.
- Shared DTO/contracts in `packages/shared`.
- Frontend server actions or API client layer consuming backend endpoints.

## Engineering Guidelines
1. Keep renderers mode-isolated to avoid cross-mode regressions.
2. Treat sanitization as mandatory in all output paths.
3. Add tests for codec and renderer edge cases before refactors.
4. Preserve share-link backward compatibility where possible.
