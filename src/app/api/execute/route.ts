import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { language, code } = await request.json();

    // Имитация задержки выполнения
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Имитация успешного выполнения кода
    if (code.includes('print') || code.includes('fmt.Println')) {
      return NextResponse.json({
        status: 'success',
        output: 'Hello, World!\n',
      });
    }

    // Имитация ошибки
    return NextResponse.json(
      {
        status: 'error',
        error: 'Ошибка компиляции: неверный синтаксис',
      },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        error: 'Внутренняя ошибка сервера',
      },
      { status: 500 }
    );
  }
}
