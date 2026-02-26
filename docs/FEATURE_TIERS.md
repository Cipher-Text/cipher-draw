# 🧩 Cipher Draw — Feature Tiers
## Must Have · Nice to Have · Amazing

> Categorized by impact, not by phase.
> Stars (⭐) = competitive differentiation score.

---

---

# 🔴 MUST HAVE
### *Without these, the product doesn't work. Ship nothing until these are solid.*

---

## Editor & Rendering

| Feature | Why It's Non-Negotiable |
|---|---|
| Monaco Editor (VS Code quality) | Anything less feels broken to developers |
| Live preview (debounced render) | The entire value prop is see-as-you-type |
| Mermaid rendering | Most popular diagram syntax — must work perfectly |
| Markdown rendering | Docs without markdown are not docs |
| SVG direct render | SVG is the universal output format |
| Mixed mode (MD + Mermaid in one file) | This is the killer use case no one does well |
| Syntax error display (no white screen) | Crashes destroy trust immediately |
| Dark mode default | Developer tool without dark mode = non-starter |

---

## Export

| Feature | Why It's Non-Negotiable |
|---|---|
| Export SVG | Lossless, scalable — the pro format |
| Export PNG | Universal format for sharing in chats/docs |
| Export PDF | Required for reports and client deliverables |
| Copy SVG code to clipboard | Devs paste this into code — daily use |

---

## Sharing

| Feature | Why It's Non-Negotiable |
|---|---|
| URL share (no login) | First-time users must be able to share before trusting you with an account |
| Read-only view page | Receivers should not need an account to view |
| Fork / Clone from shared link | How ideas spread between teams |

---

## Accounts & Save

| Feature | Why It's Non-Negotiable |
|---|---|
| Email + OAuth login (GitHub, Google) | GitHub OAuth alone covers 80% of your target users |
| Auto-save with status indicator | Losing work once = user gone forever |
| Document list (My Documents) | Without this, saved docs are unfindable |
| Document visibility (private/public) | Privacy control is a trust baseline |

---

## Performance

| Feature | Why It's Non-Negotiable |
|---|---|
| < 2s initial load | Slow load = user leaves before seeing value |
| Render doesn't block typing | Laggy editor is worse than no preview |
| Mobile readable (not necessarily editable) | Shared links must render on phones |

---

---

# 🟡 NICE TO HAVE
### *These make users love the product. Ship these to go from "useful" to "favorite tool."*

---

## Editor Experience

| Feature | Value |
|---|---|
| Vim keybindings toggle | Vim users will talk about this loudly and publicly ⭐⭐ |
| Multi-cursor editing | Quality-of-life for power users |
| Find & replace in editor | Expected in any serious editor |
| Code folding (collapse sections) | Critical for large mixed-mode documents |
| Minimap (Monaco side overview) | Navigation in long files |
| Auto-complete for Mermaid keywords | Reduces syntax lookup friction |
| Diagram templates library | Start from a template instead of blank |
| Command palette (`Cmd+K`) | VS Code users expect this |
| Format/prettify button | Auto-indent and clean up messy code |

---

## Diagram Syntax Support

| Syntax | Why Add It |
|---|---|
| D2 | Growing fast, cleaner syntax than Mermaid for infra diagrams ⭐⭐ |
| PlantUML | Enterprise teams use this — opens a whole audience |
| Graphviz DOT | Academic, research, and CS communities |
| BPMN | Business process teams, non-dev audience |

---

## Organization

| Feature | Value |
|---|---|
| Spaces / Workspaces | Converts one-off tool into daily habit ⭐⭐⭐ |
| Tags on documents | Fast filtering in large collections |
| Pinned documents | Quick access to frequent diagrams |
| Document search (full-text) | Find content, not just titles |
| Duplicate document | Starting from a copy is a common workflow |
| Trash / soft delete | Recovering deleted work = trust |
| Keyboard navigation in document list | Power user experience |

---

## Version History

| Feature | Value |
|---|---|
| Version snapshots on save | Recovery from mistakes |
| Restore previous version | Peace of mind |
| Named versions ("v2 - added auth flow") | Meaningful history, not just timestamps |
| Version comparison side-by-side | See what changed at a glance |

---

## Sharing & Visibility

