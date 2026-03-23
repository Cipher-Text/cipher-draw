# Cipher Draw - Agent Definitions

This directory contains agent definitions for specialized roles when working on the Cipher Draw project. Each agent has specific expertise, responsibilities, and behavioral instructions.

## 📋 Available Agents

### 1. **feature-builder**
Implements new features from components to utilities.

**Role:** Feature development and implementation

**Expertise:**
- Next.js 14 App Router
- React component development
- TypeScript
- Zustand state management
- Tailwind CSS

**Use when:**
- Adding new features
- Creating components
- Implementing utilities
- Building pages or routes

---

### 2. **test-writer**
Writes comprehensive tests with Vitest.

**Role:** Testing and quality assurance

**Expertise:**
- Vitest framework
- Unit and async testing
- React component testing
- Store testing
- Security testing

**Use when:**
- Writing tests for new code
- Improving coverage
- Testing renderers or utilities
- Adding security tests

---

### 3. **doc-maintainer**
Maintains and synchronizes project documentation.

**Role:** Documentation maintenance

**Expertise:**
- Markdown documentation
- Status tracking
- Technical writing
- Cross-referencing

**Use when:**
- Features are completed
- Architecture changes
- Patterns evolve
- Status needs updating

---

## 🎯 How to Use Agents

### For Claude

When given a task, identify the appropriate agent:

**Example 1: "Add keyboard shortcuts"**
- **Primary:** `feature-builder` (implements feature)
- **Secondary:** `test-writer` (adds tests)
- **Tertiary:** `doc-maintainer` (updates docs)

**Example 2: "Improve test coverage"**
- **Primary:** `test-writer` (writes tests)
- **Secondary:** `doc-maintainer` (updates STATUS.md)

**Example 3: "Update STATUS.md after completion"**
- **Primary:** `doc-maintainer` (updates all docs)

### Agent Workflow

Most tasks involve multiple agents in sequence:

1. **feature-builder** implements the feature
2. **test-writer** adds tests
3. **doc-maintainer** updates documentation

## 📁 Agent File Structure

Each agent definition contains:
- **Role** - Primary responsibility
- **Expertise** - Areas of knowledge
- **Behavioral Instructions** - How to approach tasks
- **Tools and Skills** - Which skills and tools to use
- **Example Tasks** - Common use cases
- **Success Criteria** - When task is complete
- **Common Pitfalls** - What to avoid

## 🔗 Related Resources

### Skills
Agent behavior is guided by skills in `.claude/skills/`:
- `next-js-patterns`
- `zustand-state-management`
- `renderer-patterns`
- `security-sanitization`
- `testing-patterns`

### Documentation
Agents reference these docs:
- `CLAUDE.md` - Main project documentation
- `docs/STATUS.md` - Current tasks and priorities
- `docs/ARCHITECTURE.md` - Technical architecture
- `docs/IMPLEMENTATION_GUIDE.md` - Implementation patterns
- `docs/WORKFLOW.md` - Development workflow

## 💡 Best Practices

### Agent Selection
- Choose the agent whose **role** best matches the task
- Use multiple agents sequentially for complex tasks
- Don't force a task into the wrong agent's role

### Agent Behavior
- Agents follow project **skills** strictly
- Agents reference **documentation** before acting
- Agents update **relevant docs** after tasks
- Agents communicate clearly about what they're doing

### Agent Coordination
When multiple agents work on a task:
1. **feature-builder** creates the feature
2. **test-writer** ensures quality
3. **doc-maintainer** ensures traceability

## 🎨 Agent Specializations

### Development
- `feature-builder` - Implementation

### Quality
- `test-writer` - Testing and coverage

### Documentation
- `doc-maintainer` - Documentation sync

## 📝 Adding New Agents

When adding a new agent:

1. Create file: `.claude/agents/agent-name.md`
2. Include all standard sections:
   - Role
   - Expertise
   - Behavioral Instructions
   - Tools and Skills to Use
   - Example Tasks
   - Success Criteria
   - Common Pitfalls
   - Related Documentation
   - Communication Style
3. Update this README

## 🔄 Agent Lifecycle

### Before Task
1. Read task requirements
2. Review relevant skills
3. Check documentation
4. Plan approach

### During Task
1. Follow behavioral instructions
2. Apply relevant skills
3. Use appropriate tools
4. Communicate progress

### After Task
1. Verify success criteria
2. Update documentation (if doc-maintainer)
3. Run tests (if test-writer)
4. Summarize changes

## 🎯 Success Metrics

Agents are successful when:
- [ ] Task completed per success criteria
- [ ] Project patterns followed
- [ ] Documentation updated
- [ ] Tests added/passing
- [ ] No regressions introduced
- [ ] Clear communication

---

**Last Updated:** March 23, 2026
