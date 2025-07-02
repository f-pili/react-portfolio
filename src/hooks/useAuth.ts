import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const useAuth = () => {
  const { user, token, isLoading, error } = useSelector((state: RootState) => state.auth);
  
  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated: !!user && !!token,
    isAdmin: user?.role === 'admin',
    isClient: user?.role === 'client',
  };
};