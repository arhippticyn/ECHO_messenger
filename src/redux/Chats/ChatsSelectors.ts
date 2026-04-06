import type { RootState } from "../store";

export const selectChats = (state: RootState) => state.chats.chats
export const selectChatId = (state: RootState) => state.chats.selectChat_id