import { describe, expect, it } from 'vitest';

import { decodeSharePayload, encodeSharePayload } from '@/lib/share/codec';

describe('share codec', () => {
  it('encodes and decodes a valid payload', () => {
    const payload = {
      mode: 'mixed' as const,
      content: '# Hello\n```mermaid\nflowchart TD\nA-->B\n```',
      theme: 'dark' as const
    };

    const encoded = encodeSharePayload(payload);
    const decoded = decodeSharePayload(encoded);

    expect(decoded).toEqual(payload);
  });

  it('returns null for invalid payload', () => {
    const decoded = decodeSharePayload('invalid-hash');
    expect(decoded).toBeNull();
  });
});
