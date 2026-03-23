# Renderer Patterns

## What is this skill?

This skill documents the rendering architecture for Cipher Draw's multi-mode editor, including Markdown, Mermaid, SVG, and Mixed mode renderers.

## When to apply this skill

- Creating or modifying renderers
- Adding support for new rendering modes
- Debugging rendering issues
- Ensuring security and sanitization
- Optimizing render performance
- Handling rendering errors

## Key concepts covered

- Mode-specific renderer architecture
- Async rendering patterns
- Sanitization requirements
- Error handling
- Theme support
- Mixed mode parsing and composition
- Testing renderers

## Related documentation

- `components/preview/renderers/` - Renderer implementations
- `lib/sanitize/sanitize.ts` - Sanitization layer
- `docs/ARCHITECTURE.md` - Rendering architecture
- `CLAUDE.md` - Security boundaries
