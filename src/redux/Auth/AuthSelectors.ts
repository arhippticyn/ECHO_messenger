import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { api } from "../../api/api";

export type RegisterUserType = {
    email: string,
    username: string,
    password: string
}

type LoginUserType = {
    email: string,
    password: string
}

export const RegisterUser = createAsyncThunk('auth/RegisterUser', async (user: RegisterUserType, { rejectWithValue }) => {
    try {
        const response = await api.post('/auth/register', user)

        return response.data
    } catch (e: any) {
        return rejectWithValue(e.message)
    }
})

export const LoginUser = createAsyncThunk('/auth/LoginUser', async (user: LoginUserType, { rejectWithValue }) => {
    try {
        const response = await api.post('/auth/login', user)

        return response.data
    } catch (e: any) {
        return rejectWithValue(e.message)
    }
})