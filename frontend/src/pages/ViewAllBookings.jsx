import React, { useState } from "react";
import { IoCall, IoCalendar, IoTime, IoArrowBack, IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function ViewAllBookings() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");

    const [bookings] = useState([
      { id: "1", customerName: "John Doe", phoneNumber: "9876543210", date: "2025-04-01", timeSlot: "06:00 AM - 07:00 AM", court: "C1", totalPayment: 800 },
      { id: "2", customerName: "Jane Smith", phoneNumber: "9123456780", date: "2025-04-02", timeSlot: "04:00 PM - 05:00 PM", court: "C3", totalPayment: 1200 },
      { id: "3", customerName: "Mike Johnson", phoneNumber: "9234567890", date: "2025-04-03", timeSlot: "07:00 PM - 08:00 PM", court: "C2", totalPayment: 1000 },
      { id: "4", customerName: "Alice Brown", phoneNumber: "9345678901", date: "2025-04-04", timeSlot: "10:00 AM - 11:00 AM", court: "C4", totalPayment: 900 },
      { id: "5", customerName: "Bob Williams", phoneNumber: "9456789012", date: "2025-04-05", timeSlot: "05:00 PM - 06:00 PM", court: "C1", totalPayment: 1100 },
      { id: "6", customerName: "Emma Davis", phoneNumber: "9567890123", date: "2025-04-06", timeSlot: "03:00 PM - 04:00 PM", court: "C2", totalPayment: 950 },
      { id: "7", customerName: "Chris Wilson", phoneNumber: "9678901234", date: "2025-04-07", timeSlot: "08:00 AM - 09:00 AM", court: "C3", totalPayment: 850 },
      { id: "8", customerName: "Sophia Martinez", phoneNumber: "9789012345", date: "2025-04-08", timeSlot: "07:00 PM - 08:00 PM", court: "C4", totalPayment: 1000 }
  ]);

    const formatDate = (dateString) => {
        const options = { day: "numeric", month: "short", year: "numeric" };
        return new Date(dateString).toLocaleDateString("en-US", options);
    };

    const filteredBookings = bookings.filter((booking) =>
        booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.phoneNumber.includes(searchQuery) ||
        booking.date.includes(searchQuery) ||
        booking.court.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.timeSlot.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <button
                onClick={() => navigate("/admin")}
                className="flex items-center gap-2 p-2 bg-gray-200 hover:bg-gray-300 rounded-lg shadow-md mb-6"
            >
                <IoArrowBack />
                <span>Back</span>
            </button>

            <h1 className="text-2xl font-bold text-gray-800 mb-4">All Bookings</h1>

            <div className="relative mb-6">
                <IoSearch className="absolute left-3 top-3 text-gray-500" />
                <input
                    type="text"
                    placeholder="Search by name, phone, date, court, or time"
                    className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {filteredBookings.length > 0 ? (
                    filteredBookings.map((booking) => (
                        <div key={booking.id} className="bg-white rounded-lg shadow-md px-4 py-2 hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-lg font-semibold text-gray-800">{booking.customerName}</h3>
                            <div className="flex items-center text-gray-600 mt-1">
                                <IoCall className="mr-2" />
                                <span>{booking.phoneNumber}</span>
                            </div>
                            <div className="flex items-center text-gray-600 mt-1">
                                <IoCalendar className="mr-2" />
                                <span>{formatDate(booking.date)}</span>
                            </div>
                            <div className="flex items-center text-gray-600 mt-1">
                                <IoTime className="mr-2" />
                                <span>{booking.court} - {booking.timeSlot}</span>
                            </div>
                            <div className="mt-2 font-bold text-orange-600">Total: ₹{booking.totalPayment}</div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600">No bookings found matching your search.</p>
                )}
            </div>
        </div>
    );
}

export default ViewAllBookings;
