import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { UserNav } from './UserNav';

export default function AppBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const menuItems = [
    { label: 'Learn', path: '/learn', icon: '📚' },
    { label: 'Build Tree', path: '/build-tree', icon: '🎯' },
    { label: 'Examples', path: '/examples', icon: '💡' },
    { label: 'Games', path: '/games', icon: '🎮' },
    { label: 'About', path: '/about', icon: 'ℹ️' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-background/80 backdrop-blur-sm border-b shadow-sm fixed w-full top-0 z-50"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="font-bold text-xl"
              onClick={() => navigate('/')}
            >
              DecisionTree
            </Button>
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => (
              <motion.button
                key={item.path}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  location.pathname === item.path 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
                onClick={() => navigate(item.path)}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </motion.button>
            ))}
          </nav>

          <UserNav />
        </div>
      </div>
    </motion.header>
  );
} 