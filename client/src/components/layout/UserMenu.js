import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div>
      <div className=" text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full">
        <h4 className="block w-full px-4 py-2 text-white bg-blue-700 border-b border-gray-200 rounded-t-lg  dark:bg-gray-800 dark:border-gray-600">
          USER DASHBOARD
        </h4>
        <NavLink
          to="/dashboard/user/orders"
          className="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
        >
          Orders
        </NavLink>
        <NavLink
          to="/dashboard/user/profile"
          className="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
        >
          Profile
        </NavLink>
      </div>
    </div>
  );
};

export default UserMenu;
