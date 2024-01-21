import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <form
      className="max-w-sm mx-auto mb-3 flex justify-items-start"
      onSubmit={handleSubmit}
    >
      <div className="flex-1 mr-2">
        <input
          type="text"
          placeholder="Enter the name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default CategoryForm;
