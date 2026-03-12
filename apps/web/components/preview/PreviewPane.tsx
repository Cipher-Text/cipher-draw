'use client';

import { forwardRef, useEffect, useMemo, useState } from 'react';

import { renderMarkdown } from '@/components/preview/renderers/renderMarkdown';
import { renderMermaid } from '@/components/preview/renderers/renderMermaid';
import { renderMixed } from '@/components/preview/renderers/renderMixed';
import { renderSvg } from '@/components/preview/renderers/renderSvg';
import { cn } from '@/lib/utils';
import type { DocMode, PreviewBackground, RenderStatus, ThemeMode } from '@/types';

type PreviewPaneProps = {
  mode: DocMode;
  content: string;
  theme: ThemeMode;
  previewBg: PreviewBackground;
  onSvgChange: (svg: string | null) => void;
  onRenderStatus: (status: RenderStatus) => void;
};

const previewBgClass: Record<PreviewBackground, string> = {
  transparent: 'bg-transparent',
  white: 'bg-white text-slate-900',
  dark: 'bg-slate-950 text-slate-100'
};

export const PreviewPane = forwardRef<HTMLDivElement, PreviewPaneProps>(function PreviewPane(
  { mode, content, theme, previewBg, onSvgChange, onRenderStatus },
  ref
) {
  const [html, setHtml] = useState('');
  const [error, setError] = useState<string | null>(null);

  const panelClassName = useMemo(
    () => cn('h-full w-full overflow-auto rounded-md border p-4', previewBgClass[previewBg]),
    [previewBg]
  );

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        let nextHtml = '';
        let svg: string | null = null;

        const mermaidTheme: 'dark' | 'light' =
          previewBg === 'white' ? 'light' : previewBg === 'dark' ? 'dark' : theme;

        if (mode === 'markdown') {
          nextHtml = await renderMarkdown(content);
        } else if (mode === 'mermaid') {
          svg = await renderMermaid(content, mermaidTheme);
          nextHtml = `<div class="mermaid-root">${svg}</div>`;
        } else if (mode === 'svg') {
          svg = renderSvg(content);
          nextHtml = `<div class="svg-root">${svg}</div>`;
        } else {
          nextHtml = await renderMixed(content, mermaidTheme);
        }

        setHtml(nextHtml);
        setError(null);
        onSvgChange(svg);
        onRenderStatus({ ok: true, message: 'Rendered OK' });
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown rendering error';
        setError(message);
        onRenderStatus({ ok: false, message: `Error: ${message}` });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [mode, content, theme, previewBg, onSvgChange, onRenderStatus]);

  if (error) {
    return (
      <div ref={ref} className={panelClassName}>
        <p className="text-sm font-semibold text-red-400">Render Error</p>
        <pre className="mt-2 whitespace-pre-wrap text-sm text-red-300">{error}</pre>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn(
        panelClassName,
        'max-w-none',
        previewBg === 'white' ? 'prose' : 'prose prose-invert'
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
});
