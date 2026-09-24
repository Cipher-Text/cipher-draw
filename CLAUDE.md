# Cipher Draw - Claude Documentation

**Last Updated:** September 25, 2026
**Project Phase:** Phase 1 (MVP Editor) - 98% Complete
**Status:** Active Development

---

## 📖 Project Overview

Cipher Draw is a developer-native diagramming and documentation studio that supports Markdown, Mermaid, SVG, and Mixed content with live preview, export, and sharing capabilities.

**Core Value Proposition:**
- Write diagrams as code (Markdown, Mermaid, SVG)
- Live preview with <300ms latency
- Export to multiple formats (SVG, PNG, PDF, MD)
- URL-based sharing without backend (Phase 1)
- Developer-first experience (Monaco editor, keyboard shortcuts, git-friendly)

**Current Status:** Frontend-only MVP with plans for backend, accounts, AI, and collaboration in future phases.

---

## 🏗️ Tech Stack

### Frontend (Active - Phase 1)
- **Framework:** Next.js 14.2+ (App Router, React 18.3)
- **Language:** TypeScript 5.9 (strict mode)
- **Editor:** Monaco Editor 4.7 (VS Code engine)
- **Diagrams:** Mermaid.js 11.12
- **Markdown:** remark + rehype ecosystem (v15+)
- **State Management:** Zustand 5.0 with localStorage persistence
- **Styling:** Tailwind CSS 3.4 + shadcn/ui components
- **Security:** DOMPurify 3.2 for HTML/SVG sanitization
- **Export:** html-to-image 1.11, jspdf 2.5
- **Sharing:** lz-string 1.5 for URL compression
- **Testing:** Vitest 2.1

### Backend (Planned - Phase 2+)
- **API:** NestJS (not started)
- **Database:** PostgreSQL + Prisma ORM
- **Cache:** Redis
- **Auth:** JWT + OAuth2 (GitHub, Google)

### Package Management
- **Manager:** pnpm 10+ (workspace/monorepo)
- **Node Version:** 20+ (recommended via nvm)

---

## 📁 Project Structure

```
cipher-draw/                      # Monorepo root
├── apps/
│   └── web/                      # Next.js 14 frontend (Phase 1 - ACTIVE)
│       ├── app/                  # Next.js App Router
│       │   ├── layout.tsx        # Root layout with theme provider
│       │   ├── page.tsx          # Main editor page
│       │   ├── globals.css       # Tailwind + CSS variables
│       │   └── view/[token]/     # Read-only view page (NEW)
│       │       └── page.tsx
│       │
│       ├── components/           # React components
│       │   ├── editor/
│       │   │   └── MonacoEditor.tsx    # Monaco wrapper
│       │   ├── preview/
│       │   │   ├── PreviewPane.tsx     # Preview container
│       │   │   └── renderers/          # Mode-specific renderers
│       │   │       ├── renderMarkdown.ts
│       │   │       ├── renderMermaid.ts
│       │   │       ├── renderSvg.ts
│       │   │       └── renderMixed.ts
│       │   └── ui/               # shadcn/ui components
│       │       ├── button.tsx
│       │       └── select.tsx
│       │
│       ├── lib/                  # Utilities
│       │   ├── debounce.ts       # Debounce utility
│       │   ├── utils.ts          # cn() and helpers
│       │   ├── templates.ts      # Mode templates
│       │   ├── sanitize/
│       │   │   └── sanitize.ts   # DOMPurify wrapper
│       │   ├── share/            # URL sharing
│       │   │   ├── codec.ts      # State encode/decode
│       │   │   └── hash.ts       # Hash read/write
│       │   └── export/           # Export utilities
│       │       ├── exportSvg.ts
│       │       ├── exportPng.ts
│       │       └── exportPdf.ts
│       │
│       ├── store/                # Zustand state
│       │   └── useDocStore.ts    # Document state store
│       │
│       ├── tests/                # Vitest tests
│       │   ├── codec.test.ts     # Share codec tests
│       │   └── renderMixed.test.ts
│       │
│       ├── types.ts              # TypeScript types
│       ├── package.json
│       ├── tsconfig.json
│       ├── tailwind.config.ts
│       ├── next.config.mjs
│       ├── vitest.config.ts
│       └── .eslintrc.json
│
├── packages/
│   └── shared/                   # Shared types (cross-package)
│       └── types.ts
│
├── server/                       # NestJS backend (Phase 2+, not started)
│   └── README.md
│
├── docs/                         # Documentation
│   ├── README.md                 # Docs index
│   ├── STATUS.md                 # Current status
│   ├── ROADMAP.md                # 5-phase roadmap
│   ├── ARCHITECTURE.md           # Technical architecture
│   ├── REQUIREMENTS.md           # Product requirements
│   ├── IMPLEMENTATION_GUIDE.md   # AI assistant guide
│   ├── WORKFLOW.md               # Dev workflow
│   ├── NEXT_FEATURES.md          # Prioritized features
│   ├── FEATURE_TIERS.md          # Feature impact matrix
│   └── PRICING.md                # Business model
│
├── .claude/                      # Claude configuration (to be created)
├── package.json                  # Root workspace config
├── pnpm-workspace.yaml           # Workspace definition
├── pnpm-lock.yaml                # Dependency lock
├── README.md                     # Main README
├── CONTRIBUTING.md               # Contribution guide
├── LICENSE                       # MIT License
└── .gitignore
```

