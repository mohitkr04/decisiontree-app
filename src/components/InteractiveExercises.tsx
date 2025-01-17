import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

interface Exercise {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  challenge: {
    scenario: string;
    questions: string[];
    correctAnswers: boolean[];
  };
}

const exercises: Exercise[] = [
  {
    id: '1',
    title: 'Animal Kingdom',
    description: 'Create a decision tree to classify different animals',
    difficulty: 'easy',
    points: 100,
    challenge: {
      scenario: "Help classify these animals: Elephant, Giraffe, Penguin, and Eagle",
      questions: [
        "Is the animal gray?",
        "Can it fly?",
        "Is it tall?"
      ],
      correctAnswers: [true, false, true]
    }
  },
  {
    id: '2',
    title: 'Weather Decisions',
    description: 'Build a tree to decide what to wear based on weather',
    difficulty: 'medium',
    points: 200,
    challenge: {
      scenario: "Help decide what to wear based on: Sunny, Rainy, Cold, and Hot days",
      questions: [
        "Is it raining?",
        "Is it cold?",
        "Is it sunny?"
      ],
      correctAnswers: [false, true, true]
    }
  }
];

export default function InteractiveExercises() {
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
  const [userAnswers, setUserAnswers] = useState<boolean[]>([]);
  const [completed, setCompleted] = useState<string[]>([]);

  const handleStartExercise = (exercise: Exercise) => {
    setCurrentExercise(exercise);
    setUserAnswers([]);
    toast({
      title: "Challenge Started! 🎯",
      description: exercise.description
    });
  };

  const handleAnswer = (answer: boolean) => {
    if (!currentExercise) return;

    const newAnswers = [...userAnswers, answer];
    setUserAnswers(newAnswers);

    if (newAnswers.length === currentExercise.challenge.questions.length) {
      const isCorrect = newAnswers.every(
        (ans, index) => ans === currentExercise.challenge.correctAnswers[index]
      );

      if (isCorrect) {
        setCompleted([...completed, currentExercise.id]);
        toast({
          title: "Excellent work! 🎉",
          description: `You've earned ${currentExercise.points} points!`
        });
      } else {
        toast({
          title: "Keep trying! 💪",
          description: "Review your answers and try again.",
          variant: "destructive"
        });
      }

      setCurrentExercise(null);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Practice Challenges 🎯</h2>

      {!currentExercise ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exercises.map((exercise) => (
            <motion.div
              key={exercise.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={`p-6 cursor-pointer ${
                  completed.includes(exercise.id)
                    ? 'bg-green-50'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => handleStartExercise(exercise)}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold">{exercise.title}</h3>
                  <span className={`
                    px-2 py-1 rounded-full text-xs
                    ${exercise.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                      exercise.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'}
                  `}>
                    {exercise.difficulty}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {exercise.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm">🏆 {exercise.points} points</span>
                  {completed.includes(exercise.id) && (
                    <span className="text-green-600">✅ Completed</span>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">{currentExercise.title}</h3>
          <p className="mb-6">{currentExercise.challenge.scenario}</p>
          
          {userAnswers.length < currentExercise.challenge.questions.length && (
            <div className="space-y-4">
              <p className="font-medium">
                {currentExercise.challenge.questions[userAnswers.length]}
              </p>
              <div className="flex gap-4">
                <Button
                  onClick={() => handleAnswer(true)}
                  className="flex-1 bg-green-500 hover:bg-green-600"
                >
                  Yes
                </Button>
                <Button
                  onClick={() => handleAnswer(false)}
                  className="flex-1 bg-red-500 hover:bg-red-600"
                >
                  No
                </Button>
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
} 