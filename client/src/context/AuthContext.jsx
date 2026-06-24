import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.DEV
  ? 'http://localhost:5000/api'
<<<<<<< HEAD
  : '/api';

=======
  : import.meta.env.VITE_API_URL;
  
>>>>>>> c0c4e34b8870a2d6bd3634d9e56ef0971caa6570
const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Attach token to every axios request automatically
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  }, [token]);

  // On first load, if a token exists, validate it and restore the session
  useEffect(() => {
    const restoreSession = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`${API_BASE_URL}/auth/me`);
        setUser(response.data.user);
      } catch (error) {
        // Token invalid/expired
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    restoreSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-logout if any API call returns 401 (expired/invalid token)
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          setToken(null);
          setUser(null);
        }
        return Promise.reject(error);
      }
    );
    return () => axios.interceptors.response.eject(interceptor);
  }, []);

  const signup = async (name, email, password) => {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, { name, email, password });
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    setToken(response.data.token);
    setUser(response.data.user);
  };

<<<<<<< HEAD
  // Creates the account but does NOT log the user in — used so signup
  // redirects to the login form instead of auto-authenticating.
  const register = async (name, email, password) => {
    await axios.post(`${API_BASE_URL}/auth/signup`, { name, email, password });
  };


=======
>>>>>>> c0c4e34b8870a2d6bd3634d9e56ef0971caa6570
  const login = async (email, password) => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    setToken(response.data.token);
    setUser(response.data.user);
  };
  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    isAuthenticated: !!user,
    loading,
    signup,
<<<<<<< HEAD
    register,
=======
>>>>>>> c0c4e34b8870a2d6bd3634d9e56ef0971caa6570
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