---

## 🔑 Key Files and Their Roles

### Core Application Files

**`apps/web/app/page.tsx`**
- Main editor page
- Loads editor and preview panes
- Handles URL hash state restoration

**`apps/web/app/layout.tsx`**
- Root layout with metadata
- Theme provider setup
- Global styles injection

**`apps/web/app/view/[token]/page.tsx`** ⭐ NEW
- Read-only view for shared documents
- Decodes state from URL hash
- Fork functionality
- Export support

### State Management

**`apps/web/store/useDocStore.ts`**
- Zustand store with localStorage persistence
- Document state: `mode`, `title`, `content`, `theme`, `editorTheme`, `previewBg`
- Actions: `setMode`, `setContent`, `setTheme`, `applySharedState`, etc.
- Persistence key: `cipher-draw-doc-v1`

### Component Architecture

**`apps/web/components/editor/MonacoEditor.tsx`**
- Monaco Editor wrapper
- Language modes: `markdown`, `mermaid`, `svg` (XML), `mixed` (markdown)
- Theme sync with global theme
- Auto-save on change

**`apps/web/components/preview/PreviewPane.tsx`**
- Preview container
- Selects renderer based on mode
- Debounced rendering (300ms)
- Export functionality integration

**`apps/web/components/preview/renderers/`**
- **`renderMarkdown.ts`** - remark + rehype pipeline
- **`renderMermaid.ts`** - Mermaid.js rendering
- **`renderSvg.ts`** - Raw SVG sanitization
- **`renderMixed.ts`** - Mixed mode parser (Markdown + Mermaid blocks)

### Utilities

**`apps/web/lib/share/codec.ts`**
- State serialization/deserialization
- LZ-string compression
- Base64 encoding for URL-safe sharing

**`apps/web/lib/share/hash.ts`**
- `writeStateToHash()` - Write state to URL hash
- `readStateFromHash()` - Read state from URL hash

**`apps/web/lib/sanitize/sanitize.ts`**
- DOMPurify wrapper
- Sanitizes HTML/SVG before rendering
- Prevents XSS attacks

**`apps/web/lib/export/`**
- **`exportSvg.ts`** - Extract SVG from preview
- **`exportPng.ts`** - html-to-image conversion
- **`exportPdf.ts`** - jspdf generation

**`apps/web/lib/templates.ts`**
- `getTemplateForMode()` - Returns starter template for each mode
- Sample content for quick start

### Type Definitions

**`apps/web/types.ts`**
```typescript
export type DocMode = 'markdown' | 'mermaid' | 'svg' | 'mixed';
export type ThemeMode = 'dark' | 'light';
export type PreviewBackground = 'transparent' | 'white' | 'dark';

export type DocState = {
  mode: DocMode;
  title: string;
  content: string;
  theme: ThemeMode;
  editorTheme: string;
  previewBg: PreviewBackground;
};

export type RenderStatus = {
  ok: boolean;
  message: string;
};
```

### Configuration

