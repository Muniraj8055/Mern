import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/actions/categoryAction";
import CategoryForm from "../../components/form/CategoryForm";
import { Modal } from "antd";
// import axios from "axios";

const CreateCategory = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  useEffect(() => {
    // Dispatch the fetchCategories action when the component mounts
    dispatch(fetchCategories());
  }, [dispatch]);

  //handle form data
  //handle Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = localStorage.getItem("user");
    const token = user ? JSON.parse(user).token : null;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/api/category/create-category`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            name,
          }),
        }
      );

      if (response.ok) {
        // Make sure that the fetchCategories action is dispatched after the new category is created.
        //  Ensure that the action is correctly implemented to fetch the updated list of categories from the server.
        dispatch(fetchCategories());
        alert(`${name} is created successfully`);
        setName("");
      } else {
        const errorData = await response.json();
        console.error(errorData);
      }
    } catch (error) {
      alert(error);
    }
  };

  // Update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const user = localStorage.getItem("user");
      const token = user ? JSON.parse(user).token : null;
      const response = await fetch(
        `${process.env.REACT_APP_API}/api/category/update-category/${selected._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            name: updatedName,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setSelected(null);
          setUpdatedName("");
          setVisible(false);
          dispatch(fetchCategories());
          alert(`${updatedName} is updated`);
        } else {
          alert(data.message);
        }
      } else {
        const errorData = await response.json();

        alert(errorData);
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  //delete category
  const handleDelete = async (pId) => {
    try {
      const user = localStorage.getItem("user");
      const token = user ? JSON.parse(user).token : null;
      const response = await fetch(
        `${process.env.REACT_APP_API}/api/category/delete-category/${pId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          dispatch(fetchCategories());
          alert("category is deleted");
        } else {
          alert(data.message);
        }
      } else {
        const errorData = await response.json();

        alert(errorData);
      }
    } catch (error) {
      alert("Somtihing went wrong");
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
          <div class="w-full md:w-3/4 lg:w-4/5 p-4">
            <h3 class="mb-4 mt-0 text-3xl text-center font-bold">
              Create Category
            </h3>
            <div class="p-2">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div class="flex flex-col overflow-x-auto">
              <div class="sm:-mx-6 lg:-mx-8">
                <div class="inline-block w-full sm:px-6 lg:px-8">
                  <div class="overflow-hidden">
                    <table class="min-w-full text-center text-sm font-light">
                      <thead class="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                        <tr>
                          <th scope="col" class="px-6 py-4">
                            NAME
                          </th>
                          <th scope="col" class="px-6 py-4">
                            ACTIONS
                          </th>
                          <th scope="col" class="px-6 py-4">
                            {/* Add a new header column for consistency */}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {categories?.map((category) => (
                          <tr key={category._id} class="border">
                            <td class="text-left whitespace-nowrap px-6 py-4 font-medium">
                              {category.name}
                            </td>
                            <td>
                              <button
                                onClick={() => {
                                  setVisible(true);
                                  setUpdatedName(category.name);
                                  setSelected(category);
                                }}
                                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                              >
                                Edit
                              </button>
                            </td>
                            <td></td>
                            <td>
                              <button
                                onClick={() => {
                                  handleDelete(category._id);
                                }}
                                class="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              open={visible}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
