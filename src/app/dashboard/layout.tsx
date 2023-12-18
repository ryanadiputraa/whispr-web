'use client';

import { AppProvider } from '@/context';
import { Toast } from '../components/toast';
import { AppBar } from './app-bar';
import Auth from './auth';
import SideBar from './side-bar';
import DashboardWrapper from './wrapper';

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppProvider>
      <DashboardWrapper>
        <main className="flex">
          <SideBar />
          <div className="grow">
            <AppBar />
            <div className="py-4 px-[4%] sm:px-8">{children}</div>
          </div>
        </main>
        <Toast />
      </DashboardWrapper>
    </AppProvider>
  );
}

export default Auth(DashboardLayout);
