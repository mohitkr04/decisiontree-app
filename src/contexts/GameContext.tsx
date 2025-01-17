import React, { createContext, useContext, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';

interface GameContextType {
  score: number;
  addPoints: (points: number) => void;
  level: number;
  advanceLevel: () => void;
  achievements: string[];
  unlockAchievement: (achievement: string) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [achievements, setAchievements] = useState<string[]>([]);

  const addPoints = useCallback((points: number) => {
    setScore(prev => prev + points);
    // Show celebration animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  const advanceLevel = useCallback(() => {
    setLevel(prev => prev + 1);
    addPoints(100); // Bonus points for completing a level
  }, [addPoints]);

  const unlockAchievement = useCallback((achievement: string) => {
    setAchievements(prev => {
      if (prev.includes(achievement)) return prev;
      return [...prev, achievement];
    });
    
    toast({
      title: "🏆 Achievement Unlocked!",
      description: achievement,
      duration: 3000
    });
  }, []);

  return (
    <GameContext.Provider value={{
      score,
      addPoints,
      level,
      advanceLevel,
      achievements,
      unlockAchievement
    }}>
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}; 