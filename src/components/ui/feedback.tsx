import { motion } from 'framer-motion';

interface FeedbackProps {
  message: string;
  type: 'error' | 'info' | 'success';
  visible: boolean;
  onClose: () => void;
}

export function Feedback({ message, type }: Omit<FeedbackProps, 'visible' | 'onClose'>) {
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