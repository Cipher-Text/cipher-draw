'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { MonacoEditor } from '@/components/editor/MonacoEditor';
import { PreviewPane } from '@/components/preview/PreviewPane';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { readStateFromHash, writeStateToHash } from '@/lib/share/hash';
import { getTemplateForMode } from '@/lib/templates';
import { cn } from '@/lib/utils';
import { useDocStore } from '@/store/useDocStore';
import type { DocMode, RenderStatus } from '@/types';

type ViewMode = 'editor' | 'split' | 'preview';
type ExportAction = 'none' | 'svg' | 'png' | 'pdf' | 'md' | 'copy-svg';

const modeOptions = [
  { label: 'Markdown', value: 'markdown' },
  { label: 'Mermaid', value: 'mermaid' },
  { label: 'SVG', value: 'svg' },
  { label: 'Mixed', value: 'mixed' }
];

const previewBgOptions = [
  { label: 'Preview: Dark', value: 'dark' },
  { label: 'Preview: White', value: 'white' },
  { label: 'Preview: Transparent', value: 'transparent' }
];

const languageByMode: Record<DocMode, string> = {
  markdown: 'markdown',
  mermaid: 'markdown',
  svg: 'xml',
  mixed: 'markdown'
};

const featureFlags = {
  auth: process.env.NEXT_PUBLIC_FEATURE_AUTH === 'true',
  save: process.env.NEXT_PUBLIC_FEATURE_SAVE === 'true'
};

function downloadMarkdown(content: string, title: string): void {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `${title || 'cipher-draw'}.md`;
  anchor.click();
  URL.revokeObjectURL(url);
}

