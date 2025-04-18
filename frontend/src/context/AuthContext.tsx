import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '../services/authService';

interface AuthContextType {
  isLoggedIn: boolean;
  role: 'admin' | 'user' | null;
  user: any;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<'admin' | 'user' | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const user = authService.getCurrentUser();
    setIsLoggedIn(!!user);
    setRole(user?.role || null);
    setUser(user);
  }, []);

  const login = async (username: string, password: string) => {
    const userData = await authService.login(username, password);
    setIsLoggedIn(true);
    setRole(userData.role);
    setUser(userData);
  };

  const logout = () => {
    authService.logout();
    setIsLoggedIn(false);
    setRole(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 