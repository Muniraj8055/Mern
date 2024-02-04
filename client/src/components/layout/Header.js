import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/authAction";
import { fetchCategories } from "../../redux/actions/categoryAction";
import { Badge } from "antd";

const Header = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const cart = useSelector((state) => state.cart.carts);
  console.log(cart);
  let [open, setOpen] = useState(false);
  const [dropdown, setDropDown] = useState(false);
  const [catDropDown, setCatDropDown] = useState(false);
  const navigate = useNavigate();

  // console.log(cartItems);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Retrieve the user information from local storage
  const userString = localStorage.getItem("user");

  // Parse the JSON string into a JavaScript object
  const user = userString ? JSON.parse(userString) : null;

  // Access the 'name' property if the user object is not null
  const username = user ? user.name : null;

  const handleLogout = () => {
    // Clear user from local storage
    localStorage.clear();

    // Dispatch the logout action
    dispatch(logout());

    alert("You have logged out successfully");
    // Redirect to the login page or any other page after logout
    navigate("/login");
  };

  return (
    <>
      <div className="navbar shadow-md w-full fixed top-0 left-0">
        <div className="md:flex items-center justify-between bg-gray-700 py-1 md:px-10 px-7">
          <div className="font-bold text-xl cursor-pointer flex items-center font-[Poppins] text-white">
            <span className="text-2xl mr-1 pt-2 ">
              <ion-icon name="bag-check-sharp"></ion-icon>
              <Link to="/" className="logo">
                Go-Kart
              </Link>
            </span>
          </div>
          <div
            onClick={() => setOpen(!open)}
            className="text-3xl text-white absolute right-8 top-3 cursor-pointer md:hidden"
          >
            <ion-icon name={open ? "close" : "menu"}></ion-icon>
          </div>
          <ul
            className={`md:flex md:items-center md:pb-0 pb-3 absolute md:static bg-gray-700 md:z-auto z-[-1]
          left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-10 opacity-100" : "top-[-490px]"
          } md:opacity-100  duration-500 opacity-0`}
          >
            <li className="md:ml-8 text-xl md:my-0 my-7">
              <NavLink
                to="/"
                className="nav-link text-white hover:text-gray-400 duration-500"
              >
                Home
              </NavLink>
            </li>
            <li className="md:ml-8 text-xl md:my-0 my-7 relative">
              <button
                onClick={() => setCatDropDown((prev) => !prev)}
                className="relative outline-none focus:outline-none nav-link text-white hover:text-gray-400 duration-500"
              >
                CATEGORY
              </button>
              {/* dropdown */}
              {catDropDown && (
                <div className="lg:absolute bg-gray-50 rounded-md p-2 max-h-36 overflow-y-auto">
                  <ul className="space-y-2">
                    {categories.map((c) => (
                      <li
                        key={c._id}
                        className="flex p-2 cursor-pointer font-medium text-sm text-gray-600 rounded hover:bg-gray-200 hover:text-black"
                      >
                        <Link to={`/category/${c.slug}`}>{c.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>

            <li className="md:ml-8 text-xl md:my-0 my-7">
              <NavLink to="/cart">
                <Badge
                  className="nav-link text-white text-xl  hover:text-gray-400 duration-500"
                  count={cart.length}
                  showZero
                >
                  Cart
                </Badge>
              </NavLink>
            </li>
            {!user ? (
              <>
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
              </>
            ) : (
              <>
                <li className="md:ml-8 text-xl md:my-0 my-7">
                  <button
                    onClick={() => setDropDown((prev) => !prev)}
                    className=" relative outline-none focus:outline-none nav-link text-white hover:text-gray-400 duration-500"
                  >
                    <svg
                      class="inline w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 19a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 11 14H9a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 10 19Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                    {username}
                  </button>
                  {/* dropdown */}
                  {dropdown && (
                    <div className="lg:absolute bg-gray-50 right-1 rounded-md p-2  ">
                      <ul className="space-y-2 ">
                        <li className="flex p-2 font-medium text-sm text-gray-600 rounded hover:bg-gray-200 hover:text-black">
                          <Link
                            to={`/dashboard/${
                              user?.role === 1 ? "admin" : "user"
                            }`}
                          >
                            Dashboard
                          </Link>
                        </li>
                        <li className="flex p-2 font-medium text-sm text-gray-600 rounded hover:bg-gray-200 hover:text-black">
                          <Link to="/login" onClick={handleLogout}>
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
