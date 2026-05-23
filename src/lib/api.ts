import { Candidate, Company, Role, Application, Match } from '@/types';

const API_BASE = 'https://candidateconnect-api.onrender.com';

// Get JWT token from localStorage
export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('company_token');
}

// Set JWT token
export function setAuthToken(token: string): void {
  localStorage.setItem('company_token', token);
}

// Clear JWT token
export function clearAuthToken(): void {
  localStorage.removeItem('company_token');
}

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options?.headers as Record<string, string>),
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: response.statusText }));
    throw new Error(error.detail || `API Error: ${response.statusText}`);
  }

  // Handle empty responses
  const text = await response.text();
  if (!text) return {} as T;
  return JSON.parse(text);
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
  update: (id: number, data: Partial<Role>) =>
    fetchApi<Role>(`/roles/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
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

// Auth API - for direct calls
export const authApi = {
  login: (email: string, password: string) =>
    fetchApi<{ access_token: string; token_type: string; company: Company }>('/companies/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  register: (data: { name: string; email: string; password: string; industry?: string; description?: string; website?: string }) =>
    fetchApi<{ access_token: string; token_type: string; company: Company }>('/companies/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

export { fetchApi };