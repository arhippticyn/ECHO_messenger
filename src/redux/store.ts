import { configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "./Auth/AuthSlice";
import { UserReducer } from "./Users/UsersSlice";
import { ChatsReducer } from "./Chats/ChatsSlice";

export const store = configureStore({
    reducer: {
        auth: AuthReducer,
        users: UserReducer,
        chats: ChatsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch