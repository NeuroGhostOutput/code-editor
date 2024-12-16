"use client";

import { useEditorStore } from "@/store/editorStore";

const TaskDescription = () => {
  const { theme } = useEditorStore();
  const isDark = theme === 'dark';

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center space-x-4 mb-4">
        <h1 className="text-xl md:text-2xl font-medium text-[var(--text-primary)]">
          Hello World
        </h1>
        <span className="px-2 py-1 bg-[#2cbb5d]/20 text-[#2cbb5d] text-xs md:text-sm rounded">
          Easy
        </span>
      </div>

      <div className="space-y-4 text-[var(--text-secondary)]">
        <p>
          Напишите программу, которая выводит "Hello, World!" на экран.
        </p>

        <div>
          <p className="font-medium text-[var(--text-primary)] mb-2">
            Примеры:
          </p>
          <div className="space-y-4">
            <div className="bg-[var(--bg-secondary)] p-3 md:p-4 rounded-lg text-sm">
              <p className="mb-1">
                <span className="text-[var(--text-muted)]">Python:</span>
              </p>
              <pre className="text-[var(--text-primary)]">print("Hello, World!")</pre>
            </div>

            <div className="bg-[var(--bg-secondary)] p-3 md:p-4 rounded-lg text-sm">
              <p className="mb-1">
                <span className="text-[var(--text-muted)]">Go:</span>
              </p>
              <pre className="text-[var(--text-primary)]">
{`package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`}
              </pre>
            </div>
          </div>
        </div>

        <div>
          <p className="font-medium text-[var(--text-primary)] mb-2">
            Ожидаемый вывод:
          </p>
          <div className="bg-[var(--bg-secondary)] p-3 md:p-4 rounded-lg text-sm">
            <pre className="text-[var(--text-primary)]">Hello, World!</pre>
          </div>
        </div>

        <div>
          <p className="font-medium text-[var(--text-primary)] mb-2">
            Примечания:
          </p>
          <ul className="list-disc list-inside space-y-1 text-[var(--text-muted)] text-sm">
            <li>Обратите внимание на знаки препинания и пробелы</li>
            <li>Строка должна заканчиваться переносом строки</li>
            <li>В Go не забудьте импортировать пакет "fmt"</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TaskDescription;
