'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { RoleForm } from '@/components/forms/RoleForm';
import { Role } from '@/types';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

function PostRoleContent() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (roleData: Omit<Role, 'id' | 'created_at'>) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/roles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(roleData),
      });

      if (response.ok) {
        router.push('/company/dashboard');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to publish role');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-6">
          <Link 
            href="/company/dashboard" 
            className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <RoleForm
          onSubmit={handleSubmit}
          onCancel={() => router.push('/company/dashboard')}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default function PostRolePage() {
  return (
    <ProtectedRoute>
      <PostRoleContent />
    </ProtectedRoute>
  );
}