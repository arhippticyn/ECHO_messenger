import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../api/api'

export const GetMessages = createAsyncThunk(
  'messages/GetMessages',
  async (chat_id: number, { rejectWithValue }) => {
    try {
      const response = await api.get(`/message/${chat_id}/messages`)

      return response.data
    } catch (e: any) {
      return rejectWithValue(e.message)
    }
  }
)

export const UploadFileMessage = createAsyncThunk(
  'messages/UploadFileMessage',
  async (
    { chat_id, file }: { chat_id: number; file: File },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await api.post(`/message/${chat_id}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      return response.data
    } catch (e: any) {
      return rejectWithValue(e.message)
    }
  }
)


