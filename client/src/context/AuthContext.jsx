

import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,     
    user: null,      
    isAuthenticated: false, 
    loading: true,   
  });

  
  
  useEffect(() => {
    
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');
    let user = null;
    try {
      user = userString ? JSON.parse(userString) : null;
    } catch (error) {
      console.error("Error parsing user from localStorage", error);
      localStorage.removeItem('user'); 
    }

    if (token && user) {
      
      
      setAuthState({
        token: token,
        user: user,
        isAuthenticated: true,
        loading: false, 
      });
    } else {
      
      setAuthState({
        token: null,
        user: null,
        isAuthenticated: false,
        loading: false, 
      });
      
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    
  }, []); 
  

  
  const login = (userData) => {
    if (!userData || !userData.token || !userData.userId || !userData.name) {
       console.error("Login function received invalid userData:", userData);
       return;
    }
    localStorage.setItem('token', userData.token);
    localStorage.setItem('user', JSON.stringify({ id: userData.userId, name: userData.name }));
    setAuthState({
      token: userData.token,
      user: { id: userData.userId, name: userData.name },
      isAuthenticated: true,
      loading: false, 
    });
  };

  
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthState({
      token: null,
      user: null,
      isAuthenticated: false,
      loading: false, 
    });
  };

  
  const register = (userData) => {
    login(userData); 
  };

  
  return (
    <AuthContext.Provider value={{ authState, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  return useContext(AuthContext);
};
