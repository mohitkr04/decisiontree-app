import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AppBar from '../components/layout/AppBar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const features = [
  {
    title: "Interactive Learning",
    description: "Learn decision trees through hands-on experience and visual examples",
    icon: "🎯"
  },
  {
    title: "Game-Based Practice",
    description: "Reinforce your knowledge with fun and engaging games",
    icon: "🎮"
  },
  {
    title: "Real-World Examples",
    description: "See how decision trees are used in real-world scenarios",
    icon: "🌍"
  },
  {
    title: "Progress Tracking",
    description: "Monitor your learning journey with detailed progress tracking",
    icon: "📊"
  }
];

const teamMembers = [
  {
    name: "AI Learning Team",
    role: "Educational Content",
    avatar: "🤖",
    description: "Crafting engaging learning experiences"
  },
  {
    name: "Game Design Team",
    role: "Interactive Games",
    avatar: "🎲",
    description: "Creating fun learning challenges"
  }
];

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <AppBar />
      
      <div className="container mx-auto px-4 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              About Decision Tree Fun
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Making decision tree learning interactive, engaging, and fun for everyone
            </motion.p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Card>
                  <motion.div 
                    className="p-6 space-y-4"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-4xl">{feature.icon}</span>
                      <div>
                        <h3 className="text-xl font-semibold">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  </motion.div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Team Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <Card>
                    <motion.div 
                      className="p-6 text-center space-y-4"
                      whileHover={{ scale: 1.02 }}
                    >
                      <span className="text-4xl">{member.avatar}</span>
                      <div>
                        <h3 className="text-xl font-semibold">{member.name}</h3>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                        <p className="mt-2 text-muted-foreground">{member.description}</p>
                      </div>
                    </motion.div>
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
            <h2 className="text-3xl font-bold">Ready to Start Learning?</h2>
            <div className="flex justify-center gap-4">
              <Button
                size="lg"
                onClick={() => navigate('/learn')}
              >
                Start Learning
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/examples')}
              >
                View Examples
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}