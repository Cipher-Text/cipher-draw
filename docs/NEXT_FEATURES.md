# Next Features to Implement

**Purpose:** Prioritized list of features to build next, based on code analysis and product strategy

**Last Updated:** February 27, 2026
**Current Phase:** Phase 1 (MVP Editor) - 85% Complete

---

## 🎯 Immediate Priority (Complete Phase 1)

### Critical Path to Public Beta (1-2 days)

#### 1. ✅ IMPLEMENT FIRST: Read-Only View Page
**Effort:** 2-3 hours | **Impact:** 🔥🔥🔥 Critical | **Priority:** P0

**Why this matters:**
- URL sharing is useless without a view page
- 50% of the value prop (share → view → fork)
- Blocking public launch

**What to build:**
```
Route: /view/[token]
- Decode state from URL hash
- Show preview only (no editor)
- Add "Fork to Editor" button
- Show document title and mode
- Theme toggle
- Minimal chrome
```

**Files to create:**
- `apps/web/app/view/[token]/page.tsx`

**Reference:** See IMPLEMENTATION_GUIDE.md → Pattern 2

**Success criteria:**
- Share link from main page → opens view page
- View page shows correct content
- Fork button copies content to editor
- Works on mobile

---

#### 2. ✅ IMPLEMENT SECOND: Keyboard Shortcuts
**Effort:** 1-2 hours | **Impact:** 🔥🔥 High | **Priority:** P0

**Why this matters:**
- Developers expect keyboard shortcuts
- Quality-of-life feature that shows polish
- Very quick to implement

**What to build:**
```
Shortcuts:
- Ctrl+S / Cmd+S → Save to localStorage, show toast
- Ctrl+Enter / Cmd+Enter → Force re-render
- ? → Show keyboard shortcuts help modal
- Esc → Close modals
```

**Files to modify:**
- `apps/web/app/page.tsx`

**Reference:** See IMPLEMENTATION_GUIDE.md → Pattern 1

**Success criteria:**
- All shortcuts work on Windows/Mac
- Toast notification appears on save
- Help modal lists all shortcuts
- Doesn't interfere with browser defaults

---

#### 3. ⚠️ TEST: Mobile Responsive
**Effort:** 3-4 hours | **Impact:** 🔥🔥 High | **Priority:** P0

**Why this matters:**
- Shared links opened on phones must work
- 30-40% of traffic will be mobile
- Current layout probably breaks

**What to build:**
```
Mobile layout (< 768px):
- Tab-based view (Code | Preview)
- No split pane (too small)
- Touch-friendly buttons (44px min)
- Collapsible toolbar
- Test share/export on mobile
```

**Files to modify:**
- `apps/web/app/page.tsx`
- `apps/web/app/globals.css`

**Testing required:**
- iOS Safari
- Android Chrome
- Test touch drag on split pane
- Test all export functions
- Test share link generation

**Success criteria:**
- Layout doesn't break on 375px width
- All buttons tappable
- Tab switching smooth
- Export works on mobile browsers

---

#### 4. 🔧 SETUP: CI/CD Pipeline
**Effort:** 2-3 hours | **Impact:** 🔥 Medium | **Priority:** P0

**Why this matters:**
- Catches bugs before production
- Required for team development
- Shows project maturity

**What to build:**
```
GitHub Actions workflow:
- Lint (ESLint + Prettier)
- Type check (TypeScript)
- Test (Vitest)
- Build (Next.js)
- Deploy preview (Vercel)
```

**Files to create:**
- `.github/workflows/ci.yml`

**Success criteria:**
- Workflow runs on every PR
- Fails if lint/test/build fails
- Preview URL posted on PR
- Badge in README shows build status

---

#### 5. 🚀 DEPLOY: Vercel Production
**Effort:** 1 hour | **Impact:** 🔥 Medium | **Priority:** P0

**Why this matters:**
- Need live URL for testing and sharing
- Required for public beta launch

**What to configure:**
```
Vercel setup:
- Connect GitHub repo
- Set build command: cd apps/web && pnpm build
- Set output directory: apps/web/.next
- Add environment variables
- Configure custom domain (if available)
```

**Success criteria:**
- Production URL live
- Preview deployments work on PRs
- Environment variables set correctly

---

## ⏭️ Phase 1 Polish (Nice to Have)

#### 6. System Theme Detection
**Effort:** 1 hour | **Impact:** Medium | **Priority:** P1

Detect OS dark/light preference on first visit. Low effort, nice UX improvement.

---

#### 7. Loading Indicators
**Effort:** 1 hour | **Impact:** Low | **Priority:** P2

Show spinner when rendering large diagrams (>500ms). Polish feature.

---

#### 8. Better Error Messages
**Effort:** 2 hours | **Impact:** Medium | **Priority:** P1

Map common Mermaid errors to helpful messages. Improves new user experience.

---

#### 9. Unsaved Changes Warning
**Effort:** 30 min | **Impact:** High | **Priority:** P1

