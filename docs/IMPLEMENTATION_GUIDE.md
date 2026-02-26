# Implementation Guide for AI-Assisted Development

**Purpose:** This guide helps AI coding assistants (like Claude, GPT, Cursor, etc.) understand the codebase and implement features correctly.

**Last Updated:** February 27, 2026
**Current Phase:** Phase 1 (MVP Editor) - 85% Complete

---

## 🎯 Quick Context for AI Assistants

### What This Project Is
Cipher Draw is a developer-native diagramming and documentation studio that supports Markdown, Mermaid, SVG, and Mixed content with live preview, export, and sharing.

### Current Status
- **Phase:** Phase 1 (MVP Editor)
- **Progress:** 85% complete
- **Next:** Read-only view page, keyboard shortcuts, mobile responsive

### Key Architectural Decisions
1. **No backend yet** - Phase 1 is frontend-only
2. **State in localStorage** - Using Zustand with persistence
3. **URL-based sharing** - lz-string compression in hash
4. **Monaco Editor** - Same as VS Code, dynamically imported
5. **Rendering** - Client-side only, no server rendering of diagrams

---

## 📁 Codebase Structure

```
apps/web/
├── app/
│   ├── page.tsx                    # ✅ Main editor (DONE)
│   ├── layout.tsx                  # ✅ Root layout (DONE)
│   ├── globals.css                 # ✅ Global styles (DONE)
│   └── view/
│       └── [token]/
│           └── page.tsx            # ✅ Read-only view (DONE)
│
├── components/
│   ├── editor/
│   │   └── MonacoEditor.tsx        # ✅ Monaco integration (DONE)
│   ├── preview/
│   │   ├── PreviewPane.tsx         # ✅ Main preview (DONE)
│   │   └── renderers/
│   │       ├── renderMarkdown.ts   # ✅ Markdown (DONE)
│   │       ├── renderMermaid.ts    # ✅ Mermaid (DONE)
│   │       ├── renderMixed.ts      # ✅ Mixed mode (DONE)
│   │       └── renderSvg.ts        # ✅ SVG (DONE)
│   └── ui/
│       ├── button.tsx              # ✅ shadcn/ui (DONE)
│       └── select.tsx              # ✅ shadcn/ui (DONE)
│
├── lib/
│   ├── export/
│   │   ├── exportSvg.ts            # ✅ SVG export (DONE)
│   │   ├── exportPng.ts            # ✅ PNG export (DONE)
│   │   └── exportPdf.ts            # ✅ PDF export (DONE)
│   ├── share/
│   │   ├── codec.ts                # ✅ lz-string compress/decompress (DONE)
│   │   └── hash.ts                 # ✅ URL hash read/write (DONE)
│   ├── sanitize/
│   │   └── sanitize.ts             # ✅ DOMPurify wrapper (DONE)
│   ├── templates.ts                # ✅ Sample templates (DONE)
│   ├── debounce.ts                 # ✅ Debounce utility (DONE)
│   └── utils.ts                    # ✅ cn() helper (DONE)
│
├── store/
│   └── useDocStore.ts              # ✅ Zustand state (DONE)
│
├── tests/
│   ├── codec.test.ts               # ✅ Compression tests (DONE)
│   └── renderMixed.test.ts         # ✅ Mixed mode tests (DONE)
│
└── types.ts                         # ✅ TypeScript types (DONE)
```

---

## 🔑 Key Files to Understand

### 1. `app/page.tsx` (Main Editor)
**What it does:** Main application page with editor, preview, and controls

**Key patterns:**
- Uses `useDocStore()` for state management
- Loads shared state from URL hash on mount
- Handles export actions via state machine
- Three view modes: editor, split, preview
- Resizable split pane with drag handle

**State:**
```typescript
const {
  mode,        // 'markdown' | 'mermaid' | 'svg' | 'mixed'
  title,       // Document title
  content,     // Editor content
  theme,       // 'dark' | 'light'
  previewBg,   // 'dark' | 'white' | 'transparent'
  setMode, setTitle, setContent, setTheme, setPreviewBg,
  applySharedState  // Load from URL hash
} = useDocStore();
```

**Important:** No keyboard shortcuts implemented yet (TODO)

---

### 2. `store/useDocStore.ts` (State Management)
**What it does:** Zustand store with localStorage persistence

**Key points:**
- Persists to `localStorage` under key: `cipher-draw-doc-v1`
- `applySharedState()` used when loading from URL hash
- Theme changes also update `editorTheme` for Monaco

