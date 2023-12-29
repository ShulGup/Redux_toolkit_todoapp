// import axios from "axios";
import { createAction } from "@reduxjs/toolkit";

// Define the action types
export const apiCallBegan = createAction("api/callBegan");
export const apiCallSuccess = createAction("api/callSuccess");
export const apiCallFailed = createAction("api/callFailed");

// export const Addtodo = (state, action) => {
//   return {
//     type: "ADDTODO",
//     payload: action.payload,
//   };
// };

// export const Deleteuser = (id) => {
//   return {
//     type: "DELETEUSER",
//     id,
//   };
// };

// export const Updateuser = (state, action) => {
//   return {
//     type: "UPDATEUSER",
//     payload: action.payload,
//   };
// };

// export const fetchUsers = () => {
//   return (dispatch) => {
//     axios.get("https://jsonplaceholder.typicode.com/users").then(({ data }) => {
//       dispatch({ type: "FETCH_USER", payload: data });
//     });
//   };
// };
// export const deleteUser = ({ userId }) => {
//   return (dispatch) => {
//     axios
//       .delete(`https://jsonplaceholder.typicode.com/users/${userId}`)
//       .then(() => {
//         dispatch({
//           type: "DELETE_USER",
//           payload: { userId },
//         });
//       });
//   };
// };

// actions.js
// export const fetchData = () => {
//   return async (dispatch) => {
//     try {
//       // Dispatch an action to indicate the start of the fetch
//       dispatch({ type: "FETCH_DATA_START" });

//       // Use the fetch method or any other async operation
//       const response = await fetch(
//         "https://jsonplaceholder.typicode.com/users"
//       );
//       const data = await response.json();

//       // Dispatch an action with the fetched data
//       dispatch({ type: "FETCH_DATA_SUCCESS", payload: data });
//     } catch (error) {
//       // Dispatch an action if there's an error
//       dispatch({ type: "FETCH_DATA_FAILURE", payload: error.message });
//     }
//   };
// };
