# Renderer Patterns

## Rules and Conventions

### 1. Mode-Specific Renderers

Each rendering mode has its own isolated renderer in `components/preview/renderers/`:
- **`renderMarkdown.ts`** - Markdown → HTML
- **`renderMermaid.ts`** - Mermaid → SVG
- **`renderSvg.ts`** - SVG → sanitized SVG
- **`renderMixed.ts`** - Mixed mode (Markdown + Mermaid)

### 2. Renderer Function Signature

All renderers follow this pattern:

```typescript
export async function renderX(
  content: string,
  theme: ThemeMode
): Promise<{ html: string; error?: string }> {
  try {
    // 1. Parse/transform content
    // 2. Generate output
    // 3. Sanitize output
    // 4. Return { html: sanitizedOutput }
  } catch (error) {
    return {
      html: '',
      error: error.message
    };
  }
}
```

### 3. Markdown Renderer (renderMarkdown.ts)

```typescript
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import { sanitizeHtml } from '@/lib/sanitize/sanitize';

export async function renderMarkdown(
  content: string,
  theme: ThemeMode
): Promise<{ html: string; error?: string }> {
  try {
    const file = await unified()
      .use(remarkParse)           // Parse Markdown
      .use(remarkGfm)             // GitHub Flavored Markdown
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)             // Allow raw HTML in Markdown
      .use(rehypeStringify)       // Convert to HTML string
      .process(content);

    const html = String(file);
    const sanitized = sanitizeHtml(html);  // Always sanitize!

    return { html: sanitized };
  } catch (error) {
    return {
      html: '',
      error: error instanceof Error ? error.message : 'Markdown render failed'
    };
  }
}
```

### 4. Mermaid Renderer (renderMermaid.ts)

```typescript
import mermaid from 'mermaid';
import { sanitizeSvg } from '@/lib/sanitize/sanitize';

export async function renderMermaid(
  content: string,
  theme: ThemeMode
): Promise<{ html: string; error?: string }> {
  try {
    // Initialize Mermaid with theme
    mermaid.initialize({
      startOnLoad: false,
      theme: theme === 'dark' ? 'dark' : 'default',
      securityLevel: 'strict',  // Important for security
    });

    // Generate unique ID
    const id = `mermaid-${Date.now()}`;

    // Render
    const { svg } = await mermaid.render(id, content);

    // Sanitize SVG
    const sanitized = sanitizeSvg(svg);

    return { html: sanitized };
  } catch (error) {
    return {
      html: '',
      error: error instanceof Error ? error.message : 'Mermaid render failed'
    };
  }
}
```

### 5. SVG Renderer (renderSvg.ts)

```typescript
import { sanitizeSvg } from '@/lib/sanitize/sanitize';

export async function renderSvg(
  content: string,
  theme: ThemeMode
): Promise<{ html: string; error?: string }> {
  try {
    // Validate SVG structure
    if (!content.trim().startsWith('<svg')) {
      throw new Error('Content must start with <svg> tag');
    }

    // Sanitize
    const sanitized = sanitizeSvg(content);

    return { html: sanitized };
  } catch (error) {
    return {
      html: '',
      error: error instanceof Error ? error.message : 'SVG render failed'
    };
  }
}
```

### 6. Mixed Mode Renderer (renderMixed.ts)

Parses content into Markdown and Mermaid blocks, renders each, then combines:

```typescript
export async function renderMixed(
  content: string,
  theme: ThemeMode
): Promise<{ html: string; error?: string }> {
  try {
    const blocks = parseMixedContent(content);
    const rendered: string[] = [];

    for (const block of blocks) {
      if (block.type === 'markdown') {
        const { html } = await renderMarkdown(block.content, theme);
        rendered.push(html);
      } else if (block.type === 'mermaid') {
        const { html } = await renderMermaid(block.content, theme);
        rendered.push(`<div class="mermaid-block">${html}</div>`);
      }
    }

    return { html: rendered.join('\n') };
  } catch (error) {
    return {
      html: '',
      error: error instanceof Error ? error.message : 'Mixed render failed'
    };
  }
}

// Parse mixed content into blocks
function parseMixedContent(content: string) {
  const blocks = [];
  const lines = content.split('\n');
  let currentBlock = { type: 'markdown', content: '' };

  for (const line of lines) {
    if (line.startsWith('```mermaid')) {
      // Start Mermaid block
      if (currentBlock.content) {
        blocks.push(currentBlock);
      }
      currentBlock = { type: 'mermaid', content: '' };
    } else if (line === '```' && currentBlock.type === 'mermaid') {
      // End Mermaid block
      blocks.push(currentBlock);
      currentBlock = { type: 'markdown', content: '' };
    } else {
      currentBlock.content += line + '\n';
    }
  }

  if (currentBlock.content) {
    blocks.push(currentBlock);
  }

  return blocks;
}
```

## Patterns to Follow

### 1. Always Sanitize Output

**CRITICAL:** All rendered HTML/SVG MUST be sanitized before display.

```typescript
import { sanitizeHtml, sanitizeSvg } from '@/lib/sanitize/sanitize';

