import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../api/api'

export const GetUsersBySearch = createAsyncThunk(
  'users/GetUsersBySearch',
  async (search: string | null | undefined, { rejectWithValue }) => {
    try {
      const url = search ? `/users?search=${search}` : '/users'
      const response = await api.get(url)

      return response.data
    } catch (e: any) {
      return rejectWithValue(e.message)
    }
  }
)

export const GetUsersById = createAsyncThunk(
  'users/GetUsersById',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users/${id}`)

      return response.data
    } catch (e: any) {
      return rejectWithValue(e.message)
    }
  }
)
