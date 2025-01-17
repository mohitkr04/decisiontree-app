import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToastStore } from './use-toast';

export function Toast() {
  const { toasts, removeToast } = useToastStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (toasts.length > 0) {
        removeToast(toasts[0].id);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [toasts, removeToast]);

  return (
    <AnimatePresence>
      {toasts.map((toast) => (
        <motion.div
          key={toast.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg ${
            toast.variant === 'destructive' ? 'bg-red-500' : 'bg-green-500'
          } text-white`}
        >
          <h3 className="font-semibold">{toast.title}</h3>
          <p className="text-sm">{toast.description}</p>
        </motion.div>
      ))}
    </AnimatePresence>
  );
}