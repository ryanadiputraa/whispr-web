'use client';

import { useContext, useEffect } from 'react';

import { useUser } from '@/hooks/useUser';
import { AppContext } from '@/context';

export default function DashboardWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useContext(AppContext);
  const { getUserData } = useUser();

  useEffect(() => {
    if (!user.data.id) getUserData();
  }, [user.data.id]); // eslint-disable-line

  return children;
}