Warn before closing tab with unsaved changes. Prevents data loss.

---

#### 10. Toast Notifications
**Effort:** 2 hours | **Impact:** Medium | **Priority:** P1

Add toast library (react-hot-toast or sonner) for better feedback:
- "Saved successfully"
- "Link copied to clipboard"
- "Export complete"

---

## 🚀 After Phase 1: High-Impact Quick Wins

### Phase 1.5 Features (Before Phase 2 Backend)

#### A. Offline PWA Support
**Effort:** 4-6 hours | **Impact:** 🌟🌟🌟 Amazing | **Priority:** P1

**Why this is amazing:**
- Works on flights, no internet needed
- Differentiator (most tools need internet)
- Shows technical excellence

**What to build:**
```
PWA setup:
- Service worker for offline caching
- Install prompt ("Add to Home Screen")
- Offline mode indicator
- Cache recent documents
- Background sync when online
```

**Files:**
- `public/manifest.json`
- `apps/web/service-worker.ts`
- Update `next.config.js`

**Success criteria:**
- App installs on mobile/desktop
- Works offline after first load
- Syncs changes when back online

---

#### B. URL Shortener Integration
**Effort:** 2 hours | **Impact:** Medium | **Priority:** P2

**Why useful:**
- Current hash URLs are very long
- Short URLs easier to share
- Professional appearance

**What to build:**
```
Options:
1. Use free service (bit.ly API, tinyurl)
2. Build simple shortener (Phase 2 when backend ready)

For now: integrate bit.ly
- On share click, shorten URL
- Copy shortened URL to clipboard
- Still works with full URL (backwards compatible)
```

**Files to modify:**
- `apps/web/app/page.tsx` (share handler)
- Add `lib/shortener.ts`

---

#### C. Export Queue with Progress
**Effort:** 3 hours | **Impact:** Medium | **Priority:** P2

**Why useful:**
- Better UX for large exports
- Shows what's happening
- Allows cancellation

**What to build:**
```
Export improvements:
- Progress bar during export
- Cancel button
- Export history (last 5 exports)
- Batch export (export all at once)
```

---

#### D. Diagram Templates Library
**Effort:** 4-5 hours | **Impact:** High | **Priority:** P1

**Why high impact:**
- Lowers barrier to entry
- Most users start from template, not blank
- Great onboarding experience

**What to build:**
```
Template categories:
- System Architecture (microservices, monolith, serverless)
- Database (ER diagrams, schema)
- Flowcharts (process flows, decision trees)
- Sequence Diagrams (API calls, auth flows)
- Class Diagrams (OOP structures)

UI:
- Template browser modal
- Preview thumbnails
- Search/filter
- "Use Template" button
```

**Files to create:**
- `lib/templates/` directory with template files
- `components/TemplateModal.tsx`
- Update `lib/templates.ts`

---

#### E. Diagram Gallery / Examples
**Effort:** 2 hours | **Impact:** Medium | **Priority:** P2

**Why useful:**
- Showcases what's possible
- Helps users learn syntax
- SEO benefit

**What to build:**
```
Gallery page:
- Curated examples (10-15 diagrams)
- Each with title, description, syntax
- "Fork this" button
- Filter by type

Route: /examples
```

**Files to create:**
- `apps/web/app/examples/page.tsx`
- `data/examples.ts`

---

## 🎨 UX Improvements (Low Effort, High Polish)

#### F. Command Palette (Cmd+K)
**Effort:** 4-6 hours | **Impact:** High | **Priority:** P1

**Why developers love this:**
- VS Code users expect it
- Fast navigation
- Keyboard-centric workflow

**What to build:**
```
Commands:
- Switch mode
- Export (SVG, PNG, PDF)
- Share link
- Load template
- Toggle theme
- Toggle view mode

Use library: cmdk or kbar
```

---

#### G. Monaco Editor Enhancements
**Effort:** 2-3 hours | **Impact:** Medium | **Priority:** P2

**What to build:**
```
Enhancements:
- Mermaid syntax autocomplete
- Custom snippets (diagram starters)
- Error highlighting for Mermaid
- Minimap (optional toggle)
```

**Files to modify:**
- `components/editor/MonacoEditor.tsx`

---

#### H. Preview Zoom Controls
**Effort:** 2 hours | **Impact:** Medium | **Priority:** P2

**What to build:**
```
Zoom controls:
- Zoom in/out buttons
- Reset zoom (100%)
- Fit to screen
- Zoom slider
- Mouse wheel zoom (with Ctrl)
```

---

## 📊 Analytics & Insights (Phase 1.5)

#### I. Privacy-Friendly Analytics
**Effort:** 1 hour | **Impact:** Medium | **Priority:** P1

**What to build:**
```
Track (no PII):
- Page views
- Mode usage (which modes are popular)
- Export actions
- Share link generation
- Error rates

Use: Plausible (privacy-friendly)
or PostHog (self-hostable)
```

