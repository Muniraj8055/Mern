import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "./../../components/layout/UserMenu";
import axios from "axios";
import moment from "moment";

const Orders = () => {
  const userString = localStorage.getItem("user");

  // Parse the JSON string into a JavaScript object
  const user = JSON.parse(userString);

  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/auth/orders`,
        {
          headers: {
            Authorization: user.token,
          },
        }
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user.token) getOrders();
  }, [user.token]);

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
            <h3 className="mb-4 mt-0 text-3xl text-center font-bold">ORDERS</h3>
            {orders?.map((o, i) => (
              <div
                className="border shadow-lg rounded-lg mb-8 overflow-hidden"
                key={i}
              >
                <div className="overflow-x-auto">
                  <table className="w-full table-auto">
                    <thead className="bg-gray-800 text-white text-left">
                      <tr>
                        <th className="px-4 py-2">#</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Buyer</th>
                        <th className="px-4 py-2">Date</th>
                        <th className="px-4 py-2">Payment</th>
                        <th className="px-4 py-2">Quantity</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      <tr>
                        <td className="px-4 py-2">{i + 1}</td>
                        <td className="px-4 font-semibold py-2">{o?.status}</td>
                        <td className="px-4 py-2">{o?.buyer?.name}</td>
                        <td className="px-4 py-2">
                          {moment(o?.createAt).fromNow()}
                        </td>
                        <td className="px-4 py-2">
                          {o?.payment.success ? "Success" : "Failed"}
                        </td>
                        <td className="px-4 py-2">{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                  {o?.products?.map((p, j) => (
                    <div
                      className="bg-white shadow-md rounded-lg flex flex-row items-center p-4"
                      key={j}
                    >
                      <div className="w-1/4">
                        <img
                          src={`${process.env.REACT_APP_API}/api/product/product-photo/${p._id}`}
                          alt={p.name}
                          className="w-full"
                        />
                      </div>
                      <div className="w-3/4 ml-4">
                        <p className="text-lg font-semibold">{p.name}</p>
                        <p className="text-sm">
                          {p.description.substring(0, 30)}
                        </p>
                        <p className="text-lg text-gray-800">
                          Price: ${p.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
