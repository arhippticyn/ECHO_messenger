import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../api/api'

export type ChatTypeGroupCreate = {
  title: string
  participants: number[]
}

export type ChatTypePrivateCreate = {
  user_id: number
}

export const CreateGroupChat = createAsyncThunk(
  'chats/CreateGroupChat',
  async (chat: ChatTypeGroupCreate, { rejectWithValue }) => {
    try {
      const response = await api.post('/chats/group', chat)

      return response.data
    } catch (e: any) {
      return rejectWithValue(e.message)
    }
  }
)

export const CreatePrivateChat = createAsyncThunk(
  'chats/CreatePrivateChat',
  async (chat: ChatTypePrivateCreate, { rejectWithValue }) => {
    try {
      const response = await api.post('/chats/private', chat)

      return response.data
    } catch (e: any) {
      return rejectWithValue(e.message)
    }
  }
)

export const GetAllChats = createAsyncThunk(
  'chats/GetAllChats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/chats')

      return response.data
    } catch (e: any) {
      return rejectWithValue(e.message)
    }
  }
)

export const DeleteChat = createAsyncThunk(
  'chats/DeleteChat',
  async (chat_id: number, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/chats/${chat_id}`)

      return response.data
    } catch (e: any) {
      return rejectWithValue(e.message)
    }
  }
)

export const AddUsersGroupO = createAsyncThunk(
  'chats/AddUsersGroup',
  async (
    { chat_id, user_id }: { chat_id: number; user_id: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post(
        `/chats/${chat_id}/participants/${user_id}`
      )

      return response.data
    } catch (e: any) {
      return rejectWithValue(e.message)
    }
  }
)

export const DeleteUsersGroup = createAsyncThunk(
  'chats/DeleteUsersGroup',
  async (
    { chat_id, user_id }: { chat_id: number; user_id: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.delete(
        `/chats/${chat_id}/participants/${user_id}`
      )
      return response.data
    } catch (e: any) {
      return rejectWithValue(e.message)
    }
  }
)
