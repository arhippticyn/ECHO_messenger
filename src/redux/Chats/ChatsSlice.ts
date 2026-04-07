import { createSlice } from '@reduxjs/toolkit'
import {
  CreateGroupChat,
  CreatePrivateChat,
  DeleteChat,
  GetAllChats,
} from './ChatsOperation'

type Chat = {
  id: number
  type: 'group' | 'private'
  title: string | null,
  interlocutor_name?: string
}

interface ChatsIniStateType {
  isRefreshing: boolean
  selectChat_id: number | null
  error: string
  chats: Chat[]
}

const ChatsIniState: ChatsIniStateType = {
  isRefreshing: false,
  chats: [],
  error: '',
  selectChat_id: null,
}

const ChatsSlice = createSlice({
  name: 'chats',
  initialState: ChatsIniState,
  reducers: {
    selectChatId: (state, action) => {
      state.selectChat_id = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(CreateGroupChat.pending, state => {
        state.isRefreshing = true
      })
      .addCase(CreateGroupChat.fulfilled, (state, action) => {
        state.isRefreshing = false
        state.chats.push(action.payload)
      })
      .addCase(CreateGroupChat.rejected, (state, action) => {
        state.isRefreshing = false
        state.error = action.payload as string
      })
      .addCase(CreatePrivateChat.pending, state => {
        state.isRefreshing = true
      })
      .addCase(CreatePrivateChat.fulfilled, (state, action) => {
        state.isRefreshing = false
        state.chats.push(action.payload)
      })
      .addCase(CreatePrivateChat.rejected, (state, action) => {
        state.isRefreshing = false
        state.error = action.payload as string
      })
      .addCase(GetAllChats.pending, state => {
        state.isRefreshing = true
      })
      .addCase(GetAllChats.fulfilled, (state, action) => {
        state.isRefreshing = false
        console.log(action.payload)
        state.chats = action.payload
      })
      .addCase(GetAllChats.rejected, (state, action) => {
        state.isRefreshing = false
        state.error = action.payload as string
      })
      .addCase(DeleteChat.pending, state => {
        state.isRefreshing = true
      })
      .addCase(DeleteChat.fulfilled, (state, action) => {
        state.isRefreshing = false
        state.chats = state.chats.filter(
          chat => chat.id !== action.payload
        )
      })
      .addCase(DeleteChat.rejected, (state, action) => {
        state.isRefreshing = false
        state.error = action.payload as string
      })
  },
})

export const { selectChatId } = ChatsSlice.actions

export const ChatsReducer = ChatsSlice.reducer
