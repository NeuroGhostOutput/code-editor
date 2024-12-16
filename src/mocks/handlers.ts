import { http, HttpResponse } from 'msw'

interface ExecuteCodeRequest {
  language: string
  code: string
}

export const handlers = [
  http.post('/api/execute', async ({ request }) => {
    const { language, code } = (await request.json()) as ExecuteCodeRequest

    // Имитация задержки выполнения
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Имитация успешного выполнения кода
    if (code.includes('print') || code.includes('fmt.Println')) {
      return HttpResponse.json({
        status: 'success',
        output: 'Hello, World!\n',
      })
    }

    // Имитация ошибки
    return HttpResponse.json(
      {
        status: 'error',
        error: 'Ошибка компиляции: неверный синтаксис',
      },
      { status: 400 }
    )
  }),
]
