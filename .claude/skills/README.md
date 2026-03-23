# Cipher Draw - Skills Index

This directory contains skill definitions for Claude to follow when working on the Cipher Draw project. Each skill encapsulates patterns, conventions, and best practices for specific aspects of the codebase.

## 📚 Available Skills

### 1. **next-js-patterns**
Next.js 14 App Router patterns and conventions.

**Apply when:**
- Creating new pages or routes
- Working with client/server components
- Setting up layouts or metadata
- Debugging routing issues

**Key concepts:**
- App Router structure
- Client vs Server Components
- Dynamic routes
- Path aliases (`@/`)

---

### 2. **zustand-state-management**
Zustand store patterns with localStorage persistence.

**Apply when:**
- Creating or modifying stores
- Adding state or actions
- Optimizing re-renders
- Implementing persistence

**Key concepts:**
- Store definition with TypeScript
- Selective subscriptions
- Persistence middleware
- Action patterns

---

### 3. **renderer-patterns**
Mode-specific rendering architecture (Markdown, Mermaid, SVG, Mixed).

**Apply when:**
- Creating or modifying renderers
- Adding new rendering modes
- Debugging rendering issues
- Handling render errors

**Key concepts:**
- Async rendering
- Sanitization requirements
- Error handling
- Theme support
- Mixed mode parsing

---

### 4. **security-sanitization**
Security practices and XSS prevention with DOMPurify.

**Apply when:**
- Working with user-generated content
- Implementing rendering or export features
- Reviewing code for security
- Adding XSS tests

**Key concepts:**
- HTML and SVG sanitization
- Common XSS attack vectors
- Security boundaries
- Defense in depth
- React JSX escaping

---

### 5. **testing-patterns**
Vitest testing patterns and conventions.

**Apply when:**
- Writing tests for new features
- Testing utilities and renderers
- Testing React components or stores
- Improving coverage

**Key concepts:**
- AAA pattern
- Unit and async tests
- Mocking and spying
- Coverage targets
- Testing best practices

---

## 🎯 How to Use Skills

### For Claude

When working on a task, identify which skills apply:

1. **Creating a new page?** → Apply `next-js-patterns`
2. **Modifying state?** → Apply `zustand-state-management`
3. **Working on renderers?** → Apply `renderer-patterns` + `security-sanitization`
4. **Writing tests?** → Apply `testing-patterns`

### Skill Structure

Each skill directory contains:
- **`SKILL.md`** - Detailed rules, patterns, and examples
- **`README.md`** - Overview and when to apply

## 🔗 Related Documentation

- **`CLAUDE.md`** - Main project documentation
- **`docs/ARCHITECTURE.md`** - Technical architecture
- **`docs/IMPLEMENTATION_GUIDE.md`** - AI assistant guide
- **`docs/STATUS.md`** - Current tasks and priorities

## 📝 Adding New Skills

When adding a new skill:

1. Create directory: `.claude/skills/skill-name/`
2. Add `SKILL.md` with:
   - Rules and conventions
   - Code examples
   - Patterns to follow
   - Anti-patterns to avoid
3. Add `README.md` with:
   - What is this skill?
   - When to apply it?
   - Key concepts
4. Update this index

## 🎨 Skill Categories

### Architecture & Framework
- `next-js-patterns` - Next.js App Router
- `zustand-state-management` - State management

### Features & Logic
- `renderer-patterns` - Rendering engine
- `security-sanitization` - Security practices

### Quality & Testing
- `testing-patterns` - Vitest testing

## 💡 Best Practices

- **Combine skills:** Most tasks require multiple skills
- **Keep updated:** Update skills as patterns evolve
- **Add examples:** Real code examples are most helpful
- **Document anti-patterns:** Show what NOT to do

---

**Last Updated:** March 23, 2026