**Persisted fields:**
```typescript
{
  mode: DocMode,
  title: string,
  content: string,
  theme: ThemeMode,
  editorTheme: string,
  previewBg: PreviewBackground
}
```

---

### 3. `lib/share/hash.ts` (URL Sharing)
**What it does:** Read/write state from URL hash

**Flow:**
1. `writeStateToHash()` → compress with lz-string → update URL hash
2. `readStateFromHash()` → read hash → decompress → return state

**Usage:**
```typescript
// Write
const url = writeStateToHash({ mode, content, theme });
await navigator.clipboard.writeText(url);

// Read (on page load)
const shared = readStateFromHash();
if (shared) {
  applySharedState(shared);
}
```

---

### 4. `components/preview/PreviewPane.tsx` (Preview)
**What it does:** Renders content based on mode

**Key points:**
- Debounces render by 300ms
- Calls appropriate renderer based on mode
- Catches errors and displays them
- Reports render status via callback
- Extracts SVG for export

**Render flow:**
```typescript
useEffect(() => {
  const timer = setTimeout(async () => {
    if (mode === 'markdown') {
      html = await renderMarkdown(content);
    } else if (mode === 'mermaid') {
      svg = await renderMermaid(content, theme);
      html = `<div>${svg}</div>`;
    } // ... etc

    setHtml(html);
    onSvgChange(svg);
    onRenderStatus({ ok: true, message: 'Rendered OK' });
  }, 300);
}, [mode, content, theme]);
```

---

### 5. `components/preview/renderers/*` (Renderers)
**What they do:** Transform content to HTML/SVG

**renderMarkdown.ts:**
- Uses `remark` + `rehype` pipeline
- Plugins: remark-gfm, rehype-raw
- Returns sanitized HTML string

**renderMermaid.ts:**
- Uses `mermaid.render()` with unique ID
- Theme-aware (dark/light)
- Returns SVG string
- Catches syntax errors

**renderSvg.ts:**
- Validates and sanitizes raw SVG
- Uses DOMPurify
- Returns sanitized SVG string

**renderMixed.ts:**
- Parses Markdown for mermaid fences
- Renders Markdown normally
- Extracts and renders each mermaid block
- Injects rendered SVG back into HTML
- Returns combined HTML string

---

## 🎨 Styling System

**Framework:** Tailwind CSS

**Theme:**
- Dark mode default
- Uses `cn()` utility for conditional classes
- shadcn/ui components for buttons, selects

**Key classes:**
```css
/* Background */
bg-background, bg-slate-950, bg-slate-900

/* Text */
text-foreground, text-slate-100, text-muted-foreground

/* Borders */
border, border-slate-700

/* Interactive */
hover:bg-slate-800, focus:ring-2
```

**Dark mode toggle:**
- Controlled by `theme` state in Zustand
- Applied as class on root div: `className={theme === 'dark' && 'dark'}`

---

## 🧪 Testing

**Framework:** Vitest

**Current tests:**
- `tests/codec.test.ts` - Share codec (encode/decode)
- `tests/renderMixed.test.ts` - Mixed mode rendering

**Running tests:**
```bash
pnpm test
# or
pnpm -C apps/web test
```

**Test patterns:**
```typescript
import { describe, it, expect } from 'vitest';

describe('Feature', () => {
  it('should do something', () => {
    const result = myFunction();
    expect(result).toBe(expected);
  });
});
```

---

## 🚀 Development Workflow

### Starting dev server
```bash
pnpm dev
# or
pnpm -C apps/web dev
```

Runs at: http://localhost:3000

### Building for production
```bash
pnpm build
```

### Linting
```bash
pnpm lint
```

---

## 🔨 Implementation Patterns

### Pattern 1: Adding a New UI Feature

**Example: Adding keyboard shortcuts**

```typescript
// In app/page.tsx

useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    // Ctrl+S or Cmd+S
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      // Save logic here
      console.log('Saved!');
    }

    // Ctrl+Enter or Cmd+Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      // Force re-render
      setRenderStatus({ ok: true, message: 'Force rendered' });
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, []);
```

### Pattern 2: Adding a New Route

**Example: Creating /view/[token] page**

