import { apiService } from './api';

export interface LoginRequest {
  email: string;
  password: string;
  role: 'patient' | 'staff' | 'doctor';
}

export interface LoginResponse {
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
    phone?: string;
  };
  token: string;
  expiresIn: number;
}

export interface VerifyResponse {
  valid: boolean;
  user?: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
}

export const authService = {
  login: (credentials: LoginRequest) => {
    return apiService.post<LoginResponse>('/api/auth/login', credentials);
  },

  logout: () => {
    return apiService.post('/api/auth/logout', {});
  },

  verifyToken: () => {
    return apiService.get<VerifyResponse>('/api/auth/verify');
  },
};
