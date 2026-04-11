import { createSlice } from '@reduxjs/toolkit'
import { GetMessages } from './MessageOperation'

export type Message = {
  id: number
  type: 'text' | 'image'
  content?: string
  file_url?: string
  owner_id: number
}

interface MessageIniType {
  isRefreshing: boolean
  error: string
  messages: Message[]
}

const MessageIniState: MessageIniType = {
  messages: [],
  isRefreshing: false,
  error: '',
}

const MessageSlice = createSlice({
  name: 'message',
  initialState: MessageIniState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload)
    },
  },
  extraReducers: builder => {
    builder
      .addCase(GetMessages.pending, state => {
        state.isRefreshing = true
      })
      .addCase(GetMessages.fulfilled, (state, action) => {
        state.isRefreshing = false
        state.messages = action.payload
      })
      .addCase(GetMessages.rejected, (state, action) => {
        state.isRefreshing = false
        state.error = action.payload as string
      })
  },
})

export const { addMessage } = MessageSlice.actions
export const MessageReducer = MessageSlice.reducer
