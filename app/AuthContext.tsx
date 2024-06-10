"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");

    if (token) {
      axios
        .get("https://dummyjson.com/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setIsAuthenticated(true);
          if (storedUserId) {
            setUserId(storedUserId);
          }
        })
        .catch((error) => {
          console.error("Ошибка при получении данных пользователя:", error);
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          setIsAuthenticated(false);
          router.push("/authentication");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
      router.push("/authentication");
    }
  }, [router]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("refreshToken");
    setIsAuthenticated(false);
    router.push("/authentication");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout, userId, setUserId }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
