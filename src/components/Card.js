import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from "../action/ActionCreator";

export const Card = () => {
  const { id } = useParams();
  const [userId, setUserId] = React.useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []); // Include dispatch in the dependency array

  useEffect(() => {
    dispatch(deleteUser(userId));
  }, [userId, dispatch]);

  // Check if users is null before mapping over it
  if (!users) {
    return <p>Loading...</p>; // You can show a loading indicator or handle the loading state appropriately
  }

  // Filter users based on the id parameter
  const selectedUser = users.find((user) => user.id === parseInt(id, 10));

  // If the user with the specified id is not found, display a message
  if (!selectedUser) {
    return <p>User not found</p>;
  }

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
    setUserId(id);
    navigate("/contact");
    console.log("afterdelete", users.length);
  };

  return (
    <div className="contact-css" key={selectedUser.id}>
      <div>
        <h2>{selectedUser.name}</h2>
        <p>{selectedUser.company.catchPhrase}</p>
        <button onClick={() => handleDelete(selectedUser.id)}>Delete</button>
      </div>
    </div>
  );
};