**`apps/web/tsconfig.json`**
- TypeScript strict mode
- Path alias: `@/*` maps to `./`
- Target: ES2022
- Module resolution: bundler

**`apps/web/tailwind.config.ts`**
- Dark mode: class-based
- Content: `app/**`, `components/**`, `lib/**`, `store/**`
- Custom color variables using HSL

**`apps/web/next.config.mjs`**
- Next.js configuration
- (Currently minimal, default settings)

**`apps/web/.eslintrc.json`**
- Extends `next/core-web-vitals` and `next/typescript`

---

## 🛠️ Build, Run, and Test Commands

### Development
```bash
# Install dependencies (from root)
pnpm install

# Start dev server (from root)
pnpm dev                          # Runs apps/web dev script
# OR
pnpm -C apps/web dev              # Explicit workspace command

# Start dev server (from apps/web/)
cd apps/web && pnpm dev

# Runs on: http://localhost:3000
```

### Build
```bash
# Build for production (from root)
pnpm build

# Build from apps/web
cd apps/web && pnpm build
```

### Testing
```bash
# Run all tests (from root)
pnpm test

# Run tests in watch mode
cd apps/web && pnpm test --watch

# Run tests with coverage
cd apps/web && pnpm test --coverage
```

### Linting
```bash
# Lint (from root)
pnpm lint

# Lint from apps/web
cd apps/web && pnpm lint
```

### Package Management
```bash
# Add dependency to web app
pnpm -C apps/web add <package>

# Add dev dependency
pnpm -C apps/web add -D <package>

# Update dependencies
pnpm update
```

---

## 🎨 Architecture Decisions and Patterns

### 1. Monorepo with pnpm Workspaces
**Decision:** Use pnpm workspaces for code sharing and future scalability.
**Rationale:**
- Phase 1 is frontend-only but Phase 2+ needs backend
- Shared types between frontend/backend
- pnpm is fast and efficient with disk space

### 2. Next.js 14 App Router
**Decision:** Use App Router (not Pages Router).
**Rationale:**
- Modern React patterns (Server Components, streaming)
- Better TypeScript support
- Future-proof for Phase 2+ features

### 3. Client-Side State (Zustand + localStorage)
**Decision:** Phase 1 has no backend; all state is client-side.
**Rationale:**
- Fast to implement
- Works offline
- Phase 2 will migrate to server-side persistence
- localStorage persists across sessions

### 4. URL-Based Sharing (Hash Compression)
**Decision:** Share documents via compressed URL hash.
**Rationale:**
- No backend needed for Phase 1
- Instant sharing without server round-trip
- Base64 + LZ-string keeps URLs under 8KB for most docs
- Phase 2 will add server-side short links

### 5. Mode-Based Rendering
**Decision:** Separate renderers for each mode (Markdown, Mermaid, SVG, Mixed).
**Rationale:**
- Clean separation of concerns
- Easy to test independently
- Each mode has unique requirements
- Mixed mode composes Markdown + Mermaid

### 6. Security-First Sanitization
**Decision:** All rendered HTML/SVG passes through DOMPurify.
**Rationale:**
- Prevents XSS attacks
- Users can paste untrusted content
- Required for SVG and Markdown raw HTML
- No exceptions to sanitization

### 7. Monaco Editor (VS Code Engine)
**Decision:** Use Monaco instead of CodeMirror or others.
**Rationale:**
- Industry-standard (VS Code uses it)
- Excellent TypeScript support
- Syntax highlighting for all modes
- Familiar to developers

### 8. Debounced Rendering (300ms)
**Decision:** Debounce preview updates by 300ms.
**Rationale:**
- Prevents excessive re-renders
- Mermaid rendering is expensive
- Smooth typing experience
- Good balance between responsiveness and performance

### 9. Tailwind CSS + shadcn/ui
**Decision:** Utility-first CSS with pre-built components.
**Rationale:**
- Fast development
- Consistent design system
- Easy theme customization
- No CSS-in-JS runtime overhead

### 10. Vitest for Testing
**Decision:** Use Vitest instead of Jest.
**Rationale:**
- Native ESM support
- Faster than Jest
- Vite-compatible
- Modern developer experience

---

## 📐 Coding Conventions

