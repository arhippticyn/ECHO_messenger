import type { RootState } from "../store";

export const selectUsers = (state: RootState) => state.users.users
export const selectUserId = (state: RootState) => state.users.user_id