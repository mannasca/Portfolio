import React, { createContext, useState, useContext, useEffect } from 'react';

// Create User Context
const UserContext = createContext();

// User Provider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('authToken');
    
    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        // Default role assignment - assumes backend provides role in user object
        // If not, set default as 'enduser'
        setUserRole(parsedUser.role || 'enduser');
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
      }
    }
    setLoading(false);
  }, []);

  const login = (userData, role = 'enduser') => {
    setUser(userData);
    setUserRole(role);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('userRole', role);
  };

  const logout = () => {
    setUser(null);
    setUserRole(null);
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
  };

  const isAdmin = () => userRole === 'admin';
  const isEndUser = () => userRole === 'enduser';
  const isAuthenticated = () => user && userRole;

  const value = {
    user,
    userRole,
    loading,
    login,
    logout,
    isAdmin,
    isEndUser,
    isAuthenticated,
    setUserRole, // Allow manual role assignment for testing/admin panel
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
