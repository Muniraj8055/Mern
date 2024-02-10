import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

// toast.configure();

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-ButtonHighlight">
        <div className="container mx-auto px-4 md:px-0 py-10">{children}</div>
        <ToastContainer />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
