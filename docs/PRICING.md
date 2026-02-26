# 🧩 Cipher Draw — Pricing Model

### Official Product Pricing Document v1.0

**Cipher Text Labs · Confidential**

---

## 💡 Pricing Philosophy

> **"Start free, grow into value."**

Cipher Draw follows a **Product-Led Growth (PLG)** model. The free tier is genuinely useful — not crippled. Users discover value themselves, share with teammates, and naturally upgrade when they hit real limits.

Core principles:

- **No credit card required** to start
- **No feature paywalls on core rendering** — the editor always works
- **Limits on scale, not on capability** — free users get the full experience, just with usage caps
- **Teams upgrade together** — individual users pull in teammates, teams pull in billing
- **Open source stays free** — self-hosters are a community asset, not lost revenue

---

---

# 🏷 Pricing Tiers

---

## 🆓 Free — $0/month

_For individuals, students, and open-source contributors._

### What's Included

**Editor & Rendering**

- Full Monaco editor (all modes: Markdown, Mermaid, SVG, Mixed, D2)
- Unlimited renders — no throttling on the editor itself
- All syntax support (Mermaid, Markdown, SVG, D2, PlantUML)
- Dark/light theme

**Documents**

- Up to **50 private documents**
- Unlimited public documents
- Up to **30 version snapshots** per document
- Basic tags and search

**Spaces**

- Up to **3 Spaces**
- Personal use only (no member invites)

**Export**

- SVG export ✅
- PNG export ✅
- PDF export ✅ (watermarked — "Created with Cipher Draw")
- Markdown download ✅

**Sharing**

- URL-based share links ✅
- Public view page ✅
- Fork / clone from shared link ✅
- iFrame embed ✅ (with "Powered by Cipher Draw" branding)

**AI (BYOAI)**

- Full AI feature access ✅
- Bring your own API key (OpenAI, Claude, Gemini, Ollama) ✅
- Cipher Draw never charges for AI — you pay your provider directly

**Community**

- Public gallery listing ✅
- Community Discord ✅

---

## ⚡ Pro — $9/month · $84/year (save 22%)

_For power users, freelancers, and professionals._

### Everything in Free, plus:

**Documents**

- **Unlimited private documents**
- **Unlimited version snapshots**
- Named versions (_"v2 - added Redis layer"_)
- Visual version diff (side-by-side render comparison)
- Full-text document search

**Spaces**

- **Unlimited Spaces**
- Space-level sharing (share an entire Space with one link)

**Export**

- PDF export — **no watermark** ✅
- Export with annotation layer ✅
- Batch export (export all docs in a Space at once)
- Custom export dimensions (set width/height for PNG)

**Sharing**

- Password-protected share links ✅
- Link expiry settings ✅
- Link view count analytics ✅
- iFrame embed — **no branding** ✅
- Disable fork option on shared links ✅

**AI**

- AI Chat Sidebar (context-aware AI assistant in the editor) ✅
- Diagram Intelligence — architectural review & warnings ✅
- Image → Diagram (whiteboard/screenshot to code) ✅ _(Amazing feature)_
- AI Narrator — auto-generate written walkthrough of diagram ✅
- Export to RFC / ADR / Runbook template ✅

**Presentation**

- Full presentation mode ✅
- Keyboard navigation between diagrams in a Space ✅
- Annotation layer (sticky notes, arrows, highlights) ✅

**Profile**

- Custom profile URL (`cipherdraw.io/@yourname`) ✅
- Verified badge on public documents ✅
- Analytics on public documents (views, forks) ✅

**Support**

- Priority email support (48h response)
- Early access to new features

---

## 👥 Team — $24/month per seat · $216/year per seat (save 25%)

_Minimum 3 seats. For engineering teams, startups, and growing companies._

### Everything in Pro, plus:

**Team Management**

- Shared Team Workspace
- Invite up to **50 members** (billed per seat)
- Member roles: Owner, Admin, Editor, Viewer
- Team-level document ownership (docs belong to the team, not an individual)
- Member activity log

