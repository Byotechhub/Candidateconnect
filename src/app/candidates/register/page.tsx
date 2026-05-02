'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Input, Card, CardHeader, CardContent, CardFooter } from '@/components/ui';

export default function CandidateRegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    skills: '',
    experience: '',
    location: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.email.includes('@')) newErrors.email = 'Invalid email format';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.skills.trim()) newErrors.skills = 'At least one skill is required';
    if (!formData.experience.trim()) newErrors.experience = 'Experience is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // TODO: Call API to register candidate
      console.log('Registration data:', {
        ...formData,
        skills: formData.skills.split(',').map((s) => s.trim()),
      });
      router.push('/dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create Your Candidate Profile</h1>
          <p className="mt-2 text-gray-600">
            Join CandidateConnect and find your perfect role match
          </p>
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
                error={errors.name}
                placeholder="John Doe"
              />
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="john@example.com"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  placeholder="••••••••"
                />
                <Input
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={errors.confirmPassword}
                  placeholder="••••••••"
                />
              </div>
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
                error={errors.skills}
                placeholder="React, TypeScript, Node.js (comma separated)"
              />
              <Input
                label="Experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                error={errors.experience}
                placeholder="5 years of software development"
              />
              <Input
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                error={errors.location}
                placeholder="San Francisco, CA"
              />
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? 'Creating Profile...' : 'Create Profile'}
              </Button>
              <p className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link href="/candidates/login" className="text-blue-600 hover:text-blue-700">
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}