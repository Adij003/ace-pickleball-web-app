import { useNavigate } from "react-router-dom";
import React from 'react'
import { IoArrowBack } from "react-icons/io5";

function UpcomingDetials() {
    const navigate = useNavigate();

  return (
    <div>
       <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 flex items-center gap-2 p-2 bg-gray-200 hover:bg-gray-300 rounded-lg shadow-md"
      >
        <IoArrowBack />
        <span>Back</span>
      </button>
      upcoming events: 
    </div>
  )
}

export default UpcomingDetials
