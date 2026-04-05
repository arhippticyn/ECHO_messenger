import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/api";




export const GetUsersBySearch = createAsyncThunk('users/GetUsersBySearch', async (search: string, { rejectWithValue }) => {
    try {
        const response = await api.get(`/users?search=${search}`)

        return response.data
    } catch (e: any) {
        return rejectWithValue(e.message)
    }
})