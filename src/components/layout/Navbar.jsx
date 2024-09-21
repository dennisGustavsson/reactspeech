import React from "react";
import { NavLink } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  // Define the links for the navigation bar
  let linkList = [
    {
      to: "/",
      name: "Transcriber",
    },
    {
      to: "/about",
      name: "About",
    },
  ];

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1 justify-between">
          <div>
            {linkList.map((link) => (
              <NavLink
                key={link.name}
                to={link.to}
                className={({ isActive, isPending }) =>
                  `btn btn-ghost text-xl ${
                    isPending
                      ? "pending"
                      : isActive
                      ? "underline decoration-sky-500"
                      : ""
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
          <div className="mx-4">
            <UserButton />
          </div>
        </div>
      </div>
    </>
    // <nav className="navigation pt-5 text-lg font-semibold text-white text-center">

    // </nav>
  );
};

export default Navbar;
