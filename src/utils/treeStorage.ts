export const saveTree = (treeName: string, treeData: any) => {
  try {
    const savedTrees = JSON.parse(localStorage.getItem('savedTrees') || '{}');
    savedTrees[treeName] = {
      ...treeData,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem('savedTrees', JSON.stringify(savedTrees));
    return true;
  } catch (error) {
    console.error('Error saving tree:', error);
    return false;
  }
};

export const loadTree = (treeName: string) => {
  try {
    const savedTrees = JSON.parse(localStorage.getItem('savedTrees') || '{}');
    return savedTrees[treeName];
  } catch (error) {
    console.error('Error loading tree:', error);
    return null;
  }
};

export const getAllSavedTrees = () => {
  try {
    return JSON.parse(localStorage.getItem('savedTrees') || '{}');
  } catch (error) {
    console.error('Error loading saved trees:', error);
    return {};
  }
}; 