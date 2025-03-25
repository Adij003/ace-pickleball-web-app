import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoArrowBack, IoPerson, IoCall, IoMail, IoCalendar, IoLogIn } from "react-icons/io5";
import { toast } from 'react-toastify';
import axios from 'axios';

function CheckoutPage() {
    const location = useLocation();
    const { selectedSlots = {}, selectedDate } = location.state || {};
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneError, setPhoneError] = useState("");

    // Authentication and user data
    const isLoggedIn = localStorage.getItem("isAuthenticated") === "true";
    const user = isLoggedIn ? JSON.parse(localStorage.getItem("user-info")) || {} : {};
    const { name = "Guest", email = "", uid: userId = "guest" } = user;

    // Booking data preparation
    const slotArray = Object.values(selectedSlots);
    const totalAmount = slotArray.reduce((sum, slot) => (
        sum + parseInt(slot.price.replace(/\D/g, ''), 10)
    ), 0);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-GB', { 
            day: '2-digit', 
            month: 'short', 
            year: 'numeric' 
        });
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        if (value.length <= 10) {
            setPhoneNumber(value);
            setPhoneError(value.length === 10 ? "" : "Phone number must be 10 digits");
        }
    };

    const handleCheckout = async () => {
        // Validation
        if (!isLoggedIn) {
            navigate("/login", { 
                state: { 
                    fromCheckout: true, 
                    selectedSlots, 
                    selectedDate 
                } 
            });
            return;
        }

        if (!phoneNumber || phoneNumber.length !== 10) {
            setPhoneError("Valid 10-digit phone number required");
            toast.error("Please enter a valid phone number");
            return;
        }

        if (slotArray.length === 0) {
            toast.error("No slots selected for booking");
            return;
        }

        setIsProcessing(true);

        try {
            const bookingData = {
                action: "book-existing",
                slots: slotArray.map(slot => ({
                    date: slot.date,
                    timeSlot: slot.timeSlot || slot.time,
                    court: slot.court,
                    courtId: slot.courtId || slot.court,
                    price: typeof slot.price === 'string' ? 
                        parseInt(slot.price.replace(/\D/g, ''), 10) : 
                        slot.price,
                    userEmail: email
                })),
                userDetails: {
                    userId,
                    name,
                    email,
                    phoneNumber
                },
                totalAmount,
                paymentStatus: "pending"
            };

            // API call
            const response = await axios.post(
                'http://localhost:5001/api/courts/book-slots',
                bookingData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            if (response.data.success) {
                toast.success("Booking confirmed!");
                navigate("/booking-confirmation", {
                    state: {
                        bookingDetails: response.data.bookingData,
                        referenceId: response.data.bookingId
                    }
                });
            }
        } catch (error) {
            console.error("Booking error:", error);
            const errorMessage = error.response?.data?.error || 
                               error.response?.data?.message || 
                               "Booking failed. Please try again.";
            
            toast.error(errorMessage);
            
            if (error.response?.status === 401) {
                navigate("/login");
            }
        } finally {
            setIsProcessing(false);
        }
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
                    <div className="w-6"></div>
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
                        <div className="bg-amber-50 p-3 rounded-lg">
                            <p className="font-semibold text-amber-800">
                                {formatDate(selectedDate)}
                            </p>
                        </div>

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

                        <div className="flex justify-between items-center pt-2">
                            <span className="font-bold text-gray-700">Total</span>
                            <span className="text-lg font-bold text-orange-500">
                                ₹{totalAmount}
                            </span>
                        </div>
                    </div>
                </div>

                {/* User Details Card */}
                {isLoggedIn ? (
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
                                <div className="flex-1">
                                    <input
                                        type="tel"
                                        value={phoneNumber}
                                        onChange={handlePhoneChange}
                                        className="bg-transparent w-full focus:outline-none"
                                        placeholder="Enter 10-digit phone number"
                                        maxLength={10}
                                        required
                                    />
                                    {phoneError && (
                                        <p className="text-red-500 text-xs mt-1">{phoneError}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-center">
                        <h2 className="text-lg font-bold text-gray-800 mb-4">
                            Please login to complete your booking
                        </h2>
                        <p className="text-gray-600 mb-4">
                            Your selected slots will be saved during login
                        </p>
                    </div>
                )}
            </div>

            {/* Fixed Bottom Button */}
            <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4">
                <button
                    onClick={handleCheckout}
                    disabled={isProcessing || slotArray.length === 0 || (isLoggedIn && phoneNumber.length !== 10)}
                    className={`w-full py-3 rounded-lg font-bold text-white ${
                        isProcessing ? 'bg-orange-400' : 'bg-orange-500 hover:bg-orange-600'
                    } transition-colors ${
                        (slotArray.length === 0 || (isLoggedIn && phoneNumber.length !== 10)) ? 
                        'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                    {isProcessing ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" 
                                 xmlns="http://www.w3.org/2000/svg" 
                                 fill="none" 
                                 viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" 
                                        stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" 
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                        </span>
                    ) : isLoggedIn ? (
                        `Pay ₹${totalAmount} & Confirm Booking`
                    ) : (
                        <span className="flex items-center justify-center">
                            <IoLogIn className="mr-2" />
                            Login to Continue Booking
                        </span>
                    )}
                </button>
            </div>
        </div>
    );
}

export default CheckoutPage;