import { createSlice } from '@reduxjs/toolkit'
import { LoginUser, RegisterUser, type RegisterUserType as User } from './AuthOperation'

interface AuthIniState {
  token: string
  user: User
  isLogin: boolean
  isRefreshing: boolean
  error: string | number | null
}

const AuthIniState: AuthIniState = {
  user: {} as User,
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
      })
      .addCase(RegisterUser.fulfilled, (state, action) => {
          state.isRefreshing = false,
          state.user = action.payload.user,
          state.token = action.payload.token
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
          state.isRefreshing = false,
          state.user = action.payload.user,
          state.token = action.payload.token
          state.isLogin = true
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.isRefreshing = false,
        state.error = action.payload as string
      })
  },
})

export const AuthReducer = AuthSlice.reducer
