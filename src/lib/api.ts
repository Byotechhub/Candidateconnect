import { Candidate, Company, Role, Application, Match } from '@/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}

// Candidates API
export const candidatesApi = {
  list: () => fetchApi<Candidate[]>('/candidates'),
  get: (id: number) => fetchApi<Candidate>(`/candidates/${id}`),
  create: (data: Omit<Candidate, 'id'>) =>
    fetchApi<{ id: number; message: string }>('/candidates', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: number, data: Partial<Candidate>) =>
    fetchApi<Candidate>(`/candidates/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};

// Roles API
export const rolesApi = {
  list: (params?: { skills?: string; location?: string; employment_type?: string }) => {
    const searchParams = new URLSearchParams();
    if (params?.skills) searchParams.set('skills', params.skills);
    if (params?.location) searchParams.set('location', params.location);
    if (params?.employment_type) searchParams.set('employment_type', params.employment_type);
    const query = searchParams.toString();
    return fetchApi<Role[]>(`/roles${query ? `?${query}` : ''}`);
  },
  get: (id: number) => fetchApi<Role>(`/roles/${id}`),
  create: (data: Omit<Role, 'id'>) =>
    fetchApi<Role>('/roles', { method: 'POST', body: JSON.stringify(data) }),
};

// Applications API
export const applicationsApi = {
  list: (candidateId?: number) =>
    fetchApi<Application[]>(`/applications${candidateId ? `?candidate_id=${candidateId}` : ''}`),
  get: (id: number) => fetchApi<Application>(`/applications/${id}`),
  create: (data: Omit<Application, 'id' | 'applied_at' | 'updated_at'>) =>
    fetchApi<Application>('/applications', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: Partial<Application>) =>
    fetchApi<Application>(`/applications/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
};

// Matching API
export const matchesApi = {
  getTopMatches: (candidateId: number, limit = 10) =>
    fetchApi<Match[]>(`/matches/candidate/${candidateId}?limit=${limit}`),
};

// Companies API
export const companiesApi = {
  list: () => fetchApi<Company[]>('/companies'),
  get: (id: number) => fetchApi<Company>(`/companies/${id}`),
  create: (data: Omit<Company, 'id'>) =>
    fetchApi<Company>('/companies', { method: 'POST', body: JSON.stringify(data) }),
};

export { fetchApi };