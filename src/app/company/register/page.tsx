'use client';

import { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CompanyRegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    industry: '',
    description: '',
    website: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        industry: formData.industry,
        description: formData.description,
        website: formData.website,
      });
      router.push('/company/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto px-4">
        <Card>
          <CardHeader>
            <h1 className="text-2xl font-bold text-center">Register Your Company</h1>
            <p className="text-gray-600 text-center mt-2">
              Create an account to start posting roles
            </p>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}
              <Input
                label="Company Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Acme Inc."
                required
              />
              <Input
                label="Work Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="hr@acme.com"
                required
              />
              <Input
                label="Industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                placeholder="Technology"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="input-field"
                  placeholder="Tell candidates about your company..."
                />
              </div>
              <Input
                label="Website"
                name="website"
                type="url"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://acme.com"
              />
              <Input
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
              <Input
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Creating account...' : 'Create Company Account'}
              </Button>
              <p className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link href="/company/login" className="text-blue-600 hover:underline">
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