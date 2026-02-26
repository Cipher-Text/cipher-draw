# Development Workflow & Documentation Sync

**Purpose:** Keep documentation automatically in sync with code changes

**Last Updated:** February 27, 2026

---

## 🔄 Development Workflow

### Daily Development Cycle

```
1. Check STATUS.md → Pick a task
2. Read IMPLEMENTATION_GUIDE.md → Understand patterns
3. Implement feature
4. Test locally
5. Update docs (see checklist below)
6. Commit with proper message
7. Repeat
```

---

## ✅ Post-Implementation Checklist

**After completing ANY feature, update these docs in order:**

### 1. Update STATUS.md (REQUIRED)
```markdown
## Phase 1 Completion Tasks

### 1. View Page
**Status:** ✅ Complete (was: ❌ Not Started)

- [x] Decode state from URL hash
- [x] Render in read-only mode
- [x] Show title, mode badge
- [x] Add "Fork" button
```

**Also update:**
- Progress bar: `85% → 90%`
- "What's Missing" section: remove completed item
- "What Works" section: add new feature

### 2. Update IMPLEMENTATION_GUIDE.md (REQUIRED)
```markdown
## Codebase Structure

├── app/
│   └── view/
│       └── [token]/
│           └── page.tsx            # ✅ Read-only view (DONE)
```

**If you added a new pattern, document it:**
```markdown
### Pattern 5: [Your Pattern Name]

**Example:** [Brief description]

[Code example]
```

### 3. Update ROADMAP.md (if milestone reached)
Only update if you completed a full phase milestone:
```markdown
## Phase 1: MVP Editor (Week 1-3)

**Status:** ✅ Complete (was: 🟡 85% Complete)
```

### 4. Git Commit (REQUIRED)
```bash
git add .
git commit -m "feat: add read-only view page

Implements /view/[token] route for sharing.
Users can view and fork shared diagrams.

Updates:
- STATUS.md: marked task #1 as complete
- IMPLEMENTATION_GUIDE.md: added view page example
"
```

---

## 📝 Documentation Update Templates

### Template: Completed Feature

**In STATUS.md:**
```markdown
### X. Feature Name
**Priority:** P0 | **Time:** 2-3 hours | **Status:** ✅ Complete

- [x] Requirement 1
- [x] Requirement 2
- [x] Requirement 3

**Implementation notes:**
- File created: `path/to/file.tsx`
- Pattern used: [reference to pattern]
- Testing: [what was tested]
```

### Template: New Pattern

**In IMPLEMENTATION_GUIDE.md:**
```markdown
### Pattern X: [Pattern Name]

**Example: [Use case]**

**Problem:** [What problem does this solve]

**Solution:**
[Code example with comments]

**Usage:**
[When to use this pattern]
```

### Template: Git Commit

**For features:**
```
feat: [short description]

[Detailed description of what was added]

Changes:
- [File 1]: [what changed]
- [File 2]: [what changed]

Updates:
- STATUS.md: marked task #X as complete
- IMPLEMENTATION_GUIDE.md: added [pattern/example]

[Optional: Closes #issue-number]
```

**For bug fixes:**
```
fix: [short description]

[What was broken and how it was fixed]

Changes:
- [File]: [what changed]
```

**For docs:**
```
docs: [what was updated]

[Brief description]
```

---

## 🎯 Feature Implementation Workflow

### Step-by-Step Guide

#### 1. Before Starting
```bash
# Pull latest changes
git pull origin main

# Check current status
cat docs/STATUS.md | grep "Priority: P0"

# Read implementation guide
cat docs/IMPLEMENTATION_GUIDE.md | grep -A 10 "Pattern"
```

