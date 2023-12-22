'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Dispatch, SetStateAction, useContext, useLayoutEffect, useState } from 'react';

import { AppContext } from '@/context';
import { Question } from '@/lib/socket';

interface Props {
  questions: Question[];
  selectedQuestion: Question | null;
  setSelectedQuestion: Dispatch<SetStateAction<Question | null>>;
}

export function Questions({ questions, selectedQuestion, setSelectedQuestion }: Readonly<Props>) {
  const { main } = useContext(AppContext);
  const [isMount, setIsMount] = useState(false);

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
        {questions.map((question) => (
          <li
            key={question.id}
            className={
              selectedQuestion?.id === question.id
                ? 'bg-gradient-to-r from-accent-transparent dark:from-accent-dark-transparent to-white border-l-2 border-accent dark:border-accent-dark'
                : ''
            }
          >
            <button className="inline-block truncate w-40 py-2 px-2" onClick={() => setSelectedQuestion(question)}>
              {question.question}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
