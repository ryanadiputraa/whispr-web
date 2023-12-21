'use client';

import { useEffect } from 'react';

import { socket } from '@/lib/socket';
import { useConnection } from '@/hooks/useMeet';

interface Props {
  params: { meetId: string };
  searchParams: { username: string };
}

export default function MeetSession({ params, searchParams }: Readonly<Props>) {
  const { username } = searchParams;
  useConnection();

  useEffect(() => {
    // TODO: prompt username
    if (!username) console.log('redirect');
  }, [username]);

  useEffect(() => {
    if (!username) return;
    const receivedMsg = ({ msg }: { msg: string }) => {
      console.log(msg);
    };
    const joinSession = () => {
      socket.emit('join', { roomId: params.meetId, userId: username });
    };
    const leaveSession = () => {
      socket.emit('leave', { roomId: params.meetId, userId: username });
    };

    socket.on('connect', joinSession);
    socket.on('msg', receivedMsg);
    window.addEventListener('beforeunload', leaveSession);

    return () => {
      leaveSession();
      window.removeEventListener('beforeunload', leaveSession);
      socket.off('msg', receivedMsg);
      socket.off('connect', joinSession);
    };
  }, [params.meetId, username]);

  return <div>{params.meetId}</div>;
}
