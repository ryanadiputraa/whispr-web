import { Socket, io } from 'socket.io-client';

const URL = String(process.env.NEXT_PUBLIC_WS_URL);

export interface ServerToClientEvents {
  msg: (data: { msg: string }) => void;
}

export interface ClientToServerEvents {
  msg: (data: { msg: string }) => void;
}

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(URL);
