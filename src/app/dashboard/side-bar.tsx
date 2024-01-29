'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FormEvent, useContext, useLayoutEffect, useState } from 'react';

import { AppContext } from '@/context';
import { useMeet } from '@/hooks/useMeet';
import { Button } from '../components/button';
import { CreateMeetPrompt } from './create-meet-prompt';

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
  const { main, user } = useContext(AppContext);
  const pathname = usePathname();
  const router = useRouter();
  const { createMeetingSession } = useMeet();

  const [isMount, setIsMount] = useState(false);
  const [active, setActive] = useState<string>(pathname);
  const [isLoading, setIsLoading] = useState(false);
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const [meetName, setMeetName] = useState('');

  const onStartMeet = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const sessionId = await createMeetingSession(meetName);
    setMeetName('');
    setIsPromptOpen(false);
    setIsLoading(false);
    if (sessionId) router.push(`/${sessionId}?username=${user.data.id}`);
  };

  useLayoutEffect(() => {
    setIsMount(true);
  }, [setIsMount]);

  return (
    <nav className="hidden sm:flex flex-col w-56 h-screen shadow-sm shadow-secondary-dark dark:shadow-secondary sm:shadow-secondary-dark pt-4">
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
        onClick={() => setIsPromptOpen(true)}
      >
        <span className=" scale-150">+</span> New Meeting
      </Button>
      <div className="flex flex-col flex-grow justify-between">
        <ul className="mt-12">
          {MENU_LIST.slice(0, -1).map((menu) => (
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
        <div
          className={
            active === MENU_LIST[MENU_LIST.length - 1].href
              ? 'bg-gradient-to-r from-accent-transparent dark:from-accent-dark-transparent to-white border-l-2 border-accent dark:border-accent-dark'
              : ''
          }
        >
          <Link
            className="w-full flex items-center gap-4 px-4 py-3 font-medium"
            href={MENU_LIST[MENU_LIST.length - 1].href}
            onClick={() => setActive(MENU_LIST[MENU_LIST.length - 1].href)}
          >
            <Image
              priority
              width={16}
              height={16}
              src={
                isMount && main.theme === 'light'
                  ? MENU_LIST[MENU_LIST.length - 1].ico
                  : MENU_LIST[MENU_LIST.length - 1].icoDark
              }
              alt={MENU_LIST[MENU_LIST.length - 1].name}
            />
            {MENU_LIST[MENU_LIST.length - 1].name}
          </Link>
        </div>
      </div>
      <CreateMeetPrompt isOpen={isPromptOpen} setMeetName={setMeetName} onStart={onStartMeet} />
    </nav>
  );
}
