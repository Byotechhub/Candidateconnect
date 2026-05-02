'use client';

import { useState } from 'react';
import { Button, Card, CardContent, CardHeader, CardFooter, Input } from '@/components/ui';
import { Role } from '@/types';

interface RoleFormProps {
  onSubmit: (roleData: Omit<Role, 'id' | 'created_at'>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function RoleForm({ onSubmit, onCancel, isLoading = false }: RoleFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    location: '',
    salary_range: '',
    employment_type: 'full-time' as const,
    skills: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = 'Job title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.employment_type) newErrors.employment_type = 'Employment type is required';
    if (!formData.skills.trim()) newErrors.skills = 'At least one skill is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const roleData: Omit<Role, 'id' | 'created_at'> = {
      company_id: 1, // Will be set from session in real app
      title: formData.title,
      description: formData.description,
      requirements: formData.requirements.split('\n').filter(r => r.trim()),
      skills: formData.skills.split(',').map(s => s.trim()).filter(s => s),
      location: formData.location,
      salary_range: formData.salary_range,
      employment_type: formData.employment_type,
      min_experience: 0,
      status: 'open',
    };

    onSubmit(roleData);
  };

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold text-gray-900">Post a New Role</h2>
        <p className="text-sm text-gray-500 mt-1">Fill in the details to create a new job posting</p>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <Input
            label="Job Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            error={errors.title}
            placeholder="e.g. Senior Frontend Engineer"
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="input-field"
              placeholder="Describe the role and responsibilities..."
            />
            {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Requirements (one per line)</label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              rows={3}
              className="input-field"
              placeholder="5+ years of React experience&#10;Strong TypeScript skills&#10;Experience with Next.js"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              error={errors.location}
              placeholder="e.g. San Francisco, CA or Remote"
            />
            <Input
              label="Salary Range"
              name="salary_range"
              value={formData.salary_range}
              onChange={handleChange}
              placeholder="e.g. $120,000 - $150,000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
            <select
              name="employment_type"
              value={formData.employment_type}
              onChange={handleChange}
              className="input-field"
            >
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
            </select>
            {errors.employment_type && <p className="mt-1 text-sm text-red-500">{errors.employment_type}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Required Skills (comma-separated)</label>
            <input
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="React, TypeScript, Node.js"
              className="input-field"
            />
            {errors.skills && <p className="mt-1 text-sm text-red-500">{errors.skills}</p>}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-3">
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Publishing...' : 'Publish Role'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}