import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { UserNav } from './UserNav';
import {
  BookOpen,
  Target,
  Lightbulb,
  GamepadIcon,
  Info,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

export default function AppBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Learn', path: '/learn', icon: <BookOpen className="w-5 h-5" /> },
    { label: 'Build Tree', path: '/build-tree', icon: <Target className="w-5 h-5" /> },
    { label: 'Examples', path: '/examples', icon: <Lightbulb className="w-5 h-5" /> },
    { label: 'Games', path: '/games', icon: <GamepadIcon className="w-5 h-5" /> },
    { label: 'About', path: '/about', icon: <Info className="w-5 h-5" /> },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full top-0 z-50 px-2 sm:px-4 py-2 sm:py-3"
    >
      <div className="container mx-auto max-w-4xl">
        <motion.div 
          className="bg-white/80 backdrop-blur-sm rounded-full border shadow-sm"
        >
          {/* Main Navigation Bar */}
          <div className="flex items-center justify-between h-12 sm:h-14 px-4 sm:px-6">
            {/* Logo - Responsive size */}
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.02 }}
            >
              <Button
                variant="ghost"
                className="font-bold text-lg sm:text-xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent px-2 sm:px-3"
                onClick={() => navigate('/')}
              >
                DecisionTree
              </Button>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {menuItems.map((item) => (
                <motion.button
                  key={item.path}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2",
                    location.pathname === item.path 
                      ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-sm" 
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  )}
                  onClick={() => navigate(item.path)}
                >
                  {item.icon}
                  <span className="hidden sm:inline">{item.label}</span>
                </motion.button>
              ))}
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-2">
              {/* User Navigation - Hidden on smallest screens */}
              <div className="hidden sm:block">
                <UserNav />
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="md:hidden p-2 rounded-full hover:bg-gray-100"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden overflow-hidden px-3 pb-3"
              >
                <div className="space-y-1 pt-2">
                  {menuItems.map((item) => (
                    <motion.button
                      key={item.path}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        "w-full px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2",
                        location.pathname === item.path 
                          ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-sm" 
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      )}
                      onClick={() => {
                        navigate(item.path);
                        setIsMenuOpen(false);
                      }}
                    >
                      {item.icon}
                      {item.label}
                    </motion.button>
                  ))}
                  {/* Mobile User Nav */}
                  <div className="sm:hidden pt-2">
                    <UserNav isMobile />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.header>
  );
} 