**Spaces**

- Shared Team Spaces visible to all members
- Space-level access control per role
- Space templates (create a standard structure for new projects)

**Collaboration**

- Real-time co-editing (multiple cursors, presence) ✅
- Inline comment threads on diagrams ✅
- Change attribution in version history ✅
- Resolve/unresolve comments ✅

**GitHub / GitLab Integration**

- Connect repos to Spaces ✅
- Auto-sync `.md` files from repo ✅
- Push edits back to repo (creates a commit) ✅
- PR Diagram Diff (GitHub App — visual before/after in PRs) ✅ _(Amazing feature)_

**AI**

- Org-wide AI proxy key — admin sets one key, team uses it ✅
- Team AI usage dashboard (who used what, token counts)

**Living Documentation** _(Amazing feature)_

- Connect to PostgreSQL → auto-sync ER diagrams on migration ✅
- Connect to OpenAPI spec → auto-sync sequence diagrams ✅
- Diagram health score per document ✅

**Export & API**

- REST API access — **10,000 requests/month** ✅
- Render endpoint (`POST /api/render`) for CI/CD pipelines ✅
- CLI tool (`cipher-draw render file.md`) ✅
- Webhook notifications (document updated, version created)

**Support**

- Dedicated Slack channel or email support
- 24h response SLA
- Onboarding call (1 session)

---

## 🏢 Enterprise — Custom Pricing

_For large organizations, regulated industries, and on-premise requirements._

### Everything in Team, plus:

**Deployment**

- Self-hosted on your own infrastructure (Docker / Kubernetes) ✅
- Private cloud deployment (AWS, GCP, Azure) ✅
- Air-gapped environment support ✅
- Dedicated instance — no shared infrastructure

**Security & Compliance**

- SSO via SAML 2.0 / OIDC (Okta, Azure AD, Auth0) ✅
- SCIM provisioning (auto-create/deactivate users from your IdP)
- Audit logs — every action logged with user, timestamp, IP
- Data residency — choose your region (EU, US, APAC)
- SOC 2 Type II report available (on request)
- GDPR data processing agreement (DPA) ✅
- Custom data retention policies

**Customization**

- White-label embed (your brand, no Cipher Draw mention)
- Custom domain (`diagrams.yourcompany.com`)
- Custom email templates
- Brand color theming (embed + share pages match your brand)

**AI**

- Bring your own Azure OpenAI endpoint ✅
- Offline AI with Ollama on private servers ✅
- AI usage audit logs

**Scale**

- Unlimited members
- Unlimited API requests
- Priority render queue (enterprise docs render first)
- Dedicated export servers (no shared queue)
- SLA: 99.9% uptime guarantee

**Support**

- Dedicated Customer Success Manager
- 4h response SLA (business hours)
- Custom onboarding & training sessions
- Quarterly business reviews
- Direct engineering escalation path

**Pricing:** Starting at **$499/month** (flat, not per seat) · Annual contract · Custom quote based on members and usage.

---

## 🐳 Self-Hosted (Open Source) — Free Forever

_For individuals, teams, and enterprises who want full control._

**What you get:**

- Full Cipher Draw codebase (MIT licensed)
- Docker Compose setup (one command deploy)
- Kubernetes Helm chart
- Full feature set of the Team plan
- Ollama (local AI) supported out of the box
- Community support via GitHub Issues + Discord

**What you don't get:**

- Cipher Text Labs managed infrastructure
- Automatic updates (you manage your own upgrades)
- Paid support SLA
- White-label features (Enterprise only)
- Cloud-specific integrations (managed by us)

**Who this is for:**

- Privacy-first teams who can't send data to external SaaS
- Enterprises evaluating before buying managed
- Open-source contributors
- Developers who want to extend Cipher Draw

> Self-hosters who love Cipher Draw and want to support the project can become sponsors on GitHub. Sponsors get a "Sponsor" badge and early access to new releases.

---

---

# 💳 Billing Details

## Payment Methods

