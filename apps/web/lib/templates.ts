import type { DocMode } from '@/types';

export const MODE_TEMPLATES: Record<DocMode, string> = {
  markdown: `# Cipher Draw\n\nWrite **Markdown** here.\n\n| Feature | Status |\n|---|---|\n| Tables | Supported |\n| Code blocks | Supported |\n\n\`\`\`ts\nconsole.log('hello markdown');\n\`\`\``,
  mermaid: `flowchart TD\n    A[Start] --> B{Choice}\n    B -->|Yes| C[Continue]\n    B -->|No| D[Stop]\n    C --> E[Done]`,
  svg: `<svg width="500" height="220" viewBox="0 0 500 220" xmlns="http://www.w3.org/2000/svg">\n  <rect x="10" y="10" width="480" height="200" rx="16" fill="#0f172a"/>\n  <circle cx="110" cy="110" r="56" fill="#22d3ee"/>\n  <text x="200" y="120" fill="#e2e8f0" font-size="28" font-family="monospace">Cipher Draw</text>\n</svg>`,
  mixed: `# Mixed Mode\n\nThis mode supports Markdown with Mermaid fences.\n\n\`\`\`mermaid\nsequenceDiagram\n    participant U as User\n    participant C as Cipher Draw\n    U->>C: Edit content\n    C-->>U: Live preview\n\`\`\`\n\n- Markdown list item\n- Mermaid block rendered inline`
};

export const getTemplateForMode = (mode: DocMode): string => MODE_TEMPLATES[mode];
