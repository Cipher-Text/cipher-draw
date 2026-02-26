# Cipher Draw — Product Roadmap

**Vision:** Make Cipher Draw the fastest way to write, preview, and share technical docs and diagrams from one workspace.

**Current Phase:** Phase 1 (MVP Editor) - 85% Complete
**Next Milestone:** Public Beta Launch

---

## 🗺 Phase Overview

```
Phase 1         Phase 2          Phase 3         Phase 4          Phase 5
MVP (Editor) →  Accounts &   →   AI Layer    →  Sharing &     →  Collaboration
[85% DONE]      Spaces           (BYOAI)        Gallery           & API
                [NOT STARTED]    [NOT STARTED]  [NOT STARTED]    [NOT STARTED]
```

**Timeline:**
- Phase 1: 3 weeks (85% complete, 1-2 days remaining)
- Phase 2: 4 weeks
- Phase 3: 3 weeks
- Phase 4: 3 weeks
- Phase 5: 1-2 months
- **Total MVP to v1.0:** ~4 months

---

## 📍 Phase 1: MVP Editor (Week 1-3)

**Status:** 🟡 85% Complete

### Goals
- Anyone can write, render, and share a diagram immediately
- Zero friction — no account, no install required
- Fast, beautiful, responsive UI

### ✅ Completed
- Monaco Editor with 4 modes (Markdown, Mermaid, SVG, Mixed)
- Live preview with 300ms debounce
- All rendering engines working
- Export to SVG, PNG, PDF, Markdown
- URL-based sharing via compressed hash
- Dark/light theme system
- Resizable split panes
- State persistence with localStorage
- Sample templates
- Test infrastructure (Vitest)

### ⚠️ Remaining (1-2 days)
- Read-only view page (`/view/[token]`)
- Fork functionality
- Keyboard shortcuts (Ctrl+S, Ctrl+Enter)
- Mobile responsive testing
- System theme detection
- CI/CD pipeline (GitHub Actions)
- Vercel deployment

### Milestone
> A developer visits cipherdraw.io, writes a Mermaid diagram, sees it render live, exports it as PNG, and shares the URL — all without creating an account.

**Ship as:** Public beta on Dev.to, Hacker News, Reddit

---

## 📍 Phase 2: Accounts & Spaces (Week 4-7)

**Status:** ⏸️ Not Started

### Goals
- Users can save their work permanently
- Documents are organized in Spaces
- Version history protects work from loss

### Key Features
**Authentication:**
- Email + password registration
- GitHub OAuth
- Google OAuth
- JWT access + refresh tokens

**Document Management:**
- Auto-save with status indicator
- My Documents page (list, search, filter)
- Document visibility (private/unlisted/public)
- Version history (create, restore, diff)

**Spaces (Workspaces):**
- Create and manage spaces
- Assign documents to spaces
- Space-level visibility
- Share entire space via link

**User Profiles:**
- Public profile page (@username)
- Avatar, bio, public documents

### Prerequisites
- NestJS backend initialized
- PostgreSQL + Prisma ORM
- Redis for sessions/cache
- Docker Compose for local dev

### Milestone
> A user registers, creates a Space called "Backend Architecture", saves 5 diagrams into it, views version history, and restores an older version.

---

## 📍 Phase 3: AI Layer (BYOAI) (Week 8-10)

**Status:** ⏸️ Not Started

### Goals
- Any user can plug in their own AI provider key
- AI generates diagrams from plain English
- AI assists with fixing, explaining, and improving diagrams
- **Zero keys stored server-side** (BYOAI = Bring Your Own AI)

### Key Features
**AI Provider System:**
- Generic AIProvider interface
- OpenAI, Anthropic, Google Gemini support
- Ollama (local AI, no key needed)
- Keys stored in localStorage only
- AI Settings panel in UI

**AI Features:**
- Natural language → diagram generation
- Fix broken syntax with AI
- Explain diagram in plain English
- Improve/refine diagram suggestions
- Convert between syntaxes (Mermaid ↔ D2 ↔ PlantUML)
- Generate from SQL schema / JSON / code

### Milestone
> A user with no knowledge of Mermaid syntax types: "Create a microservices diagram with API Gateway, Auth Service, User Service, and PostgreSQL" and gets a rendered diagram in 3 seconds using their own OpenAI key.

---

## 📍 Phase 4: Sharing & Gallery (Week 11-13)

**Status:** ⏸️ Not Started

### Goals
- Every diagram is shareable, embeddable, and discoverable
- Cipher Draw spreads through embeds in blogs and READMEs
- Public gallery drives SEO and community

### Key Features
**Share Links:**
- Password-protected links
- Link expiry settings
- View count tracking
- Fork/clone from link

