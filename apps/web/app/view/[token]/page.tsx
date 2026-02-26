'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import { PreviewPane } from '@/components/preview/PreviewPane';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { readStateFromHash } from '@/lib/share/hash';
import { cn } from '@/lib/utils';
import type { DocMode, DocState, RenderStatus, ThemeMode } from '@/types';

type ExportAction = 'none' | 'svg' | 'png' | 'pdf';

const previewBgOptions = [
  { label: 'Background: Dark', value: 'dark' },
  { label: 'Background: White', value: 'white' },
  { label: 'Background: Transparent', value: 'transparent' }
];

export default function ViewPage() {
  const router = useRouter();
  const previewRef = useRef<HTMLDivElement | null>(null);

  const [state, setState] = useState<Partial<DocState> | null>(null);
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [previewBg, setPreviewBg] = useState<'dark' | 'white' | 'transparent'>('dark');
  const [svgForExport, setSvgForExport] = useState<string | null>(null);
  const [renderStatus, setRenderStatus] = useState<RenderStatus>({ ok: true, message: 'Rendered OK' });
  const [exportAction, setExportAction] = useState<ExportAction>('none');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load state from URL hash
  useEffect(() => {
    try {
      const shared = readStateFromHash();
      if (shared) {
        setState(shared);
        if (shared.theme) {
          setTheme(shared.theme);
        }
      } else {
        setError('No content found in URL. The link may be invalid or corrupted.');
      }
    } catch (err) {
      console.error('Failed to decode shared state:', err);
      setError('Failed to load content. The link may be corrupted.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const onRenderStatus = useCallback((status: RenderStatus) => {
    setRenderStatus(status);
  }, []);

  const onSvgChange = useCallback((svg: string | null) => {
    setSvgForExport(svg);
  }, []);

  const handleFork = useCallback(() => {
    // Redirect to home page with current URL hash
    // This will load the content in the editor
    router.push(`/#${window.location.hash.slice(1)}`);
  }, [router]);

  const handleExport = useCallback(
    async (action: ExportAction) => {
      if (action === 'none') return;

      try {
        if (action === 'svg') {
          if (!svgForExport) {
            throw new Error('SVG export is only available for Mermaid or SVG mode.');
          }
          const { downloadSvg } = await import('@/lib/export/exportSvg');
          downloadSvg(svgForExport, `${state?.title || 'cipher-draw'}.svg`);
        }

        if (action === 'png') {
          if (!previewRef.current) {
            throw new Error('Preview panel is not ready for PNG export.');
          }
          const { exportNodeAsPng } = await import('@/lib/export/exportPng');
          await exportNodeAsPng(previewRef.current, `${state?.title || 'cipher-draw'}.png`);
        }

        if (action === 'pdf') {
          if (!previewRef.current) {
            throw new Error('Preview panel is not ready for PDF export.');
          }
          const { exportNodeAsPdf } = await import('@/lib/export/exportPdf');
          await exportNodeAsPdf(previewRef.current, `${state?.title || 'cipher-draw'}.pdf`);
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Export failed';
        setRenderStatus({ ok: false, message: `Error: ${message}` });
      } finally {
        setExportAction('none');
      }
    },
    [state?.title, svgForExport]
  );

  useEffect(() => {
    if (exportAction === 'none') return;
    void handleExport(exportAction);
  }, [exportAction, handleExport]);

  const appClass = cn('flex h-screen flex-col', theme === 'dark' && 'dark');

  if (isLoading) {
    return (
      <div className={appClass}>
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="text-muted-foreground">Loading diagram...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !state) {
    return (
      <div className={appClass}>
        <div className="flex h-full items-center justify-center">
          <div className="max-w-md text-center">
            <h1 className="mb-4 text-2xl font-bold text-destructive">Error Loading Content</h1>
            <p className="mb-6 text-muted-foreground">{error || 'No content found in URL.'}</p>
            <Button onClick={() => router.push('/')}>Go to Editor</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={appClass}>
      {/* Navbar */}
      <div className="flex items-center justify-between gap-3 border-b bg-background px-4 py-2">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold">🧩 Cipher Draw</h1>
          <span className="text-sm text-muted-foreground">|</span>
          <h2 className="text-sm font-medium">{state.title || 'Untitled'}</h2>
          {state.mode && (
            <span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
              {state.mode}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Select
            ariaLabel="Preview background"
            value={previewBg}
            onChange={(value) => setPreviewBg(value as typeof previewBg)}
            options={previewBgOptions}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </Button>
          <Select
            ariaLabel="Export"
            value={exportAction}
            onChange={(value) => setExportAction(value as ExportAction)}
            options={[
              { label: 'Export...', value: 'none' },
              { label: 'Export SVG', value: 'svg' },
              { label: 'Export PNG', value: 'png' },
              { label: 'Export PDF', value: 'pdf' }
            ]}
          />
          <Button onClick={handleFork}>
            Fork to Editor
          </Button>
        </div>
      </div>

      {/* Preview */}
      <div className="min-h-0 flex-1 overflow-auto p-4">
        <PreviewPane
          ref={previewRef}
          mode={state.mode || 'markdown'}
          content={state.content || ''}
          theme={theme}
          previewBg={previewBg}
          onSvgChange={onSvgChange}
          onRenderStatus={onRenderStatus}
        />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t bg-background px-4 py-2 text-xs text-muted-foreground">
        <div>
          Mode: <span className="font-medium">{state.mode || 'unknown'}</span> | {renderStatus.message}
        </div>
        <div className="flex items-center gap-2">
          <span>Read-only view</span>
          <span>•</span>
          <a
            href="/"
            className="text-primary hover:underline"
          >
            Create your own
          </a>
        </div>
      </div>
    </div>
  );
}
