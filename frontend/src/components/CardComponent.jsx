import React, { useState, useEffect } from "react";
import court1 from "../assets/court1.webp";
import court2 from "../assets/court2.webp";
import court3 from "../assets/court3.webp";
import court4 from "../assets/court4.webp";
import { Link } from "react-router-dom";

const images = [court1, court2, court3, court4];

function CardComponent({onBookNowClick}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Wait for 1s, slide over 1s, repeat every 4s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-96 bg-white rounded-lg shadow-lg overflow-hidden mt-6">
      {/* Card Header with Smooth Sliding Image */}
      <div className="h-56 overflow-hidden relative">
        <div
          className="flex transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
        >
          {images.map((img, index) => (
            <img
              key={index}
              className="w-full h-full object-cover flex-shrink-0"
              src={img}
              alt="court"
            />
          ))}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Pickleball Courts</h3>
        <p className="text-gray-600 text-sm">
        Welcome to Ace Pickleball Club, Bhopal's premier pickleball destination! We're passionate about creating a vibrant community of pickleball enthusiasts, where players of all levels can come together to play, learn, and socialize.
        </p>
      </div>

      {/* Card Footer */}
      <div className="p-4 pt-0">
        <Link to='/booking-details'>
        <button className="px-4 py-2 w-full bg-amber-500 text-white rounded-md hover:bg-blue-700"
        >
          Book Now
        </button>
          </Link>
      </div>
    </div>
  );
}

export default CardComponent;
