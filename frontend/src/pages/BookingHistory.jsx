import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import { IoArrowBack, IoCalendar, IoTime, IoLocation, IoReceipt, IoCard } from "react-icons/io5";

function BookingHistory() {
    const navigate = useNavigate();
    
    // Dummy booking data
    const [bookings] = useState([
        {
            id: "1",
            date: "2023-12-15",
            timeSlot: "06:00 AM - 07:00 AM",
            court: "C1",
            bookingId: "BOOK12345",
            paymentId: "PAY12345",
            price: 800
        },
        {
            id: "2",
            date: "2023-12-16",
            timeSlot: "04:00 PM - 05:00 PM",
            court: "C3",
            bookingId: "BOOK67890",
            paymentId: "PAY67890",
            price: 800
        },
        {
            id: "3",
            date: "2023-12-18",
            timeSlot: "07:00 PM - 08:00 PM",
            court: "C2",
            bookingId: "BOOK13579",
            paymentId: "PAY13579",
            price: 800
        },
        {
            id: "4",
            date: "2023-12-20",
            timeSlot: "09:00 AM - 10:00 AM",
            court: "C4",
            bookingId: "BOOK24680",
            paymentId: "PAY24680",
            price: 800
        },
    ]);

    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 p-2 bg-gray-200 hover:bg-gray-300 rounded-lg shadow-md mb-6"
            >
                <IoArrowBack />
                <span>Back</span>
            </button>

            <h1 className="text-2xl font-bold text-gray-800 mb-6">My Bookings</h1>

            {bookings.length === 0 ? (
                <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4">
                    <p>No bookings found. Book your first court now!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bookings.map((booking) => (
                        <div key={booking.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                            <div className="p-6">
                                <div className="flex items-center mb-4">
                                    <div className="bg-orange-100 text-orange-800 p-2 rounded-full mr-3">
                                        <IoCalendar className="text-lg" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">Booking Details</h3>
                                        <p className="text-sm text-gray-500">Status: Confirmed</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <IoCalendar className="text-gray-500 mr-3" />
                                        <span className="text-gray-700">{formatDate(booking.date)}</span>
                                    </div>

                                    <div className="flex items-center">
                                        <IoTime className="text-gray-500 mr-3" />
                                        <span className="text-gray-700">{booking.timeSlot}</span>
                                    </div>

                                    <div className="flex items-center">
                                        <IoLocation className="text-gray-500 mr-3" />
                                        <span className="text-gray-700">Court {booking.court}</span>
                                    </div>

                                    <div className="flex items-center">
                                        <IoReceipt className="text-gray-500 mr-3" />
                                        <span className="text-gray-700">
                                            Booking ID: <span className="font-mono">{booking.bookingId}</span>
                                        </span>
                                    </div>

                                    <div className="flex items-center">
                                        <IoCard className="text-gray-500 mr-3" />
                                        <span className="text-gray-700">
                                            Payment ID: <span className="font-mono">{booking.paymentId}</span>
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-200">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Amount Paid:</span>
                                        <span className="text-lg font-bold text-orange-600">₹{booking.price}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default BookingHistory;