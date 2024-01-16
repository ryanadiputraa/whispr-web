'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Dispatch, SetStateAction, useContext, useLayoutEffect, useState } from 'react';

import { AppContext } from '@/context';
import { Question } from '@/lib/socket';

interface Props {
  questions: { [id: string]: Question };
  selectedQuestion: Question | null;
  setSelectedQuestion: Dispatch<SetStateAction<Question | null>>;
  unread: { [questionId: string]: number };
  setUnread: Dispatch<SetStateAction<{ [questionId: string]: number }>>;
}

export function Questions({ questions, selectedQuestion, setSelectedQuestion, unread, setUnread }: Readonly<Props>) {
  const { main } = useContext(AppContext);
  const [isMount, setIsMount] = useState(false);

  const onSelectQuestion = (id: string) => {
    setSelectedQuestion(questions[id]);
    setUnread((prev) => ({ ...prev, [id]: 0 }));
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
      <ul className="mt-12">
        {Object.keys(questions).map((id) => (
          <li
            key={id}
            className={
              selectedQuestion?.id === id
                ? 'bg-gradient-to-r from-accent-transparent dark:from-accent-dark-transparent to-white border-l-2 border-accent dark:border-accent-dark'
                : ''
            }
          >
            <button className="relative inline-block truncate w-40 py-2 px-2" onClick={() => onSelectQuestion(id)}>
              {unread[id] ? (
                <span className="absolute right-0 top-2 bg-red-400 rounded-full px-[0.35rem] pb-[0.125rem] grid place-items-center text-xs font-bold">
                  {unread[id]}
                </span>
              ) : null}
              {questions[id].question}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
