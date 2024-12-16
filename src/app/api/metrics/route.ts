import { NextResponse } from 'next/server';
import os from 'os';

// Функция для получения использования CPU
function getCpuUsage(): Promise<number> {
  return new Promise((resolve) => {
    const startUsage = process.cpuUsage();
    const startTime = process.hrtime();

    setTimeout(() => {
      const endUsage = process.cpuUsage(startUsage);
      const endTime = process.hrtime(startTime);

      const userUsage = endUsage.user / 1000000; // микросекунды в миллисекунды
      const systemUsage = endUsage.system / 1000000;
      const elapsedTime = (endTime[0] * 1000) + (endTime[1] / 1000000);

      const cpuPercent = ((userUsage + systemUsage) / elapsedTime) * 100;
      resolve(Math.min(100, cpuPercent));
    }, 100);
  });
}

// Функция для получения использования памяти
function getMemoryUsage(): number {
  const used = process.memoryUsage();
  return used.heapUsed; // Используемая память в байтах
}

// Время начала выполнения
let startTime = Date.now();

export async function GET() {
  const encoder = new TextEncoder();
  const customReadable = new ReadableStream({
    async start(controller) {
      try {
        // Отправляем метрики каждую секунду
        const interval = setInterval(async () => {
          try {
            const cpuUsage = await getCpuUsage();
            const memoryUsage = getMemoryUsage();
            const executionTime = Date.now() - startTime;

            const metrics = {
              cpuUsage,
              memoryUsage,
              executionTime,
            };

            const data = `data: ${JSON.stringify(metrics)}\n\n`;
            controller.enqueue(encoder.encode(data));
          } catch (error) {
            console.error('Error sending metrics:', error);
          }
        }, 1000);

        // Очистка при закрытии соединения
        return () => {
          clearInterval(interval);
        };
      } catch (error) {
        console.error('Error in metrics stream:', error);
        controller.close();
      }
    },
  });

  return new NextResponse(customReadable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}

// Сброс времени начала при каждом запуске кода
export function resetStartTime() {
  startTime = Date.now();
}
