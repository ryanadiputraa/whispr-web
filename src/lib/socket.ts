import { Socket, io } from 'socket.io-client';

const URL = String(process.env.NEXT_PUBLIC_WS_URL);

export interface Question {
  id: string;
  question: string;
  responses?: Answer[];
  createdAt: string;
}

export interface QuestionDTO {
  meetId: string;
  question: string;
}

export interface Answer {
  id: string;
  questionId: string;
  username: string;
  response: string;
  createdAt: string;
}

export interface AnswerDTO {
  meetId: string;
  username: string;
  questionId: string;
  answer: string;
}

export interface ServerToClientEvents {
  error: (data: { message: string }) => void;
  joined: (data: { isModerator: boolean; questions: Question[] }) => void;
  question: (data: { question: Question }) => void;
  answer: (data: { answer: Answer }) => void;
}

export interface ClientToServerEvents {
  join: (data: { roomId: string; userId: string }) => void;
  leave: (data: { roomId: string; userId: string }) => void;
  question: (data: QuestionDTO) => void;
  answer: (data: AnswerDTO) => void;
}

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(URL);
