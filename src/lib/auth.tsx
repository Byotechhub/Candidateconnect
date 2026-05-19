'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Company } from '@/types';
import { authApi, setAuthToken, clearAuthToken, getAuthToken } from '@/lib/api';

interface AuthContextType {
  company: Company | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { name: string; email: string; password: string; industry?: string; description?: string; website?: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [company, setCompany] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for existing session and token
    const stored = localStorage.getItem('company_auth');
    const token = getAuthToken();
    if (stored && token) {
      try {
        setCompany(JSON.parse(stored));
      } catch {
        localStorage.removeItem('company_auth');
        clearAuthToken();
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authApi.login(email, password);
    setAuthToken(response.access_token);
    setCompany(response.company);
    localStorage.setItem('company_auth', JSON.stringify(response.company));
  };

  const register = async (data: { name: string; email: string; password: string; industry?: string; description?: string; website?: string }) => {
    const response = await authApi.register(data);
    setAuthToken(response.access_token);
    setCompany(response.company);
    localStorage.setItem('company_auth', JSON.stringify(response.company));
  };

  const logout = () => {
    setCompany(null);
    clearAuthToken();
    localStorage.removeItem('company_auth');
  };

  return (
    <AuthContext.Provider value={{ company, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}