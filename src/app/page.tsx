"use client";

import CodeEditor from "@/components/CodeEditor";
import LanguageSelector from "@/components/LanguageSelector";
import OutputWindow from "@/components/OutputWindow";
import TaskDescription from "@/components/TaskDescription";
import { useEditorStore } from "@/store/editorStore";

export default function Home() {
  const { setLoading, setOutput } = useEditorStore();

  // Функция для выполнения кода
  const executeCode = async (code: string, language: string) => {
    try {
      setLoading(true);
      const response = await fetch("/api/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, language }),
      });

      const data = await response.json();

      if (data.status === "success") {
        setOutput(data.output);
      } else {
        setOutput(data.error);
      }
    } catch (error) {
      setOutput("Произошла ошибка при выполнении кода");
      console.error("Error executing code:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl grid-cols-2">
      <h1 className="text-3xl font-bold mb-8">Онлайн редактор кода</h1>

      <div className="space-y-6 row-auto">
        <TaskDescription  />

        <div className="flex justify-between items-center">
          <LanguageSelector />
          <button
            onClick={() => {
              const code = useEditorStore.getState().code;
              const language = useEditorStore.getState().language;
              executeCode(code, language);
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
            Выполнить код
          </button>
        </div>

        <CodeEditor />
        <OutputWindow />
      </div>
    </main>
  );
}
