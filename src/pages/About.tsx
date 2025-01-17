import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AppBar from '../components/layout/AppBar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const features = [
  {
    title: "Interactive Learning",
    description: "Learn decision trees through fun games and visual examples! 🎮",
    icon: "🎯",
    details: "Play games like Decision Snake and take quizzes to master concepts!"
  },
  {
    title: "Fun Examples",
    description: "Explore real-life decision trees about games, health, and more! 🌟",
    icon: "🌍",
    details: "See how decisions work in daily life with interactive examples"
  },
  {
    title: "Video Lessons",
    description: "Watch engaging video tutorials about decision trees! 📺",
    icon: "🎥",
    details: "Learn from carefully selected YouTube playlists and tutorials"
  },
  {
    title: "Progress Tracking",
    description: "See how much you've learned with cool progress bars! 📊",
    icon: "📈",
    details: "Track your journey and earn achievements as you learn"
  }
];

const sections = [
  {
    title: "Learn Section 📚",
    description: "Start your adventure in the Learn section where you can:",
    points: [
      "Watch fun video tutorials about decision trees",
      "Follow step-by-step lessons at your own pace",
      "Track your progress with cool animations",
      "Earn badges as you complete lessons"
    ],
    color: "from-purple-500 to-blue-500"
  },
  {
    title: "Games Section 🎮",
    description: "Have fun while learning in our Games section:",
    points: [
      "Play the exciting Decision Snake game",
      "Test your knowledge with interactive quizzes",
      "Earn points and compete with friends",
      "Learn from mistakes with helpful explanations"
    ],
    color: "from-green-500 to-teal-500"
  },
  {
    title: "Examples Section 🌟",
    description: "Explore real-world examples that show how decision trees work:",
    points: [
      "Interactive decision trees about daily life",
      "Fun scenarios about games, health, and more",
      "Help characters make good choices",
      "See immediate results of your decisions"
    ],
    color: "from-orange-500 to-red-500"
  }
];

const credits = [
  {
    title: "Special Thanks 🙏",
    items: [
      {
        name: "Raj Sir",
        role: "Mentor",
        description: "For teaching the art of Decision Trees",
        emoji: "👨‍🏫"
      },
      {
        name: "Vizuara Team",
        role: "Inspiration",
        description: "For motivation and creative ideas",
        emoji: "💡"
      }
    ]
  },
  {
    title: "Development Team 👨‍💻",
    items: [
      {
        name: "Mohit Kumar",
        role: "Website Developer",
        description: "mohitgupta.araria@gmail.com",
        emoji: "💻"
      }
    ]
  },
  {
    title: "Technology Partners 🚀",
    items: [
      {
        name: "React & Tailwind Teams",
        role: "Framework Providers",
        description: "For amazing development tools",
        emoji: "⚛️"
      },
      {
        name: "YouTube Educational Partners",
        role: "Content Providers",
        description: "For excellent learning materials",
        emoji: "▶️"
      }
    ]
  }
];

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <AppBar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-16"
        >
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Decision Tree App! 🌳
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Your exciting journey into the world of decision trees starts here! 
              Perfect for curious minds aged 10-14 years! 🚀
            </motion.p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Card className="h-full">
                  <motion.div 
                    className="p-6 space-y-4"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-4xl">{feature.icon}</span>
                      <div>
                        <h3 className="text-xl font-bold">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">{feature.details}</p>
                  </motion.div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Sections */}
          <div className="space-y-12">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, x: index % 2 ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className={`bg-gradient-to-r ${section.color} p-6 text-white`}>
                  <h2 className="text-2xl font-bold">{section.title}</h2>
                  <p className="mt-2 opacity-90">{section.description}</p>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {section.points.map((point, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="flex items-center space-x-2"
                      >
                        <span className="text-green-500">✓</span>
                        <span>{point}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Credits Section */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              Our Amazing Team & Supporters 🌟
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {credits.map((group, index) => (
                <motion.div
                  key={group.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <Card>
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-semibold text-center">{group.title}</h3>
                      <div className="space-y-4">
                        {group.items.map((item, i) => (
                          <motion.div
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            className="text-center space-y-2"
                          >
                            <span className="text-4xl">{item.emoji}</span>
                            <h4 className="font-semibold">{item.name}</h4>
                            <p className="text-sm text-purple-600">{item.role}</p>
                            <p className="text-sm text-gray-500">{item.description}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <motion.div 
            className="text-center space-y-6 py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold">Ready to Start Your Adventure? 🚀</h2>
            <div className="flex justify-center gap-4">
              <Button
                size="lg"
                onClick={() => navigate('/learn')}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8"
              >
                Start Learning! 📚
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/games')}
                className="hover:bg-purple-50"
              >
                Play Games! 🎮
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}