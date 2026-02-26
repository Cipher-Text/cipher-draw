import { jsPDF } from 'jspdf';

import { nodeToPngDataUrl } from '@/lib/export/exportPng';

export async function exportNodeAsPdf(node: HTMLElement, filename: string): Promise<void> {
  const dataUrl = await nodeToPngDataUrl(node);
  const image = new Image();

  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = () => reject(new Error('Unable to load preview image for PDF export.'));
    image.src = dataUrl;
  });

  const pdf = new jsPDF({
    orientation: image.width > image.height ? 'landscape' : 'portrait',
    unit: 'px',
    format: [image.width, image.height]
  });

  pdf.addImage(dataUrl, 'PNG', 0, 0, image.width, image.height);
  pdf.save(filename);
}
