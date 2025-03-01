import React, { createContext, useState, useEffect, useCallback } from "react";
import api from "./axiosConfig";
import { jwtDecode } from "jwt-decode"; // Ensure you import it properly
import { REFRESH_TOKEN, ACCESS_TOKEN } from "./constants";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [user, setUser] = useState(null);

  const refreshToken = useCallback(async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const res = await api.post("/user/token/refresh/", {
        refresh: refreshToken,
      });
      if (res.status === 200) {
        const accessToken = res.data.access;
        localStorage.setItem(ACCESS_TOKEN, accessToken);
        const decoded = jwtDecode(accessToken);
        setUser(decoded); // Extract user info from token
        setIsAuthorized(true);
      } else {
        setUser(null);
        setIsAuthorized(false);
      }
    } catch (error) {
      console.log(error);
      setUser(null);
      setIsAuthorized(false);
    }
  }, []);

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setUser(null);
      setIsAuthorized(false);
      return;
    }
    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000;

    if (tokenExpiration < now) {
      await refreshToken();
    } else {
      setUser(decoded); // Extract user info from token
      setIsAuthorized(true);
    }
  }, [refreshToken]);

  const login = async () => {
    await checkAuth();
  };

  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    setUser(null);
    setIsAuthorized(false);
  };

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <AuthContext.Provider value={{ isAuthorized, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
