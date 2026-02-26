'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { getTemplateForMode } from '@/lib/templates';
import type { DocMode, DocState, PreviewBackground, ThemeMode } from '@/types';

type DocActions = {
  setMode: (mode: DocMode) => void;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setTheme: (theme: ThemeMode) => void;
  setEditorTheme: (theme: string) => void;
  setPreviewBg: (bg: PreviewBackground) => void;
  applySharedState: (state: Partial<DocState>) => void;
  loadTemplateForMode: (mode: DocMode) => void;
};

export type DocStore = DocState & DocActions;

const DEFAULT_MODE: DocMode = 'mermaid';

const defaultState: DocState = {
  mode: DEFAULT_MODE,
  title: 'Untitled',
  content: getTemplateForMode(DEFAULT_MODE),
  theme: 'dark',
  editorTheme: 'vs-dark',
  previewBg: 'dark'
};

export const useDocStore = create<DocStore>()(
  persist(
    (set) => ({
      ...defaultState,
      setMode: (mode) => set({ mode }),
      setTitle: (title) => set({ title }),
      setContent: (content) => set({ content }),
      setTheme: (theme) => set({ theme, editorTheme: theme === 'dark' ? 'vs-dark' : 'vs-light' }),
      setEditorTheme: (editorTheme) => set({ editorTheme }),
      setPreviewBg: (previewBg) => set({ previewBg }),
      applySharedState: (state) =>
        set((prev) => ({
          ...prev,
          ...state,
          editorTheme:
            state.theme !== undefined
              ? state.theme === 'dark'
                ? 'vs-dark'
                : 'vs-light'
              : prev.editorTheme
        })),
      loadTemplateForMode: (mode) => set({ mode, content: getTemplateForMode(mode) })
    }),
    {
      name: 'cipher-draw-doc-v1',
      partialize: (state) => ({
        mode: state.mode,
        title: state.title,
        content: state.content,
        theme: state.theme,
        editorTheme: state.editorTheme,
        previewBg: state.previewBg
      })
    }
  )
);
