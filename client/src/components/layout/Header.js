import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";

const Header = () => {
  let [open, setOpen] = useState(false);
  return (
    <>
      <div className="navbar shadow-md w-full fixed top-0 left-0">
        <div className="md:flex items-center justify-between bg-gray-700 py-2 md:px-10 px-7">
          <div className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-white">
            <span className="text-2xl mr-1 pt-2 ">
              <ion-icon name="bag-check-sharp"></ion-icon>
              <Link to="/" className="logo">
                Go-Kart
              </Link>
            </span>
          </div>
          <div
            onClick={() => setOpen(!open)}
            className="text-3xl text-white absolute right-8 top-6 cursor-pointer md:hidden"
          >
            <ion-icon name={open ? "close" : "menu"}></ion-icon>
          </div>
          <ul
            className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-gray-700 md:z-auto z-[-1]
          left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-14 opacity-100" : "top-[-490px]"
          } md:opacity-100 opacity-0`}
          >
            <li className="md:ml-8 text-xl md:my-0 my-7">
              <NavLink
                to="/"
                className="nav-link text-white hover:text-gray-400 duration-500"
              >
                Home
              </NavLink>
            </li>
            <li className="md:ml-8 text-xl md:my-0 my-7">
              <NavLink
                to="/category"
                className="nav-link text-white hover:text-gray-400 duration-500"
              >
                Category
              </NavLink>
            </li>
            <li className="md:ml-8 text-xl md:my-0 my-7">
              <NavLink
                to="/register"
                className="nav-link text-white hover:text-gray-400 duration-500"
              >
                Register
              </NavLink>
            </li>
            <li className="md:ml-8 text-xl md:my-0 my-7">
              <NavLink
                to="/login"
                className="nav-link text-white hover:text-gray-400 duration-500"
              >
                Login
              </NavLink>
            </li>
            <li className="md:ml-8 text-xl md:my-0 my-7">
              <NavLink
                to="/cart"
                className="nav-link text-white hover:text-gray-400 duration-500"
              >
                Cart(0)
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
