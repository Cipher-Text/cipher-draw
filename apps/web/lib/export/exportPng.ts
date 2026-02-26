import { toPng } from 'html-to-image';

export async function exportNodeAsPng(node: HTMLElement, filename: string): Promise<void> {
  const dataUrl = await toPng(node, { cacheBust: true, pixelRatio: 2 });
  const anchor = document.createElement('a');
  anchor.href = dataUrl;
  anchor.download = filename;
  anchor.click();
}

export async function nodeToPngDataUrl(node: HTMLElement): Promise<string> {
  return toPng(node, { cacheBust: true, pixelRatio: 2 });
}
