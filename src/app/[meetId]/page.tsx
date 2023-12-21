'use client';

import { useEffect, useState } from 'react';

import { useConnection } from '@/hooks/useMeet';
import { socket } from '@/lib/socket';
import { Loader } from './loader';
import { WsError } from './ws-error';

interface Props {
  params: { meetId: string };
  searchParams: { username: string };
}

export default function MeetSession({ params, searchParams }: Readonly<Props>) {
  const { username } = searchParams;
  const [isJoined, setIsJoined] = useState<boolean>(false);
  const [error, setError] = useState<{ message: string } | null>(null);

  useConnection();

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
    socket.on('joined', () => setIsJoined(true));
    socket.on('error', handleError);
    window.addEventListener('beforeunload', leaveSession);

    return () => {
      leaveSession();
      socket.off('connect', joinSession);
      socket.on('joined', () => setIsJoined(true));
      socket.off('error', handleError);
      window.removeEventListener('beforeunload', leaveSession);
    };
  }, [params.meetId, username]);

  if (error) return <WsError message={error.message} />;
  if (!isJoined) return <Loader />;
  return <div>{params.meetId}</div>;
}
