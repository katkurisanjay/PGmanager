import { createContext, useContext, useState, useEffect } from 'react';
import { ADMIN_USER, DEMO_TENANTS } from '../data/seedData';

const AuthContext = createContext(null);
// const API_BASE = 'http://localhost:5000/api'; // Disabling backend API


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Keep user logged in if they refresh
    const saved = sessionStorage.getItem('pg_current_user');
    if (saved) {
      setUser(JSON.parse(saved));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      // Mocking backend login logic
      let authenticatedUser = null;

      if (username === ADMIN_USER.username && password === ADMIN_USER.password) {
        authenticatedUser = { ...ADMIN_USER };
      } else {
        const tenant = DEMO_TENANTS.find(t => t.username === username && t.password === password);
        if (tenant) {
          authenticatedUser = { ...tenant, role: 'tenant' };
        }
      }

      if (authenticatedUser) {
        // Remove sensitive info
        delete authenticatedUser.password;
        
        setUser(authenticatedUser);
        sessionStorage.setItem('pg_current_user', JSON.stringify(authenticatedUser));
        return { success: true, role: authenticatedUser.role };
      } else {
        return { success: false, error: 'Invalid credentials' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login system error' };
    }
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('pg_current_user');
  };

  const isAdmin = () => user?.role === 'admin';
  const isTenant = () => user?.role === 'tenant';

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin, isTenant, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
