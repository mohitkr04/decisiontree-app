import { motion } from 'framer-motion';

interface TreeConnectionProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  isYesPath?: boolean;
}

export function TreeConnection({ startX, startY, endX, endY, isYesPath }: TreeConnectionProps) {
  const color = isYesPath ? '#22c55e' : '#ef4444';
  
  return (
    <motion.path
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      d={`M ${startX} ${startY} C ${startX} ${(startY + endY) / 2}, ${endX} ${(startY + endY) / 2}, ${endX} ${endY}`}
      stroke={color}
      strokeWidth={2}
      fill="none"
    />
  );
} 