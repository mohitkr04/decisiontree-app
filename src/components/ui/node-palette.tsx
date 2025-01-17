import { motion } from "framer-motion";
import { NodeType } from '@/types';

interface NodePaletteProps {
  onNodeSelect: (type: NodeType) => void;
}

export function NodePalette({ onNodeSelect }: NodePaletteProps) {
  const nodeTypes = [
    {
      id: 'question',
      type: 'question' as NodeType,
      label: 'Question Box',
      description: 'Ask a yes/no question',
      icon: '❓',
      color: 'from-blue-100 to-blue-200'
    },
    {
      id: 'answer',
      type: 'answer' as NodeType,
      label: 'Answer Box',
      description: 'Show the final answer',
      icon: '✨',
      color: 'from-green-100 to-green-200'
    }
  ];

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg">
      <h3 className="text-lg font-bold mb-3">Magic Boxes ✨</h3>
      <div className="grid gap-3">
        {nodeTypes.map(type => (
          <motion.div
            key={type.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-3 rounded-lg cursor-pointer bg-gradient-to-br ${type.color} 
              shadow-sm hover:shadow-md transition-all`}
            onClick={() => onNodeSelect(type.type)}
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">{type.icon}</span>
              <div>
                <h4 className="font-medium text-sm">{type.label}</h4>
                <p className="text-xs text-gray-600">{type.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 