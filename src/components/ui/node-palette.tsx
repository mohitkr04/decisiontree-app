import { motion } from "framer-motion";
import { NodeType } from '@/types';

interface NodePaletteProps {
  onNodeSelect: (type: NodeType) => void;
}

export function NodePalette({ onNodeSelect }: NodePaletteProps) {
  const nodeTypes = [
    {
      id: 'question',
      type: 'question',
      label: 'Question Box',
      description: 'Ask a yes/no question',
      icon: '🤔',
      color: 'from-blue-100 to-blue-200'
    },
    {
      id: 'result',
      type: 'result',
      label: 'Answer Box',
      description: 'Show the final answer',
      icon: '🎯',
      color: 'from-green-100 to-green-200'
    }
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold mb-4">Magic Boxes ✨</h3>
      <div className="grid gap-4">
        {nodeTypes.map(type => (
          <motion.div
            key={type.id}
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            className={`p-4 rounded-xl cursor-pointer bg-gradient-to-br ${type.color} 
              shadow-md hover:shadow-lg transition-all`}
            onClick={() => onNodeSelect(type)}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{type.icon}</span>
              <div>
                <h4 className="font-bold">{type.label}</h4>
                <p className="text-sm text-gray-600">{type.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 