import { create } from "zustand";

type Track = {
  id: string;
  title: string;
  producer: string;
  cover?: string | null;
  preview: string;
};

type PlayerState = {
  current: Track | null;
  playing: boolean;
  play: (t: Track) => void;
  toggle: () => void;
  stop: () => void;
};

export const usePlayer = create<PlayerState>((set, get) => ({
  current: null,
  playing: false,
  play: (t) => {
    const cur = get().current;
    if (cur?.id === t.id) {
      set({ playing: !get().playing });
    } else {
      set({ current: t, playing: true });
    }
  },
  toggle: () => set({ playing: !get().playing }),
  stop: () => set({ current: null, playing: false }),
}));
