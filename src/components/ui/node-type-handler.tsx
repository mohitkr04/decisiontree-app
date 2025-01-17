import { TreeNode } from '@/types';

interface NodeTypeHandlerProps {
  node: TreeNode;
  onEdit: (content: string) => void;
}

export function NodeTypeHandler({ node, onEdit }: NodeTypeHandlerProps) {
  const isQuestion = node.type === 'question';

  return (
    <div className="p-4">
      <div className="flex flex-col items-center">
        <span className="text-2xl mb-2">
          {isQuestion ? '🤔' : '🎯'}
        </span>
        <input
          type="text"
          value={node.content}
          onChange={(e) => onEdit(e.target.value)}
          className="w-full text-center border-none bg-transparent focus:ring-2 focus:ring-blue-500 rounded"
          placeholder={isQuestion ? 'Type your question...' : 'Type your answer...'}
        />
        {isQuestion && (
          <div className="mt-2 text-xs text-gray-500">
            Remember: Questions should have Yes/No answers!
          </div>
        )}
      </div>
    </div>
  );
} 