import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '../ui/use-toast';
import confetti from 'canvas-confetti';

type Position = {
  x: number;
  y: number;
};

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export default function SnakeGame() {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const gameSpeed = useRef(150);
  const { toast } = useToast();

  // Generate random food position
  const generateFood = useCallback(() => {
    const x = Math.floor(Math.random() * 20);
    const y = Math.floor(Math.random() * 20);
    setFood({ x, y });
  }, []);

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch(e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
        case ' ':
          setIsPaused(prev => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction]);

  // Game loop
  useEffect(() => {
    if (gameOver || isPaused) return;

    const moveSnake = () => {
      setSnake(prev => {
        const newSnake = [...prev];
        const head = { ...newSnake[0] };

        switch(direction) {
          case 'UP':
            head.y -= 1;
            break;
          case 'DOWN':
            head.y += 1;
            break;
          case 'LEFT':
            head.x -= 1;
            break;
          case 'RIGHT':
            head.x += 1;
            break;
        }

        // Check collision with walls
        if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20) {
          setGameOver(true);
          return prev;
        }

        // Check collision with self
        if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
          setGameOver(true);
          return prev;
        }

        // Check if food is eaten
        if (head.x === food.x && head.y === food.y) {
          generateFood();
          setScore(s => s + 10);
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
          toast({
            title: "🎉 Yummy!",
            description: "You collected a knowledge point!",
          });
        } else {
          newSnake.pop();
        }

        newSnake.unshift(head);
        return newSnake;
      });
    };

    const gameLoop = setInterval(moveSnake, gameSpeed.current);
    return () => clearInterval(gameLoop);
  }, [direction, food, gameOver, isPaused, generateFood, toast]);

  const restartGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setDirection('RIGHT');
    setScore(0);
    setGameOver(false);
    generateFood();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center gap-6"
    >
      <div className="flex justify-between items-center w-full max-w-md">
        <div className="text-2xl font-bold">Score: {score}</div>
        <Button
          onClick={() => setIsPaused(prev => !prev)}
          variant="outline"
          className="px-4 py-2"
        >
          {isPaused ? '▶️ Resume' : '⏸️ Pause'}
        </Button>
      </div>

      <div className="relative w-[400px] h-[400px] bg-white rounded-lg shadow-lg border-2 border-purple-200">
        {/* Game grid */}
        <div className="absolute inset-0 grid grid-cols-20 grid-rows-20">
          {snake.map((segment, index) => (
            <motion.div
              key={index}
              className="bg-purple-500 rounded-sm"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              style={{
                gridColumn: segment.x + 1,
                gridRow: segment.y + 1,
              }}
            />
          ))}
          <motion.div
            className="bg-green-500 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            style={{
              gridColumn: food.x + 1,
              gridRow: food.y + 1,
            }}
          />
        </div>

        {/* Game Over Overlay */}
        {gameOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white"
          >
            <h2 className="text-3xl font-bold mb-4">Game Over! 🎮</h2>
            <p className="text-xl mb-4">Final Score: {score}</p>
            <Button
              onClick={restartGame}
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-full"
            >
              Play Again! 🔄
            </Button>
          </motion.div>
        )}
      </div>

      <div className="text-center text-gray-600">
        <p>Use arrow keys to move 🎮</p>
        <p>Space to pause ⏸️</p>
      </div>
    </motion.div>
  );
} 