- Credit / Debit card (Visa, Mastercard, Amex)
- PayPal
- Bank transfer (Enterprise annual contracts only)
- GitHub Sponsors (self-hosted supporters)

## Billing Cycles

- Monthly: charged on the same date each month
- Annual: charged once, 20–25% discount applied
- Enterprise: annual contract, invoiced

## Upgrades & Downgrades

- Upgrade: takes effect immediately, prorated for current period
- Downgrade: takes effect at end of current billing period
- Cancel: access continues until end of paid period, then drops to Free

## Refund Policy

- 14-day money-back guarantee on Pro (no questions asked)
- Team plan: 14-day refund on first payment only
- Enterprise: defined in contract

---

---

# 📊 Plan Comparison Table

| Feature                              | Free | Pro       | Team        | Enterprise |
| ------------------------------------ | ---- | --------- | ----------- | ---------- |
| **Price**                            | $0   | $9/mo     | $24/seat/mo | Custom     |
| **Private documents**                | 50   | Unlimited | Unlimited   | Unlimited  |
| **Spaces**                           | 3    | Unlimited | Unlimited   | Unlimited  |
| **Version snapshots**                | 30   | Unlimited | Unlimited   | Unlimited  |
| **Named versions**                   | ❌   | ✅        | ✅          | ✅         |
| **Visual version diff**              | ❌   | ✅        | ✅          | ✅         |
| **PDF (no watermark)**               | ❌   | ✅        | ✅          | ✅         |
| **Batch export**                     | ❌   | ✅        | ✅          | ✅         |
| **iFrame embed (no branding)**       | ❌   | ✅        | ✅          | ✅         |
| **Password-protected links**         | ❌   | ✅        | ✅          | ✅         |
| **Annotation layer**                 | ❌   | ✅        | ✅          | ✅         |
| **Presentation mode**                | ❌   | ✅        | ✅          | ✅         |
| **AI Chat Sidebar**                  | ❌   | ✅        | ✅          | ✅         |
| **Diagram Intelligence (AI review)** | ❌   | ✅        | ✅          | ✅         |
| **Image → Diagram**                  | ❌   | ✅        | ✅          | ✅         |
| **Real-time collaboration**          | ❌   | ❌        | ✅          | ✅         |
| **Inline comments**                  | ❌   | ❌        | ✅          | ✅         |
| **GitHub/GitLab sync**               | ❌   | ❌        | ✅          | ✅         |
| **PR Diagram Diff**                  | ❌   | ❌        | ✅          | ✅         |
| **Living Documentation**             | ❌   | ❌        | ✅          | ✅         |
| **Diagram health score**             | ❌   | ❌        | ✅          | ✅         |
| **REST API**                         | ❌   | ❌        | 10k req/mo  | Unlimited  |
| **CLI tool**                         | ❌   | ❌        | ✅          | ✅         |
| **Org AI proxy key**                 | ❌   | ❌        | ✅          | ✅         |
| **SSO (SAML/OIDC)**                  | ❌   | ❌        | ❌          | ✅         |
| **Audit logs**                       | ❌   | ❌        | ❌          | ✅         |
| **White-label embed**                | ❌   | ❌        | ❌          | ✅         |
| **Custom domain**                    | ❌   | ❌        | ❌          | ✅         |
| **Self-hosted**                      | ✅   | ✅\*      | ✅\*        | ✅         |
| **SLA**                              | ❌   | ❌        | 24h         | 4h         |

\*Self-hosted is always free via open-source. Pro/Team features require a license key for self-hosted instances.

---

---

# 📈 Revenue Model & Projections

## Revenue Streams

| Stream               | Model                    | Notes                              |
| -------------------- | ------------------------ | ---------------------------------- |
| Pro subscriptions    | Recurring monthly/annual | Core SaaS revenue                  |
| Team subscriptions   | Per-seat recurring       | Higher LTV, team viral loop        |
| Enterprise contracts | Annual flat fee          | High ACV, low volume               |
| GitHub Sponsors      | Voluntary                | Community goodwill                 |
| API overage fees     | Pay-per-use above limit  | Team plan: $0.01 per extra 100 req |

