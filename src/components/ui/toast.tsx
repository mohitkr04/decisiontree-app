import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from './use-toast';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`
              p-4 rounded-lg shadow-lg min-w-[300px] max-w-md
              ${toast.variant === 'destructive' 
                ? 'bg-red-600 text-white' 
                : 'bg-white text-gray-900 border border-gray-200'
              }
            `}
          >
            <div className="flex justify-between items-start gap-2">
              <div>
                <h3 className="font-medium">{toast.title}</h3>
                {toast.description && (
                  <p className={`text-sm ${
                    toast.variant === 'destructive' 
                      ? 'text-red-100' 
                      : 'text-gray-500'
                  }`}>
                    {toast.description}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export { useToast };