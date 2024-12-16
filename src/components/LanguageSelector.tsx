"use client";

import { useEditorStore } from "../store/editorStore";

const LanguageSelector = () => {
    const { language, setLanguage } = useEditorStore();

    const languages = [
        { value: "python", label: "Python" },
        { value: "go", label: "Go" },
    ];

    return (
        <div className="flex items-center space-x-2">
            <label htmlFor="language-select" className="text-sm font-medium">
                Язык программирования:
            </label>
            <select
                id="language-select"
                value={language}
                onChange={(e) => setLanguage(e.target.value as "python" | "go")}
                className="h-9 w-[180px] rounded-md border border-gray-300 bg-gray-800 px-3 py-2 text-sm shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {languages.map((lang) => (
                    <option key={lang.value} value={lang.value}>
                        {lang.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LanguageSelector;
