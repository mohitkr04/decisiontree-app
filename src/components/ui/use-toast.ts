import { create } from 'zustand';

type ToastType = 'success' | 'error' | 'info';

interface ToastState {
  message: string | null;
  type: ToastType | null;
  show: boolean;
  showToast: (message: string, type: ToastType) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastState>()((set) => ({
  message: null,
  type: null,
  show: false,
  showToast: (message: string, type: ToastType) => {
    set({ message, type, show: true });
    setTimeout(() => {
      set({ show: false, message: null, type: null });
    }, 3000);
  },
  hideToast: () => set({ show: false, message: null, type: null }),
}));

export const toast = {
  success: (message: string) => useToastStore.getState().showToast(message, 'success'),
  error: (message: string) => useToastStore.getState().showToast(message, 'error'),
  info: (message: string) => useToastStore.getState().showToast(message, 'info'),
};

export const useToast = () => {
  const { message, type, show } = useToastStore();
  return { message, type, show };
};