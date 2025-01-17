import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AppBar from '../components/layout/AppBar';
import { CardStack } from '../components/ui/CardStack';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const features = [
  {
    id: 1,
    name: "Decision Trees",
    designation: "Interactive Learning",
    content: "Learn how decision trees work through interactive visualizations and examples."
  },
  {
    id: 2,
    name: "Build & Create",
    designation: "Tree Builder",
    content: "Create your own decision trees with our intuitive drag-and-drop interface."
  },
  {
    id: 3,
    name: "Play & Learn",
    designation: "Games & Quizzes",
    content: "Test your knowledge with fun games and interactive quizzes."
  }
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <AppBar />
      
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 pt-24"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 space-y-6">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Welcome to Decision Tree Fun! 🌳
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Learn how to make better decisions through fun activities!
            </motion.p>
          </div>
          <motion.div 
            className="flex-1 relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <CardStack items={features} offset={10} scaleFactor={0.06} />
          </motion.div>
        </div>
      </motion.div>

      {/* Features Grid */}
      <motion.div 
        className="container mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {/* Learn Card */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Card className="group bg-background/50 backdrop-blur-sm border hover:shadow-lg transition-all duration-300">
            <motion.div className="p-6 space-y-4">
              <motion.div 
                className="flex items-center space-x-3"
                whileHover={{ x: 5 }}
              >
                <span className="text-2xl">📚</span>
                <h3 className="text-2xl font-semibold">Learn</h3>
              </motion.div>
              <p className="text-muted-foreground">Start your adventure and learn how decisions work!</p>
              <Button 
                className="w-full group-hover:bg-primary/90 transition-colors"
                onClick={() => navigate('/learn')}
              >
                Get Started
              </Button>
            </motion.div>
          </Card>
        </motion.div>

        {/* Build Card - Similar structure */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Card className="group bg-background/50 backdrop-blur-sm border hover:shadow-lg transition-all duration-300">
            <motion.div className="p-6 space-y-4">
              <motion.div 
                className="flex items-center space-x-3"
                whileHover={{ x: 5 }}
              >
                <span className="text-2xl">🎯</span>
                <h3 className="text-2xl font-semibold">Build</h3>
              </motion.div>
              <p className="text-muted-foreground">Create fun decision trees for your daily choices!</p>
              <Button 
                className="w-full group-hover:bg-primary/90 transition-colors"
                onClick={() => navigate('/build')}
              >
                Start Building
              </Button>
            </motion.div>
          </Card>
        </motion.div>

        {/* Play Card - Similar structure */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Card className="group bg-background/50 backdrop-blur-sm border hover:shadow-lg transition-all duration-300">
            <motion.div className="p-6 space-y-4">
              <motion.div 
                className="flex items-center space-x-3"
                whileHover={{ x: 5 }}
              >
                <span className="text-2xl">🎮</span>
                <h3 className="text-2xl font-semibold">Play</h3>
              </motion.div>
              <p className="text-muted-foreground">Test your knowledge with exciting games!</p>
              <Button 
                className="w-full group-hover:bg-primary/90 transition-colors"
                onClick={() => navigate('/play')}
              >
                Play Now
              </Button>
            </motion.div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Recent Activity Section */}
      <motion.div 
        className="container mx-auto px-4 py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-8">Recent Activity</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            className="bg-background/50 backdrop-blur-sm border rounded-xl p-6 hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-xl font-semibold mb-4">Your Trees</h3>
            <div className="space-y-4">
              {/* Add your recent trees list here */}
            </div>
          </motion.div>

          <motion.div 
            className="bg-background/50 backdrop-blur-sm border rounded-xl p-6 hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-xl font-semibold mb-4">Learning Progress</h3>
            <div className="space-y-4">
              {/* Add your progress indicators here */}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}