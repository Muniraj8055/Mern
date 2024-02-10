import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import axios from "axios";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/product/get-product`
      );
      setProducts(data.products);
      console.log(products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row py-4">
          <aside className="w-full md:w-1/4 lg:w-1/5 p-4 bg-gray-200">
            <div>
              {/* <!-- navigation --> */}
              <ul className="flex flex-col overflow-hidden">
                <AdminMenu />
              </ul>
            </div>
          </aside>
          <div className="w-full md:w-3/4 lg:w-4/5 p-4 mx-auto max-w-full">
            <h3 className="mb-4 mt-0 text-3xl text-center font-bold">
              All Products list
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
              {products.map((p) => (
                <Link
                  key={p._id}
                  to={`/dashboard/admin/product/${p.slug}`}
                  className="product-link"
                >
                  <div className="w-full max-w-sm mx-auto bg-white shadow-lg border border-black rounded-lg">
                    <Link to="#">
                      <img
                        className="p-2 rounded-t-lg border-b rounded border-black  "
                        src={`${process.env.REACT_APP_API}/api/product/product-photo/${p._id}`}
                        alt=""
                      />
                    </Link>
                    <div className="px-5 pb-5">
                      <Link to="#">
                        <h5 className="text-xl mt-2 font-bold tracking-tight text-gray-900">
                          {p.name}
                        </h5>
                      </Link>
                      <div className="flex items-center mt-2.5 mb-5">
                        <div className="flex items-center text-gray-900 space-x-1 rtl:space-x-reverse">
                          <p>{p.description.substring(0, 30)}...</p>
                        </div>
                      </div>
                      {/* <div className="flex items-center justify-between">
                        <span className="text-2xl font-semibold text-gray-900">
                          ₹{p.price}
                        </span>
                        <Link
                          to="#"
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Add to cart
                        </Link>
                      </div> */}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
