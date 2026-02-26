import { describe, expect, it } from 'vitest';

import { splitMixedBlocks } from '@/components/preview/renderers/renderMixed';

describe('splitMixedBlocks', () => {
  it('splits markdown and mermaid fences into ordered segments', () => {
    const input = `# Title\n\nText\n\n\`\`\`mermaid\nflowchart TD\nA-->B\n\`\`\`\n\nTail`;
    const segments = splitMixedBlocks(input);

    expect(segments).toEqual([
      { kind: 'markdown', value: '# Title\n\nText\n\n' },
      { kind: 'mermaid', value: 'flowchart TD\nA-->B' },
      { kind: 'markdown', value: '\n\nTail' }
    ]);
  });
});
