# Cipher Draw

Cipher Draw is an open-source diagram + document playground inspired by mermaid.live with multi-mode support:
- Markdown
- Mermaid
- SVG
- Mixed Markdown + Mermaid fences

Phase 1 (MVP) is implemented in `apps/web`. Phase 2+ (auth/save/dashboard/versioning) is scaffolded behind feature flags.

## Monorepo Layout
- `apps/web`: Next.js 14 App Router frontend
- `packages/shared`: shared types scaffold
- `server`: NestJS backend scaffold (unused in Phase 1)

## Quick Start
```bash
pnpm install
pnpm -C apps/web dev
```

## Build
```bash
pnpm -C apps/web build
```

## URL Sharing
Cipher Draw uses URL hash sharing with `lz-string` compression. Clicking **Share Link** stores `{ mode, content, theme }` in the hash. Opening that link restores the exact document state in the browser without a backend.

## Security Note
Rendered Markdown and SVG are sanitized to reduce XSS risk. Mermaid output is sanitized before injection. Do not disable sanitization in production.

## Feature Flags (Scaffold)
- `NEXT_PUBLIC_FEATURE_AUTH=false`
- `NEXT_PUBLIC_FEATURE_SAVE=false`

## Documentation
- `docs/README.md`
- `docs/PRODUCT_REQUIREMENTS.md`
- `docs/PRODUCT_ROADMAP.md`
- `docs/ARCHITECTURE.md`
