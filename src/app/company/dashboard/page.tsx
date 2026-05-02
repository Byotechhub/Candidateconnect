'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, Card, CardContent, CardHeader, CardFooter, Input } from '@/components/ui';
import { Role, Application } from '@/types';

export default function CompanyDashboardPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [recentApplications, setRecentApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showRoleForm, setShowRoleForm] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // TODO: Replace with actual API calls
      setRoles([]);
      setRecentApplications([]);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleCreated = () => {
    setShowRoleForm(false);
    fetchDashboardData();
  };

  const getStatusColor = (status: string): string => {
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
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Company Dashboard</h1>
              <p className="text-gray-500">Manage your posted roles and applications</p>
            </div>
            <Button onClick={() => setShowRoleForm(true)}>
              + Post New Role
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showRoleForm ? (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Create New Role</h2>
            <RoleFormSimple onSubmit={handleRoleCreated} onCancel={() => setShowRoleForm(false)} />
          </div>
        ) : null}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Posted Roles */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Your Posted Roles</h2>
                <Button size="sm" onClick={() => setShowRoleForm(true)}>+ Add Role</Button>
              </CardHeader>
              <CardContent>
                {roles.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">You have not posted any roles yet</p>
                    <Button onClick={() => setShowRoleForm(true)}>Post Your First Role</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {roles.map((role) => (
                      <div key={role.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h3 className="font-medium text-gray-900">{role.title}</h3>
                          <p className="text-sm text-gray-500">
                            {role.location} • {role.employment_type}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            role.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {role.status}
                          </span>
                          <Link href={`/roles/${role.id}`}>
                            <Button size="sm" variant="outline">View</Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Applications */}
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
              </CardHeader>
              <CardContent>
                {recentApplications.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No applications yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentApplications.map((app) => (
                      <div key={app.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h3 className="font-medium text-gray-900">Candidate ID: {app.candidate_id}</h3>
                          <p className="text-sm text-gray-500">
                            Applied: {new Date(app.applied_at).toLocaleDateString()}
                          </p>
                        </div>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                          {app.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold text-gray-900">Quick Stats</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{roles.filter(r => r.status === 'open').length}</div>
                  <p className="text-gray-500 text-sm">Open Roles</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{recentApplications.length}</div>
                  <p className="text-gray-500 text-sm">Total Applications</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" onClick={() => setShowRoleForm(true)}>+ Post New Role</Button>
                <Link href="/company/roles/new" className="block">
                  <Button variant="secondary" className="w-full">Go to Role Form</Button>
                </Link>
                <Button variant="outline" className="w-full">Edit Company Profile</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// Inline role form for use in dashboard
function RoleFormSimple({ onSubmit, onCancel }: { onSubmit: () => void; onCancel: () => void }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    employment_type: 'full-time',
    skills: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // TODO: Call API to create role
    console.log('Creating role:', formData);
    
    setTimeout(() => {
      setIsLoading(false);
      onSubmit();
    }, 1000);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <Input
            label="Job Title"
            name="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Senior Frontend Engineer"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="input-field"
              placeholder="Describe the role..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Location"
              name="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g. Remote"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                name="employment_type"
                value={formData.employment_type}
                onChange={(e) => setFormData({ ...formData, employment_type: e.target.value })}
                className="input-field"
              >
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
              </select>
            </div>
          </div>
          <Input
            label="Skills (comma-separated)"
            name="skills"
            value={formData.skills}
            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
            placeholder="React, TypeScript, Node.js"
          />
        </CardContent>
        <CardFooter className="flex justify-end gap-3">
          <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Role'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}