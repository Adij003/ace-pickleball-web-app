import { useNavigate } from "react-router-dom";
import React from "react";
import { IoArrowBack } from "react-icons/io5";

function BookingHistoryZoho() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen items-center bg-gray-100 p-4">
              <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 p-2 bg-gray-200 hover:bg-gray-300 rounded-lg shadow-md mb-4 transition duration-300"
        >
          <IoArrowBack className="text-lg" />
          <span className="font-medium">Back</span>
        </button>
      <div className="bg-white mt-50 text-gray-900 rounded-2xl shadow-xl p-6 w-full max-w-3xl text-center">
        {/* Back Button */}
  

        {/* Header */}
        <h1 className="text-3xl font-bold text-amber-500 mb-6">
          Booking History
        </h1>

        {/* Message Section */}
        <p className="text-lg text-gray-700">
          Please check your email (the one entered during booking) for details of your previous bookings.
        </p>
        <p>
            We'll shortly add your bookings here
        </p>
      </div>
    </div>
  );
}

export default BookingHistoryZoho;
