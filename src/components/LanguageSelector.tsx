"use client";

import { useEditorStore } from "../store/editorStore";

const LanguageSelector = () => {
  const { language, setLanguage } = useEditorStore();

  const languages = [
    { value: "python", label: "Python" },
    { value: "go", label: "Go" },
  ];

  return (
    <div className="relative">
      <select
        id="language-select"
        value={language}
        onChange={(e) => setLanguage(e.target.value as "python" | "go")}
        className="h-8 pl-3 pr-8 text-sm bg-transparent text-[var(--text-primary)] border border-[var(--border-color)] rounded-full appearance-none cursor-pointer hover:border-[var(--text-muted)] focus:outline-none focus:border-[var(--text-secondary)] transition-colors"
        aria-label="Select programming language"
      >
        {languages.map((lang) => (
          <option 
            key={lang.value} 
            value={lang.value}
            className="bg-[var(--bg-secondary)] text-[var(--text-primary)]"
          >
            {lang.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <svg
          className="w-4 h-4 text-[var(--text-muted)]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
};

export default LanguageSelector;
