import type { RootState } from "../store";

export const selectMessages = (state: RootState) => state.message.messages
export const selectPatchMessageId = (state: RootState) => state.message.selectPatchMessageId
export const selectMessageStatus = (state: RootState) => state.message.message_status
