import { createSlice } from '@reduxjs/toolkit'
import {
  GetAccess,
  GetUser,
  LoginUser,
  LogOut,
  RefreshToAccess,
  RegisterUser,
  type UserType,
} from './AuthOperation'

interface AuthIniState {
  user: UserType,
  token: string
  isLogin: boolean
  isRefreshing: boolean
  error: string | number | null
}

const AuthIniState: AuthIniState = {
  user: {} as UserType,
  token: '',
  isLogin: false,
  isRefreshing: false,
  error: null,
}

const AuthSlice = createSlice({
  name: 'auth',
  initialState: AuthIniState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(RegisterUser.pending, state => {
        state.isRefreshing = true
        state.error = null
      })
      .addCase(RegisterUser.fulfilled, (state, action) => {
        state.isRefreshing = false
        state.user = action.payload
        state.isLogin = true
      })
      .addCase(RegisterUser.rejected, (state, action) => {
        state.isRefreshing = false
        state.error = action.payload as string
      })
      .addCase(LoginUser.pending, state => {
        state.isRefreshing = true
        state.error = null
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.isRefreshing = false
        state.user = action.payload
        state.isLogin = true
      })
      .addCase(LoginUser.rejected, (state, action) => {
          state.isRefreshing = false
          state.error = action.payload as string
      })
      .addCase(GetUser.pending, (state) => {
        state.isRefreshing = true
      })
      .addCase(GetUser.fulfilled, (state, action) => {
        state.isRefreshing = false
        state.user = action.payload
      })
      .addCase(GetUser.rejected, (state) => {
        state.isRefreshing = false
      })
      .addCase(RefreshToAccess.pending, (state) => {
        state.isRefreshing = true
      })
      .addCase(RefreshToAccess.fulfilled, (state) => {
        state.isRefreshing = false
      })
      .addCase(RefreshToAccess.rejected, (state, action) => {
        state.isRefreshing = false
        state.error = action.payload as string
      })
      .addCase(GetAccess.pending, (state) => {
        state.isRefreshing = true
      })
      .addCase(GetAccess.fulfilled, (state, action) => {
        state.isRefreshing = false
        state.token = action.payload
      })
      .addCase(GetAccess.rejected, (state, action) => {
        state.isRefreshing = false
        state.error = action.payload as string
      })
      .addCase(LogOut.pending, (state) => {
        state.isRefreshing = true
      })
      .addCase(LogOut.fulfilled, (state) => {
        state.isRefreshing = false
        state.isLogin = false
        state.user = {} as UserType
        state.token = ''
      })
      .addCase(LogOut.rejected, (state, action) => {
        state.isRefreshing = false
        state.error = action.payload as string
      })
  },
})

export const AuthReducer = AuthSlice.reducer
