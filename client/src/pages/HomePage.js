import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../redux/actions/categoryAction";
import { Checkbox, Radio, Pagination } from "antd";
import { Prices } from "../components/Prices";
import { addToCart } from "../redux/actions/cartAction";

const HomePage = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(4); // Number of products per page

  //cart function
  const handleAddToCart = (product) => {
    alert("Item added to cart successfully");
    dispatch(addToCart(product));
    console.log(product);
  };

  //handle category filter
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  //get products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/product/get-product`
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!checked.length) getAllProducts();
  }, []);

  //get categories
  useEffect(() => {
    // Dispatch the fetchCategories action when the component mounts
    dispatch(fetchCategories());
  }, [dispatch]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/product/product-filters`,
        {
          checked,
          radio,
        }
      );

      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //pagination

  // Calculate start and end indices for the current page
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;

  // Slice the products array to get the products for the current page
  const currentProducts = products.slice(startIndex, endIndex);

  const totalPages = Math.ceil(products.length / perPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row">
        {/* Column 1 (col-md-3) */}
        <div className="md:w-1/4 p-2">
          <h6 className="text-xl text-center font-bold">Filter by category</h6>
          <div className="flex flex-col mt-3 ml-3">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          <h6 className="text-xl text-center font-bold mt-4">
            Filter by price
          </h6>
          <div className="flex flex-col mt-3 ml-3">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p.id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="flex flex-col mt-5 ml-3">
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 hover:bg-red-800 cursor-pointer text-white font-bold py-2 px-4 rounded"
            >
              RESET FILTER
            </button>
          </div>
        </div>

        {/* Column 2 (col-md-9) */}
        <div className="md:w-3/4 p-4">
          <h1 className="text-3xl text-center font-bold">All products</h1>
          {/* {JSON.stringify(checked, null, 4)} */}
          <div className="flex flex-wrap">
            <div className="grid grid-cols-1 mt-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
              {currentProducts.map((p) => (
                <Link key={p._id} className="product-link">
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

                        <button
                          onClick={() => handleAddToCart(p)}
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-4 flex justify-center items-center">
            <Pagination
              current={currentPage}
              total={products.length}
              pageSize={perPage}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
