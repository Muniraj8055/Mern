import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { addToCart } from "../redux/actions/cartAction";
import { useDispatch } from "react-redux";

const ProductDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = (product) => {
    alert("Item added to cart successfully");
    dispatch(addToCart(product));
    navigate("/cart");
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="overflow-hidden rounded-md shadow-md">
            <img
              className="object-cover w-full h-72 md:h-full rounded-md"
              src={`${process.env.REACT_APP_API}/api/product/product-photo/${product._id}`}
              alt=""
            />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              {product.name}
            </h1>
            <p className="text-lg mb-4 text-gray-600">{product.description}</p>
            <p className="text-lg mb-4 text-gray-700">
              Price: ${product.price}
            </p>
            <p className="text-lg mb-4 text-gray-700">
              Category: {product?.category?.name}
            </p>
            <button
              onClick={() => handleAddToCart(product)}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full shadow-md"
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
      <div>
        <hr className="my-4" />
        <div className="container mx-auto">
          <h6 className="text-2xl font-bold ml-4 mb-4">Similar Products</h6>
          {relatedProducts.length < 1 && (
            <p className="text-center">No Similar Products found</p>
          )}
          <div className="flex flex-wrap">
            <div className="grid grid-cols-1  mx-5 my-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
              {relatedProducts.map((p) => (
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

                        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                          Add to cart
                        </button>
                      </div>
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

export default ProductDetails;
