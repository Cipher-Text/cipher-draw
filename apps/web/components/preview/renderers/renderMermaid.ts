'use client';

import { sanitizeSvg } from '@/lib/sanitize/sanitize';

let initialized = false;

async function getMermaid() {
  const mermaidModule = await import('mermaid');
  const mermaid = mermaidModule.default;

  if (!initialized) {
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'strict',
      theme: 'default'
    });
    initialized = true;
  }

  return mermaid;
}

export async function renderMermaid(definition: string, theme: 'dark' | 'light'): Promise<string> {
  const mermaid = await getMermaid();

  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'strict',
    theme: theme === 'dark' ? 'dark' : 'default'
  });

  const id = `mermaid-${Math.random().toString(36).slice(2, 10)}`;
  const { svg } = await mermaid.render(id, definition);
  return sanitizeSvg(svg);
}
