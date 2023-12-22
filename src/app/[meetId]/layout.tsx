'use client';

import { AppProvider } from '@/context';

import { Toast } from '../components/toast';

export default function MeetLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppProvider>
      {children}
      <Toast />
    </AppProvider>
  );
}
