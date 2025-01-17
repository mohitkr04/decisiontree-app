import { createContext, useContext, ReactNode } from 'react';
import { Toast } from './toast';
import { useToastStore } from './use-toast';

const ToastContext = createContext<ReturnType<typeof useToastStore> | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Toast />
    </>
  );
}

export function useToastContext() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
} 