'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardFooter, Button, Input } from '@/components/ui';
import { Role } from '@/types';

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [employmentTypeFilter, setEmploymentTypeFilter] = useState('');

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await rolesApi.list();
      // setRoles(response.data);
      setRoles([]);
    } catch (error) {
      console.error('Failed to fetch roles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredRoles = roles.filter((role) => {
    const matchesSearch = role.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !locationFilter || role.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesType = !employmentTypeFilter || role.employment_type === employmentTypeFilter;
    return matchesSearch && matchesLocation && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-4">Browse Open Roles</h1>
          <p className="text-blue-100 text-lg">
            Find your next career opportunity from hundreds of companies
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              placeholder="Search roles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Input
              placeholder="Location..."
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            />
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={employmentTypeFilter}
              onChange={(e) => setEmploymentTypeFilter(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
            </select>
            <Button variant="secondary">Clear Filters</Button>
          </div>
        </div>
      </div>

      {/* Roles List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading roles...</p>
          </div>
        ) : filteredRoles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No roles found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRoles.map((role) => (
              <Card key={role.id} hover>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{role.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{role.location}</p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {role.status}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {role.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {role.skills.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {skill}
                      </span>
                    ))}
                    {role.skills.length > 3 && (
                      <span className="text-xs text-gray-500">+{role.skills.length - 3} more</span>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">{role.employment_type.replace('-', ' ')}</span>
                    {role.salary_range && ` • ${role.salary_range}`}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <Link href={`/roles/${role.id}`}>
                    <Button variant="outline" size="sm">View Details</Button>
                  </Link>
                  <Button size="sm">Apply Now</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}