import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AppBar from '../components/layout/AppBar';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useToast } from "../components/ui/use-toast";
import confetti from 'canvas-confetti';
import { ArrowLeft } from 'lucide-react';

// Define the example trees with emojis and kid-friendly content
const exampleTrees = [
  {
    id: "health",
    title: "Health Journey 🏃‍♂️",
    description: "Let's find out if your lifestyle is healthy!",
    emoji: "❤️",
    theme: "from-green-100 to-blue-100",
    nodes: [
      {
        id: "root",
        question: "Do you maintain a balanced diet? 🥗",
        yesPath: "exercise",
        noPath: "junkfood",
        hint: "Think about fruits, vegetables, and healthy foods!",
        animation: "bounce"
      },
      {
        id: "exercise",
        question: "Do you exercise regularly? 🏃‍♂️",
        yesPath: "habits",
        noPath: "checkups",
        hint: "Running, playing sports, or dancing counts!",
        animation: "jump"
      },
      {
        id: "habits",
        question: "Do you avoid unhealthy habits? 🚭",
        yesPath: "great-health",
        noPath: "moderate-health",
        hint: "Think about good habits vs bad habits",
        animation: "shake"
      },
      {
        id: "great-health",
        isLeaf: true,
        question: "Wonderful! Your health is Great! 🌟",
        result: "Keep up the amazing work! You're taking great care of yourself!",
        celebration: true
      },
      // Add more nodes following the health roadmap...
    ]
  },
  {
    id: "sleep",
    title: "Sleep Detective 😴",
    description: "Discover your sleep patterns!",
    emoji: "🌙",
    theme: "from-indigo-100 to-purple-100",
    nodes: [
      {
        id: "root",
        question: "Do you go to bed before 10 PM? 🕙",
        yesPath: "uninterrupted",
        noPath: "midnight",
        hint: "Think about when you usually start getting ready for bed!",
        animation: "swing"
      },
      {
        id: "uninterrupted",
        question: "Do you sleep without waking up for 7-8 hours? 💤",
        yesPath: "early-restful",
        noPath: "refreshed",
        hint: "Count the hours from when you fall asleep until you wake up",
        animation: "float"
      },
      {
        id: "refreshed",
        question: "Do you wake up feeling fresh? 🌅",
        yesPath: "early-disrupted",
        noPath: "poor-sleep",
        hint: "How do you feel when you first wake up?",
        animation: "bounce"
      },
      {
        id: "midnight",
        question: "Do you go to bed before midnight? 🌜",
        yesPath: "wake-time",
        noPath: "very-late",
        hint: "Is it still today when you go to sleep?",
        animation: "pulse"
      },
      {
        id: "wake-time",
        question: "Do you wake up after 8 AM? ⏰",
        yesPath: "late-prolonged",
        noPath: "late-short",
        hint: "What time does your day usually start?",
        animation: "shake"
      },
      // Leaf nodes with results
      {
        id: "early-restful",
        isLeaf: true,
        question: "Perfect Sleep Pattern! 🌟",
        result: "You have amazing sleep habits! Your body and mind thank you! 🎉",
        celebration: true
      },
      {
        id: "early-disrupted",
        isLeaf: true,
        question: "Good but Interrupted Sleep 😊",
        result: "Your sleep timing is good, but try to reduce interruptions! 💫",
        celebration: true
      },
      {
        id: "poor-sleep",
        isLeaf: true,
        question: "Sleep Needs Improvement 💝",
        result: "Try to create a better bedtime routine for more restful sleep! 🌙",
        celebration: false
      },
      {
        id: "late-prolonged",
        isLeaf: true,
        question: "Late but Long Sleep 😴",
        result: "Try going to bed earlier for better sleep quality! ⭐",
        celebration: false
      },
      {
        id: "late-short",
        isLeaf: true,
        question: "Short Sleep Pattern 😮",
        result: "Your body needs more rest! Aim for earlier bedtime! 🌙",
        celebration: false
      },
      {
        id: "very-late",
        isLeaf: true,
        question: "Very Late Sleep Pattern 🌑",
        result: "Time to create a better sleep schedule! Your health is important! 💖",
        celebration: false
      }
    ]
  },
  {
    id: "sports",
    title: "Sports Explorer 🏃‍♀️",
    description: "Find your perfect sport!",
    emoji: "⚽",
    theme: "from-green-100 to-yellow-100",
    nodes: [
      {
        id: "root",
        question: "Do you like playing in structured places? 🏟️",
        yesPath: "indoor-games",
        noPath: "outdoor-activities",
        hint: "Think about whether you prefer being inside or outside!",
        animation: "bounce"
      },
      {
        id: "indoor-games",
        question: "Do you enjoy board games or table tennis? 🏓",
        yesPath: "indoor-result",
        noPath: "yoga-gym",
        hint: "These are games you can play inside!",
        animation: "slide"
      },
      {
        id: "yoga-gym",
        question: "Do you like yoga or gymnastics? 🧘‍♀️",
        yesPath: "indoor-active",
        noPath: "uncertain",
        hint: "Think about stretching and body movement activities!",
        animation: "float"
      },
      {
        id: "outdoor-activities",
        question: "Do you like running or cycling? 🚴‍♂️",
        yesPath: "outdoor-solo",
        noPath: "team-sports",
        hint: "These are activities you do by yourself outside!",
        animation: "run"
      },
      {
        id: "team-sports",
        question: "Do you enjoy team sports like soccer or cricket? ⚽",
        yesPath: "outdoor-team",
        noPath: "not-interested",
        hint: "Think about playing with others in a team!",
        animation: "jump"
      },
      // Leaf nodes with results
      {
        id: "indoor-result",
        isLeaf: true,
        question: "You're an Indoor Game Master! 🎯",
        result: "You'll excel at indoor sports like table tennis, chess, or carrom! 🏆",
        celebration: true
      },
      {
        id: "indoor-active",
        isLeaf: true,
        question: "You're a Flexible Athlete! 🤸‍♀️",
        result: "Yoga, gymnastics, or dance would be perfect for you! ⭐",
        celebration: true
      },
      {
        id: "outdoor-solo",
        isLeaf: true,
        question: "You're a Solo Sports Star! 🌟",
        result: "Running, cycling, or swimming would be great for you! 🏃‍♂️",
        celebration: true
      },
      {
        id: "outdoor-team",
        isLeaf: true,
        question: "You're a Team Player! ⚽",
        result: "Soccer, cricket, or basketball would be perfect for you! 🏆",
        celebration: true
      },
      {
        id: "uncertain",
        isLeaf: true,
        question: "Still Exploring! 🔍",
        result: "Try different sports to find what you enjoy most! 💫",
        celebration: true
      },
      {
        id: "not-interested",
        isLeaf: true,
        question: "Different Interests! 🎨",
        result: "Maybe you prefer art, music, or other creative activities! 🎵",
        celebration: true
      }
    ]
  },
  {
    id: "food",
    title: "Food Explorer 🍎",
    description: "Let's check your eating habits!",
    emoji: "🥗",
    theme: "from-red-100 to-green-100",
    nodes: [
      {
        id: "root",
        question: "Do you eat fruits and veggies every day? 🥕",
        yesPath: "drinks",
        noPath: "processed",
        hint: "Think about colorful foods like apples, carrots, and broccoli!",
        animation: "bounce"
      },
      {
        id: "drinks",
        question: "Do you avoid sugary drinks? 🥤",
        yesPath: "very-healthy",
        noPath: "moderately-healthy",
        hint: "Think about sodas and sweetened beverages!",
        animation: "shake"
      },
      {
        id: "processed",
        question: "Do you eat lots of packaged snacks? 🍪",
        yesPath: "unhealthy",
        noPath: "home-cooked",
        hint: "Think about chips, cookies, and ready-to-eat snacks",
        animation: "wiggle"
      },
      {
        id: "home-cooked",
        question: "Do you eat home-cooked meals? 🍳",
        yesPath: "moderately-healthy",
        noPath: "needs-improvement",
        hint: "Think about meals made in your kitchen!",
        animation: "pulse"
      },
      {
        id: "very-healthy",
        isLeaf: true,
        question: "Amazing Food Choices! 🌟",
        result: "You're a super healthy eater! Keep nourishing your body! 🥗",
        celebration: true
      },
      {
        id: "moderately-healthy",
        isLeaf: true,
        question: "Pretty Good Eating Habits! 👍",
        result: "You're doing well! Just a few small changes can make you even healthier! 🌱",
        celebration: true
      },
      {
        id: "unhealthy",
        isLeaf: true,
        question: "Time for Some Changes! 💪",
        result: "Try adding more fresh foods to your meals! Your body will thank you! 🍎",
        celebration: false
      },
      {
        id: "needs-improvement",
        isLeaf: true,
        question: "Let's Get Healthier! 🌱",
        result: "Start with small changes like eating more fruits and vegetables! 🥕",
        celebration: false
      }
    ]
  },
  {
    id: "games",
    title: "Gaming Guide 🎮",
    description: "Let's explore your gaming habits!",
    emoji: "🎲",
    theme: "from-blue-100 to-pink-100",
    nodes: [
      {
        id: "root",
        question: "Do you play less than 2 hours daily? ⏰",
        yesPath: "educational",
        noPath: "stress",
        hint: "Think about how much time you spend gaming each day",
        animation: "pulse"
      },
      {
        id: "educational",
        question: "Do you play educational games? 📚",
        yesPath: "great-gaming",
        noPath: "strategy",
        hint: "Games that help you learn new things!",
        animation: "bounce"
      },
      {
        id: "strategy",
        question: "Do you play strategy games? 🧩",
        yesPath: "good-gaming",
        noPath: "recreational",
        hint: "Games where you need to plan and think carefully!",
        animation: "float"
      },
      {
        id: "stress",
        question: "Do you feel stressed while gaming? 😓",
        yesPath: "needs-break",
        noPath: "check-responsibilities",
        hint: "Think about how you feel during and after playing",
        animation: "shake"
      },
      {
        id: "check-responsibilities",
        question: "Do you finish homework before gaming? 📝",
        yesPath: "balanced-gaming",
        noPath: "needs-balance",
        hint: "Think about your daily tasks and priorities",
        animation: "wiggle"
      },
      {
        id: "great-gaming",
        isLeaf: true,
        question: "Excellent Gaming Habits! 🌟",
        result: "You're using games to learn and have fun! Perfect balance! 🎯",
        celebration: true
      },
      {
        id: "good-gaming",
        isLeaf: true,
        question: "Good Gaming Balance! 👍",
        result: "You're developing strategic thinking while having fun! 🧠",
        celebration: true
      },
      {
        id: "balanced-gaming",
        isLeaf: true,
        question: "Well-Balanced Gaming! ⚖️",
        result: "You know how to manage your time and have fun! 🎮",
        celebration: true
      },
      {
        id: "needs-break",
        isLeaf: true,
        question: "Time for a Gaming Break! 🌅",
        result: "Try some other fun activities to reduce stress! 🎨",
        celebration: false
      },
      {
        id: "needs-balance",
        isLeaf: true,
        question: "Let's Find Balance! ⚖️",
        result: "Try finishing your tasks before gaming - you'll enjoy it more! 📚",
        celebration: false
      }
    ]
  },
  {
    id: "study",
    title: "Study Buddy 📚",
    description: "Discover your study style!",
    emoji: "✏️",
    theme: "from-yellow-100 to-orange-100",
    nodes: [
      {
        id: "root",
        question: "Do you follow a study schedule? 📅",
        yesPath: "breaks",
        noPath: "environment",
        hint: "Think about having specific times for studying!",
        animation: "bounce"
      },
      {
        id: "breaks",
        question: "Do you take short breaks while studying? ⏸️",
        yesPath: "focused-efficient",
        noPath: "focused-strain",
        hint: "Taking breaks helps your brain remember better!",
        animation: "float"
      },
      {
        id: "environment",
        question: "Do you study in a quiet place? 🤫",
        yesPath: "unfocused-productive",
        noPath: "unfocused-inefficient",
        hint: "Think about where you usually study!",
        animation: "pulse"
      },
      {
        id: "focused-efficient",
        isLeaf: true,
        question: "Super Study Star! 🌟",
        result: "You have excellent study habits! Keep up the great work! 📚✨",
        celebration: true
      },
      {
        id: "focused-strain",
        isLeaf: true,
        question: "Almost Perfect! 💫",
        result: "Try taking short breaks to help your brain stay fresh! 🧠",
        celebration: true
      },
      {
        id: "unfocused-productive",
        isLeaf: true,
        question: "Good Environment! 📖",
        result: "Try making a schedule to become even better at studying! ⏰",
        celebration: true
      },
      {
        id: "unfocused-inefficient",
        isLeaf: true,
        question: "Time to Improve! 💪",
        result: "Find a quiet study spot and make a schedule - you can do it! 🎯",
        celebration: false
      }
    ]
  },
  {
    id: "family",
    title: "Family Time ❤️",
    description: "Explore family relationships!",
    emoji: "👨‍👩‍👧‍👦",
    theme: "from-pink-100 to-red-100",
    nodes: [
      {
        id: "root",
        question: "Do you talk openly with your family? 💭",
        yesPath: "quality-time",
        noPath: "conflicts",
        hint: "Think about sharing your thoughts and feelings!",
        animation: "heartbeat"
      },
      {
        id: "quality-time",
        question: "Do you spend fun time together? 🎮",
        yesPath: "supportive-nurturing",
        noPath: "supportive-distant",
        hint: "Like playing games or having meals together!",
        animation: "bounce"
      },
      {
        id: "conflicts",
        question: "Do you have lots of arguments? 😟",
        yesPath: "challenging",
        noPath: "neutral",
        hint: "Think about how often you disagree",
        animation: "shake"
      },
      {
        id: "supportive-nurturing",
        isLeaf: true,
        question: "Amazing Family Bond! 🌟",
        result: "Your family relationship is wonderful! Keep sharing and caring! ❤️",
        celebration: true
      },
      {
        id: "supportive-distant",
        isLeaf: true,
        question: "Good but Could Be Better! 💫",
        result: "Try planning more fun activities together! 🎲",
        celebration: true
      },
      {
        id: "challenging",
        isLeaf: true,
        question: "Time to Talk! 🗣️",
        result: "Try sharing your feelings calmly and listen to others! 🤝",
        celebration: false
      },
      {
        id: "neutral",
        isLeaf: true,
        question: "Room for Growth! 🌱",
        result: "Start small conversations and share more with your family! 💝",
        celebration: true
      }
    ]
  },
  {
    id: "playing",
    title: "Play Time 🎯",
    description: "What's your play style?",
    emoji: "🎪",
    theme: "from-purple-100 to-blue-100",
    nodes: [
      {
        id: "root",
        question: "Do you like moving around while playing? 🏃‍♂️",
        yesPath: "outdoor",
        noPath: "virtual",
        hint: "Think about active vs. sitting games!",
        animation: "jump"
      },
      {
        id: "outdoor",
        question: "Do you enjoy outdoor games? 🌳",
        yesPath: "physical-energetic",
        noPath: "physical-relaxing",
        hint: "Like running, jumping, or playing in the park!",
        animation: "bounce"
      },
      {
        id: "virtual",
        question: "Do you enjoy video games? 🎮",
        yesPath: "virtual-strategic",
        noPath: "minimal-play",
        hint: "Games on computer, phone, or console!",
        animation: "float"
      },
      {
        id: "physical-energetic",
        isLeaf: true,
        question: "Active Player! 🌟",
        result: "You love energetic games - great for your health! 🏃‍♂️",
        celebration: true
      },
      {
        id: "physical-relaxing",
        isLeaf: true,
        question: "Calm Player! 🌅",
        result: "You enjoy peaceful physical activities - that's great! 🧘‍♂️",
        celebration: true
      },
      {
        id: "virtual-strategic",
        isLeaf: true,
        question: "Strategic Gamer! 🎮",
        result: "You enjoy thinking games - keep challenging your mind! 🧠",
        celebration: true
      },
      {
        id: "minimal-play",
        isLeaf: true,
        question: "Time to Explore! 🔍",
        result: "Try different types of play to find what you enjoy most! 🎨",
        celebration: true
      }
    ]
  }
];

