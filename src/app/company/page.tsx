'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardFooter, Button, Input } from '@/components/ui';
import { Role } from '@/types';

export default function CompanyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">For Companies</h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Find the perfect candidates for your open roles with our smart matching platform
          </p>
          <Link href="/company/dashboard">
            <Button size="lg" variant="secondary">
              Go to Company Dashboard
            </Button>
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Companies Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-3">Smart Matching</h3>
              <p className="text-gray-600">
                Our algorithm matches candidates based on skills, experience, and preferences.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-3">Quick Hiring</h3>
              <p className="text-gray-600">
                Streamline your hiring process with automated candidate recommendations.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-3">Analytics Dashboard</h3>
              <p className="text-gray-600">
                Track application metrics and hiring success with real-time analytics.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Next Hire?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Create a free company account and start posting roles today.
          </p>
          <Link href="/company/dashboard">
            <Button size="lg">Get Started</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}