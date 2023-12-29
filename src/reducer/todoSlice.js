// src/features/todo/todoSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiCallBegan } from "../action/ActionCreator";

const url = "/todos";

// Define an async thunk for making API calls
export const fetchTodo = createAsyncThunk(
  "todo/fetchTodo",
  async (_, thunkAPI) => {
    try {
      // Dispatch the 'apiRequested' action before making the API call
      thunkAPI.dispatch(apiRequested());

      // Make the API call
      const response = await axios.get(url);

      // Dispatch the 'getTodo' action with the retrieved data
      return response.data;
    } catch (error) {
      // Dispatch the 'apiRequestedFailed' action in case of an error
      thunkAPI.dispatch(apiRequestedFailed());

      // Dispatch an error action or handle errors as needed
      console.error("Error fetching todos:", error.message);
      throw error;
    }
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
    loading: false,
    error: null,
  },
  reducers: {
    apiRequested: (state, action) => {
      state.loading = true;
    },
    apiRequestedFailed: (state, action) => {
      state.loading = false;
      state.error = "Failed to fetch todos.";
    },
    getTodo: (state, action) => {
      state.todos = action.payload;
      state.loading = false;
    },
    addTodo: (state, action) => {
      const newTodo = action.payload; // Assuming your API response includes the newly added task with its ID
      state.todos.push(newTodo);
    },
    toggleTodo: (state, action) => {
      const { id, completed } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.completed = completed;
      }
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    },
    updateTodo: (state, action) => {
      const { id, title } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.title = title;
      }
    },
    todoCompleted: (state, action) => {
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      state.todos[index].completed = action.payload.completed;
    },
  },
  extraReducers: (builder) => {
    // Handle the 'fulfilled' action of the async thunk
    builder.addCase(fetchTodo.fulfilled, (state, action) => {
      state.todos = action.payload;
      state.loading = false;
    });
  },
});

export const {
  addTodo,
  getTodo,
  toggleTodo,
  deleteTodo,
  updateTodo,
  apiRequested,
  apiRequestedFailed,
  todoCompleted,
} = todoSlice.actions;
export default todoSlice.reducer;

// // Action creators using the async thunk
// export const loadTask = () => fetchTodo();

export const loadTask = () =>
  apiCallBegan({
    url,
    onStart: apiRequested.type, // Correct the action type to 'apiRequested'
    onSuccess: getTodo.type,
    onError: apiRequestedFailed.type,
  });

export const addNewTask = (todo) =>
  apiCallBegan({
    url,
    method: "POST",
    data: todo,
    onSuccess: addTodo.type,
  });

export const updateTask = ({ id, title }) =>
  apiCallBegan({
    url: `${url}/${id}`,
    method: "PUT",
    data: { id, title },
    onSuccess: updateTodo.type,
  });

export const updateCompleted = (id) =>
  apiCallBegan({
    url: `${url}/${id}`,
    method: "PATCH",
    data: { id, completed: true }, // Assuming you want to mark the task as completed
    onSuccess: toggleTodo.type,
  });
export const deleteTask = (id) =>
  apiCallBegan({
    url: `${url}/${id}`,
    method: "DELETE",
    data: { id },
    onSuccess: deleteTodo.type,
  });
