import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../api/api'
import type { MESSAGE_STATUS } from '../../types/status'




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
    { chat_id, file }: { chat_id: number; file: FormData },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post(`/message/${chat_id}/upload`, file)

      return response.data
    } catch (e: any) {
      return rejectWithValue(e.message)
    }
  }
)

export const DeleteMessage = createAsyncThunk(
  'messages/DeleteMessage',
  async (
    { chat_id, id }: { chat_id: number; id: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.delete(`/message/${chat_id}/message/${id}`)

      return response.data
    } catch (e: any) {
      return rejectWithValue(e.message)
    }
  }
)

export const PatchMessage = createAsyncThunk(
  'messages/PatchMessage',
  async (
    {
      chat_id,
      id,
      new_content,
    }: { chat_id: number; id: number; new_content: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.patch(`/message/${chat_id}/message/${id}`, {
        new_content,
      })

      return response.data
    } catch (e: any) {
      return rejectWithValue(e.message)
    }
  }
)



export const AddMessageStatus = createAsyncThunk('messages/AddMessageStatus', async ({chat_id, message_id, type}: {chat_id: number, message_id: number, type: MESSAGE_STATUS}, {rejectWithValue}) => {
  try {
    const response = await api.post(`/message/${chat_id}/${message_id}/${type}`)

    return response.data
  } catch (e: any) {
    return rejectWithValue(e.message)
  }
})

export const GetMessageStatus = createAsyncThunk('messages/GetMessageStatus', async ({chat_id, message_id}: {chat_id: number, message_id: number}, {rejectWithValue}) => {
  try {
    const response = await api.get(`/message/${chat_id}/${message_id}`)

    return response.data
  } catch (e: any) {
    return rejectWithValue(e.message)
  }
})