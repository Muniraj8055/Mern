import React from "react";
import { Outlet } from "react-router-dom";
// import axios from "axios";
import Spinner from "../Spinner";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const user = useSelector((state) => state.auth.user);
  return user?.role === 0 ? <Outlet /> : <Spinner />;
};

export default PrivateRoute;
