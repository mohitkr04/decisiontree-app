import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

type FeedbackType = 'success' | 'error' | 'warning';

interface FeedbackProps {
  type: FeedbackType;
  message: string;
  visible: boolean;
  onClose: () => void;
}

export function Feedback({ type, message, visible, onClose }: FeedbackProps) {
  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-600" />,
    error: <XCircle className="w-5 h-5 text-red-600" />,
    warning: <AlertCircle className="w-5 h-5 text-yellow-600" />
  };

  const colors = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    warning: 'bg-yellow-50 border-yellow-200'
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={`fixed bottom-4 right-4 p-4 rounded-lg border ${colors[type]} shadow-lg`}
        >
          <div className="flex items-center gap-2">
            {icons[type]}
            <p className="text-sm font-medium">{message}</p>
            <button
              onClick={onClose}
              className="ml-4 text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 