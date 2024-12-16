"use client";

import React from "react";
import { Editor, type EditorProps, type OnMount, type Monaco } from "@monaco-editor/react";
import { useEditorStore } from "../store/editorStore";

interface Suggestion {
  label: string;
  kind: string;
  insertText: string;
  insertTextRules: number;
  documentation: string;
}

interface ITextModel {
  getWordUntilPosition: (position: IPosition) => { word: string };
}

interface IPosition {
  lineNumber: number;
  column: number;
}

const pythonSuggestions: Suggestion[] = [
  {
    label: 'print',
    kind: 'Function',
    insertText: 'print(${1:value})',
    insertTextRules: 4, // Snippet
    documentation: 'Выводит значение на экран',
  },
  {
    label: 'if',
    kind: 'Keyword',
    insertText: 'if ${1:condition}:\n\t${2:pass}',
    insertTextRules: 4,
    documentation: 'Условный оператор',
  },
  {
    label: 'for',
    kind: 'Keyword',
    insertText: 'for ${1:item} in ${2:items}:\n\t${3:pass}',
    insertTextRules: 4,
    documentation: 'Цикл for',
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
  {
    label: 'if',
    kind: 'Keyword',
    insertText: 'if ${1:condition} {\n\t${2}\n}',
    insertTextRules: 4,
    documentation: 'Условный оператор',
  },
  {
    label: 'for',
    kind: 'Keyword',
    insertText: 'for ${1:i := 0; i < n; i++} {\n\t${2}\n}',
    insertTextRules: 4,
    documentation: 'Цикл for',
  },
];

const CodeEditor: React.FC = () => {
  const { code, language, setCode } = useEditorStore();

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
  const handleEditorMount: OnMount = (editor, monaco) => {
    editor.focus();

    // Регистрация провайдера автодополнения
    monaco.languages.registerCompletionItemProvider(language, {
      provideCompletionItems: (model: ITextModel, position: IPosition) => {
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
  };

  const editorProps: Partial<EditorProps> = {
    height: "100%",
    language,
    value: code || languageConfig[language].defaultCode,
    onChange: handleEditorChange,
    onMount: handleEditorMount,
    theme: "vs-dark",
    options: {
      minimap: { enabled: false },
      fontSize: 14,
      lineNumbers: "on",
      roundedSelection: false,
      scrollBeyondLastLine: false,
      automaticLayout: true,
      suggestOnTriggerCharacters: true,
      quickSuggestions: true,
      snippetSuggestions: "inline",
      wordBasedSuggestions: true,
      tabCompletion: "on",
    }
  };

  return (
    <div className="w-full h-[500px] border border-gray-300 rounded-lg overflow-hidden">
      {/* @ts-ignore */}
      <Editor {...editorProps} />
    </div>
  );
};

export default CodeEditor;