**Files to modify:**
- `apps/web/app/layout.tsx` (add analytics script)
- Environment variables

---

#### J. Local Usage Stats
**Effort:** 2 hours | **Impact:** Low | **Priority:** P3

**What to build:**
```
Show user:
- Total diagrams created (localStorage count)
- Most used mode
- Total exports
- Total shares

Display in: Settings or profile page (future)
```

---

## 🔥 High-Impact Phase 2 Preview

**Once Phase 1 is 100% complete, these are the highest-impact Phase 2 features:**

### 1. Backend + Auth (Required for Phase 2)
**Effort:** 2-3 weeks
- NestJS API setup
- PostgreSQL + Prisma
- JWT authentication
- Email + GitHub OAuth
- User CRUD

### 2. Document Save System
**Effort:** 1 week
- Auto-save
- Document list
- Search/filter
- Visibility settings

### 3. Spaces (Workspaces)
**Effort:** 1 week
- Create/manage spaces
- Assign documents to spaces
- Space-level sharing

---

## 📈 Feature Impact Analysis

| Feature | Effort | Impact | Priority | Phase |
|---|---|---|---|---|
| **View Page** | 2-3h | 🔥🔥🔥 Critical | P0 | 1 |
| **Keyboard Shortcuts** | 1-2h | 🔥🔥 High | P0 | 1 |
| **Mobile Responsive** | 3-4h | 🔥🔥 High | P0 | 1 |
| **CI/CD** | 2-3h | 🔥 Medium | P0 | 1 |
| **Vercel Deploy** | 1h | 🔥 Medium | P0 | 1 |
| **Offline PWA** | 4-6h | 🌟🌟🌟 Amazing | P1 | 1.5 |
| **Template Library** | 4-5h | 🔥🔥 High | P1 | 1.5 |
| **Command Palette** | 4-6h | 🔥🔥 High | P1 | 1.5 |
| **Toast Notifications** | 2h | 🔥 Medium | P1 | 1.5 |
| **System Theme Detect** | 1h | 🔥 Medium | P1 | 1 |
| **Better Error Messages** | 2h | 🔥 Medium | P1 | 1 |
| **Unsaved Warning** | 30m | 🔥🔥 High | P1 | 1 |
| **Analytics** | 1h | 🔥 Medium | P1 | 1.5 |
| **Preview Zoom** | 2h | 🔥 Medium | P2 | 1.5 |
| **Examples Gallery** | 2h | 🔥 Medium | P2 | 1.5 |
| **URL Shortener** | 2h | 🔥 Low | P2 | 1.5 |

---

## 🎯 Recommended Implementation Order

### Week 1: Complete Phase 1 Core
1. View page (P0)
2. Keyboard shortcuts (P0)
3. Mobile testing (P0)
4. CI/CD setup (P0)
5. Vercel deploy (P0)

**Result:** Phase 1 at 100%, ready for public beta

---

### Week 2: Polish & Launch Prep
6. Unsaved changes warning (P1) - 30 min
7. System theme detection (P1) - 1 hour
8. Better error messages (P1) - 2 hours
9. Toast notifications (P1) - 2 hours
10. Analytics (P1) - 1 hour

**Result:** Polished Phase 1, public beta launch

---

### Week 3: High-Impact Quick Wins
11. Template library (P1) - 4-5 hours
12. Command palette (P1) - 4-6 hours
13. Offline PWA (P1) - 4-6 hours
14. Preview zoom (P2) - 2 hours

**Result:** Amazing user experience, competitive differentiation

---

### Week 4+: Phase 2 (Backend)
15. NestJS setup
16. Auth system
17. Document save
18. Spaces

---

## 💡 Feature Recommendations by Goal

### Goal: Launch public beta ASAP
**Build:** View page, keyboard shortcuts, mobile, CI/CD, deploy
**Timeline:** 1-2 days
**Result:** Functional MVP ready for users

### Goal: Maximize virality
**Build:** View page, template library, examples gallery, share UX polish
**Timeline:** 1 week
**Result:** Easy to start, easy to share

### Goal: Stand out from competitors
**Build:** Offline PWA, command palette, BYOAI (Phase 3)
**Timeline:** 2-3 weeks
**Result:** Unique features no competitor has

### Goal: Developer love
**Build:** Keyboard shortcuts, command palette, Monaco enhancements, templates
**Timeline:** 1-2 weeks
**Result:** Power user features developers expect

---

## 🚫 What NOT to Build Yet

**Don't build these until Phase 2+ is ready:**
- ❌ Real-time collaboration (needs backend)
- ❌ Comments (needs backend + auth)
- ❌ Version history (needs backend)
- ❌ User profiles (needs backend + auth)
- ❌ AI features (Phase 3)
- ❌ GitHub sync (Phase 5)

**Focus:** Complete Phase 1, then move to Phase 2 systematically.

---

*This list is maintained based on codebase analysis and product strategy.*
*Update after completing each feature.*
