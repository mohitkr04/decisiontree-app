import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from './use-toast';

export function Toast() {
  const { toast, message, type, show, dismiss } = useToast();

  if (!show) return null;

  const bgColor = type === 'success' ? 'bg-green-500' :
                 type === 'error' ? 'bg-red-500' :
                 'bg-blue-500';

  const icon = type === 'success' ? '✅' :
              type === 'error' ? '❌' :
              'ℹ️';

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className={`${bgColor} text-white px-6 py-3 rounded-lg shadow-lg`}
          onClick={dismiss}
        >
          <div className="flex items-center gap-2">
            <span>{icon}</span>
            <span>{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}