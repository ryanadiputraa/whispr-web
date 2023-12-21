'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useContext, useLayoutEffect, useState } from 'react';

import { AppContext } from '@/context';
import { useMeet } from '@/hooks/useMeet';
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
  const { main } = useContext(AppContext);
  const pathname = usePathname();
  const router = useRouter();
  const { createMeetingSession } = useMeet();

  const [isMount, setIsMount] = useState(false);
  const [active, setActive] = useState<string>(pathname);
  const [isLoading, setIsLoading] = useState(false);

  const onNewMeeting = async () => {
    setIsLoading(true);
    const sessionId = await createMeetingSession();
    setIsLoading(false);
    if (sessionId) router.push(`/${sessionId}`);
  };

  useLayoutEffect(() => {
    setIsMount(true);
  }, [setIsMount]);

  return (
    <nav className="hidden sm:inline-block w-56 h-screen shadow-sm shadow-secondary-dark dark:shadow-secondary sm:shadow-secondary-dark py-4">
      <Link href={'/dashboard'} className="flex justify-center items-center gap-4">
        <Image
          width={24}
          height={24}
          src={isMount && main.theme === 'light' ? '/img/whispr-black.png' : '/img/whispr.png'}
          alt="whispr"
        />
        <h1 className="font-bold text-lg">Whispr</h1>
      </Link>
      <Button
        variant="ACCENT"
        classNames="rounded-md flex gap-2 mt-12 mx-auto py-3 px-6 font-medium"
        isLoading={isLoading}
        onClick={onNewMeeting}
      >
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
              <Image
                priority
                width={16}
                height={16}
                src={isMount && main.theme === 'light' ? menu.ico : menu.icoDark}
                alt={menu.name}
              />
              {menu.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
