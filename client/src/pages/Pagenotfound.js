import React from "react";
import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";

const Pagenotfound = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-96 ">
        <h1 className="text-8xl font-medium">404</h1>
        <h2 className="text-2xl">Oops ! Page Not Found</h2>
        <Link
          to="/"
          className="text-black border rounded-md p-2.5 mt-2.5 hover:bg-gray-800 hover:text-white"
        >
          Go Back
        </Link>
      </div>
    </Layout>
  );
};

export default Pagenotfound;
