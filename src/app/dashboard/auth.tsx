'use client';

import { useEffect } from 'react';
import { redirect } from 'next/navigation';

import { useAuth } from '@/hooks/useAuth';

export default function Auth(Component: any) {
  return function Auth(props: any) {
    const { jwtTokens } = useAuth();

    useEffect(() => {
      if (!jwtTokens.access_token) {
        redirect('/auth/login');
      }
    }, [jwtTokens.access_token]);

    return <Component {...props} />;
  };
}
