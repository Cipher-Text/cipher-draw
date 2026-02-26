'use client';

import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-muted" />
});

type MonacoEditorProps = {
  value: string;
  language: string;
  theme: string;
  onChange: (value: string) => void;
};

export function MonacoEditor({ value, language, theme, onChange }: MonacoEditorProps) {
  return (
    <Editor
      height="100%"
      defaultLanguage={language}
      language={language}
      theme={theme}
      value={value}
      options={{
        minimap: { enabled: false },
        wordWrap: 'on',
        fontSize: 14,
        smoothScrolling: true,
        automaticLayout: true,
        tabSize: 2
      }}
      onChange={(next) => onChange(next ?? '')}
    />
  );
}