---

## Conversion Funnel Assumptions

```
Website visitors          →  100,000/month
Free signups              →  8,000 (8% conversion)
Free → Pro                →  400 (5% of free users)
Pro → Team (per org)      →  40 orgs (10% of Pro users)
Average team size         →  6 seats
Enterprise deals/year     →  5–10
```

## Monthly Revenue Estimate (Year 1 Target)

| Tier                    | Count                   | MRR           |
| ----------------------- | ----------------------- | ------------- |
| Pro (monthly)           | 300 users × $9          | $2,700        |
| Pro (annual, amortized) | 100 users × $7          | $700          |
| Team                    | 40 orgs × 6 seats × $24 | $5,760        |
| Enterprise              | 2 deals × $499          | $998          |
| **Total MRR**           |                         | **~$10,158**  |
| **ARR**                 |                         | **~$121,896** |

> Year 2 target with growth: $400k–600k ARR
> Year 3 target (with enterprise push): $1M+ ARR

---

## Unit Economics

| Metric                          | Value                             |
| ------------------------------- | --------------------------------- |
| CAC (Customer Acquisition Cost) | ~$0 (PLG, organic)                |
| LTV Pro user                    | $9 × 18 months avg = **$162**     |
| LTV Team (6 seats)              | $144/mo × 24 months = **$3,456**  |
| LTV Enterprise                  | $499/mo × 24 months = **$11,976** |
| Gross Margin                    | ~85% (SaaS infra costs ~15%)      |

---

---

# 🎯 Pricing Strategy Notes

## Why $9 for Pro?

- Below the psychological $10 barrier
- Cheaper than Notion ($10), Linear ($8), GitHub Pro ($4 — but less value)
- Impulse-buy range for individual developers — no approval needed
- Annual plan ($84) = 1 dinner → very easy yes

## Why $24/seat for Team?

- Positions below Figma ($15 — less value for devs), Confluence ($5.75 — but awful UX), Miro ($10 — no code)
- Per-seat model aligns cost with value as teams grow
- 3-seat minimum = $72/mo minimum → meaningful revenue per account
- Annual discount incentivizes commitment

## Why Custom for Enterprise?

- Enterprise needs vary too much for a fixed price
- Custom pricing allows bundling: deployment, support, training, custom features
- Starting at $499/mo is low enough to avoid procurement friction at mid-market
- Annual contracts = predictable revenue

## The BYOAI Pricing Advantage

A key differentiator: **Cipher Draw never charges for AI usage.** Users pay their own AI provider directly. This means:

- No usage-based AI billing surprises
- No "AI credits" to buy or run out of
- Privacy-conscious users can use local Ollama at zero cost
- Cipher Draw's pricing stays simple and predictable

This is a deliberate competitive weapon against tools like Eraser.io that charge for AI features on top of the subscription.

---

---

# 🚀 Go-To-Market Pricing Launch Plan

## Pre-Launch (Beta)

- All features free during beta
- Collect email → offer 3 months Pro free at launch
- "Founding Member" badge for beta users (permanent, visible on profile)

## Launch Day

- Free tier live immediately
- Pro available from day one
- Team plan: waitlist → open 30 days after launch
- Launch discount: **30% off Pro annual for first 30 days** (urgency)

## First 90 Days

- Student/educator plan: 100% free Pro (GitHub Education verification)
- Open-source project plan: free Team for qualifying OSS projects
- Referral program: refer a Pro user → get 1 month free

## Growth Phase

- Volume discount for Team (10+ seats = 10% off, 25+ seats = 20% off)
- Annual-only pricing for Enterprise
- Partner program for DevRel agencies and technical consultants (revenue share)

---

_Pricing subject to change. Existing subscribers are grandfathered at their signup price for 12 months after any price change._

---

**Document owner:** Cipher Text Labs Product Team
**Review cycle:** Quarterly
**Next review:** Q2 2026
