"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import toast from "react-hot-toast";
import { authAPI } from "../Services/api";
import { useRouter, usePathname } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message?: string }>;
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<{ success: boolean; message?: string }>;
  googleLogin: (credentialResponse: {
    credential: string;
  }) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  handleAuthError: (error: any) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const handleAuthError = (error: any) => {
    const status = error.response?.status;
    if (status === 401 || status === 402) {
      if (pathname !== "/sign-in") {
        setUser(null);
        setIsAuthenticated(false);
        router.push("/sign-in");
      }
    }
  };

  const checkAuthStatus = async () => {
    try {
      const response = await authAPI.getUser();

      if (response.data && response.data.code === 200) {
        setUser(response.data.data as User);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error: any) {
      setUser(null);
      setIsAuthenticated(false);
      handleAuthError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await authAPI.login({ email, password });

      if (response.data.code === 200) {
        setUser(response.data.data as User);
        setIsAuthenticated(true);
        toast.success("Login successful!");
        return { success: true };
      } else {
        toast.error(response.data.message || "Login failed");
        return { success: false, message: response.data.message };
      }
    } catch (error: any) {
      const message = error.response?.data?.message || "Login failed";
      toast.error(message);
      return { success: false, message };
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await authAPI.register({ name, email, password });

      if (response.data.code === 200) {
        setUser(response.data.data as User);
        setIsAuthenticated(true);
        toast.success("Registration successful! Please login.");
        return { success: true };
      } else {
        toast.error(response.data.message || "Registration failed");
        return { success: false, message: response.data.message };
      }
    } catch (error: any) {
      const message = error.response?.data?.message || "Registration failed";
      toast.error(message);
      return { success: false, message };
    }
  };

  const googleLogin = async (credentialResponse: {
    credential: string;
  }): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await authAPI.googleLogin(credentialResponse.credential);

      if (response.data.code === 200) {
        setUser(response.data.data as User);
        setIsAuthenticated(true);
        toast.success("Google login successful!");
        return { success: true };
      } else {
        toast.error(response.data.message || "Google login failed");
        return { success: false, message: response.data.message };
      }
    } catch (error: any) {
      const message = error.response?.data?.message || "Google login failed";
      toast.error(message);
      return { success: false, message };
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await authAPI.logout();
      router.push("/sign-in");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      toast.success("Logged out successfully");
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    googleLogin,
    logout,
    handleAuthError,
  };

  return <AuthContext value={value}>{children}</AuthContext>;
};
