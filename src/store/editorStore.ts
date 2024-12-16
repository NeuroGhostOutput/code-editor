import { create } from 'zustand';

interface EditorState {
  code: string;
  language: 'python' | 'go';
  theme: 'light' | 'dark';
  output: string;
  isLoading: boolean;
  setCode: (code: string) => void;
  setLanguage: (language: 'python' | 'go') => void;
  toggleTheme: () => void;
  setOutput: (output: string) => void;
  setLoading: (isLoading: boolean) => void;
}

// Получаем сохраненную тему или используем системные настройки
const getInitialTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined') {
    // Проверяем localStorage
    const savedTheme = localStorage.getItem('editor-theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    
    // Проверяем системные настройки
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  }
  return 'dark'; // По умолчанию темная тема
};

// Функция для применения темы к документу
const applyTheme = (theme: 'light' | 'dark') => {
  if (typeof window !== 'undefined') {
    const root = document.documentElement;
    const body = document.body;

    // Удаляем старые классы
    root.classList.remove('light-theme', 'dark-theme');
    body.classList.remove('light-theme', 'dark-theme');

    // Добавляем новые классы
    root.classList.add(`${theme}-theme`);
    body.classList.add(`${theme}-theme`);

    // Сохраняем в localStorage
    localStorage.setItem('editor-theme', theme);

    // Обновляем мета-тег color-scheme
    const meta = document.querySelector('meta[name="color-scheme"]');
    if (meta) {
      meta.setAttribute('content', theme === 'dark' ? 'dark light' : 'light dark');
    }
  }
};

export const useEditorStore = create<EditorState>((set) => ({
  code: '',
  language: 'python',
  theme: getInitialTheme(),
  output: '',
  isLoading: false,
  setCode: (code) => set({ code }),
  setLanguage: (language) => set({ language }),
  toggleTheme: () => 
    set((state) => {
      const newTheme = state.theme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      return { theme: newTheme };
    }),
  setOutput: (output) => set({ output }),
  setLoading: (isLoading) => set({ isLoading }),
}));

// Применяем начальную тему
if (typeof window !== 'undefined') {
  applyTheme(getInitialTheme());
}
