'use client';

import { socket } from '@/lib/socket';
import { useEffect } from 'react';

export default function MeetSession({ params }: Readonly<{ params: { meetId: string } }>) {
  useEffect(() => {
    if (!socket.connected) return;
    console.log('connected');
  }, [socket.connected]);

  return <div>{params.meetId}</div>;
}
