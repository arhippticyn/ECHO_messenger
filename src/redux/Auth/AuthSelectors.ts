import type { RootState } from "../store";

export const selectUser = (state: RootState) => state.auth.user
export const selectToken = (state: RootState) => state.auth.token
export const selectIsLogin = (state: RootState) => state.auth.isLogin
export const selectIsRefreshing = (state: RootState) => state.auth.isRefreshing
export const selectError = (state: RootState) => state.auth.error
