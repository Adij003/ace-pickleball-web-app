import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoPerson, IoMail, IoCalendar, IoCall } from "react-icons/io5";

function PaymentSuccess() {
    const navigate = useNavigate();
    const location = useLocation();
    const [countdown, setCountdown] = useState(10);

    // Extract data with correct structure from your backend response
    const { bookingDetails = {}, referenceId = "N/A" } = location.state || {};
    
    // CORRECTED: Using 'user' instead of 'userDetails' to match your API response
    const { 
        slots = [], 
        user = {},  // This matches your actual data structure
        totalAmount = 0,
        totalAmountDisplay = "$0",
        createdAt = ""
    } = bookingDetails;

    // Extract user fields with defaults
    const { name = "Guest", email = "", phoneNumber = "" } = user;

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    navigate("/");
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigate]);

    const formatDate = (dateString) => {
        if (!dateString) return "Date not available";
        const options = { day: "2-digit", month: "short", year: "numeric" };
        return new Date(dateString).toLocaleDateString("en-GB", options);
    };

    const formatTime = (timeString) => {
        if (!timeString) return "";
        // Format time string if needed (e.g., "07:00 AM - 08:00 AM" → "7:00 AM - 8:00 AM")
        return timeString;
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <div className="text-center mb-4">
                    <h2 className="text-2xl font-bold text-green-600">Payment Successful</h2>
                    <p className="text-gray-500">Booking ID: {referenceId}</p>
                    <p className="text-gray-400 text-sm mt-1">
                        Booked on: {formatDate(createdAt)}
                    </p>
                </div>

                {/* User Details - Now correctly using 'user' object */}
                <div className="mb-4 border-b pb-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Customer Details</h3>
                    <div className="flex items-center">
                        <IoPerson className="text-gray-500 mr-2" />
                        <span className="font-medium">{name}</span>
                    </div>
                    {email && (
                        <div className="flex items-center mt-1">
                            <IoMail className="text-gray-500 mr-2" />
                            <span>{email}</span>
                        </div>
                    )}
                    {phoneNumber && (
                        <div className="flex items-center mt-1">
                            <IoCall className="text-gray-500 mr-2" />
                            <span>{phoneNumber}</span>
                        </div>
                    )}
                </div>

                {/* Booking Summary */}
                <div className="mb-4 border-b pb-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Booking Summary</h3>
                    {slots.length > 0 ? (
                        <>
                            <div className="flex items-center text-gray-600">
                                <IoCalendar className="mr-2" />
                                <span>{formatDate(slots[0]?.date)}</span>
                            </div>
                            <ul className="mt-2 space-y-2">
                                {slots.map((slot, index) => (
                                    <li key={index} className="flex justify-between">
                                        <span className="font-medium">
                                            {slot.court} - {formatTime(slot.timeSlot)}
                                        </span>
                                        <span>₹{slot.price}</span>
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : (
                        <p className="text-gray-500">No slots booked.</p>
                    )}
                </div>

                {/* Payment Summary */}
                <div className="mb-4">
                    <div className="flex justify-between font-semibold text-lg">
                        <span>Subtotal:</span>
                        <span>₹{totalAmount}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 mt-1">
                        <span>Taxes & Fees:</span>
                        <span>₹0</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
                        <span>Total Paid:</span>
                        <span className="text-green-600">{totalAmountDisplay}</span>
                    </div>
                </div>

                <p className="text-gray-400 text-sm text-center">
                    Redirecting to home in <span className="font-bold">{countdown}</span> seconds...
                </p>
            </div>
        </div>
    );
}

export default PaymentSuccess;