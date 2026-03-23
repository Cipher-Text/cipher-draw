# Security and Sanitization Patterns

## What is this skill?

This skill documents security practices and sanitization patterns used in Cipher Draw to prevent XSS attacks and ensure safe rendering of user-generated content.

## When to apply this skill

- Adding new rendering features
- Working with user-generated content
- Implementing export functionality
- Debugging security issues
- Reviewing code for security vulnerabilities
- Adding tests for XSS protection

## Key concepts covered

- XSS prevention with DOMPurify
- HTML and SVG sanitization
- Security boundaries
- React JSX escaping
- Common attack vectors
- Defense in depth
- Testing security

## Related documentation

- `lib/sanitize/sanitize.ts` - Sanitization implementation
- `docs/ARCHITECTURE.md` - Security architecture
- `CLAUDE.md` - Security considerations
- [OWASP XSS Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
