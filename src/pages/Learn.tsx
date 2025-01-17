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
      
      <div className="container mx-auto px-4 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                Learning Journey 🎓
              </h1>
              <p className="text-muted-foreground mt-2">Master decision trees step by step</p>
            </div>
            <Button 
              variant="outline"
              onClick={() => navigate('/examples')}
              className="hover:bg-purple-100"
            >
              View Examples
            </Button>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg">
            <div className="flex flex-col gap-6">
              {/* Level Selection Buttons */}
              <div className="flex gap-4 mb-4">
                {learningLevels.map((level) => (
                  <Button
                    key={level.id}
                    variant={activeLevel === level.level ? "default" : "outline"}
                    onClick={() => setActiveLevel(level.level)}
                    className={`flex-1 py-6 text-lg font-semibold transition-all ${
                      activeLevel === level.level 
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                        : 'hover:bg-purple-50'
                    }`}
                  >
                    {level.level}
                    {level.level !== "Introduction" && (
                      <span className="ml-2 text-sm opacity-70">
                        {level.level === "Intermediate" ? "🔒" : ""}
                      </span>
                    )}
                  </Button>
                ))}
              </div>

              <Separator className="my-4" />

              {/* Content Section */}
              <div className="space-y-8">
                {learningLevels
                  .find(level => level.level === activeLevel)
                  ?.sections.map((section) => (
                    <Card key={section.id} className="overflow-hidden bg-white">
                      <div className="p-6 space-y-6">
                        {/* Section Header */}
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-2xl font-semibold">{section.title}</h3>
                            <p className="text-muted-foreground mt-2">{section.description}</p>
                          </div>
                          <span className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                            {section.duration}
                          </span>
                        </div>

                        {/* Content Items */}
                        <div className="space-y-6">
                          {section.content.map((item, index) => (
                            <div key={index} className="rounded-lg">
                              {item.type === 'video' && (
                                <div className="space-y-4">
                                  <h4 className="text-lg font-medium">{item.title}</h4>
                                  <div className="aspect-video rounded-lg overflow-hidden border-2 border-purple-100">
                                    <iframe
                                      className="w-full h-full"
                                      src={item.url}
                                      title={item.title}
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                      allowFullScreen={true}
                                    />
                                  </div>
                                </div>
                              )}
                              {item.type === 'text' && (
                                <div className="prose prose-purple max-w-none bg-purple-50/50 rounded-lg p-6">
                                  <h4 className="text-lg font-medium mb-3">{item.title}</h4>
                                  <p className="text-gray-700 whitespace-pre-line">{item.content}</p>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Progress Section */}
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">Progress</span>
                            <span className="text-purple-600">{section.progress}%</span>
                          </div>
                          <Progress 
                            value={section.progress} 
                            className="h-2 bg-purple-100" 
                          />
                        </div>

                        {/* Action Button */}
                        <Button 
                          className={`w-full py-6 text-lg ${
                            section.status === 'locked' 
                              ? 'bg-gray-100 text-gray-500' 
                              : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                          }`}
                          disabled={section.status === 'locked'}
                        >
                          {section.status === 'locked' 
                            ? '🔒 Complete previous sections first' 
                            : '▶️ Start Learning'}
                        </Button>
                      </div>
                    </Card>
                  ))}
              </div>
            </div>
          </div>

          {/* Overall Progress Card */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-medium">Overall Progress</span>
                <span className="text-sm text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                  0/5 Sections Completed
                </span>
              </div>
              <Progress value={0} className="h-3 bg-purple-100" />
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
} 