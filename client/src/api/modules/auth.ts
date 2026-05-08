import { get, post } from '../client'
import type { ApiResponse } from '../types'

export interface AuthUser {
  id: string
  username: string
}

export interface AuthResponseData {
  token: string
  user: AuthUser
}

export const authApi = {
  login: (data: { username: string; password: string }) =>
    post<AuthResponseData>('/api/auth/login', data as unknown as Record<string, unknown>),

  register: (data: { username: string; password: string }) =>
    post<AuthResponseData>('/api/auth/register', data as unknown as Record<string, unknown>),

  me: () => get<{ user: AuthUser }>('/api/auth/me'),
}
