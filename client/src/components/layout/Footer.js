import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" bg-gray-800 text-white p-4">
      <div className="container mx-auto text-center">
        <p>All rights reserved &copy; Go-kart</p>
        <p className="footer text-center mt-3">
          <Link to="/about" className="pr-2">
            About
          </Link>
          |
          <Link to="/contact" className="px-2">
            Contact
          </Link>
          |
          <Link to="/policy" className="pl-2">
            Policy
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
