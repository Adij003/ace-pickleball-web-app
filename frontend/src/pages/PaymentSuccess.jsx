import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoPerson, IoMail, IoCalendar } from "react-icons/io5";

function PaymentSuccess() {
    const navigate = useNavigate();
    const location = useLocation();

    // Extracting booking details properly
    const { bookingDetails = {} } = location.state || {};
    const { slots = [], userDetails = {}, totalAmount = 0 } = bookingDetails;
    const { name = "Guest", email = "" } = userDetails;

    // Countdown timer state
    const [countdown, setCountdown] = useState(10);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            navigate("/"); // Changed from "/history" to "/"
        }
    }, [countdown, navigate]);

    const formatDate = (dateString) => {
        const options = { day: "2-digit", month: "short", year: "numeric" };
        return dateString ? new Date(dateString).toLocaleDateString("en-GB", options) : "Invalid Date";
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
                <h2 className="text-2xl font-bold text-green-600">Payment Successful</h2>
                <p className="text-gray-500 mt-2">Your booking has been confirmed.</p>

                {/* Display Date from first slot */}
                <div className="mt-4 border-t pt-4">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center justify-center">
                        <IoCalendar className="mr-2" /> {formatDate(slots[0]?.date)}
                    </h3>
                </div>

                {/* Display User Details */}
                <div className="mt-4 border-t pt-4 text-left">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                        <IoPerson className="mr-2" /> {name}
                    </h3>
                    <p className="text-gray-600 flex items-center mt-1">
                        <IoMail className="mr-2" /> {email}
                    </p>
                </div>

                {/* Display Booked Slots */}
                <div className="mt-4 border-t pt-4">
                    <h3 className="text-lg font-semibold text-gray-800">Booked Slots</h3>
                    <ul className="mt-2 text-gray-700">
                        {slots.length > 0 ? (
                            slots.map((slot, index) => (
                                <li key={index} className="py-2">
                                    <span className="font-semibold">{slot.court}</span> - {slot.timeSlot} - {slot.price}
                                </li>
                            ))
                        ) : (
                            <p className="text-gray-500">No slots booked.</p>
                        )}
                    </ul>
                </div>

                {/* Display Total Amount */}
                <div className="mt-4 border-t pt-4">
                    <h3 className="text-lg font-semibold text-gray-800">Total Amount: {totalAmount}</h3>
                </div>

                <p className="text-gray-400 text-sm mt-4">
                    Redirecting to home in <span className="font-bold">{countdown}</span> seconds...
                </p>
            </div>
        </div>
    );
}

export default PaymentSuccess;