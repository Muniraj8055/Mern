import React, { useState, useEffect } from "react";
import Layout from "./../components/layout/Layout";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const CategoryDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);

  return (
    <Layout>
      {" "}
      <h4 className="text-xl font-semibold text-center mt-6">
        Category - {category?.name}
      </h4>
      <h6 className="mt-2 text-lg text-center">
        {products?.length} results found{" "}
      </h6>
      <div className="flex flex-wrap">
        <div className="grid grid-cols-1 m-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
          {products.map((p) => (
            <Link
              key={p._id}
              to={`/product/${p.slug}`}
              className="product-link"
            >
              <div className="w-full max-w-sm mx-auto bg-white shadow-lg border border-black rounded-lg">
                <Link to={`/product/${p.slug}`}>
                  <img
                    className="p-2 rounded-t-lg border-b rounded border-black  "
                    src={`${process.env.REACT_APP_API}/api/product/product-photo/${p._id}`}
                    alt=""
                  />
                </Link>
                <div className="px-5 pb-5">
                  <Link to={`/product/${p.slug}`}>
                    <h5 className="text-xl mt-2 font-bold tracking-tight text-gray-900">
                      {p.name}
                    </h5>
                  </Link>
                  <div className="flex items-center mt-2.5 mb-5">
                    <div className="flex items-center text-gray-900 space-x-1 rtl:space-x-reverse">
                      <p>{p.description.substring(0, 30)}...</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-semibold text-gray-900">
                      ₹{p.price}
                    </span>

                    <button className=" bg-amber-400 text-black hover:bg-amber-500 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm py-2.5 px-4 text-center dark:bg-amber-400 dark:hover:bg-amber-500 dark:focus:ring-amber-500">
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryDetails;
