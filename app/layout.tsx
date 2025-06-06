import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Chatbot de IA',
  description: 'Chatbot com Next.js + OpenAI',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}