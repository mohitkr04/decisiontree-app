import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { login, logout } from '../store/authSlice';

export function useAuth() {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  const signIn = (credentials: { email: string; password: string }) => {
    // Replace with actual authentication logic
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.email && credentials.password) {
          dispatch(login({
            id: '1',
            name: 'User',
            email: credentials.email
          }));
          resolve(true);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };

  const signOut = () => {
    dispatch(logout());
  };

  return {
    isAuthenticated: auth.isAuthenticated,
    user: auth.user,
    signIn,
    signOut
  };
} 