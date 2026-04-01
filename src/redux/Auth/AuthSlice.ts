import { createSlice } from '@reduxjs/toolkit'
import {
  GetUser,
  LoginUser,
  RefreshToAccess,
  RegisterUser,
  type RegisterUserType as User,
} from './AuthOperation'

interface AuthIniState {
  user: User
  isLogin: boolean
  isRefreshing: boolean
  error: string | number | null
}

const AuthIniState: AuthIniState = {
  user: {} as User,
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
      })
      .addCase(RegisterUser.fulfilled, (state, action) => {
        state.isRefreshing = false
        state.user = action.payload
        state.isLogin = true
      })
      .addCase(RegisterUser.rejected, (state, action) => {
          state.isRefreshing = false,
          state.error = action.payload as string
      })
      .addCase(LoginUser.pending, state => {
        state.isRefreshing = true
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
      .addCase(GetUser.rejected, (state, action) => {
        state.isRefreshing = false
        state.error = action.payload as string
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
  },
})

export const AuthReducer = AuthSlice.reducer
