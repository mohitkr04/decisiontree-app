import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

interface LeaderboardEntry {
  id: string;
  name: string;
  points: number;
  treesCompleted: number;
  rank: number;
  avatar: string;
}

export default function Leaderboard() {
  const leaderboardData: LeaderboardEntry[] = [
    { id: '1', name: 'Alex', points: 850, treesCompleted: 8, rank: 1, avatar: '👦' },
    { id: '2', name: 'Emma', points: 720, treesCompleted: 6, rank: 2, avatar: '👧' },
    { id: '3', name: 'Sam', points: 650, treesCompleted: 5, rank: 3, avatar: '🧑' },
    // Add more entries as needed
  ];

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Top Decision Makers 🏆</h2>
      
      <div className="space-y-4">
        {leaderboardData.map((entry, index) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-lg border ${
              index === 0 ? 'bg-yellow-50 border-yellow-200' :
              index === 1 ? 'bg-gray-50 border-gray-200' :
              index === 2 ? 'bg-orange-50 border-orange-200' :
              'bg-white border-gray-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-2xl">{entry.avatar}</span>
                <div>
                  <h3 className="font-medium">{entry.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {entry.treesCompleted} trees completed
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="font-bold text-lg">{entry.points}</span>
                <p className="text-sm text-muted-foreground">points</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}