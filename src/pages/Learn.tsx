import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AppBar from '../components/layout/AppBar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ContentItem = {
  type: 'video' | 'text';
  title: string;
  url?: string;
  content?: string;
};

type Section = {
  id: string;
  title: string;
  description: string;
  duration: string;
  videoUrl?: string;
  progress: number;
  status: 'available' | 'locked';
  content: ContentItem[];
};

type LearningLevel = {
  id: number;
  level: string;
  sections: Section[];
};

const learningLevels = [
  {
    id: 1,
    level: "Introduction",
    sections: [
      {
        id: "intro",
        title: "What is a Decision Tree?",
        description: "Learn the basics of decision trees and how they work",
        duration: "10 mins",
        content: [
          {
            type: "text",
            title: "Basic Concepts",
            content: `A decision tree is like a flowchart that helps us make decisions. It has:
              • Nodes: Points where we ask questions
              • Branches: Paths for Yes/No answers
              • Leaf Nodes: Final points where we make our decision`
          },
          // Add more content...
        ]
      },
      // Add more sections...
    ]
  },
  {
    id: 1,
    level: "Beginner",
    sections: [
      {
        id: "b1",
        title: "Introduction to Decision Trees",
        description: "Learn the fundamentals of decision trees and their basic concepts",
        duration: "15 mins",
        videoUrl: "https://youtu.be/ZVR2Way4nwQ",
        progress: 0,
        status: "available",
        content: [
          {
            type: "video",
            title: "Introduction to Decision Trees",
            url: "https://youtube.com/embed/ZVR2Way4nwQ"
          },
          {
            type: "text",
            title: "Getting Started",
            content: "Start your journey into decision trees with this introductory video that covers the basic concepts and principles. You'll learn how decision trees work and their fundamental applications in data science."
          }
        ]
      },
      {
        id: "b2",
        title: "Decision Trees Deep Dive",
        description: "Comprehensive playlists covering decision tree concepts and implementation",
        duration: "120 mins",
        progress: 0,
        status: "available",
        content: [
          {
            type: "video",
            title: "Decision Trees Tutorial Series - Part 1",
            url: "https://youtube.com/embed/videoseries?list=PLPTV0NXA_ZSjXY1XnEmtyHN5do21KCgJR"
          },
          {
            type: "text",
            title: "What You'll Learn",
            content: "These comprehensive playlists cover everything from basic concepts to advanced implementation. The first series focuses on building fundamentals, while the second series dives deeper into practical implementations. Follow along to master decision trees step by step."
          }
        ]
      }
    ]
  },
  {
    id: 2,
    level: "Intermediate",
    sections: [
      {
        id: "i1",
        title: "Advanced Decision Tree Concepts",
        description: "Deep dive into advanced decision tree techniques and implementations",
        duration: "120 mins",
        progress: 0,
        status: "locked",
        content: [
          {
            type: "video",
            title: "Advanced Decision Tree Tutorial Series",
            url: "https://youtube.com/embed/videoseries?list=PLdKd-j64gDcC5TCZEqODMZtAotCfm5Zkh"
          },
          {
            type: "text",
            title: "Advanced Concepts",
            content: "This comprehensive playlist covers advanced decision tree concepts, optimization techniques, and real-world applications. Follow along to master advanced decision tree implementations and best practices."
          }
        ]
      }
    ]
  }
];

export default function Learn() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <AppBar />
      
      <div className="container mx-auto px-4 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold">Learning Journey</h1>
              <p className="text-muted-foreground mt-2">Master decision trees step by step</p>
            </div>
            <Button 
              variant="outline"
              onClick={() => navigate('/examples')}
            >
              View Examples
            </Button>
          </div>

          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6">
            <Tabs defaultValue="Beginner" className="w-full">
              <TabsList className="grid w-full grid-cols-2 lg:w-[400px] mb-6">
                {learningLevels.map((level) => (
                  <TabsTrigger 
                    key={level.id} 
                    value={level.level}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    {level.level}
                  </TabsTrigger>
                ))}
              </TabsList>

              {learningLevels.map((level) => (
                <TabsContent key={level.id} value={level.level} className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {level.sections.map((section) => (
                      <motion.div
                        key={section.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <Card className="overflow-hidden">
                          <motion.div 
                            className="p-6 space-y-4"
                            whileHover={{ scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <div className="flex justify-between items-start">
                              <h3 className="text-xl font-semibold">{section.title}</h3>
                              <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                                {section.duration}
                              </span>
                            </div>
                            
                            <p className="text-muted-foreground">{section.description}</p>
                            
                            {section.content.map((item, index) => (
                              <div key={index} className="mt-4">
                                {item.type === 'video' && (
                                  <div className="relative rounded-lg overflow-hidden bg-black/5 aspect-video">
                                    <iframe
                                      className="absolute inset-0 w-full h-full"
                                      src={item.url}
                                      title={item.title}
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                      allowFullScreen
                                    />
                                  </div>
                                )}
                                {item.type === 'text' && (
                                  <div className="prose prose-sm max-w-none">
                                    <h4 className="text-lg font-medium mb-2">{item.title}</h4>
                                    <p>{item.content}</p>
                                  </div>
                                )}
                              </div>
                            ))}
                            
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Progress</span>
                                <span>{section.progress}%</span>
                              </div>
                              <Progress value={section.progress} className="h-2" />
                            </div>

                            <Button 
                              className="w-full"
                              variant={section.status === 'locked' ? "secondary" : "default"}
                              disabled={section.status === 'locked'}
                            >
                              {section.status === 'locked' ? '🔒 Complete previous sections' : 'Start Learning'}
                            </Button>
                          </motion.div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">Your Progress</h2>
            <Card>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-medium">Overall Completion</span>
                  <span className="text-sm text-muted-foreground">0/5 Sections Completed</span>
                </div>
                <Progress value={0} className="h-2" />
              </div>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 