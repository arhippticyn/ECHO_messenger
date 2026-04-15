import { createSlice } from '@reduxjs/toolkit'
import { DeleteMessage, GetMessages, PatchMessage, UploadFileMessage } from './MessageOperation'

export type Message = {
  id: number
  type: 'text' | 'image'
  content?: string
  file_url?: string
  sender_id: number
}

interface MessageIniType {
  isRefreshing: boolean
  error: string
  messages: Message[],
  selectPatchMessageId: number | null
}

const MessageIniState: MessageIniType = {
  messages: [],
  isRefreshing: false,
  error: '',
  selectPatchMessageId: null
}

const MessageSlice = createSlice({
  name: 'message',
  initialState: MessageIniState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload)
    },
    SelectMessageId: (state, action) => {
      state.selectPatchMessageId = action.payload
    }
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
      .addCase(DeleteMessage.pending, state => {
        state.isRefreshing = true
      })
      .addCase(DeleteMessage.fulfilled, (state, action) => {
        state.isRefreshing = false
        const deletedId =
          typeof action.payload === 'object'
            ? action.payload.id
            : action.payload
        state.messages = state.messages.filter(
          message => message.id !== deletedId
        )
      })
      .addCase(DeleteMessage.rejected, (state, action) => {
        state.isRefreshing = false
        state.error = action.payload as string
      })
      .addCase(PatchMessage.pending, state => {
        state.isRefreshing = true
      })
      .addCase(PatchMessage.fulfilled, (state, action) => {
        state.isRefreshing = false
        const updatedMessage = action.payload

        const index = state.messages.findIndex(m => m.id === updatedMessage.id)

        if (index !== -1) {
          state.messages[index] = updatedMessage
        }
      })
      .addCase(PatchMessage.rejected, (state, action) => {
        state.isRefreshing = false
        state.error = action.payload as string
      })
      .addCase(UploadFileMessage.pending, (state) => {
        state.isRefreshing = true
      })
      .addCase(UploadFileMessage.fulfilled, (state, action) => {
        state.isRefreshing = false
        state.messages.push(action.payload)
      })
      .addCase(UploadFileMessage.rejected, (state, action) => {
        state.isRefreshing = false
        state.error = action.payload as string
      })
  },
})

export const { addMessage, SelectMessageId } = MessageSlice.actions
export const MessageReducer = MessageSlice.reducer
