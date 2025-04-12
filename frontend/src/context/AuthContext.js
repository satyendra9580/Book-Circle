import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const URI = process.env.REACT_APP_URL;
console.log('API BASE URL is ',URI);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetchCurrentUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchCurrentUser = async () => {
    try {
      const config = {
        headers: {
          'x-auth-token': token
        }
      };
      
      const res = await axios.get(`${URI}/api/auth/me`, config);
      setCurrentUser(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching user:', err);
      localStorage.removeItem('token');
      setToken(null);
      setCurrentUser(null);
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${URI}/api/auth/login`, {
        email,
        password
      });
      
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      return true;
    } catch (err) {
      console.error('Login error:', err.response?.data?.msg || err.message);
      throw err;
    }
  };

  const register = async (userData) => {
    try {
      const res = await axios.post(`${URI}/api/auth/register`, userData);
      
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      return true;
    } catch (err) {
      console.error('Registration error:', err.response?.data?.msg || err.message);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setCurrentUser(null);
  };

  const isOwner = () => {
    return currentUser?.role === 'owner';
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    isOwner,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
} 