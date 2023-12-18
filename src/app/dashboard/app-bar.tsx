'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';

import { AppContext } from '@/context';
import { useTheme } from '@/hooks/useTheme';

export function AppBar(): React.ReactNode {
  const { user } = useContext(AppContext);
  const { state } = useTheme();

  return (
    <header className="flex items-center justify-between py-4 px-[2%] sm:px-8">
      <Link href={'/dashboard'} className="flex items-center gap-4">
        <Image
          width={24}
          height={24}
          src={state === 'dark' ? '/img/whispr.png' : 'img/whispr-black.png'}
          alt="whispr"
        />
        <h1 className="font-bold text-lg">Whispr</h1>
      </Link>
      <div>
        {user.data.id && (
          <div className={`flex w-9 h-9  rounded-full bg-accent dark:bg-accent-dark text-text-dark dark:text-text`}>
            <span className="m-auto font-bold">{user.data.firstName[0] + user.data.lastName[0]}</span>
          </div>
        )}
      </div>
    </header>
  );
}
