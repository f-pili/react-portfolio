export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'client';
  avatar?: string;
  createdAt: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  price: number;
  category: string;
  image: string;
  featured: boolean;
  tags: string[];
  duration: string;
  createdAt: string;
}

export interface BlogPost {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  image: string;
  tags: string[];
  featured: boolean;
}

export interface ServiceRequest {
  id: number;
  name: string;
  email: string;
  serviceType: string;
  message: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface Testimonial {
  id: number;
  name: string;
  company: string;
  message: string;
  rating: number;
  avatar: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}