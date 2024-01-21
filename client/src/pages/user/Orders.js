import React from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "./../../components/layout/UserMenu";

const Orders = () => {
  return (
    <Layout>
      <div class="container mx-auto">
        <div class="flex flex-row flex-wrap py-4">
          <aside class="w-full sm:w-1/3 md:w-1/4 px-2">
            <div class="top-0 p-4 w-full -z-7">
              {/* <!-- navigation --> */}
              <ul class="flex flex-col overflow-hidden">
                <UserMenu />
              </ul>
            </div>
          </aside>
          <h3>Orders</h3>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
