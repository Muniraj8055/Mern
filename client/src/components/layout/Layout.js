import React from "react";
import Header from "./Header";
import Footer from "./Footer";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main
        style={{
          minHeight: "77vh",
          marginTop: "50px",
          backgroundColor: "ButtonHighlight",
        }}
      >
        {/* <ToastContainer className="flex flex-col items-center justify-center h-2/6" /> */}
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
