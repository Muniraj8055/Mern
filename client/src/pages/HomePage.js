import React from "react";
import Layout from "../components/layout/Layout";

const HomePage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user ? user.name : "Guest";

  // console.log(userFromLocalStorage);
  return (
    <Layout>
      <h1 className="text-3xl">Home</h1>
      <h2>Welcome, {username}!</h2>
    </Layout>
  );
};

export default HomePage;
