import { api, setAuthToken } from './api';
import type { AuthResponse, LoginRequest, RegisterRequest } from '../types';

function ensureAuthResponse(response: AuthResponse): AuthResponse {
  if (!response?.token || !response?.user) {
    throw new Error('Invalid auth response from backend');
  }
  return response;
}

export const authService = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const { data: response } = await api.post<AuthResponse>('/auth/login', data);
    const auth = ensureAuthResponse(response);
    await setAuthToken(auth.token);
    return auth;
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const { data: response } = await api.post<AuthResponse>('/auth/register', data);
    const auth = ensureAuthResponse(response);
    await setAuthToken(auth.token);
    return auth;
  },

  async logout(): Promise<void> {
    await setAuthToken(null);
  },
};
