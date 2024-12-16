"use client";

import { useEditorStore } from "../store/editorStore";

const OutputWindow = () => {
  const { output, isLoading } = useEditorStore();

  return (
    <div className="w-full h-[200px] border border-gray-300 rounded-lg overflow-hidden bg-gray-900 text-white">
      <div className="p-4 h-full overflow-auto font-mono text-sm">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : output ? (
          <pre className="whitespace-pre-wrap">{output}</pre>
        ) : (
          <div className="text-gray-400">
            Здесь будет отображен результат выполнения кода
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputWindow;
