'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Company, CompanyAuth } from '@/types';

interface AuthContextType {
  company: Company | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (companyData: Omit<Company, 'id' | 'created_at'>, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [company, setCompany] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for existing session
    const stored = localStorage.getItem('company_auth');
    if (stored) {
      try {
        setCompany(JSON.parse(stored));
      } catch {
        localStorage.removeItem('company_auth');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // TODO: Replace with actual API call when backend auth is ready
    // For now, simulate login by checking localStorage for registered company
    const registeredCompanies = JSON.parse(localStorage.getItem('registered_companies') || '[]');
    const found = registeredCompanies.find((c: CompanyAuth) => c.email === email && c.password === password);
    
    if (found) {
      const { password: _, ...companyData } = found;
      setCompany(companyData);
      localStorage.setItem('company_auth', JSON.stringify(companyData));
    } else {
      throw new Error('Invalid email or password');
    }
  };

  const register = async (companyData: Omit<Company, 'id' | 'created_at'>, password: string) => {
    // TODO: Replace with actual API call
    const newCompany = {
      ...companyData,
      id: Date.now(),
      created_at: new Date().toISOString(),
    };
    
    // Store in localStorage for demo purposes
    const registeredCompanies = JSON.parse(localStorage.getItem('registered_companies') || '[]');
    registeredCompanies.push({ ...newCompany, password } as CompanyAuth);
    localStorage.setItem('registered_companies', JSON.stringify(registeredCompanies));
    
    setCompany(newCompany);
    localStorage.setItem('company_auth', JSON.stringify(newCompany));
  };

  const logout = () => {
    setCompany(null);
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