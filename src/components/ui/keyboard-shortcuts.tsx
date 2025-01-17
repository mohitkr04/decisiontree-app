import { motion } from 'framer-motion';
import { Card } from './card';

interface ShortcutProps {
  command: string;
  description: string;
}

const shortcuts: ShortcutProps[] = [
  { command: 'Ctrl + Z', description: 'Undo last action' },
  { command: 'Ctrl + Y', description: 'Redo last action' },
  { command: 'Delete', description: 'Remove selected node' },
  { command: 'Escape', description: 'Cancel current action' },
  { command: 'Ctrl + S', description: 'Save current tree' },
  { command: 'H', description: 'Toggle hint' }
];

export function KeyboardShortcuts() {
  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-3">Keyboard Shortcuts</h3>
      <div className="space-y-2">
        {shortcuts.map(({ command, description }) => (
          <div key={command} className="flex justify-between text-sm">
            <kbd className="px-2 py-1 bg-muted rounded text-xs">{command}</kbd>
            <span className="text-muted-foreground">{description}</span>
          </div>
        ))}
      </div>
    </Card>
  );
} 