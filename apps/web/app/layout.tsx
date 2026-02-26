import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'Cipher Draw',
  description: 'Markdown, Mermaid, SVG, and mixed renderer playground'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
