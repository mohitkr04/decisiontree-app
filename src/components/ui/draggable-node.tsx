import { motion } from 'framer-motion';
import { TreeNode } from '@/types';

interface DraggableNodeProps {
  key: string;
  node: TreeNode;
  onDragEnd: (id: string, position: { x: number; y: number }) => void;
  onClick: () => void;
  isSelected: boolean;
  onConnectionStart: (isYesPath: boolean) => void;
  onConnectionEnd: () => void;
}

export function DraggableNode({
  node,
  onDragEnd,
  onClick,
  isSelected,
  onConnectionStart
}: DraggableNodeProps) {
  const isQuestion = node.type === 'question';
  const hasContent = Boolean(node.content);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Only trigger onClick if this is the correct type of node
    if ((isQuestion && !hasContent) || (!isQuestion && !hasContent)) {
      onClick();
    }
  };

  return (
    <motion.div
      id={`node-${node.id}`}
      drag
      dragMomentum={false}
      whileHover={{ scale: 1.02 }}
      whileDrag={{ scale: 1.05 }}
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
      onClick={handleClick}
      className={`absolute cursor-pointer ${
        isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''
      } ${
        isQuestion 
          ? 'bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200' 
          : 'bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200'
      } rounded-lg shadow-sm p-4 min-w-[180px] max-w-[220px] transition-all duration-200`}
    >
      <div className="flex flex-col items-center gap-2">
        {/* Question Node Content */}
        {isQuestion && (
          <>
            <div className="text-2xl">
              {hasContent ? '🤔' : '❓'}
            </div>
            <div className="w-full text-center">
              <p className="font-medium text-sm text-gray-800 break-words">
                {hasContent ? node.content : 'Add Question'}
              </p>
            </div>
            {isSelected && hasContent && (
              <div className="flex gap-2 mt-1">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-full text-xs font-medium shadow-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onConnectionStart(true);
                  }}
                >
                  Yes 👍
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-full text-xs font-medium shadow-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onConnectionStart(false);
                  }}
                >
                  No 👎
                </motion.button>
              </div>
            )}
          </>
        )}

        {/* Answer Node Content */}
        {!isQuestion && (
          <>
            <div className="text-2xl">
              {hasContent ? '🎯' : '✨'}
            </div>
            <div className="w-full text-center">
              <p className="font-medium text-sm text-gray-800 break-words">
                {hasContent ? node.content : 'Add Answer'}
              </p>
            </div>
          </>
        )}

        {/* Edit indicator for empty nodes */}
        {isSelected && !hasContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute -top-1 -right-1 bg-blue-500 text-white p-1 rounded-full text-xs"
          >
            ✏️
          </motion.div>
        )}
      </div>
    </motion.div>
  );
} 