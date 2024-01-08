import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { Link, useNavigate, useLocation } from "react-router-dom";
// import { toast } from "react-toastify";
// import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import { loginUser } from "./../../redux/actions/authAction";

const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    // Dispatch the loginUser action with credentials and history object
    dispatch(loginUser({ email, password }, navigate, location));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.post(
  //       `${process.env.REACT_APP_API}/api/auth/login`,
  //       {
  //         email,
  //         password,
  //       }
  //     );
  //     if (res.data.success) {
  //       navigate("/");
  //       alert(res.data.message);
  //     } else {
  //       alert(res.data.message);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     alert("Wrong Email or Password");
  //     // toast.error("Wrong Email or Password");
  //   }
  // };

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center h-96">
        <h1 className="text-2xl text-gray-800 font-semibold mt-20">LOGIN</h1>
        <form
          onSubmit={handleLogin}
          className="bg-white shadow-lg r
          ounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
            />
          </div>
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
          </div>
          <div>
            <button
              className="bg-gray-700 w-full hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="Submit"
            >
              LOGIN
            </button>
            <div className="mt-2 flex items-center justify-between"></div>
            <span className="text-sm text-gray-700">
              Don't have an account?
            </span>
            <Link
              className="inline-block ml-2 align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              to="/register"
            >
              Register
            </Link>
            <div className="mt-2 flex items-center">
              <Link
                className="ml-11 font-medium text-sm text-blue-500 hover:text-blue-800"
                to="/forgot-password"
              >
                Forgot password
              </Link>
            </div>
            {auth.error && (
              <p className="text-red-500 text-xs mt-1 text-center">
                {auth.error}
              </p>
            )}
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
