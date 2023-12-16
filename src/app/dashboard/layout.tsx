'use client';

import { AppProvider } from '@/context';

import { Toast } from '../components/toast';

export default function dashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppProvider>
      <main>{children}</main>
      <Toast />
    </AppProvider>
  );
}
