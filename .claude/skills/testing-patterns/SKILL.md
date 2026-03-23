# Testing Patterns with Vitest

## Rules and Conventions

### 1. Test Framework

- **Framework:** Vitest (fast, native ESM, Vite-compatible)
- **Location:** `apps/web/tests/`
- **Naming:** `*.test.ts` or `*.test.tsx`
- **Command:** `pnpm test`

### 2. Vitest Configuration

```typescript
// apps/web/vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',  // For React/DOM testing
    setupFiles: './tests/setup.ts',  // Optional setup
  },
});
```

### 3. Test Structure

Follow AAA pattern: **Arrange, Act, Assert**

```typescript
import { describe, it, expect } from 'vitest';

describe('ComponentOrFunction', () => {
  it('should do something specific', () => {
    // Arrange: Set up test data
    const input = 'test';

    // Act: Execute the code
    const result = functionToTest(input);

    // Assert: Verify the result
    expect(result).toBe('expected');
  });
});
```

## Testing Utilities

### 1. Unit Tests (Pure Functions)

**Example: Testing codec (tests/codec.test.ts)**

```typescript
import { describe, it, expect } from 'vitest';
import { encodeState, decodeState } from '@/lib/share/codec';

describe('codec', () => {
  const sampleState = {
    mode: 'mermaid' as const,
    title: 'Test',
    content: 'graph TD\n  A-->B',
    theme: 'dark' as const,
  };

  it('should encode state to compressed string', () => {
    const encoded = encodeState(sampleState);

    expect(typeof encoded).toBe('string');
    expect(encoded.length).toBeGreaterThan(0);
  });

  it('should decode encoded state', () => {
    const encoded = encodeState(sampleState);
    const decoded = decodeState(encoded);

    expect(decoded).toEqual(sampleState);
  });

  it('should handle round-trip encoding', () => {
    const encoded = encodeState(sampleState);
    const decoded = decodeState(encoded);
    const reEncoded = encodeState(decoded);

    expect(reEncoded).toBe(encoded);
  });

  it('should return null for invalid input', () => {
    const decoded = decodeState('invalid-data');

    expect(decoded).toBeNull();
  });
});
```

### 2. Async Tests (Renderers)

**Example: Testing renderMixed (tests/renderMixed.test.ts)**

```typescript
import { describe, it, expect } from 'vitest';
import { renderMixed } from '@/components/preview/renderers/renderMixed';

describe('renderMixed', () => {
  it('should render markdown blocks', async () => {
    const content = '# Title\n\nParagraph';

    const { html, error } = await renderMixed(content, 'dark');

    expect(error).toBeUndefined();
    expect(html).toContain('<h1>Title</h1>');
    expect(html).toContain('<p>Paragraph</p>');
  });

  it('should render mermaid blocks', async () => {
    const content = '```mermaid\ngraph TD\n  A-->B\n```';

    const { html, error } = await renderMixed(content, 'dark');

    expect(error).toBeUndefined();
    expect(html).toContain('<svg');  // Mermaid renders to SVG
  });

  it('should render mixed content', async () => {
    const content = `
# Markdown Title

Some text.

\`\`\`mermaid
graph TD
  A-->B
\`\`\`

More markdown.
`;

    const { html, error } = await renderMixed(content, 'dark');

    expect(error).toBeUndefined();
    expect(html).toContain('<h1>Markdown Title</h1>');
    expect(html).toContain('<svg');
    expect(html).toContain('<p>More markdown.</p>');
  });

  it('should return error for invalid mermaid', async () => {
    const content = '```mermaid\ninvalid syntax\n```';

    const { html, error } = await renderMixed(content, 'dark');

    expect(error).toBeDefined();
    expect(html).toBe('');
  });
});
```

### 3. React Component Tests

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('should render button text', () => {
    render(<Button>Click me</Button>);

    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should handle click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    screen.getByText('Click me').click();

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should apply variant classes', () => {
    render(<Button variant="destructive">Delete</Button>);

    const button = screen.getByText('Delete');
    expect(button).toHaveClass('destructive');
  });
});
```

### 4. Zustand Store Tests

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDocStore } from '@/store/useDocStore';

describe('useDocStore', () => {
  beforeEach(() => {
    // Reset store before each test
    localStorage.clear();
  });

  it('should have default state', () => {
    const { result } = renderHook(() => useDocStore());

    expect(result.current.mode).toBe('mermaid');
    expect(result.current.theme).toBe('dark');
  });

  it('should update mode', () => {
    const { result } = renderHook(() => useDocStore());

    act(() => {
      result.current.setMode('markdown');
    });

    expect(result.current.mode).toBe('markdown');
  });

  it('should persist to localStorage', () => {
    const { result } = renderHook(() => useDocStore());

    act(() => {
      result.current.setContent('Test content');
    });

    const stored = localStorage.getItem('cipher-draw-doc-v1');
    expect(stored).toBeDefined();
    expect(JSON.parse(stored!).state.content).toBe('Test content');
  });
});
```

## Vitest Features

### 1. Mocking

```typescript
import { vi } from 'vitest';

