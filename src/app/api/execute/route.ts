import { NextResponse } from 'next/server';
import { resetStartTime } from '../metrics/route';

// Имитация выполнения кода
const executeCode = async (code: string, language: string): Promise<{ status: string; output?: string; error?: string }> => {
  // Сбрасываем время начала выполнения
  resetStartTime();

  // Задержка для имитации выполнения
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Проверка на пустой код
  if (!code.trim()) {
    return {
      status: 'error',
      error: 'Код не может быть пустым'
    };
  }

  try {
    // Python
    if (language === 'python') {
      if (!code.includes('print')) {
        return {
          status: 'error',
          error: 'Функция print() не найдена'
        };
      }
      
      if (code.includes('print("Hello, World!")')) {
        return {
          status: 'success',
          output: 'Hello, World!'
        };
      }
    }
    
    // Go
    if (language === 'go') {
      if (!code.includes('package main')) {
        return {
          status: 'error',
          error: 'Отсутствует "package main"'
        };
      }
      
      if (!code.includes('import "fmt"')) {
        return {
          status: 'error',
          error: 'Необходимо импортировать пакет "fmt"'
        };
      }
      
      if (!code.includes('func main()')) {
        return {
          status: 'error',
          error: 'Функция main() не найдена'
        };
      }
      
      if (code.includes('fmt.Println("Hello, World!")')) {
        return {
          status: 'success',
          output: 'Hello, World!'
        };
      }
    }

    // Если код не соответствует ожидаемому
    return {
      status: 'error',
      error: 'Неверный вывод. Ожидается: "Hello, World!"'
    };
  } catch (error) {
    return {
      status: 'error',
      error: error instanceof Error ? error.message : 'Неизвестная ошибка'
    };
  }
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code, language } = body;

    // Проверка наличия обязательных полей
    if (!code || !language) {
      return NextResponse.json(
        { status: 'error', error: 'Отсутствуют обязательные поля' },
        { status: 400 }
      );
    }

    // Проверка поддерживаемых языков
    if (!['python', 'go'].includes(language)) {
      return NextResponse.json(
        { status: 'error', error: 'Неподдерживаемый язык программирования' },
        { status: 400 }
      );
    }

    // Выполнение кода
    const result = await executeCode(code, language);

    if (result.status === 'success') {
      return NextResponse.json(result, { status: 200 });
    } else {
      return NextResponse.json(result, { status: 400 });
    }
  } catch (error) {
    console.error('Error executing code:', error);
    return NextResponse.json(
      { status: 'error', error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}
