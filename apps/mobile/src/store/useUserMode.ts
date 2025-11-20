import { create } from 'zustand';

type AppMode = 'customer' | 'driver';

interface UserModeState {
    mode: AppMode;
    setMode: (mode: AppMode) => void;
    toggleMode: () => void;
}

export const useUserMode = create<UserModeState>((set) => ({
    mode: 'customer', // Default to customer
    setMode: (mode) => set({ mode }),
    toggleMode: () => set((state) => ({ mode: state.mode === 'customer' ? 'driver' : 'customer' })),
}));