| Feature | Value |
|---|---|
| iFrame embed | Blogs, READMEs, Confluence — viral loop ⭐⭐⭐ |
| Password-protected links | Security-conscious teams need this |
| Link expiry settings | Compliance requirement for some teams |
| Fork count on public documents | Social proof + discovery signal |

---

## AI (BYOAI)

| Feature | Value |
|---|---|
| Natural language → diagram | Lowest barrier to creating diagrams ⭐⭐⭐ |
| Fix broken syntax with AI | Saves new users from giving up |
| Explain diagram in plain English | Onboards non-technical readers |
| Convert between syntaxes | Mermaid to D2, PlantUML to Mermaid |
| Ollama (local AI) support | Privacy + cost = self-hosters love this ⭐⭐⭐ |
| OpenAI, Claude, Gemini support | Covers 95% of users who have an AI key |

---

## Collaboration

| Feature | Value |
|---|---|
| Real-time co-editing (Yjs) | Teams need this to replace Confluence ⭐⭐ |
| Cursor presence (see teammates) | Makes collaboration feel alive |
| Inline comments on diagrams | Review workflow without leaving the tool |
| Space member roles (viewer/editor) | Basic access control for teams |

---

## Developer Friendly

| Feature | Value |
|---|---|
| GitHub/GitLab repo sync | Part of the workflow, not separate from it ⭐⭐⭐ |
| REST API for render endpoint | CI/CD pipelines can auto-generate diagrams |
| Docker self-host image | Enterprises and privacy-first teams require this ⭐⭐ |
| CLI tool (`cipher-draw render file.md`) | Devs want terminal access to everything |

---

## UX Polish

| Feature | Value |
|---|---|
| Onboarding tour (first visit) | Reduces drop-off for non-Mermaid users |
| Keyboard shortcut reference (`?` key) | Discoverability of power features |
| Contextual right-click menu | Feels like a native app |
| Undo/redo history beyond editor | Document-level undo |
| Responsive preview pane zoom | Diagram too small? Zoom in |
| "Last opened" recent documents | Fast access on return visits |

---

---

# 🌟 AMAZING
### *These are unexpected. They create press, word-of-mouth, and category leadership.*
### *No competitor has these. Build even one and you own a conversation.*

---

## 🌟 1. Diagram-to-Code Reverse Engineer
**What:** Paste a screenshot or image of any diagram (whiteboard photo, Lucidchart export, draw.io screenshot) → Cipher Draw uses AI vision to convert it into editable Mermaid/D2 code.

**Why it's amazing:**
Teams have years of diagrams trapped in images, PDFs, and old tools. Cipher Draw becomes the migration path for all of them. No competitor does this.

**How:** AI vision model (GPT-4o Vision / Claude Vision) analyzes the image → generates diagram syntax → renders it live.

**Impact:** ⭐⭐⭐⭐⭐ — *"I uploaded a photo of our whiteboard and it became a live diagram in 10 seconds"* — this gets shared.

---

## 🌟 2. Diagram Diff in Pull Requests (GitHub App)
**What:** A GitHub App that automatically renders diagram diffs in PR descriptions. When a `.md` file with Mermaid changes in a PR, the bot comments with a visual: *before* render and *after* render side by side.

**Why it's amazing:**
Code review for diagrams is currently blind — you read raw Mermaid syntax and imagine what changed. This makes architecture changes reviewable like code.

**How:** GitHub App → listens to PR webhooks → finds changed Mermaid blocks → renders both versions → posts a comment with images.

**Impact:** ⭐⭐⭐⭐⭐ — Every engineering team that adopts this becomes a permanent Cipher Draw user. GitHub Apps have viral org-level adoption.

---

## 🌟 3. Living Documentation Mode
**What:** Connect Cipher Draw to a live API, database, or codebase. The diagram auto-updates when the underlying system changes.

Examples:
- Connect to a PostgreSQL DB → ER diagram stays in sync with schema migrations
- Connect to a GitHub repo → class diagram regenerates when files change
- Connect to a REST API (OpenAPI spec) → sequence diagram updates when endpoints change

**Why it's amazing:**
Documentation rot is the #1 reason teams stop maintaining diagrams. Living docs solve the problem at the root. This is a category of its own.

**How:** Webhook listeners + scheduled sync jobs + AI to interpret schema diffs.

**Impact:** ⭐⭐⭐⭐⭐ — *"Our architecture diagram updates itself"* — this is a product demo that sells itself.

---

