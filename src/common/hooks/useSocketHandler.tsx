import { useEffect } from "react";
import type { Socket } from "socket.io-client";

interface Request {
  socket: Socket | null;
  connect: () => Promise<void> | void;
  disconnect: () => Promise<void> | void;
}

export const useSocketHandler = ({ connect, disconnect }: Request) => {
  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, [connect, disconnect]);
};
