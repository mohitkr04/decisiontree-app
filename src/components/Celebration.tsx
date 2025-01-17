import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface CelebrationProps {
  show: boolean;
  message: string;
}

export default function Celebration({ show, message }: CelebrationProps) {
  if (show) {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
        >
          <motion.div
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            className="bg-white p-8 rounded-lg shadow-xl text-center"
          >
            <h2 className="text-2xl font-bold mb-4">🎉 Congratulations! 🎉</h2>
            <p className="text-lg mb-6">{message}</p>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                You've made great progress in understanding decision trees!
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-primary text-white rounded-lg"
                onClick={() => confetti()}
              >
                Celebrate! 🎊
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

