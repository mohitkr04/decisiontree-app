import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AppBar from '../components/layout/AppBar';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useToast } from '../components/ui/use-toast';
import SnakeGame from '../components/games/SnakeGame';
import QuizGame from '../components/games/QuizGame';
import { ArrowLeft } from 'lucide-react';

type GameType = 'menu' | 'snake' | 'quiz';

export default function Games() {
  const [activeGame, setActiveGame] = useState<GameType>('menu');
  const { toast } = useToast();

  const handleBackToMenu = () => {
    setActiveGame('menu');
    toast({
      title: "👋 Come back soon!",
      description: "Try another fun game to learn more!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <AppBar />
      <div className="container mx-auto px-4 pt-20">
        <AnimatePresence mode="wait">
          {activeGame === 'menu' ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                  Fun Learning Games! 🎮
                </h1>
                <p className="text-xl text-gray-600 mt-2">
                  Pick a game and start learning! 🚀
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Snake Game Card */}
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="space-y-4"
                  >
                    <h2 className="text-2xl font-bold">🐍 Decision Snake</h2>
                    <p className="text-gray-600">
                      Guide the snake through decision paths and collect knowledge points!
                    </p>
                    <Button 
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-600"
                      onClick={() => setActiveGame('snake')}
                    >
                      Play Snake Game! 🎮
                    </Button>
                  </motion.div>
                </Card>

                {/* Quiz Game Card */}
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="space-y-4"
                  >
                    <h2 className="text-2xl font-bold">🎯 Decision Quiz</h2>
                    <p className="text-gray-600">
                      Test your knowledge with fun quizzes about decision trees!
                    </p>
                    <Button 
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600"
                      onClick={() => setActiveGame('quiz')}
                    >
                      Start Quiz! 📝
                    </Button>
                  </motion.div>
                </Card>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Back Button */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center"
              >
                <Button
                  variant="ghost"
                  className="group flex items-center gap-2 text-gray-600 hover:text-gray-900"
                  onClick={handleBackToMenu}
                >
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  <span>Back to Games</span>
                </Button>
              </motion.div>

              {/* Active Game */}
              {activeGame === 'snake' && <SnakeGame />}
              {activeGame === 'quiz' && <QuizGame />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}