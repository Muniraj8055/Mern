import React from "react";
import { Outlet } from "react-router-dom";
// import axios from "axios";
import Spinner from "../Spinner";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const user = useSelector((state) => state.auth.user);
  return user?.role === 1 ? <Outlet /> : <Spinner path="" />;
};

export default AdminRoute;
