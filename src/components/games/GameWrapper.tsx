import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { GameState } from '@/types/game';

interface GameWrapperProps {
  children: ReactNode;
  gameState: GameState;
  onPause: () => void;
  onResume: () => void;
  onRestart: () => void;
}

export function GameWrapper({ children, gameState, onPause, onResume, onRestart }: GameWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative"
    >
      {/* Game controls */}
      <div className="absolute top-4 right-4 space-x-2">
        {gameState.isPlaying && !gameState.isPaused && (
          <button onClick={onPause}>⏸️</button>
        )}
        {gameState.isPaused && (
          <button onClick={onResume}>▶️</button>
        )}
        <button onClick={onRestart}>🔄</button>
      </div>
      
      {children}
    </motion.div>
  );
} 