import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/auth/register`,
        {
          name,
          email,
          password,
          phone,
          address,
          answer,
        }
      );
      if (res.data.success) {
        alert(res.data.message);
        navigate("/login");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center h-96">
        <h1 className="text-2xl text-gray-800 font-semibold mt-24">REGISTER</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded px-8 pt-4 pb-4 mb-3"
        >
          <div className="mb-3">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Name"
            />
          </div>
          <div className="mb-3">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="emai"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
            />
          </div>
          <div className="mb-3">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
          </div>
          <div className="mb-3">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="Phone"
            />
          </div>
          <div className="mb-3">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              placeholder="Address"
            />
          </div>
          <div className="mb-3">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="answer"
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
              placeholder="Enter Your favorite movie"
            />
          </div>
          <div>
            <button
              className="bg-gray-700 w-full hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              REGISTER
            </button>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm text-gray-700">
                Already have an account?
              </span>
              <Link
                className="inline-block ml-2 align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                to="/login"
              >
                Login
              </Link>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
