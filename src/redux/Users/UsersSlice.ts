import { createSlice } from "@reduxjs/toolkit";
import type { UserType } from "../Auth/AuthOperation";
import { GetUsersById, GetUsersBySearch } from "./UsersOperation";


interface UserState {
    users: null | UserType[],
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
              .addCase(GetUsersById.pending, (state) => {
                state.isRefreshing = true
              })
              .addCase(GetUsersById.fulfilled, (state, action) => {
                state.isRefreshing = false
                state.users = action.payload
              })
    }
})

export const UserReducer = UsersSlice.reducer