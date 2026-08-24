import { create } from "zustand";

interface GlobalActionState {
  action: (() => Promise<void> | void) | null;
  setAction: (fn: (() => Promise<void> | void) | null) => void;
  triggerAction: () => Promise<void>;
}

export const useGlobalActionStore = create<GlobalActionState>((set, get) => ({
  action: null,

  setAction: (fn) => set({ action: fn }),

  triggerAction: async () => {
    const { action } = get();

    if (action) {
      await action();
    }
  },
}));
