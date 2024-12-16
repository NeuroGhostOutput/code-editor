import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Онлайн редактор кода',
  description: 'Редактор кода с поддержкой Python и Go',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="dark-theme h-full" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="dark light" />
      </head>
      <body className={`${inter.className} dark-theme h-full`} suppressHydrationWarning>
        <div className="flex flex-col h-full">
          {children}
        </div>
      </body>
    </html>
  );
}
