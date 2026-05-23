import { api, setAuthToken } from './api';
import type { AuthResponse, LoginRequest, RegisterRequest } from '../types';

export const authService = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const { data: response } = await api.post<AuthResponse>('/auth/login', data);
    await setAuthToken(response.token);
    return response;
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const { data: response } = await api.post<AuthResponse>('/auth/register', data);
    await setAuthToken(response.token);
    return response;
  },

  async logout(): Promise<void> {
    await setAuthToken(null);
  },
};
