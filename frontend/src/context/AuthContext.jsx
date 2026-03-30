import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { login as loginApi, register as registerApi } from "../services/eventService.js";

const AuthContext = createContext(null);

const getStoredAuth = () => {
  try {
    const raw = localStorage.getItem("auth");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = getStoredAuth();
    if (stored?.token) {
      setToken(stored.token);
      setUser(stored.user || null);
    }
    setLoading(false);
  }, []);

  const persist = (payload) => {
    localStorage.setItem("auth", JSON.stringify(payload));
  };

  const clear = () => {
    localStorage.removeItem("auth");
  };

  const login = async (values) => {
    const data = await loginApi(values);
    setToken(data.token);
    setUser(data.user);
    persist({ token: data.token, user: data.user });
    return data;
  };

  const register = async (values) => {
    const data = await registerApi(values);
    setToken(data.token);
    setUser(data.user);
    persist({ token: data.token, user: data.user });
    return data;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    clear();
  };

  const value = useMemo(
    () => ({ user, token, login, register, logout, loading, isAuthenticated: !!token }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