### TypeScript
- **Strict mode enabled:** All type checking enabled
- **No `any`:** Use specific types or `unknown`
- **Explicit return types:** For exported functions
- **Type imports:** Use `import type` for type-only imports

### File Naming
- **Components:** PascalCase (`MonacoEditor.tsx`)
- **Utilities:** camelCase (`debounce.ts`, `sanitize.ts`)
- **Types:** camelCase (`types.ts`)
- **Tests:** `*.test.ts` or `*.test.tsx`

### Component Structure
```typescript
'use client'; // If client component

import { ... } from '...'; // External imports first
import { ... } from '@/...'; // Internal imports second

import type { ... } from '...'; // Type imports last

// Types
type Props = {
  ...
};

// Component
export function Component({ ...props }: Props) {
  // Hooks
  // Event handlers
  // Render
}
```

### State Management
- **Zustand store:** Single source of truth for document state
- **No prop drilling:** Use store hooks directly
- **Persistence:** Use `persist` middleware for localStorage
- **Actions:** Named setters in store (e.g., `setMode`, `setContent`)

### Styling
- **Tailwind classes:** Use `cn()` utility for conditional classes
- **CSS variables:** Define in `globals.css`, reference in Tailwind config
- **Dark mode:** Use `dark:` prefix in Tailwind
- **Responsive:** Mobile-first with `sm:`, `md:`, `lg:` breakpoints

### Error Handling
- **Rendering errors:** Return `{ ok: false, message: '...' }`
- **Share/export errors:** Show toast or error UI
- **Graceful degradation:** App should never crash

### Testing
- **Unit tests:** For utilities and renderers
- **Integration tests:** For complex flows (codec, mixed mode)
- **Coverage target:** 70%+ by Phase 1 completion

---

## 🔐 Security Considerations

### XSS Prevention
- **All HTML/SVG sanitized:** via DOMPurify before rendering
- **React JSX escaping:** Automatic for text content
- **No `dangerouslySetInnerHTML`:** Except with sanitized content

### URL Sharing Security
- **Client-side only:** No server sees shared content in Phase 1
- **Compressed state:** LZ-string compression, Base64 encoding
- **No sensitive data:** URLs can be logged by browsers/proxies

### Future Auth (Phase 2+)
- **JWT tokens:** HTTP-only cookies
- **OAuth2:** GitHub, Google
- **Password hashing:** bcrypt with high cost factor

---

## 🚀 Environment Setup

### Prerequisites
```bash
# Node.js 20+ (use nvm for version management)
nvm install 20
nvm use 20

# pnpm 10+
npm install -g pnpm@latest

# Verify versions
node --version   # Should be 20+
pnpm --version   # Should be 10+
```

### Installation
```bash
# Clone repository
git clone https://github.com/your-org/cipher-draw.git
cd cipher-draw

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Environment Variables (Phase 1)
None required. Phase 2+ will use `.env.local` for API keys, database URLs, etc.

**Example `.env.example` (for Phase 2+):**
```bash
# Database
DATABASE_URL="postgresql://..."

# Auth
JWT_SECRET="..."
GITHUB_CLIENT_ID="..."
GITHUB_CLIENT_SECRET="..."

