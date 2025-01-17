import { motion } from 'framer-motion';

interface ConnectionLineProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

export default function ConnectionLine({ startX, startY, endX, endY, isYesPath }: ConnectionLineProps & { isYesPath?: boolean }) {
  const color = isYesPath ? '#22c55e' : '#ef4444';
  const midY = (startY + endY) / 2;
  
  const path = `
    M ${startX} ${startY}
    C ${startX} ${midY},
      ${endX} ${midY},
      ${endX} ${endY}
  `;

  return (
    <g>
      <motion.path
        d={path}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        stroke={color}
        strokeWidth="3"
        fill="none"
      />
      <motion.text
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        x={(startX + endX) / 2}
        y={midY}
        textAnchor="middle"
        fill={color}
        fontSize="12"
        dy="-10"
      >
        {isYesPath ? '👍 Yes!' : '👎 No!'}
      </motion.text>
    </g>
  );
} 