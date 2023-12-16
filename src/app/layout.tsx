import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import './globals.css';

const raleway = Raleway({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Whispr',
  description: 'Silent meet web application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${raleway.className} min-h-screen bg-background dark:bg-background-dark text-text dark:text-text-dark`}
      >
        {children}
      </body>
    </html>
  );
}
