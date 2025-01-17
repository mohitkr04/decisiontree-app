import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface Step {
  title: string;
  description: string;
  completed: boolean;
}

interface ProgressTrackerProps {
  steps: Step[];
  currentStep: number;
}

export function ProgressTracker({ steps, currentStep }: ProgressTrackerProps) {
  return (
    <div className="py-4">
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="relative">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step.completed
                    ? 'bg-primary text-primary-foreground'
                    : index === currentStep
                    ? 'bg-primary/20 text-primary'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {step.completed ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  index + 1
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`absolute top-1/2 left-full w-full h-0.5 -translate-y-1/2 ${
                    step.completed ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              )}
            </div>
            <div className="mt-2 text-center">
              <p className="font-medium text-sm">{step.title}</p>
              <p className="text-xs text-muted-foreground">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 