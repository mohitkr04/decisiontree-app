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

export function DraggableNode({
  node,
  onDragEnd,
  onClick,
  isSelected,
  onConnectionStart,
  onConnectionEnd
}: DraggableNodeProps) {
  const isQuestion = node.type === 'question';

  return (
    <motion.div
      id={`node-${node.id}`}
      drag
      dragMomentum={false}
      whileHover={{ scale: 1.05 }}
      whileDrag={{ scale: 1.1 }}
      initial={{ x: node.position?.x || 0, y: node.position?.y || 0 }}
      animate={{
        x: node.position?.x || 0,
        y: node.position?.y || 0,
      }}
      onDragEnd={(_, info) => {
        onDragEnd(node.id, {
          x: (node.position?.x || 0) + info.offset.x,
          y: (node.position?.y || 0) + info.offset.y
        });
      }}
      onClick={onClick}
      className={`absolute cursor-pointer ${
        isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''
      } ${
        isQuestion 
          ? 'bg-gradient-to-br from-blue-50 to-blue-100' 
          : 'bg-gradient-to-br from-green-50 to-green-100'
      } rounded-xl shadow-lg p-6 min-w-[250px] max-w-[300px] transition-all duration-200`}
    >
      <div className="flex flex-col items-center gap-3">
        <div className="text-3xl">
          {isQuestion ? '🤔' : '🎯'}
        </div>
        
        <div className="w-full text-center">
          <p className="font-medium text-gray-800 break-words mb-3">
            {node.content || (isQuestion ? 'Click to add question' : 'Click to add answer')}
          </p>
        </div>

        {isQuestion && (
          <div className="flex gap-3 mt-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full text-sm font-medium shadow-md"
              onClick={(e) => {
                e.stopPropagation();
                onConnectionStart(true);
              }}
            >
              Yes! 👍
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full text-sm font-medium shadow-md"
              onClick={(e) => {
                e.stopPropagation();
                onConnectionStart(false);
              }}
            >
              No! 👎
            </motion.button>
          </div>
        )}

        {isSelected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute -top-2 -right-2 bg-blue-500 text-white p-1 rounded-full"
          >
            ✏️
          </motion.div>
        )}
      </div>
    </motion.div>
  );
} 