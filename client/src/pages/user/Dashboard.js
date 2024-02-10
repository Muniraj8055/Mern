import React from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";

const Dashboard = () => {
  const userString = localStorage.getItem("user");

  // Parse the JSON string into a JavaScript object
  const user = userString ? JSON.parse(userString) : null;

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

export default Dashboard;
