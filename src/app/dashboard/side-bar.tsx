'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { useTheme } from '@/hooks/useTheme';
import { Button } from '../components/button';

const MENU_LIST = [
  {
    href: '/dashboard',
    name: 'Summary',
    ico: '/img/dashboard.png',
    icoDark: '/img/dashboard-dark.png',
  },
  {
    href: '/dashboard/settings',
    name: 'Settings',
    ico: '/img/settings.png',
    icoDark: '/img/settings-dark.png',
  },
];

export default function SideBar() {
  const { state } = useTheme();
  const pathname = usePathname();
  const [active, setActive] = useState<string>(pathname);

  return (
    <nav className="hidden sm:inline-block w-56 h-screen shadow-sm shadow-secondary sm:shadow-secondary-dark py-4">
      <Link href={'/dashboard'} className="flex justify-center items-center gap-4">
        <Image
          width={24}
          height={24}
          src={state === 'dark' ? '/img/whispr.png' : 'img/whispr-black.png'}
          alt="whispr"
        />
        <h1 className="font-bold text-lg">Whispr</h1>
      </Link>
      <Button variant="ACCENT" classNames="rounded-md flex gap-2 mt-12 mx-auto py-3 px-6 font-medium">
        <span className=" scale-150">+</span> New Meeting
      </Button>
      <ul className="mt-12">
        {MENU_LIST.map((menu) => (
          <li
            key={menu.href}
            className={
              active === menu.href
                ? 'bg-gradient-to-r from-accent-transparent dark:from-accent-dark-transparent to-white border-l-2 border-accent dark:border-accent-dark'
                : ''
            }
          >
            <Link
              className="w-full flex items-center gap-4 px-4 py-3 font-medium"
              href={menu.href}
              onClick={() => setActive(menu.href)}
            >
              <Image width={16} height={16} src={state === 'dark' ? menu.icoDark : menu.ico} alt={menu.name} />
              {menu.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