export default function HomePage() {
  const {
    mode,
    title,
    content,
    theme,
    editorTheme,
    previewBg,
    setMode,
    setTitle,
    setContent,
    setTheme,
    setPreviewBg,
    applySharedState
  } = useDocStore();

  const rootRef = useRef<HTMLDivElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const hashLoadedRef = useRef(false);

  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const [splitRatio, setSplitRatio] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [svgForExport, setSvgForExport] = useState<string | null>(null);
  const [renderStatus, setRenderStatus] = useState<RenderStatus>({ ok: true, message: 'Rendered OK' });
  const [exportAction, setExportAction] = useState<ExportAction>('none');

  const onRenderStatus = useCallback((status: RenderStatus) => {
    setRenderStatus(status);
  }, []);

  const onSvgChange = useCallback((svg: string | null) => {
    setSvgForExport(svg);
  }, []);

  useEffect(() => {
    if (hashLoadedRef.current) {
      return;
    }
    hashLoadedRef.current = true;

    const shared = readStateFromHash();
    if (shared) {
      applySharedState(shared);
    }
  }, [applySharedState]);

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      if (!isDragging || !rootRef.current) {
        return;
      }

      const rect = rootRef.current.getBoundingClientRect();
      const nextRatio = ((event.clientX - rect.left) / rect.width) * 100;
      setSplitRatio(Math.min(80, Math.max(20, nextRatio)));
    };

    const onUp = () => setIsDragging(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [isDragging]);

  const appClass = cn('flex h-screen flex-col bg-background text-foreground', theme === 'dark' && 'dark');

  const handleExport = useCallback(
    async (action: ExportAction) => {
      if (action === 'none') {
        return;
      }

      try {
        if (action === 'svg') {
          if (!svgForExport) {
            throw new Error('SVG export is only available for Mermaid or SVG mode when render succeeds.');
          }
          const { downloadSvg } = await import('@/lib/export/exportSvg');
          downloadSvg(svgForExport, `${title || 'cipher-draw'}.svg`);
        }

        if (action === 'copy-svg') {
          if (!svgForExport) {
            throw new Error('No SVG is currently available to copy.');
          }
          const { copySvgToClipboard } = await import('@/lib/export/exportSvg');
          await copySvgToClipboard(svgForExport);
        }

        if (action === 'png') {
          if (!previewRef.current) {
            throw new Error('Preview panel is not ready for PNG export.');
          }
          const { exportNodeAsPng } = await import('@/lib/export/exportPng');
          await exportNodeAsPng(previewRef.current, `${title || 'cipher-draw'}.png`);
        }

        if (action === 'pdf') {
          if (!previewRef.current) {
            throw new Error('Preview panel is not ready for PDF export.');
          }
          const { exportNodeAsPdf } = await import('@/lib/export/exportPdf');
          await exportNodeAsPdf(previewRef.current, `${title || 'cipher-draw'}.pdf`);
        }

        if (action === 'md') {
          downloadMarkdown(content, title);
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Export failed';
        setRenderStatus({ ok: false, message: `Error: ${message}` });
      } finally {
        setExportAction('none');
      }
    },
    [content, svgForExport, title]
  );

  const handleShare = useCallback(async () => {
    const url = writeStateToHash({ mode, content, theme });
    if (!url) {
      return;
    }
    await navigator.clipboard.writeText(url);
  }, [mode, content, theme]);

  useEffect(() => {
    if (exportAction === 'none') {
      return;
    }
    void handleExport(exportAction);
  }, [exportAction, handleExport]);

  const editorLanguage = useMemo(() => languageByMode[mode], [mode]);

  return (
    <div className={appClass}>
      <div className="flex items-center justify-between gap-3 border-b bg-background px-4 py-2">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">Cipher Draw</h1>
          <input
            className="h-9 rounded-md border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Document title"
            aria-label="Document title"
          />
        </div>

        <div className="flex items-center gap-2">
          <Select
            ariaLabel="Mode selector"
            value={mode}
            onChange={(value) => setMode(value as DocMode)}
            options={modeOptions}
          />
          <Select
            ariaLabel="Preview background selector"
            value={previewBg}
            onChange={(value) => setPreviewBg(value as 'dark' | 'white' | 'transparent')}
            options={previewBgOptions}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            Theme: {theme}
          </Button>
          <Select
            ariaLabel="Export actions"
            value={exportAction}
            onChange={(value) => setExportAction(value as ExportAction)}
            options={[
              { label: 'Export...', value: 'none' },
              { label: 'Export SVG', value: 'svg' },
              { label: 'Copy SVG', value: 'copy-svg' },
              { label: 'Export PNG', value: 'png' },
              { label: 'Export PDF', value: 'pdf' },
              { label: 'Export .md', value: 'md' }
            ]}
          />
          <Button variant="secondary" size="sm" onClick={handleShare}>
            Share Link
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 border-b px-4 py-2">
        <Button variant={viewMode === 'editor' ? 'default' : 'outline'} size="sm" onClick={() => setViewMode('editor')}>
          Editor
        </Button>
        <Button variant={viewMode === 'split' ? 'default' : 'outline'} size="sm" onClick={() => setViewMode('split')}>
          Split
        </Button>
        <Button variant={viewMode === 'preview' ? 'default' : 'outline'} size="sm" onClick={() => setViewMode('preview')}>
          Preview
        </Button>
        <Button variant="outline" size="sm" onClick={() => setContent(getTemplateForMode(mode))}>
          Load Sample
        </Button>
        <div className="text-xs text-muted-foreground">
          Phase 2 flags: auth={String(featureFlags.auth)} save={String(featureFlags.save)}
        </div>
      </div>

      <div ref={rootRef} className="min-h-0 flex-1">
        {viewMode === 'editor' && (
          <div className="h-full">
            <MonacoEditor
              value={content}
              language={editorLanguage}
              theme={editorTheme}
              onChange={setContent}
            />
          </div>
        )}

        {viewMode === 'preview' && (
          <div className="h-full p-3">
            <PreviewPane
              ref={previewRef}
              mode={mode}
              content={content}
              theme={theme}
              previewBg={previewBg}
              onSvgChange={onSvgChange}
              onRenderStatus={onRenderStatus}
            />
          </div>
        )}

        {viewMode === 'split' && (
          <div className="flex h-full">
            <div style={{ width: `${splitRatio}%` }} className="min-w-0">
              <MonacoEditor
                value={content}
                language={editorLanguage}
                theme={editorTheme}
                onChange={setContent}
              />
            </div>
            <button
              type="button"
              aria-label="Resize panels"
              onMouseDown={() => setIsDragging(true)}
              className="w-2 cursor-col-resize bg-border hover:bg-primary/40"
            />
            <div className="min-w-0 flex-1 p-3">
              <PreviewPane
                ref={previewRef}
                mode={mode}
                content={content}
                theme={theme}
                previewBg={previewBg}
                onSvgChange={onSvgChange}
                onRenderStatus={onRenderStatus}
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between border-t px-4 py-2 text-xs text-muted-foreground">
        <div>
          Mode: <span className="font-medium">{mode}</span> | {renderStatus.message}
        </div>
        <div>URL share enabled</div>
      </div>
    </div>
  );
}