// For HTML
const sanitized = sanitizeHtml(rawHtml);

// For SVG
const sanitized = sanitizeSvg(rawSvg);
```

### 2. Error Handling

Always return error in result object, never throw:

```typescript
// ✅ Good
try {
  const html = render(content);
  return { html };
} catch (error) {
  return {
    html: '',
    error: error instanceof Error ? error.message : 'Render failed'
  };
}

// ❌ Bad
async function render() {
  throw new Error('Failed');  // Don't throw!
}
```

### 3. Theme Support

Pass theme to renderer and configure libraries:

```typescript
mermaid.initialize({
  theme: theme === 'dark' ? 'dark' : 'default',
});
```

### 4. Async Rendering

Renderers are async to support libraries like Mermaid:

```typescript
export async function renderX(content: string, theme: ThemeMode) {
  // Use await for async operations
  const result = await mermaid.render(id, content);
  return { html: result.svg };
}
```

## Anti-Patterns (Avoid)

1. **Don't skip sanitization**
```typescript
// ❌ Bad: No sanitization
return { html: rawHtml };

// ✅ Good
return { html: sanitizeHtml(rawHtml) };
```

2. **Don't use dangerouslySetInnerHTML without sanitization**
```typescript
// In component
// ❌ Bad
<div dangerouslySetInnerHTML={{ __html: content }} />

// ✅ Good
const { html } = await renderMarkdown(content, theme);
<div dangerouslySetInnerHTML={{ __html: html }} />  // Already sanitized
```

3. **Don't share state between renderers**
```typescript
// ❌ Bad
let globalCache = {};

export function renderMarkdown(content) {
  globalCache[content] = ...;  // Avoid global state
}

// ✅ Good
export function renderMarkdown(content) {
  // Pure function, no side effects
}
```

4. **Don't mutate input**
```typescript
// ❌ Bad
export function render(content: string) {
  content = content.trim();  // Mutating parameter
}

// ✅ Good
export function render(content: string) {
  const trimmed = content.trim();  // Create new variable
}
```

## Integration with PreviewPane

```typescript
// components/preview/PreviewPane.tsx
import { renderMarkdown } from './renderers/renderMarkdown';
import { renderMermaid } from './renderers/renderMermaid';
import { renderSvg } from './renderers/renderSvg';
import { renderMixed } from './renderers/renderMixed';

export function PreviewPane() {
  const { mode, content, theme } = useDocStore();
  const [html, setHtml] = useState('');

  useEffect(() => {
    const render = async () => {
      let result;

      switch (mode) {
        case 'markdown':
          result = await renderMarkdown(content, theme);
          break;
        case 'mermaid':
          result = await renderMermaid(content, theme);
          break;
        case 'svg':
          result = await renderSvg(content, theme);
          break;
        case 'mixed':
          result = await renderMixed(content, theme);
          break;
      }

      if (result.error) {
        setHtml(`<div class="error">${result.error}</div>`);
      } else {
        setHtml(result.html);
      }
    };

    render();
  }, [mode, content, theme]);

  return (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  );
}
```

## Testing Renderers

```typescript
// tests/renderMarkdown.test.ts
import { renderMarkdown } from '@/components/preview/renderers/renderMarkdown';

describe('renderMarkdown', () => {
  it('should render basic markdown', async () => {
    const { html, error } = await renderMarkdown('# Hello', 'dark');

    expect(error).toBeUndefined();
    expect(html).toContain('<h1>Hello</h1>');
  });

  it('should sanitize dangerous content', async () => {
    const { html } = await renderMarkdown('<script>alert("xss")</script>', 'dark');

    expect(html).not.toContain('<script>');
  });

  it('should handle errors gracefully', async () => {
    const { html, error } = await renderMarkdown(null as any, 'dark');

    expect(error).toBeDefined();
    expect(html).toBe('');
  });
});
```

## When to Apply This Skill

- Creating new renderers for new modes
- Modifying existing renderers
- Debugging rendering issues
- Optimizing render performance
- Adding new rendering features (syntax highlighting, etc.)
- Ensuring security and sanitization

## Related Files

- `components/preview/renderers/` - All renderers
- `lib/sanitize/sanitize.ts` - Sanitization utilities
- `components/preview/PreviewPane.tsx` - Integration
- `tests/renderMixed.test.ts` - Renderer tests
