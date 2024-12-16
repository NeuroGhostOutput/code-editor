"use client";

import CodeEditor from "@/components/CodeEditor";
import LanguageSelector from "@/components/LanguageSelector";
import OutputWindow from "@/components/OutputWindow";
import TaskDescription from "@/components/TaskDescription";
import ResourceMonitor from "@/components/ResourceMonitor";
import ThemeSwitcher from "@/components/ThemeSwitcher";
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
        setOutput(`${data.output}\n\nУспех: 200 OK`);
      } else {
        setOutput(`${data.error}\n\nОшибка: ${response.status}`);
      }
    } catch (error) {
      setOutput("Произошла ошибка при выполнении кода\n\nОшибка: 500");
      console.error("Error executing code:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[var(--bg-primary)]">
      {/* Верхняя панель */}
      <div className="h-12 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] flex items-center px-4">
        <div className="text-[var(--text-primary)] text-lg font-medium">
          Онлайн редактор кода
        </div>
      </div>

      {/* Панель управления */}
      <div className="h-12 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] flex items-center justify-center">
        <div className="bg-[var(--bg-primary)] rounded-full px-2 py-1 flex items-center space-x-6">
          <LanguageSelector />
          <div className="w-px h-6 bg-[var(--border-color)]"></div>
          <ThemeSwitcher />
          <div className="w-px h-6 bg-[var(--border-color)]"></div>
          <button
            onClick={() => {
              const code = useEditorStore.getState().code;
              const language = useEditorStore.getState().language;
              executeCode(code, language);
            }}
            className="px-4 py-1.5 bg-[#3e8e41] hover:bg-[#4caf50] text-white rounded-full text-sm transition-colors"
          >
            Run
          </button>
        </div>
      </div>

      {/* Основной контент */}
      <div className="flex flex-1 min-h-0">
        {/* Левая панель с описанием */}
        <div className="w-[45%] border-r border-[var(--border-color)] overflow-y-auto">
          <TaskDescription />
        </div>

        {/* Правая панель с редактором и выводом */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 min-h-0">
            <CodeEditor />
          </div>
          <ResourceMonitor />
          <div className="h-[200px] border-t border-[var(--border-color)]">
            <OutputWindow />
          </div>
        </div>
      </div>
    </div>
  );
}
