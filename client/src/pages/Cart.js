import React, { useState, useEffect } from "react";
import Layout from "./../components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  decrementItem,
} from "../redux/actions/cartAction";
import { Link, useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";

const Cart = () => {
  //   const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.carts);
  const [clientToken, setClientToken] = useState("");
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  // console.log(cart);

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      console.log("Instance:", instance);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/product/braintree/payment`,
        {
          nonce,
          cart,
        },
        {
          headers: {
            Authorization: user.token,
          },
        }
      );
      setLoading(false);

      alert("Payment Completed Successfully ");
      localStorage.removeItem("carts");
      navigate("/dashboard/user/orders");
      window.location.reload();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const increment = (product) => {
    dispatch(addToCart(product));
  };
  const decrement = (product) => {
    dispatch(decrementItem(product));
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const totalPrice = () => {
    let price = 0;
    cart.map((cart) => {
      price = cart.price * cart.quantity + price;
    });
    setPrice(price);
  };

  // console.log(price);
  // console.log(clientToken);
  useEffect(() => {
    totalPrice();
  }, [totalPrice]);

  // Retrieve the user information from local storage
  const userString = localStorage.getItem("user");

  // Parse the JSON string into a JavaScript object
  const user = JSON.parse(userString);

  //   //get products
  //   const getAllProducts = async () => {
  //     try {
  //       const { data } = await axios.get(
  //         `${process.env.REACT_APP_API}/api/product/get-product`
  //       );
  //       setProducts(data.products);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   useEffect(() => {
  //     getAllProducts();
  //   }, []);

  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl text-center font-semibold mb-4">
            Shopping Cart
          </h1>
          <h1 className="text-center bg-light p-2 mb-1">
            {user ? `Hello ${user.name}` : "Hello Guest"}
          </h1>
          <h4 className="text-center mb-4">
            {cart?.length
              ? `You have ${cart.length} items in your cart${
                  user ? "" : ". Please login to checkout"
                }`
              : "Your Cart Is Empty"}
          </h4>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full overflow-x-scroll">
              <table className="w-full table-auto">
                <thead className="bg-black text-white">
                  <tr>
                    <th className="px-8 py-2 text-left font-semibold">
                      Product
                    </th>
                    <th className="pl-14 pr-4 py-2 text-left font-semibold">
                      Price
                    </th>
                    <th className="px-4 py-2 text-center font-semibold">
                      Quantity
                    </th>
                    <th className="px-4 py-2 text-left font-semibold">Total</th>
                    <th className="px-4 py-2 text-left font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item._id} className="bg-white">
                      <td className="px-4 py-2 md:w-48">
                        <div className="flex items-center">
                          <Link
                            to={`/product/${item.slug}`}
                            className="flex items-center"
                          >
                            <img
                              className="h-16 w-16 mr-4 cursor-pointer"
                              src={`${process.env.REACT_APP_API}/api/product/product-photo/${item._id}`}
                              alt="Product image"
                            />
                            <span className="font-semibold text-sm md:text-base">
                              {item.name}
                            </span>
                          </Link>
                        </div>
                      </td>
                      <td className="pl-14 pr-4 py-2">{`$${item.price}`}</td>
                      <td className="px-4 py-2">
                        <div className="flex items-center">
                          <button
                            onClick={() => decrement(item)}
                            className="border cursor-pointer hover:bg-slate-200 rounded-md py-1 px-2 mr-2"
                          >
                            -
                          </button>
                          <span className="text-center w-8">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => increment(item)}
                            className="border cursor-pointer hover:bg-slate-200 rounded-md py-1 px-2 ml-2"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-2">{`$${
                        item.price * item.quantity
                      }`}</td>
                      <td className="px-2 py-2">
                        <button
                          onClick={() => handleRemoveFromCart(item._id)}
                          className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-md py-1 px-2"
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:w-full lg:w-1/4 xl:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Summary</h2>
                <hr className="my-2" />
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">$ {price}</span>
                </div>
                <hr className="my-2" />
                {/* <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">
                  Checkout
                </button> */}
                {user?.address ? (
                  <>
                    <div className="mt-3">
                      <h4 className="text-l text-center font-medium ">
                        Current Address
                      </h4>
                      <h5 className="text-l text-center font-medium">
                        {user?.address}
                      </h5>
                      <button
                        className="bg-amber-400 text-black py-2 px-4 rounded-lg mt-4 w-full"
                        onClick={() => navigate("/dashboard/user/profile")}
                      >
                        Update Address
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="mb-3">
                    {user ? (
                      <button
                        className="bg-amber-400 text-black py-2 px-4 rounded-lg mt-4 w-full"
                        onClick={() => navigate("/dashboard/user/profile")}
                      >
                        Update Address
                      </button>
                    ) : (
                      <button
                        className="bg-amber-400 text-black py-2 px-4 rounded-lg mt-4 w-full"
                        onClick={() =>
                          navigate("/login", {
                            state: "/cart",
                          })
                        }
                      >
                        Login to checkout
                      </button>
                    )}
                  </div>
                )}
                <div className="mt-3">
                  {!clientToken || !cart?.length ? (
                    ""
                  ) : (
                    <>
                      <DropIn
                        options={{
                          authorization: clientToken,
                          paypal: {
                            flow: "vault",
                          },
                        }}
                        onInstance={(instance) => setInstance(instance)}
                      />
                      <button
                        className="bg-orange-500 hover:bg-orange-600  cursor-pointer text-white py-2 px-4 rounded-lg mt-4 w-full"
                        onClick={handlePayment}
                        disabled={!user}
                      >
                        {loading ? "Processing ...." : "Make Payment"}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
