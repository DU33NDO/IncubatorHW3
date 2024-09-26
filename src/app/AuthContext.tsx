"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  logout: () => void;
  userId: string | null;
  setUserId: (userId: string | null) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      axios
        .get("http://127.0.0.1:8000/blog/auth/me/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setIsAuthenticated(true);
          if (token) {
            const decodedToken: any = jwtDecode(token);
            setUserId(decodedToken.user_id);
          }
        })
        .catch((error) => {
          console.error("Ошибка при получении данных пользователя:", error);
          localStorage.removeItem("accessToken");
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
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsAuthenticated(false);
    router.push("/Login");
  };

  const contextValue: AuthContextType = {
    isAuthenticated,
    setIsAuthenticated,
    logout,
    userId,
    setUserId,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
