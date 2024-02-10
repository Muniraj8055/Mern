import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  // Retrieve the user information from local storage
  const userString = localStorage.getItem("user");

  // Parse the JSON string into a JavaScript object
  const user = JSON.parse(userString);
  // console.log(user.token);
  const token = user.token;
  // console.log(token);

  useEffect(() => {
    const { email, address, phone, name } = user;
    setName(name);
    setEmail(email);
    setPhone(phone);
    setAddress(address);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/auth/profile`,
        {
          name,
          email,
          password,
          phone,
          address,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (data?.error) {
        alert(data?.error);
      } else {
        // Update user information in local storage
        localStorage.setItem(
          "user",
          JSON.stringify({ ...user, ...data.updatedUser })
        );
        alert("Profile updated successfully");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <Layout>
      <div class="container mx-auto">
        <div class="flex flex-col md:flex-row py-4">
          <aside class="w-full md:w-1/4 lg:w-1/5 p-4 bg-gray-200">
            <div>
              {/* <!-- navigation --> */}
              <ul class="flex flex-col overflow-hidden">
                <UserMenu />
              </ul>
            </div>
          </aside>
          <div className="w-full md:w-3/4 lg:w-4/5 p-4 mx-auto max-w-full">
            <h3 className="mb-4 mt-0 text-3xl text-center font-bold">POFILE</h3>
            <div className="flex flex-col justify-center items-center h-96">
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
                    placeholder="Email"
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                    placeholder="Address"
                  />
                </div>

                <div>
                  <button
                    className="bg-gray-700 w-full hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    UPDATE PROFILE
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
