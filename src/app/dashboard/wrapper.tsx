'use client';

import { useContext, useEffect } from 'react';

import { AppContext } from '@/context';
import { useMeet } from '@/hooks/useMeet';
import { useUser } from '@/hooks/useUser';

export default function DashboardWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useContext(AppContext);
  const { getUserData } = useUser();
  const { getUserMeets } = useMeet();

  useEffect(() => {
    if (!user.data.id) getUserData();
    getUserMeets();
  }, [user.data.id]); // eslint-disable-line

  return children;
}
