import { Link } from "react-router-dom";
import { Model } from "./Model";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../action/ActionCreator";

export const Contact = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);
  console.log(users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  // Check if users is null before mapping over it
  if (!users) {
    return <p>Loading...</p>; // You can show a loading indicator or handle the loading state appropriately
  }

  return (
    <>
      {users.map((user) => {
        return (
          <div className="contact-css" key={user.id}>
            <div>
              <Link to={`/contact/${user.id}`}>{user.name}</Link>
              <p>{user.company.catchPhrase}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};
