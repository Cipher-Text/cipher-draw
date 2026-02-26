# 🧩 Cipher Draw

> **Write. Render. Share.** — Your team's technical memory, written in code, seen as diagrams.

A developer-native diagramming and documentation studio that supports Markdown, Mermaid, SVG, and Mixed content with live preview, export, and sharing.

[![Phase](https://img.shields.io/badge/Phase-1%20MVP-blue)](docs/ROADMAP.md)
[![Progress](https://img.shields.io/badge/Progress-90%25-yellow)](docs/STATUS.md)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## ✨ Features

### Currently Available (Phase 1 - 85% Complete)
- ✅ **Monaco Editor** - VS Code quality editor with syntax highlighting
- ✅ **4 Rendering Modes** - Markdown, Mermaid, SVG, Mixed (Markdown + Mermaid)
- ✅ **Live Preview** - 300ms debounced rendering
- ✅ **Export System** - SVG, PNG, PDF, Markdown
- ✅ **URL Sharing** - Compressed hash-based sharing (no backend needed)
- ✅ **Dark/Light Theme** - Full theme support
- ✅ **Resizable Panes** - Drag to adjust editor/preview split
- ✅ **State Persistence** - Auto-save to localStorage
- ✅ **Sample Templates** - Quick start templates for each mode

### Coming Soon (Phase 1 Completion)
- ⏳ Keyboard shortcuts (Ctrl+S, Ctrl+Enter)
- ⏳ Mobile responsive layout
- ⏳ CI/CD pipeline
- ⏳ Production deployment

### Roadmap (Phase 2+)
- 📋 **Accounts & Spaces** - Save, organize, version history
- 🤖 **AI Layer (BYOAI)** - Natural language → diagram with your own AI key
- 🔗 **Sharing & Gallery** - Embeds, public gallery, presentation mode
- 👥 **Collaboration** - Real-time co-editing, GitHub sync, REST API

[See full roadmap →](docs/ROADMAP.md)

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 20+ (recommended: use [nvm](https://github.com/nvm-sh/nvm))
- **pnpm** 10+ (install: `npm install -g pnpm`)

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

The app will be running at **http://localhost:3000**

---

## 🛠️ Development

### Available Commands

```bash
# Development
pnpm dev                  # Start dev server (all workspaces)
pnpm -C apps/web dev      # Start web app only
pnpm build                # Build for production
pnpm lint                 # Run ESLint
pnpm test                 # Run tests with Vitest

# Specific workspace commands
cd apps/web
pnpm dev                  # Web app development
pnpm build                # Build web app
pnpm test                 # Run web app tests
```

### Project Structure

```
cipher-draw/
├── apps/
│   └── web/              # Next.js 14 frontend (Phase 1)
│       ├── app/          # App Router pages
│       ├── components/   # React components
│       ├── lib/          # Utilities (export, share, sanitize)
│       ├── store/        # Zustand state management
│       └── tests/        # Vitest tests
│
├── server/               # NestJS backend (Phase 2+, not started)
├── packages/
│   └── shared/           # Shared types and utilities
│
├── docs/                 # 📚 Complete documentation (see below)
└── pnpm-workspace.yaml   # Monorepo configuration
```

---

## 📚 Documentation

**Start here:** [docs/README.md](docs/README.md) - Complete documentation index

### Key Documents

| Document | Purpose |
|---|---|
| [STATUS.md](docs/STATUS.md) | Current implementation status, what's done, what's next |
| [ROADMAP.md](docs/ROADMAP.md) | Strategic roadmap for all 5 phases |
| [NEXT_FEATURES.md](docs/NEXT_FEATURES.md) | Prioritized feature list with impact analysis |
| [IMPLEMENTATION_GUIDE.md](docs/IMPLEMENTATION_GUIDE.md) | For AI assistants: patterns, examples, pitfalls |
| [WORKFLOW.md](docs/WORKFLOW.md) | Development workflow and doc sync process |
| [FEATURE_TIERS.md](docs/FEATURE_TIERS.md) | Features organized by impact (Must/Nice/Amazing) |
| [REQUIREMENTS.md](docs/REQUIREMENTS.md) | Product requirements (PRD) |
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | Technical architecture |
| [PRICING.md](docs/PRICING.md) | Business model and pricing strategy |

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### For Developers
1. Check [docs/STATUS.md](docs/STATUS.md) for current tasks
2. Read [docs/IMPLEMENTATION_GUIDE.md](docs/IMPLEMENTATION_GUIDE.md) for patterns
3. Follow [docs/WORKFLOW.md](docs/WORKFLOW.md) for the process
4. Pick a task marked `❌ Not Started`
5. Implement and update docs
6. Submit a PR

### For AI-Assisted Development
This project is optimized for AI coding assistants (Claude, GPT, Cursor):
- [IMPLEMENTATION_GUIDE.md](docs/IMPLEMENTATION_GUIDE.md) has complete codebase reference
- [WORKFLOW.md](docs/WORKFLOW.md) documents what to update after implementation
- All patterns, pitfalls, and examples are documented

---

## 🏗️ Tech Stack

### Frontend (Phase 1)
- **Framework:** Next.js 14 (App Router)
- **Editor:** Monaco Editor (VS Code engine)
- **Diagrams:** Mermaid.js 11
- **Markdown:** remark + rehype
- **State:** Zustand with localStorage persistence
- **Styling:** Tailwind CSS + shadcn/ui
- **Testing:** Vitest
- **Export:** html-to-image, jspdf

### Backend (Phase 2+, not started)
- **API:** NestJS
- **Database:** PostgreSQL + Prisma ORM
- **Cache:** Redis
- **Auth:** JWT + OAuth2 (GitHub, Google)

### Deployment
- **Frontend:** Vercel (planned)
- **Backend:** Railway/Render (Phase 2+)
- **Self-Hosted:** Docker Compose (planned)

---

## 📊 Current Status

**Phase:** Phase 1 (MVP Editor)
**Progress:** 90% Complete
**Timeline:** 1 day to public beta

```
Phase 1: MVP Editor           ██████████████████░ 90%  🔄 Active
Phase 2: Accounts & Spaces    ░░░░░░░░░░░░░░░░░░  0%  ⏸️ Not Started
Phase 3: AI Layer (BYOAI)     ░░░░░░░░░░░░░░░░░░  0%  ⏸️ Not Started
Phase 4: Sharing & Gallery    ░░░░░░░░░░░░░░░░░░  0%  ⏸️ Not Started
Phase 5: Collaboration & API  ░░░░░░░░░░░░░░░░░░  0%  ⏸️ Not Started
```

### What Works ✅
- Monaco Editor with 4 modes
- Live preview with debouncing
- Export to SVG, PNG, PDF, MD
- URL-based sharing
- **Read-only view page** ⭐ NEW
- **Fork functionality** ⭐ NEW
- Theme system
- State persistence

### What's Next ⏭️
1. Keyboard shortcuts (Ctrl+S, Ctrl+Enter)
2. Mobile responsive testing
3. CI/CD pipeline
4. Vercel deployment

[See detailed status →](docs/STATUS.md)

---

## 🎯 Core Philosophy

### Open Source & Self-Hostable
- **MIT Licensed** - Free to use, modify, and distribute
- **Self-hostable** - Docker Compose for full control
- **No vendor lock-in** - Your data, your infrastructure

### Bring Your Own AI (BYOAI)
- **No AI vendor lock-in** - Use OpenAI, Anthropic, Google, or Ollama
- **Keys stay local** - Stored in browser localStorage, never sent to us
- **Local AI supported** - Ollama for complete privacy
- **Optional** - All features work without AI

### Developer-First
- **Code-based** - Diagrams as code, not drag-and-drop
- **Git-friendly** - Plain text files, perfect for version control
- **Keyboard-centric** - Built for developer workflows
- **Fast** - No bloat, instant preview

---

## 🔒 Security

- ✅ **DOMPurify sanitization** for all rendered HTML/SVG
- ✅ **XSS protection** via React JSX escaping
- ✅ **No PII collection** in Phase 1 (frontend-only)
- ✅ **API keys in localStorage** only (never sent to servers)

[Security policy →](SECURITY.md)

---

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

**Current test coverage:** 2 test files
- `codec.test.ts` - Share compression/decompression
- `renderMixed.test.ts` - Mixed mode rendering

**Target:** 70%+ coverage by Phase 1 completion

---

## 📈 Performance

**Current metrics (local dev):**
- ⚡ Initial load: ~2s
- ⚡ Editor-to-preview latency: <300ms
- ⚡ Bundle size: ~280KB first load (Monaco is large)
- ⚡ Lighthouse: ~95 (needs production test)

**Targets for Phase 1:**
- Initial load: <2s
- Render latency: <300ms
- Lighthouse: 90+ all metrics

---

## 🗺️ Roadmap Highlights

### Phase 1: MVP Editor (Week 1-3) - 85% Complete
Fast, beautiful, zero-friction editor. No login required.

### Phase 2: Accounts & Spaces (Week 4-7) - Not Started
Persistent storage, version history, organized workspaces.

### Phase 3: AI Layer (BYOAI) (Week 8-10) - Not Started
Natural language → diagram. Optional, bring your own AI key.

### Phase 4: Sharing & Gallery (Week 11-13) - Not Started
Embeds, public gallery, presentation mode.

### Phase 5: Collaboration (Month 4+) - Not Started
Real-time co-editing, GitHub sync, REST API, plugins.

[Full roadmap with milestones →](docs/ROADMAP.md)

---

## 💰 Pricing (Future)

**Free Tier:**
- Unlimited public documents
- 50 private documents
- Full editor + AI (BYOAI)
- URL sharing + embeds

**Pro ($9/month):**
- Unlimited private documents
- Unlimited version history
- Advanced AI features

**Team ($24/seat/month):**
- Real-time collaboration
- GitHub/GitLab sync
- REST API access

**Self-Hosted (Free, Open Source):**
- Full codebase, MIT licensed
- Docker Compose setup
- Community support

[Full pricing details →](docs/PRICING.md)

---

## 🌟 What Makes Cipher Draw Different

| Feature | Cipher Draw | Competitors |
|---|---|---|
| **Multi-syntax support** | ✅ Markdown, Mermaid, SVG, Mixed | ❌ Single syntax only |
| **BYOAI (any provider)** | ✅ OpenAI, Claude, Gemini, Ollama | ❌ Vendor lock-in |
| **Local AI support** | ✅ Ollama (no internet needed) | ❌ Cloud only |
| **Open source** | ✅ MIT license | ❌ Proprietary |
| **Self-hostable** | ✅ Docker Compose | ❌ SaaS only |
| **No login required** | ✅ Editor works instantly | ❌ Account required |
| **Developer-first** | ✅ Code-based, git-friendly | ❌ Drag-and-drop only |

---

## 🎨 Screenshots

_Coming soon after Phase 1 completion_

---

## 🐛 Known Issues

1. **URL length limit** - Hash-based sharing fails for very large documents (>8KB)
   - **Fix:** Phase 2 server-side save with short tokens

2. **Mobile layout** - Current layout may break on small screens
   - **Fix:** In progress (see STATUS.md)

3. **No keyboard shortcuts** - Expected developer feature missing
   - **Fix:** In progress (see STATUS.md)

[Full issue list →](https://github.com/your-org/cipher-draw/issues)

---

## 📞 Support & Community

- 📖 **Documentation:** [docs/README.md](docs/README.md)
- 🐛 **Bug Reports:** [GitHub Issues](https://github.com/your-org/cipher-draw/issues)
- 💬 **Discussions:** [GitHub Discussions](https://github.com/your-org/cipher-draw/discussions)
- 🚀 **Feature Requests:** [docs/NEXT_FEATURES.md](docs/NEXT_FEATURES.md)

---

## 🏆 Acknowledgments

Built with:
- [Next.js](https://nextjs.org/) - React framework
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - Code editor
- [Mermaid](https://mermaid.js.org/) - Diagram rendering
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Zustand](https://github.com/pmndrs/zustand) - State management

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

**TL;DR:** Free to use, modify, and distribute. No restrictions.

---

## 👨‍💻 Author

**Cipher Text Labs**

- Website: [ciphertext.io](https://ciphertext.io)
- GitHub: [@ciphertext](https://github.com/ciphertext)

---

## ⭐ Star History

If you find Cipher Draw useful, please consider starring the repo!

---

**Built with ❤️ for developers who think in diagrams**

---

## Quick Links

- [Get Started](#-quick-start) - Installation and setup
- [Documentation](docs/README.md) - Complete docs
- [Roadmap](docs/ROADMAP.md) - What's next
- [Contributing](CONTRIBUTING.md) - How to help
- [License](LICENSE) - MIT License
