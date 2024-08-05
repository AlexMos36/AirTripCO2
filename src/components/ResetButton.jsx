import React from "react";

const ResetButton = ({ resetFields }) => {
  return (
    <button
      onClick={resetFields}
      className="w-[100px] px-4 py-2 bg-red-500 text-white rounded shadow-md hover:bg-red-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
    >
      Reset
    </button>
  );
};

export default ResetButton;
