'use client';

import { format } from 'date-fns';
import Image from 'next/image';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';

import { AppContext } from '@/context';
import { useMainAction } from '@/context/actions/main';
import { useConnection } from '@/hooks/useMeet';
import { Question, socket } from '@/lib/socket';
import { Button } from '../components/button';
import { TextField } from '../components/input';
import { Answer } from './answer';
import { Loader } from './loader';
import { Prompt } from './prompt';
import { Questions } from './questions';
import { WsError } from './ws-error';

interface Props {
  params: { meetId: string };
  searchParams: { username: string };
}

export default function MeetSession({ params, searchParams }: Readonly<Props>) {
  const { main } = useContext(AppContext);
  const { toggleToast } = useMainAction();

  const [username, setUsername] = useState(searchParams.username);
  const [isPromptUsername, setIsPromptUsername] = useState(false);
  const [isMount, setIsMount] = useState(false);
  const [isJoined, setIsJoined] = useState<boolean>(false);
  const [isModerator, setIsModerator] = useState<boolean>(true);
  const [error, setError] = useState<{ message: string } | null>(null);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(questions[0] ?? null);

  useConnection();

  const onShare = () => {
    // TODO: copy meet link
    toggleToast({ isOpen: true, type: 'INFO', message: 'Meet link copied!' });
  };

  useLayoutEffect(() => {
    setIsMount(true);
    if (!username && !searchParams.username) {
      setIsPromptUsername(true);
    }

    setUsername(searchParams.username);
    const t = setTimeout(() => {
      if (!isJoined) setError({ message: "Can't join meeting session" });
    }, 5000);

    return () => clearTimeout(t);
  }, [setIsMount, isJoined, searchParams.username]);

  useEffect(() => {
    console.log('connecting...');
    console.log(username);
    console.log(params.meetId);

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

    joinSession();
    socket.on('joined', ({ isModerator }: { isModerator: boolean }) => {
      console.log('join');

      setIsJoined(true);
      setIsModerator(isModerator);
    });
    socket.on('error', handleError);
    window.addEventListener('beforeunload', leaveSession);

    return () => {
      leaveSession();
      socket.on('joined', () => ({ isModerator }: { isModerator: boolean }) => {
        setIsJoined(true);
        setIsModerator(isModerator);
      });
      socket.off('error', handleError);
      window.removeEventListener('beforeunload', leaveSession);
    };
  }, [params.meetId, username]);

  const Content = () => {
    if (error) return <WsError message={error.message} />;
    if (!isJoined) return <Loader />;
    return (
      <>
        <Questions
          questions={questions}
          selectedQuestion={selectedQuestion}
          setSelectedQuestion={setSelectedQuestion}
        />
        <div className="flex flex-col justify-between px-[4%] sm:px-4 pt-6 pb-3 w-full">
          <div className="max-h-[90vh] overflow-y-auto">
            <span className="inline-block text-2xl font-bold text-center w-full mb-4 dark:text-text-dark">
              Silent Meet
            </span>
            {selectedQuestion && (
              <div className="flex flex-col bg-accent-transparent dark:bg-accent-dark-transparent py-2 px-4 text-justify rounded-md">
                <p>{selectedQuestion?.question}</p>
                <span className="self-end">
                  {selectedQuestion?.created_at ? format(selectedQuestion.created_at ?? '', 'HH:mm') : ''}
                </span>
              </div>
            )}
            <div className="flex flex-col gap-8 mt-8 w-4/5 mx-auto">
              {selectedQuestion?.answer.map((answer) => (
                <Answer
                  key={answer.id}
                  username={answer.username}
                  answer={answer.answer}
                  timestamp={answer.created_at}
                />
              ))}
            </div>
          </div>
          <form className="w-full flex justify-center items-center gap-4">
            <Button classNames="uppercase font-bold" variant="ACCENT" onClick={onShare}>
              Share
            </Button>
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
      </>
    );
  };

  return (
    <div className="flex">
      <Content />
      <Prompt isOpen={isPromptUsername} setIsPromptOpen={setIsPromptUsername} setUsername={setUsername} />
    </div>
  );
}
