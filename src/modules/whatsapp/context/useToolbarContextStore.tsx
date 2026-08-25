import { create } from "zustand";

interface ToolbarContext {
  title: string;
  subTitle: string;
  showSecondaryButton: boolean;
  secondaryButtonText?: string;
  secondaryButtonIcon?: React.ReactNode;
  secondaryButtonAction?: () => Promise<void>;
  showMainButton: boolean;
  mainButtonText?: string;
  mainButtonIcon?: React.ReactNode;
  mainButtonAction?: () => Promise<void>;
}

interface ToolbarContextState {
  toolbarContext: ToolbarContext | null;
  setContext: (toolbarContext: ToolbarContext) => void;
  clearContext: () => void;
  //triggerAction: () => Promise<void>;
}

export const useToolbarContextStore = create<ToolbarContextState>((set) => ({
  toolbarContext: null,

  setContext: (toolbarContext) => set({ toolbarContext: { ...toolbarContext } }),

  clearContext: () => set({ toolbarContext: null }),
}));
