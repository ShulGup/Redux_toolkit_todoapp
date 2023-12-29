import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTodo, deleteTask, updateCompleted } from "../reducer/todoSlice";
import { UpdateTodo } from "./Editlist";
import { loadTask, updateTask } from "../reducer/todoSlice";

const TodoList = () => {
  const todos = useSelector((state) => state.todo.todos);
  console.log("todos", todos);
  const dispatch = useDispatch();
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [onclose, setOnClose] = useState(false);
  const loading = useSelector((state) => state.todo.loading);

  const handleToggle = (id) => {
    dispatch(updateCompleted(id));
  };

  const handleDelete = (id) => {
    // dispatch(deleteTodo(id));
    dispatch(deleteTask(id));
    console.log(id);
  };

  const handleUpdate = (id, updatedText) => {
    // Update the task with the new text
    dispatch(updateTask({ id, title: updatedText }));
    // Set the selectedTodo and open the UpdateTodo component
    // dispatch(updateTodo(id, updatedText));
    setSelectedTodo({ id, updatedText });
    setOnClose(true);
  };

  useEffect(() => {
    // Dispatch the loadTask action when the component mounts
    dispatch(loadTask());
  }, [dispatch]);

  return (
    <>
      {loading && <p>Loading...</p>}
      {!loading && (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
                onClick={() => handleToggle(todo.id)}
              >
                {todo.title}
              </span>
              <button onClick={() => handleUpdate(todo.id, todo.title)}>
                Edit
              </button>
              <button onClick={() => handleDelete(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
      {selectedTodo && onclose && (
        <UpdateTodo setOnClose={setOnClose} todo={selectedTodo} />
      )}
    </>
  );
};

export default TodoList;
