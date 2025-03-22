import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { IoArrowBack, IoPerson, IoCall, IoMail } from "react-icons/io5";

function CheckoutPage() {
    const location = useLocation();
    const { selectedSlots = {}, selectedDate } = location.state || { selectedSlots: {}, selectedDate: "" };

    // Convert selectedSlots object into an array for rendering
    const slotArray = Object.values(selectedSlots);
    const navigate = useNavigate();

    // Fetch user details from localStorage
    const user = JSON.parse(localStorage.getItem("user-info")) || {};
    const { name = "Guest", email = "", picture = "" } = user;

    // Initialize phone number state
    const [phoneNumber, setPhoneNumber] = useState("9799042426"); // Default or existing phone number

    // Calculate total price
    const totalAmount = slotArray.reduce((sum, slot) => sum + parseInt(slot.price.replace("₹", ""), 10), 0);

    const handleCheckout = () => {
        console.log('Checkout: ');
    };

    return (
        <div>
            <div className="w-full h-full bg-white py-2 rounded-t-2xl">
                <div className="flex w-full justify-between items-center gap-2 p-2 rounded-lg">
                    <button
                        onClick={() => navigate("/booking-details")}
                        className="font-bold text-xl ml-4"
                    >
                        <IoArrowBack />
                    </button>
                    <span className="mr-10 font-bold">Proceed to Checkout</span>
                    <span></span>
                </div>
            </div>
            <div>
                <div className="bg-white text-black flex flex-col items-center p-4">
                    {/* Booking Summary */}
                    <div className="w-full max-w-md bg-white p-4 border-2 border-amber-300 rounded-lg shadow-2xl">
                        <h2 className="text-lg text-orange-400 font-bold mb-2">Booking Summary</h2>
                        <div className="border border-gray-700 rounded-lg p-3">
                            {/* Table Header */}
                            <div className="grid grid-cols-4 text-center text-gray-300 font-bold border-b border-gray-500 pb-2">
                                <span>Court</span>
                                <span className="col-span-2">Time Slot</span>
                                <span>Amount</span>
                            </div>

                            {/* Slot Details */}
                            {slotArray.map((slot, index) => (
                                <div key={index} className="grid grid-cols-4 text-center text-sm py-2 ">
                                    <span>{slot.court}</span>
                                    <span className="col-span-2">{slot.time}</span>
                                    <span>{slot.price}</span>
                                </div>
                            ))}

                            {/* Date & Total Price */}
                            <div className="flex justify-between mt-3 text-sm font-bold">
                                <span className="text-amber-400">
                                    Date: {new Date(selectedDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                                </span>
                                <span className="text-amber-600">Total: ₹{totalAmount}</span>
                            </div>
                        </div>
                    </div>

                    {/* User Details */}
                    <div className="w-full max-w-md bg-white p-4 border-2 border-amber-300 rounded-lg shadow-2xl mt-4">
                        <h2 className="text-lg text-black font-bold mb-2">User Info</h2>
                        <div className="space-y-2">
                            <div className="flex items-center bg-gray-200 p-3 rounded-md">
                                <IoPerson className="text-gray-400 mr-3" />
                                <span className="text-black">{name}</span>
                            </div>
                            <div className="flex items-center bg-gray-200 p-3 rounded-md">
                                <IoMail className="text-gray-400 mr-3" />
                                <span className="text-black">{email}</span>
                            </div>
                            <div className="flex items-center bg-gray-200 p-3 rounded-md">
                                <IoCall className="text-gray-400 mr-3" />
                                <input
                                    type="text"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="bg-transparent text-black w-full focus:outline-none"
                                    placeholder="Enter phone number"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Link to="/"
                state={{ selectedSlots, selectedDate }}
                className="w-full flex items-center justify-center"
                onClick={handleCheckout}
            >
                <button className="absolute bottom-0 w-[90%] bg-orange-600 text-white p-2 rounded mb-4">Checkout</button>
            </Link>
        </div>
    );
}

export default CheckoutPage;
