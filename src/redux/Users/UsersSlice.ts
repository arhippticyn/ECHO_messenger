import { createSlice } from "@reduxjs/toolkit";
import type { UserType } from "../Auth/AuthOperation";
import { GetUsersBySearch } from "./UsersOperation";


interface UserState {
    users: null | UserType[],
    user_id: null | number
    isRefreshing: boolean,
    error: null | string
}

const UserIniState:UserState = {
    users: null,
    isRefreshing: false,
    error: null
}

const UsersSlice = createSlice({
    name: 'users',
    initialState: UserIniState,
    reducers: {
      selectedUser(state, action) {
        state.user_id = action.payload
      }
    },
    extraReducers: (builber) => {
        builber
              .addCase(GetUsersBySearch.pending, (state) => {
                state.isRefreshing = true
              })
              .addCase(GetUsersBySearch.fulfilled, (state, action) => {
                state.isRefreshing = false
                state.users = action.payload
              })
              .addCase(GetUsersBySearch.rejected, (state, action) => {
                state.isRefreshing = false
                state.error = action.payload as string
              })
    }
})

export const { selectedUser } = UsersSlice.actions
export const UserReducer = UsersSlice.reducer