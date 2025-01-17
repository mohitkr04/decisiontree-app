import { create } from 'zustand';

interface Toast {
  id: string;
  title: string;
  description: string;
  variant?: 'default' | 'destructive';
}

interface ToastStore {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (toast) =>
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id: Math.random().toString() }],
    })),
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));

export interface ToastProps {
  title: string;
  description: string;
  variant?: 'default' | 'destructive';
}

export const useToast = () => {
  const toast = (options: ToastProps) => {
    // Implement your toast logic here
    console.log('Toast:', options);
  };
  
  return { toast };
};