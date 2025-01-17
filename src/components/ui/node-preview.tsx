import { TreeNode } from '../../types';

interface NodePreviewProps {
  node: TreeNode;
  onEdit?: (id: string) => void;
}

export function NodePreview({ node }: NodePreviewProps) {
  return (
    <div className="p-4 border rounded-lg">
      <div className="space-y-2">
        {node.type === 'question' && (
          <>
            <h3 className="font-medium">
              {node.question || 'No question set'}
            </h3>
            {node.hint && (
              <div className="mt-2">
                <p className="text-sm text-muted-foreground">{node.hint}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
} 