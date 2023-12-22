'use client';

import { format } from 'date-fns';
import Image from 'next/image';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';

import { AppContext } from '@/context';
import { useConnection } from '@/hooks/useMeet';
import { Question, socket } from '@/lib/socket';
import { Button } from '../components/button';
import { TextField } from '../components/input';
import { Answer } from './answer';
import { Loader } from './loader';
import { Questions } from './questions';
import { WsError } from './ws-error';

interface Props {
  params: { meetId: string };
  searchParams: { username: string };
}

export default function MeetSession({ params, searchParams }: Readonly<Props>) {
  const { main } = useContext(AppContext);
  const { username } = searchParams;
  const [isMount, setIsMount] = useState(false);
  const [isJoined, setIsJoined] = useState<boolean>(false);
  const [isModerator, setIsModerator] = useState<boolean>(true);
  const [error, setError] = useState<{ message: string } | null>(null);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(questions[0] ?? null);

  useConnection();

  useLayoutEffect(() => {
    setIsMount(true);
  }, [setIsMount]);

  useEffect(() => {
    // TODO: prompt username
    if (!username) console.log('redirect');
  }, [username]);

  useEffect(() => {
    if (!username) return;
    const handleError = ({ message }: { message: string }) => {
      setError({ message });
    };
    const joinSession = () => {
      socket.emit('join', { roomId: params.meetId, userId: username });
    };
    const leaveSession = () => {
      socket.emit('leave', { roomId: params.meetId, userId: username });
    };

    socket.on('connect', joinSession);
    socket.on('joined', ({ isModerator }: { isModerator: boolean }) => {
      setIsJoined(true);
      setIsModerator(isModerator);
    });
    socket.on('error', handleError);
    window.addEventListener('beforeunload', leaveSession);

    return () => {
      leaveSession();
      socket.off('connect', joinSession);
      socket.on('joined', () => ({ isModerator }: { isModerator: boolean }) => {
        setIsJoined(true);
        setIsModerator(isModerator);
      });
      socket.off('error', handleError);
      window.removeEventListener('beforeunload', leaveSession);
    };
  }, [params.meetId, username]);

  if (error) return <WsError message={error.message} />;
  if (!isJoined) return <Loader />;
  return (
    <div className="flex">
      <Questions questions={questions} selectedQuestion={selectedQuestion} setSelectedQuestion={setSelectedQuestion} />
      <div className="flex flex-col justify-between px-[4%] sm:px-4 pt-6 pb-3 w-full">
        <div className="max-h-[90vh] overflow-y-auto">
          <span className="inline-block text-2xl font-bold text-center w-full mb-4 dark:text-text-dark">
            Silent Meet
          </span>
          <div className="flex flex-col bg-accent-transparent dark:bg-accent-dark-transparent py-2 px-4 text-justify rounded-md">
            <p>{selectedQuestion?.question}</p>
            <span className="self-end">{format(selectedQuestion?.created_at ?? '', 'HH:mm')}</span>
          </div>
          <div className="flex flex-col gap-8 mt-8 w-4/5 mx-auto">
            {selectedQuestion?.answer.map((answer) => (
              <Answer key={answer.id} username={answer.username} answer={answer.answer} timestamp={answer.created_at} />
            ))}
          </div>
        </div>
        <form className="w-full flex justify-center items-center gap-4">
          <TextField
            classNames="w-full sm:w-1/2 border-solid border-text dark:border-secondary border-[0.1rem] border-b-[0.1rem] rounded-full px-6"
            placeholder={isModerator ? 'Enter a question or topic...' : 'Enter your answer or opinion...'}
            required
          />
          <Button variant="SECONDARY" classNames="dark:bg-transparent dark:border-secondary">
            <Image
              width={24}
              height={24}
              src={isMount && main.theme === 'light' ? '/img/send-black.png' : '/img/send.png'}
              alt="send"
            />
          </Button>
        </form>
      </div>
    </div>
  );
}
