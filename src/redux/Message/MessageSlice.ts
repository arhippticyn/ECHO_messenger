import { createSlice } from '@reduxjs/toolkit'
import {
  AddMessageStatus,
  DeleteMessage,
  GetMessages,
  GetMessageStatus,
  PatchMessage,
  UploadFileMessage,
} from './MessageOperation'
import type { MESSAGE_STATUS } from '../../types/status'

export type Message = {
  id: number
  type: 'text' | 'image'
  content?: string
  file_url?: string
  sender_id: number
}

export type MessageStatus = {
  id: number
  message_id: number
  user_id: number
  status: MESSAGE_STATUS
  updated_at: string
}

interface MessageIniType {
  isRefreshing: boolean
  error: string
  messages: Message[]
  selectPatchMessageId: number | null
  message_status: MessageStatus[] | null
}

const MessageIniState: MessageIniType = {
  messages: [],
  isRefreshing: false,
  error: '',
  selectPatchMessageId: null,
  message_status: null,
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
      .addCase(UploadFileMessage.pending, state => {
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
      .addCase(AddMessageStatus.pending, state => {
        state.isRefreshing = true
      })
      .addCase(AddMessageStatus.fulfilled, (state, action) => {
        state.isRefreshing = false
        if (!state.message_status) {
          state.message_status = []
        }
        const index = state.message_status.findIndex(
          s =>
            s.message_id === action.payload.message_id &&
            s.user_id === action.payload.user_id
        )

        if (index !== -1) {
          state.message_status[index] = action.payload
        } else {
          state.message_status.push(action.payload)
        }
      })
      .addCase(AddMessageStatus.rejected, (state, action) => {
        state.isRefreshing = false
        state.error = action.payload as string
      })
      .addCase(GetMessageStatus.pending, state => {
        state.isRefreshing = true
      })
      .addCase(GetMessageStatus.fulfilled, (state, action) => {
        state.isRefreshing = false
        if (!state.message_status) {
          state.message_status = []
        }

        const incoming: MessageStatus[] = action.payload

        incoming.forEach(newStatus => {
          const index = state.message_status!.findIndex(
            s =>
              s.message_id === newStatus.message_id &&
              s.user_id === newStatus.user_id
          )
          if (index !== -1) {
            state.message_status![index] = newStatus
          } else {
            state.message_status!.push(newStatus)
          }
        })
      })
      .addCase(GetMessageStatus.rejected, (state, action) => {
        state.isRefreshing = false
        state.error = action.payload as string
      })
  },
})

export const { addMessage, SelectMessageId } = MessageSlice.actions
export const MessageReducer = MessageSlice.reducer
