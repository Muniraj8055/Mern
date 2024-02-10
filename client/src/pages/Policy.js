import React from "react";
import Layout from "../components/layout/Layout";

const Policy = () => {
  return (
    <Layout>
      <div className=" p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="mb-4">
          At Go-Kart, we take your privacy seriously. This Privacy Policy
          explains how we collect, use, disclose, and safeguard your information
          when you visit our website.
        </p>
        <h2 className="text-xl font-semibold mb-2">Information We Collect</h2>
        <p className="mb-4">
          We collect information from you when you register on our site, place
          an order, subscribe to our newsletter, respond to a survey, fill out a
          form, or enter information on our site.
        </p>
        {/* Include other sections such as Use of Information, Disclosure of Information, Security of Information, etc. */}
        <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this Privacy Policy, please contact
          us:
        </p>
        <ul className="list-disc pl-8 mb-4">
          <li>Email: info@example.com</li>
          <li>Phone: +1234567890</li>
          <li>Address: 123 Street, City, Country</li>
        </ul>
      </div>
    </Layout>
  );
};

export default Policy;
