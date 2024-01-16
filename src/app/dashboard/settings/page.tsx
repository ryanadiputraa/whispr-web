'use client';

import { useContext } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/app/components/button';
import { AppContext } from '@/context';
import { useMainAction } from '@/context/actions/main';
import { useAuth } from '@/hooks/useAuth';

export default function Settings() {
  const { main } = useContext(AppContext);
  const { toggleTheme } = useMainAction();
  const { clearJWTTokens } = useAuth();
  const router = useRouter();

  const signOut = () => {
    clearJWTTokens();
    router.push('/auth/login');
  };

  return (
    <div className="flex flex-col items-center px-28">
      <div className="flex justify-between items-center py-3 w-full border-b-[0.05rem] border-secondary-dark dark:border-secondary">
        <span>Use dark theme</span>
        <input className="w-4 h-4" type="checkbox" checked={main.theme === 'dark'} onChange={() => toggleTheme()} />
      </div>
      <Button classNames="mt-8 font-bold self-end text-text dark:text-text-dark" variant="DANGER" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  );
}
