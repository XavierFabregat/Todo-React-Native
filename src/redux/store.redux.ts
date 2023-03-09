import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user.slice";
import todoReducer from "./todo.slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    todos: todoReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;