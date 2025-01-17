import { motion } from 'framer-motion';

interface TreeToolbarProps {
  onAddNode: (text: string) => void;
}

export default function TreeToolbar({ onAddNode }: TreeToolbarProps) {
  const tools = [
    { name: 'Decision', icon: '🤔' },
    { name: 'Outcome', icon: '🎯' },
    { name: 'Condition', icon: '⚡' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="font-semibold mb-4">Tools</h3>
      
      <div className="space-y-2">
        {tools.map((tool) => (
          <motion.button
            key={tool.name}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center gap-2 p-2 rounded hover:bg-gray-100"
            onClick={() => onAddNode(`New ${tool.name}`)}
          >
            <span>{tool.icon}</span>
            <span>{tool.name}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
} 