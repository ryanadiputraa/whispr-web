'use client';

import { AppProvider } from '@/context';

export default function dashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppProvider>
      <main>{children}</main>
    </AppProvider>
  );
}
