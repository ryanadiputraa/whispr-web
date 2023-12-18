'use client';

import Image from 'next/image';
import { useContext } from 'react';

import { AppContext } from '@/context';

export function AppBar(): React.ReactNode {
  const { main, user } = useContext(AppContext);

  return (
    <header className="flex items-center justify-between py-4 px-[4%] sm:px-8">
      <span className="hidden sm:inline-block text-sm">Hello, {user.data.firstName}</span>
      {/* TODO: mobile nav */}
      <button className="inline-block sm:hidden">
        <Image
          width={28}
          height={28}
          src={main.theme === 'dark' ? '/img/menu.png' : '/img/menu-black.png'}
          alt="menu"
        />
      </button>
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
