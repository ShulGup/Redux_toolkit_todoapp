import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTodo } from "../reducer/todoSlice";
import "./Model.css";
import ReactDOM from "react-dom";

export const UpdateTodo = ({ setOnClose, todo }) => {
  const [newText, setNewText] = useState("");
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(updateTodo({ id: todo.id, title: newText }));
    setOnClose(false);
  };

  return ReactDOM.createPortal(
    <div className="ui dimmer show modals visible active">
      <div className="ui raised very padded text container segment">
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder="Update todo title"
        />
        <button onClick={handleEdit}>Update</button>
        <button onClick={() => setOnClose(false)}>Cancel</button>
      </div>
    </div>,
    document.querySelector("#modal")
  );
};
