# Next.js 14 App Router Patterns

## Rules and Conventions

### 1. App Router Structure
- **Use App Router** (not Pages Router)
- Place pages in `app/` directory
- File-based routing: `app/page.tsx` = `/`, `app/view/[token]/page.tsx` = `/view/[token]`
- Layouts: `app/layout.tsx` for root layout

### 2. Client vs Server Components
- **Default:** Server Components (no `'use client'`)
- **Client Components:** Add `'use client'` directive at top for:
  - Interactive UI (useState, useEffect)
  - Browser APIs (window, localStorage)
  - Event handlers
  - Third-party libraries that use hooks (Monaco, Zustand)

**Example:**
```typescript
'use client';

import { useState } from 'react';
import { useDocStore } from '@/store/useDocStore';

export function Component() {
  const [state, setState] = useState();
  const docState = useDocStore();
  // ...
}
```

### 3. Metadata
- Use `metadata` export in pages/layouts for SEO
```typescript
export const metadata = {
  title: 'Cipher Draw - Diagram Editor',
  description: 'Developer-native diagramming tool',
};
```

### 4. Dynamic Routes
- Use `[param]` for dynamic segments
- Access via `params` prop:
```typescript
export default function Page({ params }: { params: { token: string } }) {
  // params.token contains the URL parameter
}
```

### 5. Loading and Error States
- `loading.tsx` for loading UI
- `error.tsx` for error boundaries
- Use `<Suspense>` for granular loading

### 6. Path Aliases
- Use `@/` for imports: `import { foo } from '@/lib/utils'`
- Configured in `tsconfig.json`: `"@/*": ["./*"]`

## Patterns to Follow

### Page Structure
```typescript
// app/page.tsx
import { Component } from '@/components/Component';

export const metadata = {
  title: 'Page Title',
};

export default function Page() {
  return (
    <main>
      <Component />
    </main>
  );
}
```

### Layout Structure
```typescript
// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'App Name',
  description: 'App description',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

## Anti-Patterns (Avoid)

1. **Don't mix Pages Router and App Router**
2. **Don't use `'use client'` unnecessarily** - keep server components when possible
3. **Don't access browser APIs in server components** - will fail at build time
4. **Don't forget path alias** - use `@/` instead of relative `../../`

## Next.js Specific Features Used

### In This Project
- **App Router** for routing
- **Dynamic routes** for `/view/[token]`
- **Client components** for interactive UI
- **Metadata** for SEO
- **Global CSS** in `app/globals.css`

### Not Used (Phase 2+)
- Server Actions (for backend features)
- Route Handlers (`route.ts`) for API endpoints
- Middleware for auth
- Image optimization (`next/image`)

## Build and Dev Commands

```bash
# Development
pnpm dev                 # Start dev server (port 3000)

# Build
pnpm build               # Production build
pnpm start               # Start production server

# Lint
pnpm lint                # Run ESLint
```

## Configuration Files

- **`next.config.mjs`** - Next.js configuration
- **`tsconfig.json`** - TypeScript + path aliases
- **`tailwind.config.ts`** - Tailwind CSS
- **`.eslintrc.json`** - ESLint rules

## When to Apply This Skill

- Creating new pages or routes
- Converting components to client/server
- Setting up layouts
- Configuring Next.js features
- Debugging routing or rendering issues
