import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: 'IDe.ia',
  icons: {
    icon: '/favicon.ico',
    other: [
      {
        rel: 'icon',
        type: 'image/webp',
        url: '/totvsLogoIcon.webp',
      },
      ],
  },
};


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-background text-foreground">{children}</body>
    </html>
  );
}
