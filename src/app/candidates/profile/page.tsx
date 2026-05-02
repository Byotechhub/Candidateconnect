'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, Input, Card, CardContent, CardHeader, CardFooter } from '@/components/ui';

export default function CandidateProfilePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    skills: '',
    experience: '',
    location: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // TODO: Load existing profile data
    // fetch candidate profile and populate form
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // TODO: Update profile via API
      console.log('Profile update:', formData);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
          <p className="text-gray-600">Update your information to improve your matches</p>
        </div>

        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
              />
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
              />
              <Input
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="San Francisco, CA"
              />
            </CardContent>

            <CardHeader className="border-t">
              <h2 className="text-xl font-semibold text-gray-900">Professional Information</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="React, TypeScript, Node.js (comma separated)"
              />
              <Input
                label="Experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="5 years of software development"
              />
            </CardContent>

            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}