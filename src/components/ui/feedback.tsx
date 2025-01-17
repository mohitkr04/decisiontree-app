import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

type FeedbackType = 'success' | 'error' | 'warning';

interface FeedbackProps {
  type: FeedbackType;
  message: string;
  visible: boolean;
  onClose: () => void;
}

export function Feedback({ message, type }: { message: string, type: 'success' | 'info' | 'error' }) {
  const icons = {
    success: '🌟',
    info: '💡',
    error: '🤔'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`fixed bottom-4 right-4 p-4 rounded-xl shadow-lg
        ${type === 'success' ? 'bg-green-100' :
          type === 'info' ? 'bg-blue-100' : 'bg-yellow-100'}`}
    >
      <div className="flex items-center gap-2">
        <span className="text-2xl">{icons[type]}</span>
        <p className="font-medium">{message}</p>
      </div>
    </motion.div>
  );
} 