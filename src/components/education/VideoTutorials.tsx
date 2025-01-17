import { motion } from 'framer-motion';
import { useState } from 'react';

interface Tutorial {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
  category: 'Basics' | 'Advanced' | 'Examples';
}

export default function VideoTutorials() {
  const [tutorials] = useState<Tutorial[]>([
    {
      id: '1',
      title: 'Introduction to Decision Trees',
      description: 'Learn the basics of decision trees and how they help in making choices.',
      videoUrl: 'https://www.youtube.com/embed/example1',
      duration: '5:30',
      category: 'Basics'
    },
    {
      id: '2',
      title: 'Creating Your First Decision Tree',
      description: 'Step-by-step guide to building a simple decision tree.',
      videoUrl: 'https://www.youtube.com/embed/example2',
      duration: '8:45',
      category: 'Basics'
    },
    {
      id: '3',
      title: 'Advanced Decision Making',
      description: 'Learn how to handle complex decisions with multiple branches.',
      videoUrl: 'https://www.youtube.com/embed/example3',
      duration: '10:15',
      category: 'Advanced'
    }
  ]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-8"
      >
        <h2 className="text-3xl font-bold text-blue-600 mb-6">Video Tutorials</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tutorials.map((tutorial) => (
            <motion.div
              key={tutorial.id}
              whileHover={{ scale: 1.02 }}
              className="border rounded-lg overflow-hidden"
            >
              <div className="aspect-video bg-gray-100">
                <iframe
                  src={tutorial.videoUrl}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{tutorial.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{tutorial.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 text-sm">{tutorial.duration}</span>
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">
                    {tutorial.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
} 