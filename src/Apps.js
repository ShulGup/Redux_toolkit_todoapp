import React from "react";
import { Provider } from "react-redux";
import { store } from "./Store";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";

const Apps = () => {
  return (
    <Provider store={store}>
      <div>
        <h1>Todo App</h1>
        <AddTodo />
        <TodoList />
      </div>
    </Provider>
  );
};

export default Apps;
