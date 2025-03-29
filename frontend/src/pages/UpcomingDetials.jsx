import { useNavigate } from "react-router-dom";
import React from "react";
import { IoArrowBack } from "react-icons/io5";
import { motion } from "framer-motion";
import noEvent from "../assets/noEvent.svg"

function UpcomingDetails() {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-amber-200 to-amber-500 text-red-600 p-6">
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 flex items-center gap-2 p-3 bg-white text-gray-800 hover:bg-gray-100 rounded-lg shadow-lg transition-all"
      >
        <IoArrowBack size={20} />
        <span>Back</span>
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-4">Upcoming Events</h1>

        <img
          src={noEvent}
          alt="No events"
          className=""
          style={{ animation: "pulse 3s infinite" }}
        />


      </motion.div>
    </div>
  );
}

export default UpcomingDetails;