## 🌟 4. Diagram Intelligence — "What's Wrong Here?"
**What:** An AI layer that doesn't just render your diagram — it *reviews* it for architectural problems.

Examples of what it flags:
- *"This service has no fallback if the DB goes down — consider adding a circuit breaker"*
- *"You have a single point of failure at the API Gateway"*
- *"This sequence has a circular dependency between Service A and Service B"*
- *"Your auth flow exposes tokens in the URL — consider using headers instead"*

**Why it's amazing:**
No diagramming tool has ever given architectural feedback. Cipher Draw becomes a junior architect reviewer. This is AI being genuinely useful, not just generative.

**How:** Parse diagram AST → identify structural patterns → AI prompt with architecture best practices → return contextual warnings.

**Impact:** ⭐⭐⭐⭐⭐ — Changes Cipher Draw from a drawing tool to a thinking partner.

---

## 🌟 5. Cipher Draw AI Narrator
**What:** Generate a spoken or written walkthrough of any diagram — auto-produce a script that explains the diagram step by step, in presentation order.

Example output for a microservices diagram:
> *"The flow begins at the API Gateway, which handles all incoming requests. Authenticated requests are routed to the User Service. The User Service queries PostgreSQL for user data, and caches frequent reads in Redis. For file operations, it delegates to the Storage Service which writes to S3..."*

**Why it's amazing:**
Architects spend hours writing documentation that explains diagrams. This generates a first draft in seconds. Also useful for onboarding new engineers.

Extensions:
- Export as audio (text-to-speech)
- Export as a slide deck (one slide per diagram node)
- Generate README section from diagram

**Impact:** ⭐⭐⭐⭐ — *"I generated the architecture section of our RFC in 30 seconds"*

---

## 🌟 6. Offline-First PWA with Local Vault
**What:** Cipher Draw works completely offline. Documents are stored locally in an encrypted vault. Syncs to the server when online. Works with zero internet connection.

**Why it's amazing:**
Security-conscious developers, air-gapped environments, slow connections, airplane mode — all of these are real. Most SaaS tools fail completely offline.

**How:** Service Worker + IndexedDB local storage + background sync API + AES-256 encryption for local vault.

**Impact:** ⭐⭐⭐⭐ — *"I use Cipher Draw on flights"* — niche but deeply loyal user segment. Also massive for enterprise self-hosters.

---

## 🌟 7. Diagram Evolution Timeline (Playback)
**What:** A time-scrubber that plays back the entire edit history of a diagram like a video — you see it being built from scratch, node by node.

**Why it's amazing:**
- Onboarding: new engineers watch how the architecture evolved over 6 months
- Post-mortems: *"here's when we introduced the bottleneck"*
- Educational content: creators can share "how I designed this system"

**How:** Version snapshots + interpolation between states + animated SVG diff transitions.

**Impact:** ⭐⭐⭐⭐ — Extremely shareable. This is the kind of thing that gets posted on Twitter/LinkedIn.

---

## 🌟 8. Multi-Diagram Canvas
**What:** A free-form infinite canvas where multiple diagrams coexist. Think Figma but for code-based diagrams.

Each "node" on the canvas is a live Cipher Draw document. You can:
- Zoom out to see the entire system
- Connect diagrams with relationship arrows
- Group diagrams into clusters (Frontend, Backend, Infrastructure)
- Click any diagram node to open it full-screen

**Why it's amazing:**
Large systems can't fit in one diagram. Today people make 10 separate diagrams with no visual connection. The canvas makes the whole system visible at once.

**How:** Canvas library (e.g., React Flow or custom) + each diagram rendered as a canvas node.

**Impact:** ⭐⭐⭐⭐⭐ — This is the feature that makes Cipher Draw irreplaceable for solutions architects. Nothing open-source does this.

---

## 🌟 9. Export to Runbook / RFC Template
**What:** One click to export a diagram + auto-generated written explanation into a professional document format:
- RFC (Request for Comments) template
- Architecture Decision Record (ADR)
- Runbook
- Incident post-mortem
- Onboarding guide

AI fills in the template using the diagram content + any notes the user has added.

**Why it's amazing:**
These documents take engineers hours to write. Cipher Draw generates a 70% complete first draft. The diagram is already the hardest part — words are just context.

**Impact:** ⭐⭐⭐⭐ — Saves real time on real work. Teams adopt tools that save hours, not minutes.

---

