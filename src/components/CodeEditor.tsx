"use client";

import React, { useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import { useEditorStore } from "../store/editorStore";

interface Suggestion {
  label: string;
  kind: string;
  insertText: string;
  insertTextRules: number;
  documentation: string;
}

const pythonSuggestions: Suggestion[] = [
  {
    label: 'print',
    kind: 'Function',
    insertText: 'print(${1:value})',
    insertTextRules: 4,
    documentation: 'Выводит значение на экран',
  },
  {
    label: 'def',
    kind: 'Keyword',
    insertText: 'def ${1:function_name}(${2:params}):\n\t${3:pass}',
    insertTextRules: 4,
    documentation: 'Объявление функции',
  },
];

const goSuggestions: Suggestion[] = [
  {
    label: 'fmt.Println',
    kind: 'Function',
    insertText: 'fmt.Println(${1:value})',
    insertTextRules: 4,
    documentation: 'Выводит значение на экран с переносом строки',
  },
  {
    label: 'func',
    kind: 'Keyword',
    insertText: 'func ${1:name}(${2:params}) ${3:returnType} {\n\t${4}\n}',
    insertTextRules: 4,
    documentation: 'Объявление функции',
  },
];

const CodeEditor: React.FC = () => {
  const { code, language, theme, setCode } = useEditorStore();

  // Конфигурация для разных языков
  const languageConfig = {
    python: {
      defaultCode: '# Введите ваш Python код здесь\nprint("Hello, World!")',
      language: "python",
      suggestions: pythonSuggestions,
    },
    go: {
      defaultCode: '// Введите ваш Go код здесь\npackage main\n\nimport "fmt"\n\nfunc main() {\n\tfmt.Println("Hello, World!")\n}',
      language: "go",
      suggestions: goSuggestions,
    },
  };

  // Обработчик изменения кода
  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
    }
  };

  // Обработчик монтирования редактора
  const handleEditorMount = (editor: any, monaco: any) => {
    editor.focus();

    // Регистрация провайдера автодополнения
    monaco.languages.registerCompletionItemProvider(language, {
      provideCompletionItems: (model: any, position: any) => {
        const suggestions = languageConfig[language].suggestions;
        return {
          suggestions: suggestions.map(suggestion => ({
            ...suggestion,
            kind: monaco.languages.CompletionItemKind[suggestion.kind as keyof typeof monaco.languages.CompletionItemKind],
            range: {
              startLineNumber: position.lineNumber,
              endLineNumber: position.lineNumber,
              startColumn: position.column,
              endColumn: position.column,
            },
          })),
        };
      },
    });

    // Настройка сниппетов
    monaco.languages.setLanguageConfiguration(language, {
      brackets: [
        ["{", "}"],
        ["[", "]"],
        ["(", ")"],
      ],
      autoClosingPairs: [
        { open: "{", close: "}" },
        { open: "[", close: "]" },
        { open: "(", close: ")" },
        { open: '"', close: '"' },
        { open: "'", close: "'" },
      ],
      surroundingPairs: [
        { open: "{", close: "}" },
        { open: "[", close: "]" },
        { open: "(", close: ")" },
        { open: '"', close: '"' },
        { open: "'", close: "'" },
      ],
      indentationRules: {
        increaseIndentPattern: language === 'python' 
          ? /:\s*$/
          : /{[^}]*$|^\s*\{$/,
        decreaseIndentPattern: language === 'python'
          ? /^\s*$/
          : /^[}\]]|^[^{]*}/,
      },
    });

    // Настройка темы Monaco Editor
    monaco.editor.defineTheme('custom-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6A9955' },
        { token: 'keyword', foreground: '569CD6' },
        { token: 'string', foreground: 'CE9178' },
        { token: 'number', foreground: 'B5CEA8' },
      ],
      colors: {
        'editor.background': '#1e1e1e',
        'editor.foreground': '#d4d4d4',
        'editor.lineHighlightBackground': '#2d2d2d',
        'editorLineNumber.foreground': '#858585',
        'editor.selectionBackground': '#264f78',
        'editor.inactiveSelectionBackground': '#3a3d41',
        'editorCursor.foreground': '#d4d4d4',
        'editorWhitespace.foreground': '#3d3d3d',
        'editorIndentGuide.background': '#404040',
      },
    });

    monaco.editor.defineTheme('custom-light', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '008000' },
        { token: 'keyword', foreground: '0000FF' },
        { token: 'string', foreground: 'A31515' },
        { token: 'number', foreground: '098658' },
      ],
      colors: {
        'editor.background': '#ffffff',
        'editor.foreground': '#000000',
        'editor.lineHighlightBackground': '#f5f5f5',
        'editorLineNumber.foreground': '#237893',
        'editor.selectionBackground': '#add6ff',
        'editor.inactiveSelectionBackground': '#e5ebf1',
        'editorCursor.foreground': '#000000',
        'editorWhitespace.foreground': '#d4d4d4',
        'editorIndentGuide.background': '#d4d4d4',
      },
    });

    // Установка начальной темы
    monaco.editor.setTheme(theme === 'dark' ? 'custom-dark' : 'custom-light');
  };

  // Эффект для обновления темы при её изменении
  useEffect(() => {
    const monacoInstance = (window as any).monaco;
    if (monacoInstance) {
      monacoInstance.editor.setTheme(theme === 'dark' ? 'custom-dark' : 'custom-light');
    }
  }, [theme]);

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex-1 min-h-0">
        <Editor
          language={language}
          value={code || languageConfig[language].defaultCode}
          onChange={handleEditorChange}
          onMount={handleEditorMount}
          theme={theme === 'dark' ? 'custom-dark' : 'custom-light'}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            suggestOnTriggerCharacters: true,
            quickSuggestions: true,
            snippetSuggestions: "inline",
            wordBasedSuggestions: "currentDocument",
            tabCompletion: "on",
            rulers: [],
            renderLineHighlight: "line",
            scrollbar: {
              vertical: 'visible',
              horizontal: 'visible',
              verticalScrollbarSize: 12,
              horizontalScrollbarSize: 12,
            }
          }}
          defaultValue={languageConfig[language].defaultCode}
          loading={
            <div className="flex items-center justify-center h-full text-gray-400">
              <div className="flex items-center space-x-2">
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Загрузка редактора...</span>
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default CodeEditor;
