import { motion } from 'framer-motion';

export interface Progress {
  currentLevel: number;
  totalLevels: number;
  currentScore: number;
  achievements: string[];
}

export default function ProgressTracker() {
  const badges: Badge[] = [
    {
      id: '1',
      name: 'Tree Builder',
      description: 'Created your first decision tree',
      icon: '🌳',
      earned: true,
    },
    {
      id: '2',
      name: 'Problem Solver',
      description: 'Completed 5 decision challenges',
      icon: '🎯',
      earned: false,
    },
    {
      id: '3',
      name: 'Master Decider',
      description: 'Created 10 different decision trees',
      icon: '👑',
      earned: false,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-8"
      >
        <h2 className="text-3xl font-bold text-blue-600 mb-6">Your Progress</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {badges.map((badge) => (
            <motion.div
              key={badge.id}
              whileHover={{ scale: 1.05 }}
              className={`p-4 rounded-lg ${
                badge.earned ? 'bg-blue-50' : 'bg-gray-50'
              }`}
            >
              <div className="text-4xl mb-2">{badge.icon}</div>
              <h3 className="font-semibold text-lg mb-1">{badge.name}</h3>
              <p className="text-sm text-gray-600">{badge.description}</p>
              {badge.earned && (
                <span className="inline-block mt-2 text-green-600 text-sm">
                  ✓ Earned
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
} 