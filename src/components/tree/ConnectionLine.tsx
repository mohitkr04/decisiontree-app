import { motion } from 'framer-motion';

interface ConnectionLineProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

export default function ConnectionLine({ startX, startY, endX, endY }: ConnectionLineProps) {
  const path = `M ${startX} ${startY} C ${(startX + endX) / 2} ${startY}, ${(startX + endX) / 2} ${endY}, ${endX} ${endY}`;

  return (
    <motion.path
      d={path}
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.5 }}
      stroke="#94a3b8"
      strokeWidth="2"
      fill="none"
    />
  );
} 