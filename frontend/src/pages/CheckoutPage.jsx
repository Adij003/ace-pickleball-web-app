import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoArrowBack, IoPerson, IoCall, IoMail, IoCalendar } from "react-icons/io5";
import { toast } from 'react-toastify';
import axios from 'axios';

function CheckoutPage() {
    const location = useLocation();
    const { selectedSlots = {}, selectedDate } = location.state || {};
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");

    // Get user info from localStorage
    const user = JSON.parse(localStorage.getItem("user-info")) || {};
    const { name = "Guest", email = "" } = user;
    const firstName = name.split(' ')[0];

    // Convert selectedSlots object to array
    const slotArray = Object.values(selectedSlots);

    // Calculate total amount
    const totalAmount = slotArray.reduce((sum, slot) => {
        return sum + parseInt(slot.price.replace(/\D/g, ''), 10);
    }, 0);

    const handleCheckout = async () => {
        if (!phoneNumber) {
            toast.error("Please enter your phone number");
            return;
        }
    
        if (slotArray.length === 0) {
            toast.error("No slots selected for booking");
            return;
        }
    
        setIsProcessing(true);
    
        try {
            const bookingData = {
                action: "book-existing", // Explicit action type
                slots: slotArray.map(slot => ({
                    date: slot.date,
                    timeSlot: slot.timeSlot || slot.time,
                    court: slot.court,
                    bookedBy: firstName,
                    phoneNumber,
                    userEmail: email,
                    price: slot.price
                })),
                userDetails: {
                    name,
                    email,
                    phoneNumber
                },
                totalAmount
            };
    
            console.log("======= FINAL BOOKING PAYLOAD =======");
            console.log(JSON.stringify(bookingData, null, 2));
            console.log("==============================");
    
            const response = await axios.post(
                'http://localhost:5001/api/courts/book-slots', 
                bookingData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
    
            if (response.status === 200 || response.status === 201) {
                toast.success("Booking confirmed successfully!");
                navigate("/booking-confirmation", {
                    state: {
                        bookingDetails: bookingData,
                        referenceId: response.data.bookingId || `TEMP-${Date.now()}`
                    }
                });
            }
        } catch (error) {
            console.error("Booking error details:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                config: error.config
            });
            toast.error(error.response?.data?.message || "Booking failed. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    return (
        <div className="min-h-screen bg-gray-100 pb-20">
            {/* Header */}
            <div className="bg-white shadow-sm sticky top-0 z-10">
                <div className="flex items-center justify-between p-4 max-w-4xl mx-auto">
                    <button 
                        onClick={() => navigate(-1)}
                        className="text-gray-700 hover:text-orange-500"
                    >
                        <IoArrowBack size={24} />
                    </button>
                    <h1 className="text-xl font-bold text-gray-800">Confirm Booking</h1>
                    <div className="w-6"></div> {/* Spacer */}
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 py-6">
                {/* Booking Summary Card */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-lg font-bold text-orange-500 mb-4 flex items-center">
                        <IoCalendar className="mr-2" /> Booking Summary
                    </h2>
                    
                    <div className="space-y-4">
                        {/* Date Display */}
                        <div className="bg-amber-50 p-3 rounded-lg">
                            <p className="font-semibold text-amber-800">
                                {formatDate(selectedDate)}
                            </p>
                        </div>

                        {/* Slots Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200 text-gray-500 text-sm">
                                        <th className="pb-2 text-left">Court</th>
                                        <th className="pb-2 text-left">Time</th>
                                        <th className="pb-2 text-right">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {slotArray.map((slot, index) => (
                                        <tr key={index} className="border-b border-gray-100">
                                            <td className="py-3 text-gray-700">{slot.court}</td>
                                            <td className="py-3 text-gray-700">
                                                {slot.timeSlot || slot.time}
                                            </td>
                                            <td className="py-3 text-right font-medium">
                                                {slot.price}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Total Amount */}
                        <div className="flex justify-between items-center pt-2">
                            <span className="font-bold text-gray-700">Total</span>
                            <span className="text-lg font-bold text-orange-500">
                                ₹{totalAmount}
                            </span>
                        </div>
                    </div>
                </div>

                {/* User Details Card */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                        <IoPerson className="mr-2" /> Your Details
                    </h2>
                    
                    <div className="space-y-3">
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                            <IoPerson className="text-gray-400 mr-3" size={18} />
                            <span className="text-gray-700">{name}</span>
                        </div>
                        
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                            <IoMail className="text-gray-400 mr-3" size={18} />
                            <span className="text-gray-700">{email}</span>
                        </div>
                        
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                            <IoCall className="text-gray-400 mr-3" size={18} />
                            <input
                                type="tel"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="bg-transparent flex-1 focus:outline-none"
                                placeholder="Enter phone number"
                                required
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Fixed Bottom Button */}
            <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4">
                <button
                    onClick={handleCheckout}
                    disabled={isProcessing || slotArray.length === 0}
                    className={`w-full py-3 rounded-lg font-bold text-white ${
                        isProcessing ? 'bg-orange-400' : 'bg-orange-500 hover:bg-orange-600'
                    } transition-colors ${
                        slotArray.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                    {isProcessing ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                        </span>
                    ) : (
                        `Pay ₹${totalAmount} & Confirm Booking`
                    )}
                </button>
            </div>
        </div>
    );
}

export default CheckoutPage;