'use client';

import Link from 'next/link';

export function Navbar() {
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
            <Link
              href="/dashboard"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md"
            >
              Dashboard
            </Link>
            <Link
              href="/candidates/login"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md"
            >
              Login
            </Link>
            <Link
              href="/candidates/register"
              className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
