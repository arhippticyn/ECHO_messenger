import { configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "./Auth/AuthSlice";
import { UserReducer } from "./Users/UsersSlice";
import { ChatsReducer } from "./Chats/ChatsSlice";
import { MessageReducer } from "./Message/MessageSlice";

export const store = configureStore({
    reducer: {
        auth: AuthReducer,
        users: UserReducer,
        chats: ChatsReducer,
        message: MessageReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch