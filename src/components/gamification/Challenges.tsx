import { motion } from 'framer-motion';
import { useState } from 'react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
  completed: boolean;
}

export default function Challenges() {
  const [challenges] = useState<Challenge[]>([
    {
      id: '1',
      title: 'What to Wear?',
      description: 'Create a decision tree to help choose appropriate clothing for different weather conditions.',
      difficulty: 'Easy',
      points: 100,
      completed: false,
    },
    {
      id: '2',
      title: 'Study Plan',
      description: 'Build a tree to organize your study schedule based on homework and test dates.',
      difficulty: 'Medium',
      points: 200,
      completed: false,
    },
    {
      id: '3',
      title: 'Weekend Activity',
      description: 'Design a decision tree to plan the perfect weekend activity based on various factors.',
      difficulty: 'Hard',
      points: 300,
      completed: false,
    },
  ]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-8"
      >
        <h2 className="text-3xl font-bold text-blue-600 mb-6">Challenges</h2>
        
        <div className="space-y-4">
          {challenges.map((challenge) => (
            <motion.div
              key={challenge.id}
              whileHover={{ scale: 1.02 }}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-xl mb-2">{challenge.title}</h3>
                  <p className="text-gray-600 mb-2">{challenge.description}</p>
                  <div className="flex items-center gap-4">
                    <span className={`
                      px-2 py-1 rounded text-sm
                      ${challenge.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : ''}
                      ${challenge.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' : ''}
                      ${challenge.difficulty === 'Hard' ? 'bg-red-100 text-red-700' : ''}
                    `}>
                      {challenge.difficulty}
                    </span>
                    <span className="text-blue-600">{challenge.points} points</span>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Start Challenge
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
} 