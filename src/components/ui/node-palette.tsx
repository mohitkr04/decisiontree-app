import { motion } from "framer-motion";
import { NodeType } from '@/types';

const nodeTypes: NodeType[] = [
  {
    id: 'question',
    type: 'question',
    label: 'Question Node',
    description: 'Add a yes/no question'
  },
  {
    id: 'result',
    type: 'result',
    label: 'Result Node',
    description: 'Add a final classification'
  }
];

interface NodePaletteProps {
  onNodeSelect: (type: NodeType) => void;
}

export function NodePalette({ onNodeSelect }: NodePaletteProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Available Nodes</h3>
      <div className="grid gap-3">
        {nodeTypes.map(type => (
          <motion.div
            key={type.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-4 border rounded-lg cursor-pointer hover:bg-accent"
            onClick={() => onNodeSelect(type)}
          >
            <h4 className="font-medium">{type.label}</h4>
            <p className="text-sm text-muted-foreground">{type.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 