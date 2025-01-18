import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Progress } from '../ui/progress';
import { useToast } from '../ui/use-toast';
import confetti from 'canvas-confetti';

type Question = {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

type Quiz = {
  id: number;
  title: string;
  description: string;
  emoji: string;
  questions: Question[];
};

const quizzes: Quiz[] = [
  {
    id: 1,
    title: "Decision Tree Basics",
    description: "Test your knowledge about decision tree fundamentals!",
    emoji: "🌳",
    questions: [
      {
        id: 1,
        text: "What is the main purpose of a decision tree?",
        options: [
          "To make random choices",
          "To help make decisions step by step",
          "To draw pretty trees",
          "To solve math problems"
        ],
        correctAnswer: 1,
        explanation: "Decision trees help us make choices by breaking down decisions into smaller steps! 🎯"
      },
      {
        id: 2,
        text: "What happens at each node of a decision tree?",
        options: [
          "We take a nap",
          "We ask a question",
          "We play a game",
          "We draw a picture"
        ],
        correctAnswer: 1,
        explanation: "At each node, we ask a question to help us make a decision! 🤔"
      },
      {
        id: 3,
        text: "What do we call the final points in a decision tree?",
        options: [
          "Leaf nodes",
          "Root nodes",
          "Branch nodes",
          "Stem nodes"
        ],
        correctAnswer: 0,
        explanation: "Leaf nodes are where we reach our final decision! 🍃"
      },
      {
        id: 4,
        text: "How many answers can a decision tree question usually have?",
        options: [
          "Only one",
          "Usually two (Yes/No)",
          "Always five",
          "Unlimited"
        ],
        correctAnswer: 1,
        explanation: "Most decision tree questions have two answers: Yes or No! ✌️"
      },
      {
        id: 5,
        text: "Why are decision trees useful?",
        options: [
          "They help us sleep better",
          "They make our food taste better",
          "They help us organize our thoughts",
          "They make us run faster"
        ],
        correctAnswer: 2,
        explanation: "Decision trees help us organize our thoughts and make better choices! 🧠"
      }
    ]
  },
  {
    id: 2,
    title: "Real-Life Decisions",
    description: "Apply decision trees to everyday situations!",
    emoji: "🎯",
    questions: [
      {
        id: 1,
        text: "What's a good first question when deciding what to wear?",
        options: [
          "Is it raining outside?",
          "What's my favorite color?",
          "Do I like pizza?",
          "Can I do a handstand?"
        ],
        correctAnswer: 0,
        explanation: "Weather is a great first thing to consider when choosing clothes! ☔"
      },
      {
        id: 2,
        text: "When deciding what to eat, what's a good starting question?",
        options: [
          "What color is my shirt?",
          "Am I hungry?",
          "Can I speak French?",
          "Do I like sports?"
        ],
        correctAnswer: 1,
        explanation: "Always start by checking if you're actually hungry! 🍽️"
      },
      {
        id: 3,
        text: "What's a good question when choosing a game to play?",
        options: [
          "Do I have homework?",
          "What's my shoe size?",
          "Do I want to play inside or outside?",
          "Can I touch my toes?"
        ],
        correctAnswer: 2,
        explanation: "Location is important when choosing activities! 🎮"
      }
    ]
  },
  {
    id: 3,
    title: "Fun with Trees",
    description: "Explore creative decision-making scenarios!",
    emoji: "🎨",
    questions: [
      {
        id: 1,
        text: "What would be a good first question for choosing a pet?",
        options: [
          "Do I have space at home?",
          "What's my favorite movie?",
          "Can I ride a bike?",
          "Do I like ice cream?"
        ],
        correctAnswer: 0,
        explanation: "Space is very important when choosing a pet! 🏠"
      },
      {
        id: 2,
        text: "When planning a birthday party, what's a good first question?",
        options: [
          "Do I like cake?",
          "How many friends can come?",
          "What's my favorite color?",
          "Can I swim?"
        ],
        correctAnswer: 1,
        explanation: "Knowing how many guests you'll have helps plan everything else! 🎉"
      },
      {
        id: 3,
        text: "What's a good question when choosing a book to read?",
        options: [
          "What's my height?",
          "Do I like vegetables?",
          "What type of story do I like?",
          "Can I juggle?"
        ],
        correctAnswer: 2,
        explanation: "Your interests help you find books you'll enjoy! 📚"
      }
    ]
  },
  {
    id: 4,
    title: "Problem Solving Hero",
    description: "Learn how to solve problems step by step!",
    emoji: "🦸‍♂️",
    questions: [
      {
        id: 1,
        text: "What's the first step in solving a big problem?",
        options: [
          "Give up immediately",
          "Break it into smaller parts",
          "Ask someone else to do it",
          "Take a nap"
        ],
        correctAnswer: 1,
        explanation: "Breaking big problems into smaller ones makes them easier to solve! 🧩"
      },
      {
        id: 2,
        text: "When stuck on a problem, what should you do first?",
        options: [
          "Take a deep breath and stay calm",
          "Panic and run away",
          "Watch TV instead",
          "Ignore it forever"
        ],
        correctAnswer: 0,
        explanation: "Staying calm helps us think clearly and find solutions! 😌"
      },
      {
        id: 3,
        text: "What's a good way to make a tough decision?",
        options: [
          "Flip a coin",
          "Make a pros and cons list",
          "Ask a magic 8 ball",
          "Choose randomly"
        ],
        correctAnswer: 1,
        explanation: "Listing pros and cons helps us make better decisions! ✍️"
      },
      {
        id: 4,
        text: "What should you do after making a decision?",
        options: [
          "Never think about it again",
          "Worry forever",
          "Learn from the results",
          "Make a new decision"
        ],
        correctAnswer: 2,
        explanation: "Learning from our decisions helps us make better ones next time! 📚"
      }
    ]
  },
  {
    id: 5,
    title: "School Decisions",
    description: "Make smart choices at school!",
    emoji: "🎒",
    questions: [
      {
        id: 1,
        text: "What's the best first question when starting homework?",
        options: [
          "Which is the most important?",
          "Which is the easiest?",
          "Which is the shortest?",
          "Which has the prettiest pictures?"
        ],
        correctAnswer: 0,
        explanation: "Starting with important tasks helps us manage our time better! ⏰"
      },
      {
        id: 2,
        text: "When you don't understand something in class, what's the best action?",
        options: [
          "Pretend you understand",
          "Ask the teacher for help",
          "Give up and doodle",
          "Take a nap"
        ],
        correctAnswer: 1,
        explanation: "Teachers are there to help - don't be afraid to ask questions! 🙋‍♂️"
      },
      {
        id: 3,
        text: "What's a good question when choosing a project partner?",
        options: [
          "Who has the coolest shoes?",
          "Who's my best friend?",
          "Who works well with others?",
          "Who has the nicest pencils?"
        ],
        correctAnswer: 2,
        explanation: "Good teamwork skills make projects more successful! 🤝"
      },
      {
        id: 4,
        text: "When is the best time to start a big project?",
        options: [
          "The day before it's due",
          "As soon as it's assigned",
          "When I feel like it",
          "Never"
        ],
        correctAnswer: 1,
        explanation: "Starting early gives us plenty of time to do our best work! 📝"
      }
    ]
  },
  {
    id: 6,
    title: "Friendship Choices",
    description: "Learn about making good friendship decisions!",
    emoji: "🤝",
    questions: [
      {
        id: 1,
        text: "What's most important in a friendship?",
        options: [
          "Having cool toys",
          "Being trustworthy",
          "Living nearby",
          "Having the same shoes"
        ],
        correctAnswer: 1,
        explanation: "Trust is the foundation of great friendships! 💫"
      },
      {
        id: 2,
        text: "If a friend is sad, what's the best first step?",
        options: [
          "Ignore them",
          "Tell everyone else",
          "Ask if they want to talk",
          "Give them candy"
        ],
        correctAnswer: 2,
        explanation: "Being there to listen shows you care about your friends! 👂"
      },
      {
        id: 3,
        text: "What should you do if friends disagree?",
        options: [
          "Never speak again",
          "Pick sides immediately",
          "Talk it out calmly",
          "Pretend it didn't happen"
        ],
        correctAnswer: 2,
        explanation: "Calm discussion helps solve disagreements! 🗣️"
      },
      {
        id: 4,
        text: "How can you be a good friend?",
        options: [
          "Always let them win",
          "Do whatever they want",
          "Be honest and supportive",
          "Give them all your toys"
        ],
        correctAnswer: 2,
        explanation: "Good friends are honest and support each other! ❤️"
      }
    ]
  },
  {
    id: 7,
    title: "Healthy Choices",
    description: "Make smart decisions about health and wellness!",
    emoji: "🏃‍♂️",
    questions: [
      {
        id: 1,
        text: "What's a good first question when planning your day?",
        options: [
          "Did I get enough sleep?",
          "What's on TV?",
          "What's my favorite color?",
          "Do I like pizza?"
        ],
        correctAnswer: 0,
        explanation: "Good sleep helps us stay healthy and focused! 😴"
      },
      {
        id: 2,
        text: "How do you choose a healthy snack?",
        options: [
          "Pick the sweetest one",
          "Choose fruits or vegetables",
          "Get the biggest one",
          "Pick the prettiest package"
        ],
        correctAnswer: 1,
        explanation: "Fruits and vegetables give us energy and nutrients! 🍎"
      },
      {
        id: 3,
        text: "What's the best way to stay active?",
        options: [
          "Watch TV all day",
          "Play video games",
          "Find fun physical activities",
          "Sleep more"
        ],
        correctAnswer: 2,
        explanation: "Moving our bodies in fun ways keeps us healthy! 🎾"
      },
      {
        id: 4,
        text: "What should you do if you feel stressed?",
        options: [
          "Keep it to yourself",
          "Talk to someone you trust",
          "Eat lots of candy",
          "Stay up all night"
        ],
        correctAnswer: 1,
        explanation: "Sharing feelings with trusted people helps us feel better! 💝"
      }
    ]
  },
  {
    id: 8,
    title: "Earth Hero",
    description: "Make eco-friendly decisions!",
    emoji: "🌍",
    questions: [
      {
        id: 1,
        text: "What's the best way to save water?",
        options: [
          "Leave the tap running",
          "Take shorter showers",
          "Fill the bathtub completely",
          "Water plants at noon"
        ],
        correctAnswer: 1,
        explanation: "Short showers help save our precious water! 💧"
      },
      {
        id: 2,
        text: "How can you help reduce waste?",
        options: [
          "Use single-use items",
          "Throw everything away",
          "Reuse and recycle",
          "Buy new things daily"
        ],
        correctAnswer: 2,
        explanation: "Reusing and recycling helps protect our planet! ♻️"
      },
      {
        id: 3,
        text: "What's a good way to save energy?",
        options: [
          "Leave lights on always",
          "Open windows while AC is on",
          "Turn off unused lights",
          "Use all appliances at once"
        ],
        correctAnswer: 2,
        explanation: "Turning off unused lights saves energy and helps Earth! 💡"
      },
      {
        id: 4,
        text: "What's best for carrying groceries?",
        options: [
          "Lots of plastic bags",
          "Reusable bags",
          "No bags at all",
          "New bags every time"
        ],
        correctAnswer: 1,
        explanation: "Reusable bags help reduce plastic waste! 🛍️"
      },
      {
        id: 5,
        text: "How can you help local wildlife?",
        options: [
          "Chase the animals",
          "Feed them junk food",
          "Protect their habitats",
          "Make loud noises"
        ],
        correctAnswer: 2,
        explanation: "Protecting habitats helps animals thrive! 🦋"
      }
    ]
  }
];

export default function QuizGame() {
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [_timeTaken, setTimeTaken] = useState<number[]>([]);
  const { toast } = useToast();

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleQuizSelect = (quiz: Quiz) => {
    setActiveQuiz(quiz);
    setQuestionStartTime(Date.now());
  };

  const handleAnswer = (answerIndex: number) => {
    const correct = answerIndex === activeQuiz?.questions[currentQuestion].correctAnswer;
    
    setAnswers(prev => [...prev, correct]);
    
    if (questionStartTime) {
      const questionTime = Date.now() - questionStartTime;
      setTimeTaken((prev: number[]) => [...prev, questionTime]);
    }
    
    if (correct) {
      setScore(s => s + 1);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      toast({
        title: "🎉 Correct!",
        description: "You're doing great! Keep going!",
      });
    } else {
      toast({
        title: "❌ Not quite right",
        description: "Let's learn from this!",
        variant: "destructive"
      });
    }

    setShowExplanation(true);
  };

  const nextQuestion = () => {
    setShowExplanation(false);
    setQuestionStartTime(Date.now());
    
    if (currentQuestion < activeQuiz!.questions.length - 1) {
      setCurrentQuestion(c => c + 1);
    } else {
      toast({
        title: "Success",
        description: "Quiz completed successfully",
        variant: "default"
      });
      
      setActiveQuiz(null);
      setCurrentQuestion(0);
      setScore(0);
      setQuestionStartTime(null);
      setTimeTaken([]);
      setAnswers([]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <AnimatePresence mode="wait">
        {!activeQuiz ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {quizzes.map(quiz => (
              <Card
                key={quiz.id}
                className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleQuizSelect(quiz)}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="space-y-4"
                >
                  <div className="text-4xl">{quiz.emoji}</div>
                  <h3 className="text-2xl font-bold">{quiz.title}</h3>
                  <p className="text-gray-600">{quiz.description}</p>
                </motion.div>
              </Card>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="p-6">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold">{activeQuiz.title}</h3>
                  <div className="flex flex-col items-end">
                    <span className="text-purple-600">
                      Question {currentQuestion + 1}/{activeQuiz.questions.length}
                    </span>
                    {questionStartTime && (
                      <span className="text-sm text-gray-500">
                        Time: {formatTime(Date.now() - questionStartTime)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Progress
                    value={(currentQuestion / activeQuiz.questions.length) * 100}
                    className="h-2"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <div className="group relative">
                      <span>
                        Score: {score}/{currentQuestion + 1}
                      </span>
                      <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black text-white text-xs rounded p-2 whitespace-nowrap">
                        ✅ Correct: {answers.filter(a => a).length}
                        <br />
                        ❌ Wrong: {answers.filter(a => !a).length}
                      </div>
                    </div>
                    <div className="group relative">
                      <span>
                        {((score / (currentQuestion + 1)) * 100).toFixed(1)}% {
                          score/(currentQuestion + 1) >= 0.8 ? '🌟' :
                          score/(currentQuestion + 1) >= 0.6 ? '😊' :
                          score/(currentQuestion + 1) >= 0.4 ? '🤔' : '📚'
                        }
                      </span>
                      <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block bg-black text-white text-xs rounded p-2 whitespace-nowrap">
                        🌟 Excellent: 80-100%
                        <br />
                        😊 Good: 60-79%
                        <br />
                        🤔 Fair: 40-59%
                        <br />
                        📚 Keep Learning: 0-39%
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xl">
                    {activeQuiz.questions[currentQuestion].text}
                  </h4>

                  <div className="grid grid-cols-1 gap-4">
                    {activeQuiz.questions[currentQuestion].options.map((option, index) => (
                      <Button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        disabled={showExplanation}
                        className={`w-full text-left p-4 ${
                          showExplanation
                            ? index === activeQuiz.questions[currentQuestion].correctAnswer
                              ? 'bg-green-500 hover:bg-green-600'
                              : 'bg-red-500 hover:bg-red-600'
                            : ''
                        }`}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>

                  {showExplanation && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-purple-50 p-4 rounded-lg"
                    >
                      <p className="text-purple-800">
                        {activeQuiz.questions[currentQuestion].explanation}
                      </p>
                      <Button
                        onClick={nextQuestion}
                        className="mt-4 w-full bg-purple-500 hover:bg-purple-600"
                      >
                        {currentQuestion < activeQuiz.questions.length - 1
                          ? "Next Question! 👉"
                          : "Finish Quiz! 🎉"}
                      </Button>
                    </motion.div>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}