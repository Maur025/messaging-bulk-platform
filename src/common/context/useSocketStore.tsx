import { io, type Socket } from "socket.io-client";
import { create } from "zustand";
import { environments } from "../config/env";

interface SocketState {
  socket: Socket | null;
  connect: () => Promise<void> | void;
  disconnect: () => Promise<void> | void;
}

export const useSocketStore = create<SocketState>((set) => ({
  socket: null,

  connect: async () => {
    const { API_URL } = environments;
    console.log(API_URL);

    const socket = io(API_URL, {
      reconnection: true,
      reconnectionDelay: 10000,
      reconnectionDelayMax: 15000,
    });

    set({ socket });
  },

  disconnect: async () => {
    set((state) => {
      state.socket?.disconnect();

      return { socket: null };
    });
  },
}));