#### 2. During Implementation
- Keep STATUS.md open as reference
- Check IMPLEMENTATION_GUIDE.md for patterns
- Test incrementally (don't wait until the end)
- Take notes of any new patterns you discover

#### 3. After Implementation
```bash
# Test the feature
pnpm dev
# Manual testing in browser

# Run automated tests
pnpm test

# Lint
pnpm lint

# Update docs (see checklist above)
# STATUS.md
# IMPLEMENTATION_GUIDE.md
# (ROADMAP.md if milestone)

# Commit
git add .
git commit -m "feat: [your feature]

[description]

Updates:
- STATUS.md: task completed
- IMPLEMENTATION_GUIDE.md: added example
"

# Push (if working on branch)
git push origin feature-branch
```

---

## 🤖 AI Assistant Workflow

**When working with AI assistants (Claude, GPT, Cursor, etc.):**

### 1. Provide Context
```
I want to implement [feature] from STATUS.md.

Please:
1. Read docs/STATUS.md to understand the task
2. Read docs/IMPLEMENTATION_GUIDE.md for patterns
3. Implement the feature
4. Update STATUS.md to mark it complete
5. Update IMPLEMENTATION_GUIDE.md with any new patterns
6. Generate a git commit message
```

### 2. Verify Output
AI should provide:
- ✅ Implementation code
- ✅ Updated STATUS.md
- ✅ Updated IMPLEMENTATION_GUIDE.md (if new patterns)
- ✅ Git commit message
- ✅ Testing instructions

### 3. Review Before Committing
```bash
# Check what changed
git diff

# Verify docs updated
git diff docs/STATUS.md
git diff docs/IMPLEMENTATION_GUIDE.md

# Test locally
pnpm dev

# Commit if all good
git add .
git commit -F commit-message.txt
```

---

## 📊 Progress Tracking

### How to Calculate Progress

**Phase 1 Example:**
- Total tasks: 14 (critical + important)
- Completed: 12
- Progress: 12/14 = 85.7% → round to **85%**

**Update progress in:**
1. STATUS.md (top and progress bar)
2. docs/README.md (progress bar)
3. ROADMAP.md (phase status)

### Progress Bar Format
```
Phase 1: MVP Editor           ████████████████░░ 85%  🔄 Active
```

Count blocks: 20 total blocks
- 85% = 17 filled blocks (█)
- 15% = 3 empty blocks (░)

---

## 🔍 Documentation Review Checklist

**Before pushing, verify:**

- [ ] STATUS.md updated with completed task
- [ ] Progress percentage updated
- [ ] IMPLEMENTATION_GUIDE.md updated if new patterns added
- [ ] All checkboxes marked correctly (✅ or ❌)
- [ ] No broken links between docs
- [ ] Commit message follows convention
- [ ] Tests mentioned if added

---

## 🚀 Release Workflow

### Phase Completion Checklist

**When completing a full phase (e.g., Phase 1):**

1. **Verify all tasks complete**
   ```bash
   grep "❌" docs/STATUS.md
   # Should return nothing for the current phase
   ```

2. **Update all docs**
   - STATUS.md: Phase X → 100%, update "What Works"
   - ROADMAP.md: Phase X status → ✅ Complete
   - docs/README.md: Update progress bars

3. **Create release commit**
   ```bash
   git add .
   git commit -m "chore: complete Phase 1 - MVP Editor

   All Phase 1 tasks completed:
   - Editor with 4 modes
   - Live preview
   - Export system
   - URL sharing
   - View page
   - Keyboard shortcuts
   - Mobile responsive
   - CI/CD pipeline

   Next: Phase 2 - Accounts & Spaces
   "
   ```

4. **Tag release**
   ```bash
   git tag -a v0.1.0-phase1 -m "Phase 1 Complete: MVP Editor"
   git push origin v0.1.0-phase1
   ```

5. **Announce**
   - Update README.md with "What's New"
   - Post on Discord/Slack
   - Update project board

---

## 📅 Documentation Review Schedule

### Daily (during active development)
- [ ] Update STATUS.md after each completed task
- [ ] Update IMPLEMENTATION_GUIDE.md if new patterns

### Weekly
- [ ] Review all checkboxes in STATUS.md
- [ ] Verify progress percentages accurate
- [ ] Check for outdated information

### Per Phase
- [ ] Update ROADMAP.md with phase status
- [ ] Review FEATURE_TIERS.md (add/remove features)
- [ ] Update REQUIREMENTS.md if scope changed

### Quarterly
- [ ] Full documentation audit
- [ ] Remove deprecated information
- [ ] Consolidate if duplication appears
- [ ] Update PRICING.md if plans changed

---

## 🔗 Documentation Links Maintenance

**All documents should link to each other coherently:**

### From STATUS.md:
```markdown
See [ROADMAP.md](./ROADMAP.md) for long-term planning
See [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md) for patterns
```

### From IMPLEMENTATION_GUIDE.md:
```markdown
See [STATUS.md](./STATUS.md) for current priority tasks
See [ROADMAP.md](./ROADMAP.md) for phase overview
```

### From ROADMAP.md:
```markdown
See [STATUS.md](./STATUS.md) for Phase 1 completion status
See [FEATURE_TIERS.md](./FEATURE_TIERS.md) for impact analysis
```

**Check links quarterly:**
```bash
# Find all markdown links
grep -r "\[.*\](\./" docs/

# Verify each file exists
```

---

## 🎨 Documentation Style Guide

### Headings
```markdown
# Top Level (Document Title)
## Major Section
### Subsection
#### Minor Section
```

### Status Indicators
```markdown
✅ Complete / Done
❌ Not Started / Missing
⚠️ In Progress / Needs Attention
⏸️ Paused / Blocked
🔄 Active / Ongoing
```

### Priority Levels
```markdown
**Priority:** P0 - Critical, blocking
**Priority:** P1 - Important, should have
**Priority:** P2 - Nice to have, optional
```

### Time Estimates
```markdown
**Time:** 30 min
**Time:** 1-2 hours
**Time:** 3-4 hours
**Time:** 1-2 days
```

### Progress Bars
```markdown
████████████████████ 100%  ✅ Complete
████████████████░░░░ 80%   🔄 Active
██████████░░░░░░░░░░ 50%   ⚠️ In Progress
████░░░░░░░░░░░░░░░░ 20%   🔄 Active
░░░░░░░░░░░░░░░░░░░░ 0%    ⏸️ Not Started
```

---

## 🐛 Common Documentation Mistakes

### ❌ Don't:
1. Mark task complete without testing
2. Update STATUS.md but forget IMPLEMENTATION_GUIDE.md
3. Leave broken links after file renames
4. Use vague commit messages ("update docs")
5. Skip updating progress percentages

### ✅ Do:
1. Test before marking complete
2. Update all affected docs
3. Verify links work
4. Write descriptive commit messages
5. Keep percentages accurate

---

## 📦 Backup Strategy

**Documentation is code - treat it as such:**

```bash
# Docs are version controlled
git log -- docs/

# View doc changes
git log -p docs/STATUS.md

# Restore old version if needed
git checkout <commit> -- docs/STATUS.md
```

**No separate backup needed - git is the backup.**

---

*This workflow ensures documentation stays in sync with code automatically.*
*Follow this process for every feature implementation.*
