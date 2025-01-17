export const validateTreeStructure = (nodes: TreeNode[]) => {
  // Check for root node
  const rootNode = nodes.find(node => node.isRoot);
  if (!rootNode) {
    return {
      valid: false,
      error: "Missing root question node"
    };
  }

  // Validate connections
  for (const node of nodes) {
    if (node.type === 'question') {
      // Every question must have both yes and no paths
      if (!node.yesConnection || !node.noConnection) {
        return {
          valid: false,
          error: `Question "${node.content}" is missing a ${!node.yesConnection ? 'Yes' : 'No'} connection`
        };
      }

      // Validate that connections point to existing nodes
      const yesNode = nodes.find(n => n.id === node.yesConnection);
      const noNode = nodes.find(n => n.id === node.noConnection);
      
      if (!yesNode || !noNode) {
        return {
          valid: false,
          error: "Invalid connection found"
        };
      }
    }
  }

  return { valid: true };
}; 