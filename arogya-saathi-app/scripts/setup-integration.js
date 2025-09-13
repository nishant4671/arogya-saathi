const fs = require('fs');
const path = require('path');

console.log('🚀 Starting automated frontend-backend integration setup...');

// 1. Create directories
const directories = [
  'src/services',
  'src/hooks',
  'src/utils',
  'scripts'
];

directories.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✓ Created directory: ${dir}`);
  }
});

// 2. Create environment file
const envContent = `NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_APP_ENV=development
`;

fs.writeFileSync('.env.local', envContent);
console.log('✓ Created .env.local file');

// 3. Create config utility
const configContent = `// Validate environment configuration
export const validateConfig = () => {
  const requiredEnvVars = ['NEXT_PUBLIC_API_URL'];
  
  const missingVars = requiredEnvVars.filter(varName => 
    !process.env[varName] && !process.env[\`NEXT_PUBLIC_\${varName}\`]
  );

  if (missingVars.length > 0) {
    console.error('Missing required environment variables:', missingVars);
    return false;
  }

  console.log('Environment configuration validated successfully');
  return true;
};

// API configuration
export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  environment: process.env.NEXT_PUBLIC_APP_ENV || 'development',
};

// Validate on import
validateConfig();
`;

fs.writeFileSync('src/utils/config.ts', configContent);
console.log('✓ Created config utility');

// 4. Create API service
const apiServiceContent = `import { config } from '../utils/config';

const API_BASE_URL = config.apiUrl;

interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
}

export class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...options.headers,
      };

      if (token) {
        headers['Authorization'] = \`Bearer \${token}\`;
      }

      const response = await fetch(\`\${API_BASE_URL}\${endpoint}\`, {
        ...options,
        headers,
      });

      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const apiService = new ApiService();
`;

fs.writeFileSync('src/services/api.ts', apiServiceContent);
console.log('✓ Created API service');

// 5. Create auth service
const authServiceContent = `import { apiService } from './api';

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
`;

fs.writeFileSync('src/services/auth.ts', authServiceContent);
console.log('✓ Created auth service');

// 6. Create useApi hook
const useApiContent = `import { useState, useCallback } from 'react';
import { apiService } from '../services/api';

export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useApi = () => {
  const [state, setState] = useState<ApiState<any>>({
    data: null,
    loading: false,
    error: null,
  });

  const callApi = useCallback(async <T>(
    method: 'get' | 'post' | 'put' | 'delete',
    endpoint: string,
    data?: any
  ): Promise<T> => {
    setState({ data: null, loading: true, error: null });

    try {
      let response;
      if (method === 'get') {
        response = await apiService.get<T>(endpoint);
      } else if (method === 'post') {
        response = await apiService.post<T>(endpoint, data);
      } else if (method === 'put') {
        response = await apiService.put<T>(endpoint, data);
      } else {
        response = await apiService.delete<T>(endpoint);
      }

      setState({ data: response, loading: false, error: null });
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setState({ data: null, loading: false, error: errorMessage });
      throw error;
    }
  }, []);

  return {
    ...state,
    callApi,
    reset: () => setState({ data: null, loading: false, error: null }),
  };
};
`;

fs.writeFileSync('src/hooks/useApi.ts', useApiContent);
console.log('✓ Created useApi hook');

// 7. Add script to package.json
const packageJsonPath = path.join(process.cwd(), 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

if (!packageJson.scripts) {
  packageJson.scripts = {};
}

packageJson.scripts['setup:integration'] = 'node scripts/setup-integration.js';
packageJson.scripts['generate:services'] = 'node scripts/generate-services.js';
packageJson.scripts['test:api'] = 'node scripts/test-api.js';

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
console.log('✓ Added scripts to package.json');

console.log('🎉 Frontend-backend integration setup completed!');
console.log('Next steps:');
console.log('1. Run your backend server: npm run dev (in backend directory)');
console.log('2. Run your frontend: npm run dev (in frontend directory)');
console.log('3. Test the integration by logging in with:');
console.log('   Email: patient@arogyasaathi.com');
console.log('   Password: password');
console.log('   Role: patient');