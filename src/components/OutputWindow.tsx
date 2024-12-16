"use client";

import { useEditorStore } from "../store/editorStore";

const OutputWindow = () => {
  const { output, isLoading } = useEditorStore();

  // Функция для определения статуса из вывода
  const getStatusInfo = () => {
    if (!output) return null;
    
    if (output.includes("Успех: 200")) {
      return {
        text: "Успех: 200 OK",
        className: "text-green-500",
      };
    }
    
    const errorMatch = output.match(/Ошибка: (\d+)/);
    if (errorMatch) {
      return {
        text: `Ошибка: ${errorMatch[1]}`,
        className: "text-red-500",
      };
    }
    
    return null;
  };

  const statusInfo = getStatusInfo();
  const mainOutput = output?.split('\n\n')[0] || '';

  return (
    <div className="h-full bg-[var(--bg-primary)]">
      {/* Заголовок */}
      <div className="h-8 md:h-10 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] flex items-center px-3 md:px-4 justify-between">
        <div className="text-xs md:text-sm text-[var(--text-secondary)] flex items-center space-x-2">
          <svg 
            className="w-3 h-3 md:w-4 md:h-4 text-[var(--text-muted)]" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
          <span>Output</span>
        </div>
        {statusInfo && (
          <div className={`text-xs md:text-sm font-medium ${statusInfo.className}`}>
            {statusInfo.text}
          </div>
        )}
      </div>

      {/* Содержимое */}
      <div className="p-3 md:p-4 h-[calc(100%-2rem)] md:h-[calc(100%-2.5rem)] overflow-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="flex items-center space-x-2 text-[var(--text-muted)] text-xs md:text-sm">
              <svg
                className="animate-spin h-4 w-4 md:h-5 md:w-5"
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
              <span>Выполнение кода...</span>
            </div>
          </div>
        ) : mainOutput ? (
          <div className="font-mono text-xs md:text-sm">
            <pre className="whitespace-pre-wrap text-[var(--text-primary)] break-words">{mainOutput}</pre>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-[var(--text-muted)] text-xs md:text-sm flex items-center space-x-2">
              <svg 
                className="w-4 h-4 md:w-5 md:h-5" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <span>Нажмите кнопку "Run" для выполнения кода</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputWindow;
