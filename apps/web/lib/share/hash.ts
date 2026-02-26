import { decodeSharePayload, encodeSharePayload } from '@/lib/share/codec';
import type { DocState } from '@/types';

export function readStateFromHash(): Partial<DocState> | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const hash = window.location.hash.startsWith('#')
    ? window.location.hash.slice(1)
    : window.location.hash;

  if (!hash) {
    return null;
  }

  const decoded = decodeSharePayload(hash);
  if (!decoded) {
    return null;
  }

  return decoded;
}

export function writeStateToHash(state: Pick<DocState, 'mode' | 'content' | 'theme'>): string {
  if (typeof window === 'undefined') {
    return '';
  }

  const encoded = encodeSharePayload(state);
  window.history.replaceState(null, '', `${window.location.pathname}#${encoded}`);
  return `${window.location.origin}${window.location.pathname}#${encoded}`;
}
