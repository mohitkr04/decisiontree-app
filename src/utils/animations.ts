export const nodeAnimations = {
  questionIdle: {
    scale: [1, 1.02, 1],
    rotate: [0, 1, -1, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
  
  answerIdle: {
    y: [0, -3, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
  
  connectionSuccess: {
    scale: [1, 1.2, 1],
    rotate: [0, 15, -15, 0],
    transition: { duration: 0.5 }
  }
}; 