**Embed System:**
- iFrame embed code generator
- Embed page (`/embed/:token`)
- Works in GitHub README, Notion, Confluence
- Theme and display options

**Presentation Mode:**
- Full-screen diagram view
- Navigate between diagrams in a Space
- Zoom and annotations
- Export view as PNG

**Public Gallery:**
- Discoverable page at `/gallery`
- Search by keyword, tag, mode
- Sort by trending, most forked, recent
- SEO-optimized pages

### Milestone
> A developer embeds a Cipher Draw diagram in their GitHub README. Colleagues click "Open in Cipher Draw" and fork it. The diagram appears in the public gallery and gets discovered by 50 new users.

**Ship as:** Public launch on Product Hunt, Hacker News Show HN

---

## 📍 Phase 5: Collaboration & API (Month 4+)

**Status:** ⏸️ Not Started

### Goals
- Teams collaborate on diagrams in real time
- GitHub sync makes Cipher Draw part of dev workflow
- REST API allows programmatic use
- Plugin system opens the platform to community

### Key Features
**Real-Time Collaboration:**
- Yjs CRDT for conflict-free editing
- Cursor presence (see teammates)
- Change attribution
- Comment threads

**GitHub/GitLab Sync:**
- Connect repo to a Space
- Webhook: on push → sync `.md` files
- Push from Cipher Draw → creates commit
- PR integration: visual diagram diff

**REST API:**
- Public API for document CRUD
- Render endpoint (no auth needed)
- Export endpoint (PNG/PDF)
- API key management
- Rate limiting

**Plugin System:**
- Plugin interface for renderers, exporters, AI providers
- Plugin registry at `/plugins`
- Community contributions

### Milestone
> A team of 5 engineers uses Cipher Draw daily: they co-edit architecture diagrams, sync with their GitHub repo, embed diagrams in their docs site, and use the REST API to auto-generate diagrams from CI.

**Ship as:** v1.0 stable release, open-source repo public, Discord community

---

## 🎯 Launch Strategy

| Milestone | Action |
|---|---|
| End of Phase 1 | Dev.to + Reddit r/webdev — "I built an open-source Mermaid editor" |
| End of Phase 2 | Product Hunt soft launch — invite beta users |
| End of Phase 3 | Hacker News Show HN — highlight BYOAI angle |
| End of Phase 4 | Product Hunt official launch — full press push |
| End of Phase 5 | v1.0 release — open-source repo public — Discord launch |

---

## 📊 Success Metrics

**Phase 1 (MVP):**
- Share link success rate ≥ 99%
- Preview render errors < 1%
- Editor-to-preview latency < 300ms
- Initial load < 2s

**Phase 2 (Accounts):**
- User retention (return within 7 days) > 40%
- Average documents per user > 5
- Auto-save success rate > 99%

**Phase 3 (AI):**
- AI generation success rate > 80%
- AI feature usage > 30% of active users

**Phase 4 (Sharing):**
- Embed usage > 20% of public documents
- Gallery traffic > 40% of total traffic
- Fork rate > 10% of views

**Phase 5 (Collaboration):**
- Teams with 2+ members > 30% of paid users
- GitHub sync adoption > 50% of teams
- API usage > 25% of all renders

---

## ⚠️ Risks & Mitigation

| Risk | Mitigation |
|---|---|
| Complex sanitization breaks content | Comprehensive test suite, gradual rollout |
| Large documents stress rendering | Performance budgets, lazy loading, pagination |
| Mermaid compatibility changes | Pin versions, test suite for regressions |
| AI key management complexity | Clear UX, localStorage-only by default |
| Real-time sync conflicts | Use battle-tested CRDT (Yjs) |

---

## 🔄 Ongoing Workstreams

**Throughout all phases:**
- Security hardening (sanitization, dependency updates)
- Performance tuning (rendering, large document handling)
- Developer experience (tests, linting, CI quality gates)
- Accessibility (WCAG 2.1 AA compliance)
- Documentation (keep docs updated as features ship)

---

## 📐 Prioritization Rules

1. **Security and data integrity first** — No feature ships if it compromises user data
2. **Rendering reliability before new surface area** — Core editor must be rock-solid
3. **Core authoring loop before collaboration extras** — Individual experience before team features
4. **Open source and self-hosting** — Every feature works for self-hosters
5. **No vendor lock-in** — BYOAI philosophy extends to all integrations

---

## 🔗 Related Documentation

- [STATUS.md](./STATUS.md) - Current implementation status and Phase 1 tasks
- [FEATURE_TIERS.md](./FEATURE_TIERS.md) - Features by impact (Must/Nice/Amazing)
- [REQUIREMENTS.md](./REQUIREMENTS.md) - Product requirements document
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Technical architecture

---

*Roadmap maintained by Cipher Text Labs*
*Last updated: February 27, 2026*
