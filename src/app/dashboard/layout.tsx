'use client';

import { AppProvider } from '@/context';

import { Toast } from '../components/toast';
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
        <main>{children}</main>
        <Toast />
      </DashboardWrapper>
    </AppProvider>
  );
}

export default Auth(DashboardLayout);
