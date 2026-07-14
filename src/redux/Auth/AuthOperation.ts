import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../api/api'

export type RegisterUserType = {
  email: string
  username: string
  password: string
}

export type UserType = {
  id: number
  email: string
  username: string
  is_online: boolean
}

export type LoginUserType = {
  username: string
  password: string
}

const extractError = (e: any): string => {
  const detail = e.response?.data?.detail
  if (Array.isArray(detail)) return detail[0]?.msg ?? 'Ошибка валидации'
  if (typeof detail === 'string') return detail
  return e.message ?? 'Неизвестная ошибка'
}

export const RegisterUser = createAsyncThunk(
  'auth/RegisterUser',
  async (user: RegisterUserType, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/register', user)
      return response.data
    } catch (e: any) {
      return rejectWithValue(extractError(e))
    }
  }
)

export const LoginUser = createAsyncThunk(
  'auth/LoginUser',
  async (user: LoginUserType, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', user)

      return response.data
    } catch (e: any) {
      return rejectWithValue(extractError(e))
    }
  }
)

export const RefreshToAccess = createAsyncThunk(
  'auth/RefreshToAccess',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/auth/refresh')

      return response.data
    } catch (e: any) {
      return rejectWithValue(e.message)
    }
  }
)

export const GetUser = createAsyncThunk(
  'auth/GetUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/profile/me')

      return response.data
    } catch (e: any) {
      return rejectWithValue(e.message)
    }
  }
)

export const GetAccess = createAsyncThunk(
  'auth/GetAccess',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/auth/access')

      return response.data
    } catch (e: any) {
      return rejectWithValue(e.message)
    }
  }
)

export const LogOut = createAsyncThunk(
  'auth/LogOut',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.delete('/auth/logout')

      return response.data
    } catch (e: any) {
      return rejectWithValue(e.message)
    }
  }
)
