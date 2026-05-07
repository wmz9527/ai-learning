// 统一响应格式
export interface ApiResponse<T = unknown> {
  code: number
  message: string
  data: T
}

// 分页列表响应
export interface PaginatedData<T> {
  list: T[]
  pagination: PaginationMeta
}

export interface PaginationMeta {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

// 分页请求参数
export interface PaginationParams {
  page?: number
  pageSize?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}