export default function Examples() {
  const { toast } = useToast();
  const [activeExample, setActiveExample] = useState<typeof exampleTrees[0] | null>(null);
  const [currentNode, setCurrentNode] = useState<string>('root');
  const [showHint, setShowHint] = useState(false);

  const handleStartExample = (example: typeof exampleTrees[0]) => {
    setActiveExample(example);
    setCurrentNode('root');
    toast({
      title: `🎮 Let's Play: ${example.title}`,
      description: "Follow the questions and learn something new!",
    });
  };

  const handleAnswer = (answer: 'yes' | 'no') => {
    if (!activeExample) return;
    
    const node = activeExample.nodes.find(n => n.id === currentNode);
    if (!node) return;

    const nextNodeId = answer === 'yes' ? node.yesPath : node.noPath;
    if (!nextNodeId) return;

    setCurrentNode(nextNodeId);
    setShowHint(false);

    const nextNode = activeExample.nodes.find(n => n.id === nextNodeId);
    
    if (nextNode?.isLeaf) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      toast({
        title: "🎉 You Did It!",
        description: "You've reached the end of this journey!",
      });
    } else {
      toast({
        title: answer === 'yes' ? "👍 Yes!" : "👎 No!",
        description: nextNode?.hint || "Let's continue!",
      });
    }
  };

  const handleBackToExamples = () => {
    setActiveExample(null);
    setCurrentNode('root');
    setShowHint(false);
    toast({
      title: "👋 See You Later!",
      description: "Try another fun example to learn more!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <AppBar />
      <div className="container mx-auto px-4 pt-24">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {activeExample && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center"
              >
                <Button
                  variant="ghost"
                  className="group flex items-center gap-2 text-gray-600 hover:text-gray-900"
                  onClick={handleBackToExamples}
                >
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  <span>Back to Examples</span>
                </Button>
              </motion.div>
            )}

            <div className="text-center">
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                Fun Decision Trees! 🌳
              </h1>
              <p className="text-xl text-gray-600 mt-2">
                Pick a topic and let's learn together! 🚀
              </p>
            </div>

            {!activeExample ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {exampleTrees.map((example) => (
                  <motion.div
                    key={example.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card 
                      className={`p-6 cursor-pointer bg-gradient-to-br ${example.theme} 
                        hover:shadow-lg transition-all duration-300`}
                      onClick={() => handleStartExample(example)}
                    >
                      <div className="text-4xl mb-3">{example.emoji}</div>
                      <h2 className="text-2xl font-semibold mb-2">{example.title}</h2>
                      <p className="text-gray-600">{example.description}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="max-w-2xl mx-auto"
              >
                {/* Active Example Content */}
                <Card className="p-8 bg-white/90 backdrop-blur-sm shadow-xl">
                  <div className="space-y-6 text-center">
                    <motion.div
                      key={currentNode}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                    >
                      <h2 className="text-2xl font-semibold mb-4">
                        {activeExample.nodes.find(n => n.id === currentNode)?.question}
                      </h2>
                      
                      {!activeExample.nodes.find(n => n.id === currentNode)?.isLeaf ? (
                        <div className="space-y-4">
                          <div className="flex justify-center gap-4">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="px-6 py-3 bg-green-500 text-white rounded-full font-medium shadow-lg hover:bg-green-600 transition-colors"
                              onClick={() => handleAnswer('yes')}
                            >
                              Yes! 👍
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="px-6 py-3 bg-red-500 text-white rounded-full font-medium shadow-lg hover:bg-red-600 transition-colors"
                              onClick={() => handleAnswer('no')}
                            >
                              No! 👎
                            </motion.button>
                          </div>
                          
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="text-blue-500 hover:text-blue-600"
                            onClick={() => setShowHint(!showHint)}
                          >
                            {showHint ? "Hide Hint 🙈" : "Need a Hint? 💡"}
                          </motion.button>
                          
                          {showHint && (
                            <motion.div
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-gray-600 italic"
                            >
                              {activeExample.nodes.find(n => n.id === currentNode)?.hint}
                            </motion.div>
                          )}
                        </div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="space-y-4"
                        >
                          <p className="text-xl text-gray-700">
                            {activeExample.nodes.find(n => n.id === currentNode)?.result}
                          </p>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="px-6 py-3 bg-purple-500 text-white rounded-full font-medium shadow-lg hover:bg-purple-600 transition-colors"
                            onClick={() => setActiveExample(null)}
                          >
                            Try Another Topic! 🚀
                          </motion.button>
                        </motion.div>
                      )}
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
