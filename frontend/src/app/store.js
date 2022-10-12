import { configureStore } from "@reduxjs/toolkit";
import { todoItemReducer } from "../features/todoItemSlice";
import { categoryListReducer } from "../features/categoryListSlice";
import { userReducer } from "../features/userSlice";

export const store = configureStore({
  reducer: {
    todoList: todoItemReducer,

    categoryList: categoryListReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