## 🌟 10. Diagram Health Score
**What:** Every public or team diagram gets a live "health score" based on:
- Is it still accurate? (last updated date + connected repo changes)
- Is it well-documented? (has description, tags, author)
- Is it accessible? (shared with the right people)
- Is it architecturally sound? (AI review flags)

Score: 0–100 with specific improvement suggestions.

**Why it's amazing:**
Documentation quality is invisible until it's too late. The health score makes it measurable. Teams with a culture of quality will care about this deeply.

**Impact:** ⭐⭐⭐ — Niche but creates a culture hook. Teams start caring about their "diagram health" the way they care about code coverage.

---

---

# 🏆 Competitive Matrix

| Feature | Cipher Draw | mermaid.live | Eraser.io | Lucidchart | Confluence |
|---|---|---|---|---|---|
| Multi-syntax | ✅ | ❌ | Partial | ❌ | ❌ |
| BYOAI | ✅ | ❌ | ❌ | ❌ | ❌ |
| Local AI (Ollama) | ✅ | ❌ | ❌ | ❌ | ❌ |
| iFrame embed | ✅ | ❌ | ❌ | ✅ | ✅ |
| Open source | ✅ | ✅ | ❌ | ❌ | ❌ |
| Self-hostable | ✅ | ✅ | ❌ | ❌ | ✅ |
| Image → Diagram | ✅ 🌟 | ❌ | ❌ | ❌ | ❌ |
| PR Diagram Diff | ✅ 🌟 | ❌ | ❌ | ❌ | ❌ |
| Living Docs | ✅ 🌟 | ❌ | ❌ | ❌ | ❌ |
| Architecture Review AI | ✅ 🌟 | ❌ | ❌ | ❌ | ❌ |
| Infinite Canvas | ✅ 🌟 | ❌ | Partial | ✅ | ❌ |
| Offline PWA | ✅ 🌟 | ❌ | ❌ | ❌ | ❌ |
| Version Playback | ✅ 🌟 | ❌ | ❌ | ❌ | ❌ |

---

# 🎯 Priority Recommendation

If you can only pick features to build beyond the must-haves, build in this order:

1. **iFrame Embed** — Lowest effort, highest virality
2. **BYOAI (Natural Language → Diagram)** — Biggest perceived value
3. **Image → Diagram** (Whiteboard scanner) — Most shareable, no competitor has it
4. **PR Diagram Diff (GitHub App)** — Team-level adoption, sticky as hell
5. **Living Documentation Mode** — Turns Cipher Draw into infrastructure, not a tool
6. **Multi-Diagram Canvas** — Category-defining for architects

Build #1 and #2 and you have a great tool.
Build #3 and #4 and people write about you.
Build #5 and #6 and you're building a company.

---

# 📊 Current Implementation Status

Based on actual implementation (see [STATUS.md](./STATUS.md)):

## ✅ Must Have Features Implemented:
- [x] Monaco Editor ✅
- [x] Live preview (debounced) ✅
- [x] Mermaid rendering ✅
- [x] Markdown rendering ✅
- [x] SVG direct render ✅
- [x] Mixed mode ✅
- [x] Syntax error display ✅
- [x] Dark mode ✅
- [x] Export SVG ✅
- [x] Export PNG ✅
- [x] Export PDF ✅
- [x] Copy SVG to clipboard ✅
- [x] URL share (no login) ✅
- [ ] Read-only view page ⚠️ **IN PROGRESS**
- [ ] Fork from shared link ⚠️ **IN PROGRESS**
- [ ] Accounts & Save ❌ **Phase 2**
- [ ] Performance < 2s ⚠️ **NEEDS MEASUREMENT**

## 🟡 Nice to Have Features (Selected):
Most "Nice to Have" features are planned for Phase 2-4.

Priority for Phase 2:
- Spaces / Workspaces
- iFrame embed
- BYOAI (Natural Language → Diagram)

## 🌟 Amazing Features (Roadmap):
All "Amazing" features are in the long-term roadmap (Phase 3+).

**Highest impact for early adoption:**
1. Image → Diagram (Phase 3 or 4)
2. PR Diagram Diff GitHub App (Phase 4 or 5)
3. Living Documentation Mode (Phase 5)

See [ROADMAP_DETAILED.md](./ROADMAP_DETAILED.md) for phase-by-phase breakdown.

---

*Feature tiers maintained by Cipher Text Labs*
*Last updated: February 27, 2026*
