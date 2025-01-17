import { motion } from 'framer-motion';
import { useState } from 'react';

interface Template {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  format: 'PDF' | 'PNG';
}

export default function PrintableTemplates() {
  const [templates] = useState<Template[]>([
    {
      id: '1',
      title: 'Basic Decision Tree Template',
      description: 'A simple template for creating basic decision trees.',
      thumbnail: '/templates/basic.png',
      format: 'PDF'
    },
    {
      id: '2',
      title: 'Study Planning Template',
      description: 'Template designed for organizing study decisions.',
      thumbnail: '/templates/study.png',
      format: 'PDF'
    },
    {
      id: '3',
      title: 'Activity Planner Template',
      description: 'Template for planning daily activities.',
      thumbnail: '/templates/activity.png',
      format: 'PNG'
    }
  ]);

  const handleDownload = (template: Template) => {
    // Implement download logic here
    console.log(`Downloading template: ${template.title}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-8"
      >
        <h2 className="text-3xl font-bold text-blue-600 mb-6">Printable Templates</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {templates.map((template) => (
            <motion.div
              key={template.id}
              whileHover={{ scale: 1.05 }}
              className="border rounded-lg overflow-hidden"
            >
              <img
                src={template.thumbnail}
                alt={template.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold mb-2">{template.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDownload(template)}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Download {template.format}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
} 