import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';

interface ProgressTrackerProps {
  currentStep: number;
  totalSteps: number;
  stepDescription: string;
}

export default function ProgressTracker({ 
  currentStep, 
  totalSteps, 
  stepDescription 
}: ProgressTrackerProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium">Your Progress</h3>
          <p className="text-sm text-muted-foreground">{stepDescription}</p>
        </div>
        <span className="text-sm font-medium">
          Step {currentStep} of {totalSteps}
        </span>
      </div>
      <Progress value={progress} className="h-2" />
      {progress === 100 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-green-600"
        >
          🎉 Great job! You've completed your decision tree!
        </motion.div>
      )}
    </motion.div>
  );
} 