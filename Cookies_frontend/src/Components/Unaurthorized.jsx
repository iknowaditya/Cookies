import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          Unauthorized Access
        </h1>
        <p className="text-gray-700 text-lg mb-8">
          You do not have permission to access this page.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