// Mock function
const mockFn = vi.fn();
mockFn('test');
expect(mockFn).toHaveBeenCalledWith('test');

// Mock module
vi.mock('mermaid', () => ({
  default: {
    initialize: vi.fn(),
    render: vi.fn().mockResolvedValue({ svg: '<svg>...</svg>' }),
  },
}));
```

### 2. Spy

```typescript
import { vi } from 'vitest';

const obj = {
  method: () => 'original',
};

const spy = vi.spyOn(obj, 'method');
obj.method();

expect(spy).toHaveBeenCalled();
spy.mockRestore();  // Restore original implementation
```

### 3. Timer Mocks

```typescript
import { vi } from 'vitest';

it('should debounce calls', () => {
  vi.useFakeTimers();

  const fn = vi.fn();
  const debounced = debounce(fn, 300);

  debounced();
  debounced();
  debounced();

  vi.advanceTimersByTime(300);

  expect(fn).toHaveBeenCalledTimes(1);

  vi.useRealTimers();
});
```

### 4. Snapshot Testing

```typescript
it('should match snapshot', () => {
  const { container } = render(<Component />);

  expect(container).toMatchSnapshot();
});
```

## Coverage

### Running Coverage

```bash
# Run tests with coverage
pnpm test --coverage

# View coverage report
open coverage/index.html
```

### Coverage Configuration

```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'tests/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/types.ts',
      ],
    },
  },
});
```

### Coverage Targets

- **Phase 1 Target:** 70%+ coverage
- **Priority:** Utilities, renderers, share/export logic
- **Lower priority:** UI components (harder to test, less critical)

## Patterns to Follow

### 1. Test File Organization

```
tests/
├── codec.test.ts          # Share/encode utilities
├── renderMixed.test.ts    # Mixed renderer
├── renderMarkdown.test.ts # Markdown renderer (add)
├── sanitize.test.ts       # Sanitization (add)
└── setup.ts               # Test setup
```

### 2. Descriptive Test Names

```typescript
// ✅ Good: Describes what and why
it('should sanitize XSS in user input', () => {});
it('should return error for invalid mermaid syntax', () => {});
it('should persist state to localStorage', () => {});

// ❌ Bad: Vague or implementation-focused
it('works', () => {});
it('calls sanitize function', () => {});
it('test 1', () => {});
```

### 3. Test Independence

```typescript
// ✅ Good: Each test is independent
describe('Store', () => {
  beforeEach(() => {
    localStorage.clear();  // Clean state
  });

  it('test 1', () => { /* ... */ });
  it('test 2', () => { /* ... */ });
});

// ❌ Bad: Tests depend on each other
it('test 1', () => {
  store.setValue('foo');
});

it('test 2', () => {
  expect(store.value).toBe('foo');  // Depends on test 1!
});
```

### 4. Edge Cases

Always test edge cases:

```typescript
describe('sanitizeHtml', () => {
  it('should handle empty string', () => {
    expect(sanitizeHtml('')).toBe('');
  });

  it('should handle null/undefined', () => {
    expect(sanitizeHtml(null as any)).toBe('');
  });

  it('should handle very long input', () => {
    const long = 'x'.repeat(1000000);
    expect(sanitizeHtml(long)).toBeDefined();
  });

  it('should handle special characters', () => {
    expect(sanitizeHtml('<>&"\''));
  });
});
```

## Anti-Patterns (Avoid)

1. **Don't test implementation details**
```typescript
// ❌ Bad: Testing internal implementation
it('should call sanitize function', () => {
  const spy = vi.spyOn(lib, 'sanitize');
  render();
  expect(spy).toHaveBeenCalled();
});

// ✅ Good: Testing behavior
it('should render safe HTML', () => {
  const { html } = render('<script>alert("xss")</script>');
  expect(html).not.toContain('<script>');
});
```

2. **Don't skip error cases**
```typescript
// ❌ Bad: Only happy path
it('should encode state', () => {
  const encoded = encode(validState);
  expect(encoded).toBeDefined();
});

// ✅ Good: Include error cases
it('should handle invalid input', () => {
  expect(() => encode(null)).toThrow();
  expect(encode('invalid')).toBeNull();
});
```

3. **Don't make tests too complex**
```typescript
// ❌ Bad: Too many assertions
it('should do everything', () => {
  // 50 lines of setup
  // 20 assertions
  // Hard to debug when it fails
});

// ✅ Good: One concept per test
it('should encode state', () => { /* ... */ });
it('should decode state', () => { /* ... */ });
it('should handle invalid input', () => { /* ... */ });
```

## Testing Checklist

Before committing:

- [ ] All new functions have tests
- [ ] Happy path tested
- [ ] Error cases tested
- [ ] Edge cases tested (empty, null, large input)
- [ ] Async functions use `async/await`
- [ ] Tests are independent (no shared state)
- [ ] Descriptive test names
- [ ] Coverage is maintained or improved

## Related Files

- `apps/web/tests/` - Test files
- `apps/web/vitest.config.ts` - Vitest configuration
- `apps/web/package.json` - Test scripts
