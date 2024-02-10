import React, { useState, useEffect } from "react";
// import { Outlet } from "react-router-dom";
import { Outlet, useLocation, Navigate } from "react-router-dom";
// import axios from "axios";
import Spinner from "../Spinner";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  useEffect(() => {
    // Simulate fetching user data from an API
    const fetchUserData = () => {
      // Simulate asynchronous operation
      setTimeout(() => {
        setLoading(false); // Finish loading after simulation
      }, 1000);
    };

    // Check if user exists in local storage
    if (user) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [user]);

  // Check if user has access to the admin dashboard
  const isAdmin = user?.role === 0;

  // Redirect user to the current page if isAdmin is true
  if (isAdmin) {
    return loading ? <Spinner /> : <Navigate to={location.pathname} />;
  }

  // Render the admin dashboard if user is authenticated and not an admin
  return loading ? <Spinner /> : <Outlet />;
};

export default AdminRoute;
