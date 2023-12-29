import React from "react";
import { NavLink } from "react-router-dom";
// import { withRouter } from "react-router-dom";

const Navbar = (props) => {
  //   setTimeout(() => {
  //     props.history.push("./about");
  //   }, 2000);
  return (
    <>
      <button>
        <NavLink to="/">Home</NavLink>
      </button>
      <button>
        <NavLink to="/about">About</NavLink>
      </button>
      <button>
        <NavLink to="/contact">Contact</NavLink>
      </button>
    </>
  );
};

export default Navbar;
