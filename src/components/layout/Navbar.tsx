'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/Button';

export function Navbar() {
  const { company, isLoading } = useAuth();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">
              CandidateConnect
            </Link>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-4">
              <Link href="/roles" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md">
                Browse Roles
              </Link>
              <Link href="/candidates/register" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md">
                For Candidates
              </Link>
              <Link href="/company" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md">
                For Companies
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {!isLoading && company ? (
              // Company is logged in
              <>
                <span className="text-sm text-gray-600">
                  Logged in as <span className="font-medium text-gray-900">{company.name}</span>
                </span>
                <Link href="/company/dashboard">
                  <Button size="sm" variant="secondary">Dashboard</Button>
                </Link>
              </>
            ) : !isLoading ? (
              // Company is not logged in - show company login/register
              <>
                <Link
                  href="/company/login"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md"
                >
                  Company Login
                </Link>
                <Link
                  href="/company/register"
                  className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md"
                >
                  Register Company
                </Link>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
}