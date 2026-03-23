# Zustand State Management Patterns

## Rules and Conventions

### 1. Store Definition
- Use `create` from 'zustand'
- Use `persist` middleware for localStorage
- Define TypeScript types for state and actions
- Export `useStore` hook

**Pattern:**
```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type State = {
  value: string;
};

type Actions = {
  setValue: (value: string) => void;
};

export type Store = State & Actions;

export const useStore = create<Store>()(
  persist(
    (set) => ({
      // Initial state
      value: 'default',

      // Actions
      setValue: (value) => set({ value }),
    }),
    {
      name: 'storage-key',
      partialize: (state) => ({
        // Only persist these fields
        value: state.value,
      }),
    }
  )
);
```

### 2. Document Store Pattern (apps/web/store/useDocStore.ts)

```typescript
type DocState = {
  mode: DocMode;
  title: string;
  content: string;
  theme: ThemeMode;
  editorTheme: string;
  previewBg: PreviewBackground;
};

type DocActions = {
  setMode: (mode: DocMode) => void;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setTheme: (theme: ThemeMode) => void;
  applySharedState: (state: Partial<DocState>) => void;
};

export type DocStore = DocState & DocActions;

export const useDocStore = create<DocStore>()(
  persist(
    (set) => ({
      // Default state
      mode: 'mermaid',
      title: 'Untitled',
      content: getTemplateForMode('mermaid'),
      theme: 'dark',
      editorTheme: 'vs-dark',
      previewBg: 'dark',

      // Actions
      setMode: (mode) => set({ mode }),
      setTitle: (title) => set({ title }),
      setContent: (content) => set({ content }),
      setTheme: (theme) =>
        set({
          theme,
          editorTheme: theme === 'dark' ? 'vs-dark' : 'vs-light'
        }),
      applySharedState: (state) =>
        set((prev) => ({ ...prev, ...state })),
    }),
    {
      name: 'cipher-draw-doc-v1',
      partialize: (state) => ({
        mode: state.mode,
        title: state.title,
        content: state.content,
        theme: state.theme,
        editorTheme: state.editorTheme,
        previewBg: state.previewBg,
      }),
    }
  )
);
```

### 3. Using the Store in Components

**Subscribe to specific state:**
```typescript
'use client';

import { useDocStore } from '@/store/useDocStore';

export function Component() {
  const mode = useDocStore((state) => state.mode);
  const theme = useDocStore((state) => state.theme);

  // Only re-renders when mode or theme change
}
```

**Subscribe to all state:**
```typescript
const docState = useDocStore();
```

**Access actions:**
```typescript
const setMode = useDocStore((state) => state.setMode);
const setContent = useDocStore((state) => state.setContent);

// Use in handler
<button onClick={() => setMode('markdown')}>
  Switch to Markdown
</button>
```

**Selective subscription pattern:**
```typescript
// ✅ Good: Only subscribes to needed state
const { mode, content, setMode } = useDocStore((state) => ({
  mode: state.mode,
  content: state.content,
  setMode: state.setMode,
}));

// ❌ Bad: Subscribes to entire store
const docStore = useDocStore();
```

## Patterns to Follow

### 1. Action Naming
- Use `setX` for simple setters: `setMode`, `setTheme`
- Use verbs for complex actions: `applySharedState`, `loadTemplate`
- Keep actions focused and composable

### 2. Persistence Strategy
- Use `partialize` to control what gets persisted
- Don't persist derived state or large objects
- Use meaningful storage keys: `cipher-draw-doc-v1`

### 3. State Updates
```typescript
// Simple update
setMode: (mode) => set({ mode })

// Multiple fields
setTheme: (theme) => set({
  theme,
  editorTheme: theme === 'dark' ? 'vs-dark' : 'vs-light'
})

// Based on previous state
increment: () => set((state) => ({ count: state.count + 1 }))

// Partial updates
applySharedState: (state) => set((prev) => ({ ...prev, ...state }))
```

## Anti-Patterns (Avoid)

1. **Don't mutate state directly**
```typescript
// ❌ Bad
const store = useDocStore();
store.content = 'new content';  // Won't work!

// ✅ Good
const setContent = useDocStore((state) => state.setContent);
setContent('new content');
```

2. **Don't subscribe to entire store unnecessarily**
```typescript
// ❌ Bad: Re-renders on any state change
const docStore = useDocStore();

// ✅ Good: Only re-renders when mode changes
const mode = useDocStore((state) => state.mode);
```

3. **Don't use hooks outside components**
```typescript
// ❌ Bad
import { useDocStore } from '@/store/useDocStore';
const mode = useDocStore((state) => state.mode);  // Outside component!

export function doSomething() {
  // ...
}

// ✅ Good
export function doSomething(mode: DocMode) {
  // Pass state as parameter
}
```

4. **Don't create multiple stores for related state**
```typescript
// ❌ Bad
export const useModeStore = create(...)
export const useContentStore = create(...)
export const useThemeStore = create(...)

// ✅ Good
export const useDocStore = create({
  mode: ...,
  content: ...,
  theme: ...,
})
```

## Zustand Middleware

### Persist
```typescript
import { persist } from 'zustand/middleware';

create<Store>()(
  persist(
    (set) => ({ /* state and actions */ }),
    {
      name: 'storage-key',
      partialize: (state) => ({ /* fields to persist */ }),
    }
  )
)
```

### Version Migration (if needed)
```typescript
persist(
  (set) => ({ /* state */ }),
  {
    name: 'storage-key',
    version: 1,
    migrate: (persistedState: any, version: number) => {
      if (version === 0) {
        // Migrate from v0 to v1
        return {
          ...persistedState,
          newField: 'default',
        };
      }
      return persistedState;
    },
  }
)
```

## Testing Zustand Stores

```typescript
import { renderHook, act } from '@testing-library/react';
import { useDocStore } from './useDocStore';

describe('useDocStore', () => {
  beforeEach(() => {
    // Reset store before each test
    localStorage.clear();
  });

  it('should set mode', () => {
    const { result } = renderHook(() => useDocStore());

    act(() => {
      result.current.setMode('markdown');
    });

    expect(result.current.mode).toBe('markdown');
  });
});
```

## When to Apply This Skill

- Creating new Zustand stores
- Adding state or actions to existing store
- Fixing re-render issues (optimize selectors)
- Implementing persistence
- Debugging state management issues
- Migrating from other state libraries

## Common Patterns in This Project

### URL State Sync
```typescript
// In app/page.tsx
useEffect(() => {
  if (typeof window !== 'undefined') {
    const state = readStateFromHash();
    if (state) {
      applySharedState(state);
    }
  }
}, []);
```

### Computed Values (Don't Store)
```typescript
// ❌ Bad: Storing derived state
export const useDocStore = create({
  mode: 'mermaid',
  isMarkdownMode: false,  // Derived!
});

// ✅ Good: Compute in component
const mode = useDocStore((state) => state.mode);
const isMarkdownMode = mode === 'markdown';
```

## Related Files

- `apps/web/store/useDocStore.ts` - Document state store
- `apps/web/types.ts` - State type definitions
