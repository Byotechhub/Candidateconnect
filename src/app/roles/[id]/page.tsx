'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button, Card, CardContent, CardHeader, CardFooter } from '@/components/ui';
import { Role } from '@/types';

export default function RoleDetailPage() {
  const params = useParams();
  const [role, setRole] = useState<Role | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    fetchRoleDetails();
  }, []);

  const fetchRoleDetails = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await rolesApi.get(params.id as string);
      // setRole(response.data);
      setRole(null);
    } catch (error) {
      console.error('Failed to fetch role details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = async () => {
    try {
      // TODO: Replace with actual API call
      // await applicationsApi.create({ role_id: role.id, candidate_id: '...', status: 'pending' });
      setHasApplied(true);
    } catch (error) {
      console.error('Failed to apply:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading role details...</p>
      </div>
    );
  }

  if (!role) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Role Not Found</h2>
          <p className="text-gray-500 mb-4">The role you are looking for does not exist.</p>
          <Link href="/roles">
            <Button>Browse All Roles</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link href="/roles" className="text-blue-600 hover:text-blue-700 mb-4 inline-block">
          &larr; Back to Roles
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{role.title}</h1>
                    <p className="text-gray-500 mt-1">{role.location}</p>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    {role.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">About This Role</h2>
                  <p className="text-gray-600 whitespace-pre-line">{role.description}</p>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Requirements</h2>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {(role.requirements || []).map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Required Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {role.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-blue-100 text-blue-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold text-gray-900">Role Details</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Employment Type</p>
                  <p className="font-medium capitalize">{role.employment_type.replace('-', ' ')}</p>
                </div>
                {role.salary_range && (
                  <div>
                    <p className="text-sm text-gray-500">Salary Range</p>
                    <p className="font-medium">{role.salary_range}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{role.location}</p>
                </div>
              </CardContent>
              <CardFooter>
                {hasApplied ? (
                  <div className="text-center w-full">
                    <span className="text-green-600 font-medium">✓ Application Submitted</span>
                  </div>
                ) : (
                  <Button className="w-full" onClick={handleApply}>
                    Apply Now
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}