# Optional: AI providers (BYOAI)
# (Keys stored in browser localStorage, not server)
```

---

## 📊 Performance Targets

### Current Metrics (Phase 1 - Dev)
- Initial load: ~2s
- Editor-to-preview latency: <300ms
- Bundle size: ~280KB first load (Monaco is large)
- Lighthouse: ~95 (needs production test)

### Targets for Phase 1 Launch
- Initial load: <2s on 3G
- Render latency: <300ms
- Lighthouse: 90+ all metrics (Performance, Accessibility, Best Practices, SEO)

### Optimization Strategies
- **Code splitting:** Monaco loaded on demand
- **Lazy loading:** Preview renderers load when needed
- **Memoization:** Debounced rendering, React.memo for expensive components
- **Bundle analysis:** Use `@next/bundle-analyzer` before production

---

## 🐛 Known Issues and Limitations

### Phase 1 Known Issues

1. **URL Length Limit**
   - **Issue:** Hash-based sharing fails for very large documents (>8KB)
   - **Workaround:** Phase 2 will add server-side save with short tokens
   - **Impact:** ~5% of use cases

2. **Mobile Layout**
   - **Issue:** Split panes may break on small screens (<768px)
   - **Status:** Needs testing
   - **Fix:** Tab-based view for mobile

3. **No Keyboard Shortcuts**
   - **Issue:** Developers expect `Ctrl+S`, `Ctrl+Enter`
   - **Status:** Not implemented
   - **Priority:** P0 (blocking launch)

4. **System Theme Detection**
   - **Issue:** No auto-detection of OS theme preference
   - **Workaround:** Manual theme toggle
   - **Priority:** P1 (nice-to-have)

### Architectural Limitations (Phase 1)

- **No persistence across devices:** localStorage is per-browser
- **No version history:** Single state snapshot
- **No collaboration:** Single-user only
- **No auth:** Anyone with URL can view shared docs

These will be addressed in Phase 2+.

---

## 📖 Related Documentation

### Internal Docs (in `docs/`)
- **[STATUS.md](docs/STATUS.md)** - Current implementation status, next tasks
- **[ROADMAP.md](docs/ROADMAP.md)** - 5-phase strategic roadmap
- **[ARCHITECTURE.md](docs/ARCHITECTURE.md)** - Technical architecture deep dive
- **[IMPLEMENTATION_GUIDE.md](docs/IMPLEMENTATION_GUIDE.md)** - AI assistant guide with patterns
- **[WORKFLOW.md](docs/WORKFLOW.md)** - Development workflow and doc sync
- **[NEXT_FEATURES.md](docs/NEXT_FEATURES.md)** - Prioritized feature list
- **[REQUIREMENTS.md](docs/REQUIREMENTS.md)** - Product requirements (PRD)
- **[PRICING.md](docs/PRICING.md)** - Business model and pricing tiers

### External Links
- [Next.js 14 Documentation](https://nextjs.org/docs)
- [Monaco Editor API](https://microsoft.github.io/monaco-editor/)
- [Mermaid.js Syntax](https://mermaid.js.org/)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vitest Guide](https://vitest.dev/guide/)

---

## 🎯 Current Focus (Phase 1 Completion)

### Next Tasks (1 day to beta)
1. ✅ Read-only view page - COMPLETE
2. ✅ Fork functionality - COMPLETE
3. ✅ Keyboard shortcuts (`Ctrl+S`, `Ctrl+Enter`) - COMPLETE
4. ✅ Share link feedback (`Copied!` button state) - COMPLETE
5. ✅ Remove debug toolbar (`Phase 2 flags` line in page.tsx) - COMPLETE
6. ✅ Mobile responsive layout - COMPLETE (tab-based fallback, 44px touch targets; real-device QA still pending)
7. ✅ CI/CD pipeline (GitHub Actions) - COMPLETE
8. ⚠️ Vercel deployment - config ready (`vercel.json`), dashboard linking pending (needs account access)

### Phase 2+ (After Launch)
- Backend API (NestJS)
- User accounts and auth
- Document persistence and version history
- Workspace/folder organization
- AI layer (BYOAI - Bring Your Own AI)
- Real-time collaboration
- GitHub/GitLab sync
- REST API and webhooks

---

## 💡 Development Tips for Claude

### When Adding Features
1. Check `docs/STATUS.md` for current priorities
2. Read `docs/IMPLEMENTATION_GUIDE.md` for patterns
3. Follow coding conventions in this doc
4. Add tests for new utilities/renderers
5. Update relevant docs (STATUS.md, WORKFLOW.md)

### When Debugging
1. Check browser console for React/Monaco errors
2. Verify DOMPurify isn't stripping needed content
3. Test with different modes (Markdown, Mermaid, SVG, Mixed)
4. Check localStorage state: `cipher-draw-doc-v1`

### When Refactoring
1. Preserve share-link backward compatibility
2. Don't break existing tests
3. Keep renderers mode-isolated
4. Maintain sanitization layer

---

## 📞 Support and Community

- **Documentation:** [docs/README.md](docs/README.md)
- **Bug Reports:** GitHub Issues
- **Discussions:** GitHub Discussions
- **Contributing:** [CONTRIBUTING.md](CONTRIBUTING.md)

---

**Built with ❤️ for developers who think in diagrams**
