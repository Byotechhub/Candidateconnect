// CandidateConnect Types - aligned with backend API

export interface Candidate {
  id: number;
  name: string;
  email: string;
  experience_years: number;
  location: string;
  skills: string[];
  created_at?: string;
}

export interface Company {
  id: number;
  name: string;
  industry: string;
  description: string;
  website: string;
  created_at?: string;
}

export interface Role {
  id: number;
  company_id: number;
  title: string;
  description: string;
  location: string;
  salary_range: string;
  employment_type: 'full-time' | 'part-time' | 'contract' | 'internship';
  min_experience: number;
  skills: string[];
  requirements?: string[];
  status?: 'open' | 'closed';
  created_at?: string;
}

export interface Application {
  id: number;
  candidate_id: number;
  role_id: number;
  status: 'applied' | 'pending' | 'reviewed' | 'interviewed' | 'accepted' | 'rejected';
  match_score?: number;
  applied_at: string;
  updated_at: string;
}

export interface Match {
  id: string;
  role_id: number;
  candidate_id: number;
  score: number;
  matched_at: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  page_size: number;
}