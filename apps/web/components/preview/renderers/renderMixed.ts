'use client';

import { renderMarkdown } from '@/components/preview/renderers/renderMarkdown';
import { renderMermaid } from '@/components/preview/renderers/renderMermaid';

type MixedSegment =
  | { kind: 'markdown'; value: string }
  | { kind: 'mermaid'; value: string };

export function splitMixedBlocks(input: string): MixedSegment[] {
  const regex = /```mermaid\n([\s\S]*?)```/g;
  const segments: MixedSegment[] = [];
  let lastIndex = 0;

  for (const match of input.matchAll(regex)) {
    const start = match.index ?? 0;
    if (start > lastIndex) {
      segments.push({ kind: 'markdown', value: input.slice(lastIndex, start) });
    }
    segments.push({ kind: 'mermaid', value: (match[1] ?? '').trim() });
    lastIndex = start + match[0].length;
  }

  if (lastIndex < input.length) {
    segments.push({ kind: 'markdown', value: input.slice(lastIndex) });
  }

  return segments;
}

export async function renderMixed(input: string, theme: 'dark' | 'light'): Promise<string> {
  const segments = splitMixedBlocks(input);
  const htmlChunks: string[] = [];

  for (const segment of segments) {
    if (segment.kind === 'markdown') {
      if (segment.value.trim().length > 0) {
        htmlChunks.push(await renderMarkdown(segment.value));
      }
      continue;
    }

    if (!segment.value) {
      continue;
    }

    const svg = await renderMermaid(segment.value, theme);
    htmlChunks.push(`<div class="mixed-mermaid-block">${svg}</div>`);
  }

  return htmlChunks.join('\n');
}
