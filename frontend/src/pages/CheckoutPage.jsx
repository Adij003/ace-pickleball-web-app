import React, { useState, useEffect } from 'react';
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
    const [isInitialized, setIsInitialized] = useState(false);

    // Auth state
    const [authState, setAuthState] = useState({
        isLoggedIn: false,
        token: null,
        userId: null,
        user: { name: "Guest", email: "" }
    });

    // Initialize auth state
    useEffect(() => {
        const initializeAuth = () => {
            const isLoggedIn = 
                localStorage.getItem("isAuthenticated") === "true" || 
                sessionStorage.getItem("isAuthenticated") === "true";
            
            const userInfoString = localStorage.getItem("user-info") || sessionStorage.getItem("user-info") || "{}";
            const user = JSON.parse(userInfoString);
            
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            const userId = isLoggedIn 
                ? sessionStorage.getItem('userId') || user.userId || null
                : null;

            setAuthState({
                isLoggedIn,
                token,
                userId,
                user
            });
            setIsInitialized(true);
        };

        initializeAuth();
    }, []);
    console.log('here we are gettting auth state from checkoutpage: ', authState)
    // Booking data
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

    const clearAuthState = () => {
        localStorage.removeItem('isAuthenticated');
        sessionStorage.removeItem('isAuthenticated');
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        localStorage.removeItem('user-info');
        sessionStorage.removeItem('user-info');
        localStorage.removeItem('userId');
        sessionStorage.removeItem('userId');
        setAuthState({
            isLoggedIn: false,
            token: null,
            userId: null,
            user: { name: "Guest", email: "" }
        });
    };

    const updateUserBookings = async (bookingId) => {
        try {
            if (!authState.userId) {
                console.error('No user ID available for booking update');
                return false;
            }
    
            // Format the request data to exactly match backend expectations
            const bookingUpdateData = {
                userId: authState.userId,  // Include userId in the request body
                bookingId: bookingId,     // Include bookingId in the request body
                bookingDetails: {         // Include additional booking details
                    date: selectedDate,
                    slots: slotArray.map(slot => ({
                        time: slot.timeSlot || slot.time,
                        court: slot.court,
                        price: typeof slot.price === 'string' ? 
                            parseInt(slot.price.replace(/\D/g, ''), 10) : 
                            slot.price
                    })),
                    totalAmount: totalAmount,
                    status: "confirmed"
                }
            };
    
            console.log('Attempting to update user bookings with:', bookingUpdateData);
    
            const response = await axios.post(
                `http://localhost:5001/api/users/${authState.userId}/bookings`,
                bookingUpdateData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authState.token}`
                    },
                    validateStatus: function (status) {
                        return status < 500; // Reject only if status is 500 or higher
                    }
                }
            );
    
            if (response.status === 400) {
                console.error('Backend validation failed:', response.data);
                throw new Error(response.data.message || 'Invalid booking data format');
            }
    
            console.log('Booking successfully added to user:', response.data);
            return true;
        } catch (error) {
            console.error('Failed to update user bookings:', {
                error: error.response?.data || error.message,
                requestData: error.config?.data
            });
    
            if (error.response?.data?.error) {
                toast.error(error.response.data.error);
            } else if (error.response?.data?.errors) {
                toast.error(`Validation errors: ${error.response.data.errors.join(', ')}`);
            } else {
                toast.error("Failed to update booking in user profile. Please contact support.");
            }
            return false;
        }
    };

    const handleCheckout = async () => {
        // Validation checks
        if (!authState.isLoggedIn) {
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

        if (!authState.userId) {
            toast.error("User identification error. Please login again.");
            navigate("/login");
            return;
        }

        setIsProcessing(true);

        try {
            // 1. First create the booking
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
                    userEmail: authState.user.email
                })),
                userDetails: {
                    userId: authState.userId,
                    name: authState.user.name,
                    email: authState.user.email,
                    phoneNumber
                },
                totalAmount,
                paymentStatus: "pending"
            };

            console.log('Creating booking with:', bookingData);

            const bookingResponse = await axios.post(
                'http://localhost:5001/api/courts/book-slots',
                bookingData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authState.token}`
                    }
                }
            );

            console.log('Booking created:', bookingResponse.data);

            if (bookingResponse.data.success) {
                // 2. Then update the user's bookings array
                const updateSuccess = await updateUserBookings(bookingResponse.data.bookingId);

                if (!updateSuccess) {
                    toast.warning("Booking created but profile not updated");
                } else {
                    toast.success("Booking confirmed!");
                }

                navigate("/booking-confirmation", {
                    state: {
                        bookingDetails: bookingResponse.data.bookingData,
                        referenceId: bookingResponse.data.bookingId
                    }
                });
            }
        } catch (error) {
            console.error('Booking failed:', {
                message: error.message,
                response: error.response?.data,
                stack: error.stack
            });

            if (error.response?.status === 401) {
                toast.error("Session expired. Please login again.");
                clearAuthState();
                navigate("/login");
            } else if (error.response?.status === 400) {
                const errorMessage = error.response.data?.message || 
                                   "Invalid booking data. Please check your details and try again.";
                toast.error(errorMessage);
            } else {
                toast.error("Booking failed. Please try again.");
            }
        } finally {
            setIsProcessing(false);
        }
    };

    if (!isInitialized) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mx-auto"></div>
                    <p className="mt-4 text-gray-700">Loading your session...</p>
                </div>
            </div>
        );
    }

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
                {authState.isLoggedIn ? (
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                            <IoPerson className="mr-2" /> Your Details
                        </h2>
                        
                        <div className="space-y-3">
                            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                <IoPerson className="text-gray-400 mr-3" size={18} />
                                <span className="text-gray-700">{authState.user.name}</span>
                            </div>
                            
                            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                <IoMail className="text-gray-400 mr-3" size={18} />
                                <span className="text-gray-700">{authState.user.email}</span>
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
                        <button
                            onClick={() => navigate("/login", { 
                                state: { fromCheckout: true, selectedSlots, selectedDate } 
                            })}
                            className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-lg font-medium transition-colors"
                        >
                            <IoLogIn className="inline mr-2" />
                            Login Now
                        </button>
                    </div>
                )}
            </div>

            {/* Fixed Bottom Button */}
            {authState.isLoggedIn && slotArray.length > 0 && (
                <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4">
                    <button
                        onClick={handleCheckout}
                        disabled={isProcessing || phoneNumber.length !== 10}
                        className={`w-full py-3 rounded-lg font-bold text-white ${
                            isProcessing ? 'bg-orange-400' : 'bg-orange-500 hover:bg-orange-600'
                        } transition-colors ${
                            phoneNumber.length !== 10 ? 'opacity-50 cursor-not-allowed' : ''
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
                        ) : (
                            `Pay ₹${totalAmount} & Confirm Booking`
                        )}
                    </button>
                </div>
            )}
        </div>
    );
}

export default CheckoutPage;