```typescript
// apps/web/app/view/[token]/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { PreviewPane } from '@/components/preview/PreviewPane';
import { readStateFromHash } from '@/lib/share/hash';
import type { DocState } from '@/types';

export default function ViewPage() {
  const params = useParams();
  const [state, setState] = useState<Partial<DocState> | null>(null);

  useEffect(() => {
    // Token is in URL hash, not in params
    const shared = readStateFromHash();
    if (shared) {
      setState(shared);
    }
  }, []);

  if (!state) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen flex-col">
      {/* Minimal navbar */}
      <div className="border-b px-4 py-2">
        <h1>{state.title || 'Untitled'}</h1>
      </div>

      {/* Preview only */}
      <div className="flex-1 p-4">
        <PreviewPane
          mode={state.mode || 'markdown'}
          content={state.content || ''}
          theme={state.theme || 'dark'}
          previewBg="dark"
          onSvgChange={() => {}}
          onRenderStatus={() => {}}
        />
      </div>
    </div>
  );
}
```

### Pattern 3: Adding a New Renderer

**Example: Adding D2 support**

```typescript
// components/preview/renderers/renderD2.ts

import { sanitize } from '@/lib/sanitize/sanitize';

export async function renderD2(content: string): Promise<string> {
  try {
    // Use d2-wasm or API call to render D2
    const svg = await d2Render(content);
    return sanitize(svg);
  } catch (error) {
    throw new Error(`D2 render failed: ${error.message}`);
  }
}
```

Then update PreviewPane.tsx:
```typescript
// In PreviewPane.tsx
if (mode === 'd2') {
  svg = await renderD2(content);
  nextHtml = `<div class="d2-root">${svg}</div>`;
}
```

### Pattern 4: Adding State to Store

**Example: Adding a new persisted field**

```typescript
// store/useDocStore.ts

// 1. Update types
export type DocState = {
  // ... existing fields
  newField: string;
};

// 2. Add to default state
const defaultState: DocState = {
  // ... existing
  newField: 'default value'
};

// 3. Add setter
setNewField: (value: string) => set({ newField: value })

// 4. Add to persist config
partialize: (state) => ({
  // ... existing
  newField: state.newField
})
```

---

## ⚠️ Common Pitfalls

### 1. Monaco Editor SSR Issue
❌ **Don't:** Import Monaco directly
```typescript
import Editor from '@monaco-editor/react'; // Will break SSR
```

✅ **Do:** Use dynamic import with ssr: false
```typescript
const Editor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});
```

### 2. URL Hash State
❌ **Don't:** Use params for view page
```typescript
const { token } = useParams(); // Wrong - state is in hash
```

✅ **Do:** Read from URL hash
```typescript
const shared = readStateFromHash(); // Correct
```

### 3. Mermaid Render IDs
❌ **Don't:** Reuse same ID
```typescript
mermaid.render('diagram', content); // ID collision
```

✅ **Do:** Generate unique IDs
```typescript
const id = `mermaid-${Date.now()}-${Math.random()}`;
mermaid.render(id, content);
```

### 4. Sanitization
❌ **Don't:** Inject unsanitized HTML
```typescript
<div dangerouslySetInnerHTML={{ __html: content }} />
```

✅ **Do:** Always sanitize
```typescript
import { sanitize } from '@/lib/sanitize/sanitize';
<div dangerouslySetInnerHTML={{ __html: sanitize(content) }} />
```

---

## 📦 Dependencies Reference

### Production Dependencies
```json
{
  "@monaco-editor/react": "^4.7.0",      // Editor
  "mermaid": "^11.12.0",                 // Diagram rendering
  "lz-string": "^1.5.0",                 // Compression
  "dompurify": "^3.2.6",                 // Sanitization
  "html-to-image": "^1.11.11",           // PNG export
  "jspdf": "^2.5.2",                     // PDF export
  "zustand": "^5.0.8",                   // State management
  "remark": "^15.0.1",                   // Markdown parser
  "remark-gfm": "^4.0.1",                // GitHub Flavored Markdown
  "rehype-raw": "^7.0.0",                // Raw HTML support
  "next": "^14.2.32",                    // Framework
  "react": "^18.3.1"                     // UI library
}
```

### Key API References
- **Monaco Editor:** https://microsoft.github.io/monaco-editor/api/
- **Mermaid:** https://mermaid.js.org/config/setup/modules/mermaidAPI.html
- **Zustand:** https://docs.pmnd.rs/zustand/
- **Next.js 14:** https://nextjs.org/docs/app

---

## 🎯 Priority Features (Phase 1 Completion)

