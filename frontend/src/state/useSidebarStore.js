import { create } from "zustand";

export const useSidebarStore = create((set) => ({
  isOpen: true,                     // default: expanded on desktop
  toggle: () => set((s) => ({ isOpen: !s.isOpen })),
  close: () => set({ isOpen: false }),
  open: () => set({ isOpen: true }),
}));
