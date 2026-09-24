# Cipher Draw — Product Roadmap

**Vision:** Turn technical inputs into structured, editable diagrams, then let users edit and export them in useful formats.

**Expanded authoring direction:** Preserve code-first Mermaid editing and Markdown preview, and add a visual SVG canvas plus image import that can turn diagrams into editable structured content. Image cleanup should also offer removal of AI tags/labels. These are planned capabilities, not current MVP features.

**Current Phase:** Phase 1 (MVP Editor) - 98% Complete
**Next Milestone:** Public Beta Launch

---

## 🗺 Phase Overview

```
Phase 1         Phase 2          Phase 3         Phase 4          Phase 5
MVP (Editor) →  Accounts &   →   AI Layer    →  Sharing &     →  Collaboration
[98% DONE]      Spaces           (BYOAI)        Gallery           & API
                [NOT STARTED]    [NOT STARTED]  [NOT STARTED]    [NOT STARTED]
```

This roadmap describes candidate capabilities, not a promise to support every source/target combination. Prioritize reliable, reviewable conversions over a broad but lossy “any input → any output” claim.

**Timeline:**
- Phase 1: 3 weeks (98% complete, Vercel dashboard linking + real-device mobile QA remaining)
- Phase 2: 4 weeks
- Phase 3: 3 weeks
- Phase 4: 3 weeks
- Phase 5: 1-2 months
- **Total MVP to v1.0:** ~4 months

---

## 📍 Phase 1: MVP Editor (Week 1-3)

**Status:** 🟡 98% Complete

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
- Convert diagram images into editable diagrams by recognizing nodes, edges, labels, and relationships
- Offer editable canvas/SVG and Mermaid outputs first; add D2 and PlantUML adapters later
- Offer an image cleanup action to remove AI tags/labels; specify whether this covers embedded metadata, visible marks, or both during design

### Visual Diagram Authoring (planned, staged across Phases 2–3)
- Open/import SVG and edit its source in Monaco or its elements on a visual canvas
- Keep source and canvas changes synchronized
- Select, move, resize, and edit node text/styles; group/ungroup; manage layers; snap, align, zoom, and pan
- Export edited diagrams to SVG, PNG, and PDF
- Establish a shared internal diagram model (nodes, edges, groups, metadata) for image recognition and format conversion
- Keep Mermaid editing and Markdown preview as core code authoring paths, connecting Mermaid to the visual model where conversion is reliable

### Image Import and Conversion (planned)
- Start with PNG, JPG/JPEG, and WebP; evaluate screenshots, scanned diagrams, whiteboards, and PDF pages
- Distinguish raster-to-vector tracing from image-to-structured-diagram conversion and image-to-diagram-code generation
- Detect boxes, arrows, text, and relationships, with a review step for correcting recognition
- Allow clean reconstruction as an editable canvas/SVG or exported PNG/SVG

### Milestone
> A user with no knowledge of Mermaid syntax types: "Create a microservices diagram with API Gateway, Auth Service, User Service, and PostgreSQL" and gets a rendered diagram in 3 seconds using their own OpenAI key.

---

## 📍 Diagram Engine and Conversion Track (MVP+, staged)

This is a cross-phase product track that complements Accounts, AI, and Sharing. The current implementation already has Mermaid editing, Markdown preview, SVG source rendering, and SVG/PNG/PDF/Markdown export. The following work is planned and is not implemented.

### Foundation: internal diagram model and visual canvas
- Define a versioned, portable JSON diagram model for nodes, edges, groups, styles, layout, and semantic metadata.
- Add a visual canvas for native shapes, connectors, labels, groups, layers, multi-select, copy/paste, ordering, undo/redo, alignment/distribution, grid/snap, zoom/pan, reusable components, and icons.
- Add SVG import and editing; retain source editing where useful and synchronize code, model, and canvas only for supported constructs.
- Add Mermaid ↔ model/canvas support incrementally by diagram type. Preserve unsupported syntax as source or mark conversion limits instead of silently dropping it.

### Image and document conversion
- Start with PNG, JPG/JPEG, and WebP; accept SVG as an editable import. Evaluate screenshots, whiteboards, scans, PowerPoint exports, and PDF pages as input workflows.
- Offer separate operations: raster-to-vector trace, image-to-structured editable graph, and image-to-diagram code.
- For structured conversion, detect/extract nodes, connectors, labels, and relationships; show confidence/uncertainty and require review/editing before treating the result as authoritative.
- First targets: editable canvas/model, SVG, and Mermaid. Add other targets only when their model mapping is useful and tested.

### Prioritized MVP+ sequence
1. Visual SVG/canvas editor foundation.
2. Versioned internal diagram JSON model.
3. Mermaid ↔ model/canvas for a defined subset, with round-trip behavior documented.
4. Image/screenshot → reviewed editable diagram.
5. Image → Mermaid for supported flowcharts.
6. D2 and PlantUML render/edit or conversion support, prioritized by user demand.
7. SQL/schema → ER diagrams.
8. OpenAPI/GraphQL/AsyncAPI/Postman → API diagrams.
9. Repository/code → module, dependency, and architecture diagrams.
10. Infrastructure inputs (Terraform, Kubernetes/Helm, Compose, CloudFormation/Pulumi, CI pipelines) → topology/flow diagrams.

### Candidate format and integration backlog (later, scope to validate)
- Diagram-as-code: Mermaid, SVG, D2, PlantUML, Graphviz/DOT, Structurizr DSL/C4, and Markdown with embedded diagrams.
- Database sources: SQL DDL and PostgreSQL/MySQL/SQLite schemas, then Prisma, TypeORM, Hibernate/JPA, and Django models.
- API sources: OpenAPI/Swagger, GraphQL, AsyncAPI, and Postman collections.
- Code and infrastructure: Java/Spring, TypeScript/Node, Python, Go, C#, Terraform, Kubernetes, Helm, Compose, CloudFormation, Pulumi, GitHub Actions, GitLab CI, and Jenkins.
- Existing diagram tools: draw.io, Excalidraw, Lucidchart, Visio, Figma SVG, PowerPoint SVG, and native Mermaid/PlantUML/Graphviz files; partial import is acceptable when stated.
- Output candidates: SVG, PNG, WebP, PDF, Mermaid, D2, PlantUML, DOT, Markdown, HTML, and the portable diagram JSON model.
- Later workflow features: source/node/relationship/visual diffs, Git save/commit/branch/PR integration, architecture drift checks, and an MCP interface for coding agents.

### AI-assisted operations (after model and edit operations stabilize)
- Add or change nodes/relationships, reorganize groups, simplify/detail a view, explain or analyze an architecture, and repair layout.
- Keep AI actions reviewable and grounded in model changes; support BYOAI/local providers where feasible.
- Treat architecture templates (system, microservices, event-driven, C4, deployment, network, Kubernetes, CI/CD) and general diagrams (mind maps, org charts, decision trees, timelines, BPMN, data flow, user journeys) as template/catalog scope rather than separate engines.

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

**Diagram workflows (later candidates):**
- Git-native save/branch/commit and source, model, and visual diagram diffs
- PR previews and checks for changed or stale diagrams
- MCP tools for create/open/update/render/convert/analyze repository operations

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

**Diagram conversion track:**
- Conversion review acceptance rate, measured by how often users keep/edit the proposed graph
- Node, edge, and label recognition precision for supported image classes
- Round-trip preservation rate for each supported source/target format pair

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
*Last updated: September 25, 2026*
