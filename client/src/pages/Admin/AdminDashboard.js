import React from "react";
import Layout from "../../components/layout/Layout";
// import axios from "axios";
import AdminMenu from "../../components/layout/AdminMenu";

const AdminDashboard = () => {
  const userString = localStorage.getItem("user");

  // Parse the JSON string into a JavaScript object
  const user = userString ? JSON.parse(userString) : null;

  return (
    <Layout>
      <div class="container mx-auto">
        <div class="flex flex-row flex-wrap py-4">
          <aside class="w-full sm:w-1/3 md:w-1/4 px-2">
            <div class="top-0 p-4 w-full -z-7">
              {/* <!-- navigation --> */}
              <ul class=" overflow-hidden">
                <AdminMenu />
              </ul>
            </div>
          </aside>
          <main role="main" class="w-full sm:w-2/3 md:w-3/4 pt-1 px-2">
            <div className="w-full p-6 shadow-lg lg:max-w-lg">
              <div className="space-y-2">
                <h4 className="text-xl  font-semibold">NAME: {user.name}</h4>
                <h4 className="text-xl  font-semibold">EMAIL: {user.email}</h4>
                <h4 className="text-xl  font-semibold">PHONE: {user.phone}</h4>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
