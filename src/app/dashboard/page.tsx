'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardFooter, Button } from '@/components/ui';
import { Application, Match, Role } from '@/types';

export default function DashboardPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [matchedRoles, setMatchedRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // TODO: Replace with actual API calls
      // const appsResponse = await applicationsApi.list();
      // const matchesResponse = await matchesApi.getTopMatches('candidate-id');
      // setApplications(appsResponse.data);
      // setMatches(matchesResponse.data);
      setApplications([]);
      setMatches([]);
      setMatchedRoles([]);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      reviewed: 'bg-blue-100 text-blue-800',
      interviewed: 'bg-purple-100 text-purple-800',
      accepted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      applied: 'bg-gray-100 text-gray-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Candidate Dashboard</h1>
          <p className="text-gray-500">Track your applications and discover new opportunities</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Matched Roles */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Top Matches for You</h2>
                <Link href="/roles" className="text-blue-600 hover:text-blue-700 text-sm">
                  View All Roles
                </Link>
              </CardHeader>
              <CardContent>
                {matchedRoles.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">
                      Complete your profile to get personalized role recommendations
                    </p>
                    <Link href="/candidates/profile">
                      <Button variant="outline">Complete Profile</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {matchedRoles.slice(0, 5).map((role) => (
                      <div key={role.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h3 className="font-medium text-gray-900">{role.title}</h3>
                          <p className="text-sm text-gray-500">{role.location}</p>
                        </div>
                        <Link href={`/roles/${role.id}`}>
                          <Button size="sm">View</Button>
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Applications */}
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold text-gray-900">Your Applications</h2>
              </CardHeader>
              <CardContent>
                {applications.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">You have not applied to any roles yet</p>
                    <Link href="/roles">
                      <Button>Browse Roles</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {applications.map((app) => (
                      <div key={app.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h3 className="font-medium text-gray-900">Role ID: {app.role_id}</h3>
                          <p className="text-sm text-gray-500">Applied: {new Date(app.applied_at).toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                            {app.status}
                          </span>
                          <Link href={`/roles/${app.role_id}`}>
                            <Button size="sm" variant="outline">View Role</Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Completion */}
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold text-gray-900">Profile Strength</h2>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">75%</div>
                  <p className="text-gray-500 text-sm">Complete your profile to improve matching</p>
                </div>
                <Link href="/candidates/profile" className="block mt-4">
                  <Button className="w-full" variant="outline">Edit Profile</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/roles" className="block">
                  <Button className="w-full" variant="secondary">Browse Roles</Button>
                </Link>
                <Link href="/candidates/profile" className="block">
                  <Button className="w-full" variant="secondary">Edit Profile</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}