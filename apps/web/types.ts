export type DocMode = 'markdown' | 'mermaid' | 'svg' | 'mixed';

export type ThemeMode = 'dark' | 'light';

export type PreviewBackground = 'transparent' | 'white' | 'dark';

export type DocState = {
  mode: DocMode;
  title: string;
  content: string;
  theme: ThemeMode;
  editorTheme: string;
  previewBg: PreviewBackground;
};

export type RenderStatus = {
  ok: boolean;
  message: string;
};
