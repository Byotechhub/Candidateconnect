'use client';

import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { company, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !company) {
      router.push('/company/login');
    }
  }, [company, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!company) {
    return null;
  }

  return <>{children}</>;
}