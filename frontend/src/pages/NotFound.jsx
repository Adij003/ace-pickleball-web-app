import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {/* SVG Illustration */}
      <div className="mb-6">
        <svg
          className="w-64 h-64 text-gray-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 3h18v18H3z" strokeDasharray="4 2" />
          <path d="M9 9h6M9 13h3" />
          <circle cx="15.5" cy="15.5" r="2.5" />
          <path d="M17.5 17.5L21 21" />
        </svg>
      </div>

      {/* 404 Message */}
      <h1 className="text-3xl font-bold text-gray-800 ">404 - Page Not Found</h1>
      <p className="text-gray-600 mt-2 mx-10 text-lg">
        Oops! The page you’re looking for doesn’t exist.
      </p>

      {/* Home Button */}
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-3 bg-yellow-500 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-yellow-600 transition"
      >
        Go to Home
      </button>
    </div>
  );
}

export default NotFound;
