import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string';

import type { DocState } from '@/types';

type SharePayload = Pick<DocState, 'mode' | 'content' | 'theme'>;

export function encodeSharePayload(payload: SharePayload): string {
  const json = JSON.stringify(payload);
  return compressToEncodedURIComponent(json);
}

export function decodeSharePayload(encoded: string): SharePayload | null {
  const json = decompressFromEncodedURIComponent(encoded);
  if (!json) {
    return null;
  }

  try {
    const parsed = JSON.parse(json) as Partial<SharePayload>;
    if (!parsed.mode || typeof parsed.content !== 'string' || !parsed.theme) {
      return null;
    }

    return {
      mode: parsed.mode,
      content: parsed.content,
      theme: parsed.theme
    } as SharePayload;
  } catch {
    return null;
  }
}
