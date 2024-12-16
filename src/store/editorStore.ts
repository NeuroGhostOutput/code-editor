import { create } from 'zustand';

interface EditorState {
  code: string;
  language: 'python' | 'go';
  output: string;
  isLoading: boolean;
  setCode: (code: string) => void;
  setLanguage: (language: 'python' | 'go') => void;
  setOutput: (output: string) => void;
  setLoading: (isLoading: boolean) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  // Начальное состояние
  code: '',
  language: 'python',
  output: '',
  isLoading: false,

  // Методы для обновления состояния
  setCode: (code) => set({ code }),
  setLanguage: (language) => set({ language }),
  setOutput: (output) => set({ output }),
  setLoading: (isLoading) => set({ isLoading }),
}));
