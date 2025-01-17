import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb } from 'lucide-react';

interface HintProps {
  text: string;
  visible: boolean;
  onClose: () => void;
}

export function Hint({ text, visible }: HintProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed bottom-4 left-4 p-4 bg-yellow-100 rounded-lg shadow-lg"
        >
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-600" />
            <p className="text-yellow-800">{text}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 