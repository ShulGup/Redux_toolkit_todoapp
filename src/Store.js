// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./reducer/todoSlice";
import error from "./middleware/error"; // Change this path
import api from "./middleware/api"; // Change this path

export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), api, error],
});
