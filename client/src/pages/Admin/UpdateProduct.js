import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/actions/categoryAction";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [id, setId] = useState("");
  // Use useParams hook to get the 'slug' parameter

  const { slug } = useParams();

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/product/get-product/${slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);

  //to get all categories
  useEffect(() => {
    // Dispatch the fetchCategories action when the component mounts
    dispatch(fetchCategories());
  }, [dispatch]);

  //handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);

      const user = JSON.parse(localStorage.getItem("user"));
      const token = user ? user.token : null;

      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/product/update-product/${id}`,
        productData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (data?.success) {
        alert(data?.message);
        alert("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      } else {
        alert("Please check the product");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  //handle delete
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this product ? ");
      if (!answer) return;
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/product/delete-product/${id}`
      );

      navigate("/dashboard/admin/products");
      alert("Product DEleted Succfully");
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <Layout>
      <div class="container mx-auto">
        <div class="flex flex-col md:flex-row py-4">
          <aside class="w-full md:w-1/4 lg:w-1/5 p-4 bg-gray-200">
            <div>
              {/* <!-- navigation --> */}
              <ul class="flex flex-col overflow-hidden">
                <AdminMenu />
              </ul>
            </div>
          </aside>
          <div class="w-full md:w-3/4 lg:w-4/5 p-4 mx-auto max-w-full">
            <h3 class="mb-4 mt-0 text-3xl text-center font-bold">
              Update Product
            </h3>
            <div className=" mx-auto max-w-md mb-3">
              <Select
                bordered={false}
                size="large"
                placeholder="Select category"
                showSearch
                className="shadow appearance-none border rounded w-full items-center bg-white py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category}
              >
                {categories?.map((c) => (
                  <Option id={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mt-4 mx-auto max-w-md mb-3">
                <label className="bg-blue-500 hover:bg-blue-700 cursor-pointer text-white font-bold py-2 px-4 rounded">
                  {photo ? photo.name : "Upload photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt=""
                      height={"150px"}
                      width={"150px"}
                      className=" object-cover"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`${process.env.REACT_APP_API}/api/product/product-photo/${id}`}
                      alt="product_photo"
                      height={"150px"}
                      width={"150px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mt-4">
                <input
                  type="text"
                  value={name}
                  placeholder="Enter the product name"
                  className="shadow appearance-none border rounded w-full items-center bg-white py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="mt-4">
                <textarea
                  type="text"
                  value={description}
                  placeholder="Enter the product Description"
                  className="shadow appearance-none border rounded w-full items-center bg-white py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
              <div className="mt-4">
                <input
                  type="number"
                  value={price}
                  placeholder="Enter the product price"
                  className="shadow appearance-none border rounded w-full items-center bg-white py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </div>
              <div className="mt-4">
                <input
                  type="number"
                  value={quantity}
                  placeholder="Enter the product quantity"
                  className="shadow appearance-none border rounded w-full items-center bg-white py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={(e) => {
                    setQuantity(e.target.value);
                  }}
                />
              </div>
              <div className="mt-4">
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  value={shipping ? "Yes" : "No"}
                  showSearch
                  className="shadow appearance-none border rounded w-full items-center bg-white py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Option value="1">Yes</Option>
                  <Option value="0">No</Option>
                </Select>
              </div>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={handleUpdate}
                  className="bg-blue-500 hover:bg-blue-700 cursor-pointer text-white font-bold py-2 px-4 rounded"
                >
                  UPDATE PRODUCT
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-800 cursor-pointer text-white font-bold py-2 px-4 rounded"
                >
                  DELETE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
