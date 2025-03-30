import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { IoArrowBack } from "react-icons/io5";
import { Link } from 'react-router-dom';

function AdminPage({ isAuthenticated }) {
    const navigate = useNavigate();

    useEffect(() => {
        // console.log("Admin Page Received isAuthenticated:", isAuthenticated);
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);
    return (
        <div className="min-h-screen bg-gray-100">
            <button
                onClick={() => navigate("/")}
                className="absolute flex items-center gap-2 p-2 bg-gray-200 rounded-lg shadow-md top-4 left-8 w-20"
            >
                <IoArrowBack className="text-lg" />
                <span className="font-medium">Back</span>
            </button>
            <div>


                <div className=" flex flex-col items-center justify-center pt-20  p-6">

                    {/* Welcome Text */}
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome, Admin!</h1>

                    {/* View All Bookings Card */}
                    <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 text-center">
                        <h2 className="text-2xl font-semibold text-blue-600">View All Bookings</h2>
                        <p className="text-gray-600 mt-2">Manage and review all upcoming and past bookings here.</p>
                        <Link to="/all-bookings" className="mt-4 inline-block w-full px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                            View Bookings
                        </Link>
                    </div>

                    {/* Change Available Slots Section */}
                    <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 mt-6 text-center">
                        <h2 className="text-2xl font-semibold text-green-600">Change Available Slots</h2>
                        <p className="text-gray-600 mt-2">Update the available slots for booking as needed.</p>
                        <Link to="/edit-slots" className="mt-4 w-full inline-block px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                            Update Slots
                        </Link>
                    </div>
                </div>
            </div>

        </div>

    );
}

export default AdminPage;
