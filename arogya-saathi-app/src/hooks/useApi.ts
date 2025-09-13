import { useState, useCallback } from 'react';
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
