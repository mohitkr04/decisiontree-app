import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '@/contexts/GameContext';

export function ScoreBoard() {
  const { score, level, achievements } = useGame();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 right-4 bg-white rounded-xl shadow-lg p-4"
    >
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">⭐</span>
          <div>
            <p className="font-bold text-lg">{score}</p>
            <p className="text-xs text-gray-500">points</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎮</span>
          <div>
            <p className="font-bold text-lg">Level {level}</p>
            <p className="text-xs text-gray-500">current level</p>
          </div>
        </div>

        <AnimatePresence>
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2 text-sm text-gray-600"
            >
              <span>🏆</span>
              <span>{achievement}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
} 