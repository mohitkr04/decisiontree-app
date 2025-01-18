import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Card = {
  id: number;
  name: string;
  designation: string;
  content: React.ReactNode;
};

export const CardStack = ({
  items,
  offset,
  scaleFactor,
}: {
  items: Card[];
  offset?: number;
  scaleFactor?: number;
}) => {
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState<Card[]>(items);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!isDragging) {
      const interval = setInterval(() => {
        setCards((prevCards) => {
          const newArray = [...prevCards];
          newArray.unshift(newArray.pop()!);
          return newArray;
        });
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isDragging]);

  return (
    <div className="relative h-60 w-60 md:h-60 md:w-96">
      <AnimatePresence>
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            className="absolute bg-background/50 backdrop-blur-sm h-60 w-60 md:h-60 md:w-96 rounded-3xl p-6 
                     shadow-lg border border-neutral-200/50 hover:border-primary/20 
                     transition-colors duration-300"
            style={{
              transformOrigin: "top center",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR,
              zIndex: cards.length - index,
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{
              scale: (1 - index * SCALE_FACTOR) * 1.02,
              transition: { duration: 0.2 }
            }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={(e) => {
              setIsDragging(false);
              let offsetY = 0;

              // Check if the event is a MouseEvent
              if (e instanceof MouseEvent) {
                offsetY = e.offsetY; // Use offsetY for MouseEvent
              } else if (e instanceof PointerEvent) {
                offsetY = e.clientY; // Use clientY for PointerEvent
              }

              if (Math.abs(offsetY) > 100) {
                const newCards = [...cards];
                newCards.push(newCards.shift()!);
                setCards(newCards);
              }
            }}
          >
            <motion.div 
              className="h-full flex flex-col justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="font-normal text-foreground space-y-2">
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {card.content}
                </motion.div>
              </div>
              <div className="space-y-1">
                <motion.p 
                  className="text-primary font-medium"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {card.name}
                </motion.p>
                <motion.p 
                  className="text-muted-foreground font-normal"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {card.designation}
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}; 