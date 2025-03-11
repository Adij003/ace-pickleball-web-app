import React, { useState, useEffect } from "react";
import court1 from "../assets/court1.JPG";
import court2 from "../assets/court2.JPG";
import court3 from "../assets/court3.JPG";
import court4 from "../assets/court4.JPG";

const images = [court1, court2, court3, court4];

function CardTest() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 1500); // Slide every 1.5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="w-90 bg-white rounded-lg shadow-lg overflow-hidden mt-6">
      {/* Image Slider */}
      <div className="h-56 relative overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            width: `${images.length * 100}%`,
          }}
        >
          {images.map((img, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <img
                src={img}
                alt={`court ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          UI/UX Review Check
        </h3>
        <p className="text-gray-600 text-sm">
          The place is close to Barceloneta Beach and bus stop just 2 min by
          walk and near to "Naviglio" where you can enjoy the main nightlife in
          Barcelona.
        </p>
      </div>

      {/* Card Footer */}
      <div className="p-4 pt-0">
        <button className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-blue-700">
          Book Now
        </button>
      </div>
    </div>
  );
}

export default CardTest;
