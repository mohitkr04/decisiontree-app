import { create } from 'zustand';

interface ToastState {
  message: string;
  type: 'success' | 'error' | 'info';
  show: boolean;
  toast: (options: { title: string; description: string; variant?: 'default' | 'destructive' }) => void;
  dismiss: () => void;
}

export const useToast = create<ToastState>((set) => ({
  message: '',
  type: 'info',
  show: false,
  toast: (options) => {
    const message = options.title + (options.description ? `: ${options.description}` : '');
    const type = options.variant === 'destructive' ? 'error' : 'success';
    set({ message, type, show: true });
    setTimeout(() => {
      set({ show: false });
    }, 3000);
  },
  dismiss: () => set({ show: false }),
}));