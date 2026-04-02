import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../api/api'

export type RegisterUserType = {
  email: string
  username: string
  password: string
}

export type LoginUserType = {
  username: string
  password: string
}

export const RegisterUser = createAsyncThunk(
  'auth/RegisterUser',
  async (user: RegisterUserType, { rejectWithValue }) => {
    try {
      console.log('Sending:', user)
      const response = await api.post('/auth/register', user)
      return response.data
    } catch (e: any) {
      console.log('Error:', e.response?.data)
      return rejectWithValue(e.message)
    }
  }
)

export const LoginUser = createAsyncThunk(
  'auth/LoginUser',
  async (user: LoginUserType, { rejectWithValue }) => {
    try {
      console.log('LoginUser sending:', user)
      const response = await api.post('/auth/login', user)

      return response.data
    } catch (e: any) {
      return rejectWithValue(e.message)
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

export const GetUser = createAsyncThunk('auth/GetUser', async (_, { rejectWithValue }) => {
    try {
        const response = await api.get('/profile/me')

        return response.data
    } catch (e: any) {
        return rejectWithValue(e.message)
    }
})

export const GetAccess = createAsyncThunk('auth/GetAccess', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/auth/access')

    return response.data
  } catch (e: any) {
    return rejectWithValue(e.message)
  }
})