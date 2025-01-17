import { motion } from 'framer-motion';
import { TreeNode } from '@/types';

interface DraggableNodeProps {
  node: TreeNode;
  onDragEnd: (id: string, position: { x: number; y: number }) => void;
  onClick: () => void;
  isSelected?: boolean;
  onConnectionStart: (isYesPath: boolean) => void;
  onConnectionEnd: () => void;
}

export function DraggableNode({ node, onDragEnd, onClick, isSelected, onConnectionStart, onConnectionEnd }: DraggableNodeProps) {
  return (
    <motion.div
      drag
      dragMomentum={false}
      initial={{ x: node.position?.x || 0, y: node.position?.y || 0 }}
      animate={{ 
        x: node.position?.x || 0, 
        y: node.position?.y || 0,
        scale: isSelected ? 1.05 : 1,
        boxShadow: isSelected ? '0 0 0 2px rgba(59, 130, 246, 0.5)' : 'none'
      }}
      onDragEnd={(_, info) => {
        onDragEnd(node.id, {
          x: node.position?.x + info.offset.x || info.offset.x,
          y: node.position?.y + info.offset.y || info.offset.y
        });
      }}
      className="absolute cursor-grab bg-white rounded-lg border p-4 shadow-sm hover:shadow-md transition-shadow"
      style={{ width: 200 }}
      onClick={onClick}
    >
      <div className="flex flex-col">
        <p className="text-sm font-medium">{node.question}</p>
        {node.hint && (
          <p className="text-xs text-gray-500 mt-1">{node.hint}</p>
        )}
        
        <div className="flex justify-between mt-2">
          <button
            className="text-xs text-green-600 hover:text-green-700"
            onClick={() => onConnectionStart(true)}
          >
            Yes →
          </button>
          <button
            className="text-xs text-red-600 hover:text-red-700"
            onClick={() => onConnectionStart(false)}
          >
            No →
          </button>
        </div>
      </div>
    </motion.div>
  );
} 