import React from "react";
import "./navbar.scss";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="nav">
      <ul className="menu">
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/acrhive"}>Archive</NavLink>
        <NavLink to={"/login"}>Login</NavLink>
      </ul>
    </div>
  );
};

export default Navbar;
