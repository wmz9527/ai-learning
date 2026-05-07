import axios from 'axios'
import type { ApiResponse } from './types'
import { globalSetting } from '@/config/globalSetting'
import { ContentTypeEnum } from '@/enums/requestEnum';

const baseURL = `${globalSetting.baseUrl}${globalSetting.urlPrefix}`;


const client = axios.create({
  baseURL: baseURL,
  timeout: 15000,
  headers: { 'Content-Type': ContentTypeEnum.FORM_DATA },
})

// 请求拦截 — 注入 Token
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 响应拦截 — 统一错误处理
client.interceptors.response.use(
  (res) => res.data,
  (err) => {
    const status = err.response?.status
    const message = err.response?.data?.message || err.message

    if (status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }

    console.error(`[API] ${err.config?.url} 请求失败: ${message}`)
    return Promise.reject(err)
  },
)

export function get<T>(url: string, params?: Record<string, unknown>): Promise<ApiResponse<T>> {
  return client.get(url, { params })
}

export function post<T>(url: string, data?: Record<string, unknown>): Promise<ApiResponse<T>> {
  return client.post(url, data)
}

export function put<T>(url: string, data?: Record<string, unknown>): Promise<ApiResponse<T>> {
  return client.put(url, data)
}

export function del<T>(url: string): Promise<ApiResponse<T>> {
  return client.delete(url)
}

export default client
