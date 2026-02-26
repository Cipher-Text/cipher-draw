import { sanitizeSvg } from '@/lib/sanitize/sanitize';

export function renderSvg(rawSvg: string): string {
  const trimmed = rawSvg.trim();
  if (!trimmed.startsWith('<svg')) {
    throw new Error('SVG mode expects content starting with <svg ...>.');
  }
  return sanitizeSvg(trimmed);
}
