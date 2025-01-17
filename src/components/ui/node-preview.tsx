import { TreeNode } from '@/types';

interface NodePreviewProps {
  node: TreeNode;
  onEdit?: (nodeId: string) => void;
}

export function NodePreview({ node, onEdit }: NodePreviewProps) {
  return (
    <div className="space-y-4">
      {node.type === 'decision' && (
        <>
          <p className="text-sm text-muted-foreground">
            {node.question || 'No question set'}
          </p>
          {node.hint && (
            <div className="text-sm bg-muted p-2 rounded">
              <p className="text-sm text-muted-foreground">{node.hint}</p>
            </div>
          )}
        </>
      )}
      {/* ... rest of the component */}
    </div>
  );
} 