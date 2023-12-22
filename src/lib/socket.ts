import { Socket, io } from 'socket.io-client';

const URL = String(process.env.NEXT_PUBLIC_WS_URL);

export interface Question {
  id: string;
  question: string;
  answer: Answer[];
  created_at: string;
}

export interface Answer {
  id: string;
  username: string;
  answer: string;
  created_at: string;
}

export interface ServerToClientEvents {
  error: (data: { message: string }) => void;
  joined: (data: { isModerator: boolean }) => void;
  question: (data: { question: Question }) => void;
}

export interface ClientToServerEvents {
  join: (data: { roomId: string; userId: string }) => void;
  leave: (data: { roomId: string; userId: string }) => void;
}

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(URL);
