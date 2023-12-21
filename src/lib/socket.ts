import { Socket, io } from 'socket.io-client';

const URL = String(process.env.NEXT_PUBLIC_WS_URL);

export interface ServerToClientEvents {
  error: (data: { message: string }) => void;
  joined: () => void;
}

export interface ClientToServerEvents {
  join: (data: { roomId: string; userId: string }) => void;
  leave: (data: { roomId: string; userId: string }) => void;
}

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(URL);
