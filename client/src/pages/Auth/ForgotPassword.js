import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [answer, setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/auth/forgot-password`,
        {
          email,
          answer,
          newPassword,
        }
      );
      if (res && res.data.success) {
        alert(res.data.message);
        navigate("/login");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Wrong Email or Answer");
    }
  };
  return (
    <Layout>
      <div className="flex flex-col justify-center items-center h-96">
        <h1 className="text-2xl text-gray-800 font-semibold mt-20">
          RESET PASSWORD
        </h1>
        <form
          onSubmit={handleSubmit}
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
              name="answer"
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
              placeholder="Enter your favorite Movie"
            />
          </div>
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              placeholder="Enter New Password"
            />
          </div>
          <div>
            <button
              className="bg-gray-700 w-full hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="Submit"
            >
              RESET PASSWORD
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
