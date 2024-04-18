import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="container m-4 text-lg font-semibold text-white">
      <NavLink
        to="/"
        className={({ isActive, isPending }) =>
          `mx-2 ${
            isPending
              ? "pending"
              : isActive
              ? "underline decoration-sky-500"
              : ""
          }`
        }
      >
        Transcribe
      </NavLink>

      <NavLink
        to="/about"
        className={({ isActive, isPending }) =>
          `mx-2 ${
            isPending
              ? "pending"
              : isActive
              ? "underline decoration-sky-500"
              : ""
          }`
        }
      >
        About
      </NavLink>
    </nav>
  );
};

export default Navbar;
