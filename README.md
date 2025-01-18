# React + TypeScript + Vite

An interactive learning platform designed to teach decision-making skills through decision trees. The platform combines educational content with engaging games and practical exercises to make learning both fun and effective.

<div align="center">
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
  [![Vite](https://img.shields.io/badge/Vite-5.0-purple.svg)](https://vitejs.dev/)
</div>

## 📚 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Installation](#-installation)
- [Project Structure](#-project-structure)
- [Dependencies](#-dependencies)
- [Usage](#-usage)
- [Components](#-components)
- [Games](#-games)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)
- [Acknowledgments](#-acknowledgments)
- [License](#-license)

## 🎯 Overview

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules, enhanced with interactive learning features and games.

### 🌟 Key Features

- Interactive Decision Tree Builder
- Educational Games
- Step-by-Step Tutorials
- Real-world Examples
- Progress Tracking
- Responsive Design

## 🚀 Features

### 1. Learning Modules
- Structured learning path from basics to advanced concepts
- Video tutorials and interactive examples
- Progress tracking and achievements

### 2. Interactive Builder
- Drag-and-drop interface
- Real-time visualization
- Undo/redo functionality
- Save and share capabilities

### 3. Games
- 🐍 Decision Snake Game
- 🎯 Quiz Challenges
- 🏆 Achievement System
- 📊 Progress Tracking

### 4. Examples Library
- Real-world decision scenarios
- Interactive walkthroughs
- Categorized examples

## 💻 Installation

```bash
# Clone the repository
git clone https://github.com/mohitkr04/decision-tree-learning.git

# Navigate to project directory
cd decision-tree-learning

# Install dependencies
npm install

# Start development server
npm run dev
```

## 📁 Project Structure

```
src/
├── components/
│   ├── games/
│   ├── education/
│   ├── ui/
│   └── layout/
├── pages/
├── contexts/
├── hooks/
├── types/
└── utils/
```

## 📦 Dependencies

### Core Dependencies
- React 18.3
- TypeScript 5.0
- Vite 5.0
- Framer Motion
- TailwindCSS

### UI Components
- Radix UI
- Lucide Icons
- Shadcn/ui

### Development Tools
- ESLint
- Prettier
- Vitest

## 🎮 Usage

1. **Getting Started**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:5173`

2. **Building for Production**
   ```bash
   npm run build
   ```

3. **Running Tests**
   ```bash
   npm run test
   ```

## 🧩 Components

### Core Components
- `TreeCanvas`: Main decision tree building interface
- `NodeEditor`: Node configuration component
- `InteractiveTutorial`: Step-by-step guide system

### Games
- `SnakeGame`: Decision-based snake game
- `QuizGame`: Interactive quiz system
- `GameContext`: Game state management

## 🎮 Games

### Snake Game
Navigate through decision paths while collecting points. Features:
- Dynamic difficulty
- Score tracking
- Achievement system

### Quiz Game
Test your knowledge with interactive quizzes:
- Multiple categories
- Progressive difficulty
- Instant feedback

## 🔮 Future Enhancements

- [ ] Multiplayer functionality
- [ ] AI-powered suggestions
- [ ] Mobile app version
- [ ] Additional game modes
- [ ] Social sharing features
- [ ] Advanced analytics

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 💝 Acknowledgments

Special thanks to:
- Our amazing contributors
- The React community
- Educational content creators
- Open-source maintainers

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Made with ❤️ by Decision Tree Learning Team</p>
</div>