### 1. View Page (`/view/[token]`) - PRIORITY 1
**Effort:** 2-3 hours
**Files to create:**
- `apps/web/app/view/[token]/page.tsx`

**Requirements:**
- Read state from URL hash
- Show read-only preview (no editor)
- Add "Fork" button → redirect to home with content
- Show title, mode badge
- Theme toggle
- Minimal navbar

**Reference:** See "Pattern 2" above

---

### 2. Keyboard Shortcuts - PRIORITY 2
**Effort:** 1-2 hours
**Files to modify:**
- `apps/web/app/page.tsx`

**Requirements:**
- `Ctrl+S` / `Cmd+S` → Save (show toast notification)
- `Ctrl+Enter` / `Cmd+Enter` → Force re-render
- Prevent default browser behavior
- Add keyboard shortcut help modal (`?` key)

**Reference:** See "Pattern 1" above

---

### 3. Mobile Responsive - PRIORITY 3
**Effort:** 3-4 hours
**Files to modify:**
- `apps/web/app/page.tsx`
- `apps/web/app/globals.css`

**Requirements:**
- Tab-based view on mobile (< 768px)
- Two tabs: "Code" and "Preview"
- Test touch interactions
- Ensure buttons are 44px min touch target
- Test on iOS Safari and Android Chrome

---

### 4. System Theme Detection - PRIORITY 4
**Effort:** 1 hour
**Files to modify:**
- `apps/web/app/page.tsx` or `apps/web/store/useDocStore.ts`

**Implementation:**
```typescript
useEffect(() => {
  const savedTheme = localStorage.getItem('cipher-draw-theme');
  if (savedTheme) return; // User has preference

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(prefersDark ? 'dark' : 'light');
}, []);
```

---

## 🔄 Updating Documentation After Implementation

**After implementing any feature, update these docs:**

1. **STATUS.md**
   - Mark task as ✅ Complete
   - Update progress percentage
   - Remove from "What's Missing" section

2. **IMPLEMENTATION_GUIDE.md** (this file)
   - Update codebase structure (❌ → ✅)
   - Add new patterns if applicable
   - Document any new conventions

3. **ROADMAP.md**
   - Update phase completion if milestone reached

4. **Git commit**
   - Reference the task in commit message
   - Example: `feat: add read-only view page (completes #1 from STATUS.md)`

---

## 📝 Commit Message Convention

```
<type>: <description>

[optional body]

[optional footer]
```

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation only
- `style:` - Formatting, missing semicolons, etc.
- `refactor:` - Code change that neither fixes a bug nor adds a feature
- `test:` - Adding or updating tests
- `chore:` - Updating build tasks, package manager configs, etc.

**Examples:**
```
feat: add read-only view page at /view/[token]

Implements read-only sharing functionality.
Users can now view shared diagrams without editing.

Closes #1 from STATUS.md
```

```
feat: add keyboard shortcuts (Ctrl+S, Ctrl+Enter)

- Ctrl+S saves to localStorage and shows toast
- Ctrl+Enter forces re-render
- Prevents default browser behavior
```

---

## 🐛 Debugging Tips

### Issue: Mermaid not rendering
**Check:**
1. Is content valid Mermaid syntax?
2. Check browser console for errors
3. Try rendering at https://mermaid.live to validate syntax
4. Check theme is passed correctly to `renderMermaid()`

### Issue: Share link doesn't work
**Check:**
1. Is URL hash present? (should start with `#`)
2. Try decoding: `console.log(readStateFromHash())`
3. Check if content is too large (>8KB compressed)
4. Verify lz-string is working: test encode → decode

### Issue: Monaco Editor blank
**Check:**
1. Is dynamic import configured correctly?
2. Check browser console for loading errors
3. Verify height is set on parent container
4. Try hard refresh (Ctrl+Shift+R)

### Issue: Export not working
**Check:**
1. For SVG/PNG: Is `svgForExport` populated?
2. For PDF: Is `previewRef.current` defined?
3. Check browser console for errors
4. Verify export library loaded (html-to-image, jspdf)

---

## 🚀 Next Phase Preview

### Phase 2: Backend Setup
**Before starting Phase 2, you must:**
1. Complete all Phase 1 tasks (see STATUS.md)
2. Initialize NestJS in `server/`
3. Set up PostgreSQL + Prisma
4. Set up Redis for sessions
5. Create Docker Compose setup

**Phase 2 first task:** Authentication system (email + OAuth)

---

*This guide is maintained for AI coding assistants. Keep it updated as the codebase evolves.*
