import { get, post } from '../client'
import type { ApiResponse, PaginatedData, PaginationParams } from '../types'

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  createdAt: string
}

export interface UserSearchParams extends PaginationParams {
  keyword?: string
}

export const userApi = {
  list: (params?: UserSearchParams) =>
    post<PaginatedData<User>>('/api/user/list', params),

  detail: (id: string) =>
    post<User>('/api/user/detail', { id }),

  create: (data: { name: string; email: string }) =>
    post<User>('/api/user/create', data),

  update: (id: string, data: Partial<User>) =>
    post<User>('/api/user/update', { id, ...data }),

  delete: (id: string) =>
    post<null>('/api/user/delete', { id }),
}
