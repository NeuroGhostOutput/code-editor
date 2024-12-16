import { EditorProps } from '@monaco-editor/react';
import * as monacoEditor from 'monaco-editor';

declare module '@monaco-editor/react' {
  interface CustomEditorProps extends EditorProps {
    loading?: React.ReactNode;
  }

  interface EditorOptions extends monacoEditor.editor.IStandaloneEditorConstructionOptions {
    bracketPairColorization?: {
      enabled: boolean;
    };
    semanticHighlighting?: {
      enabled: string;
    };
  }

  export interface Monaco {
    editor: {
      defineTheme: (name: string, theme: any) => void;
      setTheme: (theme: string) => void;
      IStandaloneCodeEditor: any;
    };
    languages: {
      CompletionItemKind: Record<string, number>;
      registerCompletionItemProvider: (language: string, provider: any) => void;
      setLanguageConfiguration: (language: string, config: any) => void;
    };
  }

  export interface EditorProps {
    defaultValue?: string;
    value?: string;
    language?: string;
    theme?: string;
    options?: EditorOptions;
    onChange?: (value: string | undefined, ev: any) => void;
    onMount?: (editor: any, monaco: Monaco) => void;
    loading?: React.ReactNode;
  }

  export const Editor: React.FC<EditorProps>;
}
