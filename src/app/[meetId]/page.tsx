'use client';

import { format } from 'date-fns';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FormEvent, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { AppContext } from '@/context';
import { useMainAction } from '@/context/actions/main';
import { useConnection } from '@/hooks/useMeet';
import { Answer, Question, socket } from '@/lib/socket';
import { Button } from '../components/button';
import { TextField } from '../components/input';
import { Answer as AnswerUI } from './answer';
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
  const pathname = usePathname();
  useConnection();

  const [username, setUsername] = useState(searchParams.username);
  const [isPromptUsername, setIsPromptUsername] = useState(false);
  const [isMount, setIsMount] = useState(false);
  const [isJoined, setIsJoined] = useState<boolean>(false);
  const [isModerator, setIsModerator] = useState<boolean>(true);
  const [error, setError] = useState<{ message: string } | null>(null);
  const [inputValue, setInputValue] = useState<string>('');

  const [questions, setQuestions] = useState<{ [id: string]: Question }>({});
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(questions[0] ?? null);

  const onShare = () => {
    toggleToast({ isOpen: true, type: 'INFO', message: 'Meet link copied!' });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInputValue('');
    if (isModerator) {
      socket.emit('question', { meetId: params.meetId, question: inputValue ?? '' });
    } else {
      socket.emit('answer', {
        meetId: params.meetId,
        username: username,
        questionId: selectedQuestion?.id ?? '',
        answer: inputValue ?? '',
      });
    }
  };

  useLayoutEffect(() => {
    setIsMount(true);
    if (!username && !searchParams.username) {
      setIsPromptUsername(true);
    }
    const t = setTimeout(() => {
      if (!isJoined) setError({ message: "Can't join meeting session" });
    }, 5000);

    return () => clearTimeout(t);
  }, [setIsMount, isJoined, searchParams.username]);

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
    const handleQuestion = (question: Question) => {
      if (isModerator) setSelectedQuestion(question);
      setQuestions((prev) => ({
        ...prev,
        [question.id]: question,
      }));
    };
    const handleAnswer = (answer: Answer) => {
      setQuestions((prev) => ({
        ...prev,
        [answer.questionId]: {
          ...prev[answer.questionId],
          answer: {
            ...prev[answer.questionId].responses,
            [answer.id]: answer,
          },
        },
      }));
      setSelectedQuestion((prev) =>
        prev
          ? {
              ...prev,
              answer: {
                ...prev.responses,
                [answer.id]: answer,
              },
            }
          : null
      );
    };

    joinSession();
    socket.on('joined', ({ isModerator, questions }): void => {
      setIsJoined(true);
      setIsModerator(isModerator);
      const data: { [id: string]: Question } = {};
      if (questions.length) {
        questions.forEach(
          (question) =>
            (data[question.id] = {
              ...question,
              responses: question.responses,
            })
        );
      }
      setQuestions(data);
    });
    socket.on('question', ({ question }) => handleQuestion(question));
    socket.on('answer', ({ answer }) => handleAnswer(answer));
    socket.on('error', handleError);
    window.addEventListener('beforeunload', leaveSession);

    return () => {
      leaveSession();
      socket.on('joined', () => ({ isModerator }: { isModerator: boolean }) => {
        setIsJoined(true);
        setIsModerator(isModerator);
      });
      socket.on('question', ({ question }) => handleQuestion(question));
      socket.on('answer', ({ answer }) => handleAnswer(answer));
      socket.off('error', handleError);
      window.removeEventListener('beforeunload', leaveSession);
    };
  }, [params.meetId, username]);

  return (
    <div className="flex">
      {error && <WsError message={error.message} />}
      {!error && !isJoined && <Loader />}
      {!error && isJoined && (
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
                    {selectedQuestion?.createdAt ? format(selectedQuestion.createdAt ?? '', 'HH:mm') : ''}
                  </span>
                </div>
              )}
              <div className="flex flex-col gap-8 mt-8 w-4/5 mx-auto">
                {selectedQuestion?.responses?.map((response) => (
                  <AnswerUI
                    key={response.id}
                    username={response.username ?? ''}
                    answer={response.response ?? ''}
                    timestamp={response.createdAt ?? ''}
                  />
                ))}
              </div>
            </div>
            {(isModerator || selectedQuestion?.id) && (
              <form className="w-full flex justify-center items-center gap-4" onSubmit={onSubmit}>
                <CopyToClipboard text={window.location.host + pathname} onCopy={onShare}>
                  <Button type="button" classNames="uppercase font-bold" variant="ACCENT">
                    Share
                  </Button>
                </CopyToClipboard>
                <TextField
                  classNames="w-full sm:w-1/2 border-solid border-text dark:border-secondary border-[0.1rem] border-b-[0.1rem] rounded-full px-6"
                  placeholder={isModerator ? 'Enter a question or topic...' : 'Enter your answer or opinion...'}
                  required
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
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
            )}
          </div>
        </>
      )}
      <Prompt isOpen={isPromptUsername} setIsPromptOpen={setIsPromptUsername} setUsername={setUsername} />
    </div>
  );
}
