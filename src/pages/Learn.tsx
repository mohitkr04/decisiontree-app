import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AppBar from '../components/layout/AppBar';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Separator } from '../components/ui/separator';




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
        progress: 0,
        status: "available",
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
  const [activeLevel, setActiveLevel] = useState("Introduction");

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <AppBar />
      
      <div className="container mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 sm:space-y-8"
        >
          {/* Header Section - Updated text sizes */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600">
                Learning Journey 🎓
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mt-2 font-medium">
                Master decision trees step by step
              </p>
            </div>
            <Button 
              variant="outline"
              onClick={() => navigate('/examples')}
              className="w-full sm:w-auto hover:bg-purple-100 text-base sm:text-lg"
            >
              View Examples
            </Button>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 sm:p-6 lg:p-8 shadow-md">
            <div className="flex flex-col gap-4 sm:gap-6">
              {/* Level Selection Buttons */}
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {learningLevels.map((level) => (
                  <Button
                    key={level.id}
                    variant={activeLevel === level.level ? "default" : "outline"}
                    onClick={() => setActiveLevel(level.level)}
                    className={`py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all ${
                      activeLevel === level.level 
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-sm'
                        : 'hover:bg-purple-50'
                    }`}
                  >
                    {level.level}
                    {level.level !== "Introduction" && (
                      <span className="ml-1 text-xs opacity-70">
                        {level.level === "Intermediate" ? "🔒" : ""}
                      </span>
                    )}
                  </Button>
                ))}
              </div>

              <Separator className="my-2 sm:my-4" />

              {/* Content Section */}
              <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {learningLevels
                  .find(level => level.level === activeLevel)
                  ?.sections.map((section) => (
                    <Card 
                      key={section.id} 
                      className="overflow-hidden bg-white hover:shadow-md transition-shadow"
                    >
                      <div className="p-4 sm:p-5 space-y-3 sm:space-y-4">
                        {/* Section Header */}
                        <div>
                          <h3 className="text-base sm:text-lg font-semibold">
                            {section.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {section.description}
                          </p>
                        </div>

                        {/* Content Preview */}
                        <div className="space-y-3">
                          {section.content.map((item, index) => (
                            <div 
                              key={index} 
                              className="rounded-md overflow-hidden"
                            >
                              {item.type === "video" ? (
                                <div className="aspect-video w-full">
                                  <iframe
                                    src={item.url}
                                    className="w-full h-full"
                                    allowFullScreen
                                  />
                                </div>
                              ) : (
                                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                                  {item.content}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between text-xs sm:text-sm pt-2">
                          <span className="text-muted-foreground">
                            ⏱️ {section.duration}
                          </span>
                          <Progress value={section.progress} className="w-16 sm:w-24" />
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 