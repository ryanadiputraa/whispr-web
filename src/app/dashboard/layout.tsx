'use client';

import { AppProvider } from '@/context';
import { Toast } from '../components/toast';
import { AppBar } from './app-bar';
import Auth from './auth';
import DashboardWrapper from './wrapper';

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppProvider>
      <DashboardWrapper>
        <AppBar />
        <main className="py-4 px-[2%] sm:px-8">{children}</main>
        <Toast />
      </DashboardWrapper>
    </AppProvider>
  );
}

export default Auth(DashboardLayout);
