'use client';

import { useEffect } from 'react';
import { redirect } from 'next/navigation';

import { useAuth } from '@/hooks/useAuth';

export default function Auth(Component: any) {
  return function Auth(props: any) {
    const auth = useAuth();

    useEffect(() => {
      if (!auth) {
        redirect('/login');
      }
    }, [auth]);

    return <Component {...props} />;
  };
}
