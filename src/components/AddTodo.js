import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, addNewTask } from "../reducer/todoSlice";

const AddTodo = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  // Generate a unique ID using uuidv4()

  // Include the generated ID in the payload
  const handleAdd = () => {
    if (title.trim() !== "") {
      dispatch(addNewTask({ title, completed: false }));
      setTitle("");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new todo"
      />
      <button onClick={handleAdd}>Add Todo</button>
    </div>
  );
};

export default AddTodo;
