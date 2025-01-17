import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';

interface Achievement {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface StudentProgressProps {
  treesCompleted: number;
  totalExercises: number;
  achievements: Achievement[];
}

export default function StudentProgress({ 
  treesCompleted, 
  totalExercises,
  achievements 
}: StudentProgressProps) {
  const progress = (treesCompleted / totalExercises) * 100;

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4">Your Learning Journey 🎓</h2>
      
      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm text-muted-foreground">
              {treesCompleted}/{totalExercises} Completed
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Achievements 🏆</h3>
          <div className="grid gap-3">
            {achievements.map((achievement) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`p-3 rounded-lg border ${
                  achievement.completed 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">
                    {achievement.completed ? '🌟' : '⭐'}
                  </span>
                  <div>
                    <h4 className="font-medium">{achievement.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}