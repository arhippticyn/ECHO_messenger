import type { RootState } from "../store";

export const selectMessages = (state: RootState) => state.messsage.messages
export const selectPatchMessageId = (state: RootState) => state.messsage.selectPatchMessageId