import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { 
  IoArrowBack, 
  IoCalendar, 
  IoTime, 
  IoLocation, 
  IoReceipt, 
  IoCard,
  IoAlertCircle,
  IoReload,
  IoPerson,
  IoMail,
  IoCall
} from "react-icons/io5";
import axios from 'axios';
import { toast } from 'react-toastify';

function BookingHistory() {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [authError, setAuthError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);
    const [authState, setAuthState] = useState({
        isLoggedIn: false,
        userId: null,
        user: null
    });

    // Initialize auth state from session storage
    useEffect(() => {
        const initializeAuth = () => {
            const userData = JSON.parse(sessionStorage.getItem('userData') || "{}");
            const userId = sessionStorage.getItem('userId') || userData.userId;
            const isLoggedIn = Boolean(userId);
            
            setAuthState({
                isLoggedIn,
                userId,
                user: userData
            });

            if (isLoggedIn && userId) {
                fetchBookings(userId);
            } else {
                setLoading(false);
                setAuthError("Please login to view your bookings");
            }
        };

        initializeAuth();
    }, [retryCount]);

    const fetchBookings = async (userId) => {
        try {
            setLoading(true);
            setAuthError(null);

            const response = await axios.get(
                `http://localhost:5001/api/courts/users/${userId}`
            );

            const validBookings = response.data.data.map(booking => ({
                ...booking,
                bookingId: booking.id || booking.bookingId || 'N/A',
                slots: Array.isArray(booking.slots) ? booking.slots : [],
                totalAmount: booking.totalAmount || 800
            }));

            setBookings(validBookings);
            
        } catch (error) {
            setAuthError(error.message);
            if (error.message.includes("expired") || error.response?.status === 401) {
                clearAuthState();
            }
        } finally {
            setLoading(false);
        }
    };

    const clearAuthState = () => {
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('userData');
        setAuthState({
            isLoggedIn: false,
            userId: null,
            user: null
        });
    };

    const handleRetry = () => setRetryCount(prev => prev + 1);

    const handleLoginRedirect = () => {
        navigate("/login", { 
            state: { 
                from: "/booking-history",
                userData: authState.user,
                message: authError || "Session expired"
            } 
        });
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        try {
            const options = { day: 'numeric', month: 'short', year: 'numeric' };
            return new Date(dateString).toLocaleDateString('en-US', options);
        } catch {
            return dateString;
        }
    };

    const formatTimeSlot = (timeSlot) => {
        if (!timeSlot) return "N/A";
        return timeSlot.replace(/(\d+:\d+ [AP]M) - (\d+:\d+ [AP]M)/, "$1-$2");
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500 mx-auto mb-4"></div>
                    <p className="text-gray-700 text-lg font-medium">Loading your bookings...</p>
                    <button 
                        onClick={handleRetry}
                        className="mt-6 flex items-center justify-center mx-auto gap-2 bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                        <IoReload className="text-lg" /> Refresh
                    </button>
                </div>
            </div>
        );
    }

    if (authError || !authState.isLoggedIn) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full border border-gray-100">
                    <div className="flex flex-col items-center text-center">
                        <div className="bg-red-100 p-4 rounded-full mb-4">
                            <IoAlertCircle className="text-red-500 text-4xl" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Required</h2>
                        <p className="text-gray-600 mb-6">{authError || "Please login to view your bookings"}</p>
                        
                        <div className="w-full space-y-4">
                            <button
                                onClick={handleRetry}
                                className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-6 rounded-xl font-medium transition-all duration-300"
                            >
                                <IoReload className="text-lg" /> Try Again
                            </button>
                            <button
                                onClick={handleLoginRedirect}
                                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 px-6 rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                            >
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 p-3 bg-white hover:bg-gray-50 rounded-xl shadow-sm transition-all duration-300"
                    >
                        <IoArrowBack className="text-xl text-gray-600" />
                        <span className="font-medium text-gray-700 hidden sm:inline">Back</span>
                    </button>
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-800">My Bookings</h1>
                        <p className="text-gray-500 mt-1">Your recent court reservations</p>
                    </div>
                    <button 
                        onClick={handleRetry}
                        className="p-3 bg-white hover:bg-gray-50 text-gray-600 rounded-xl shadow-sm transition-all duration-300"
                        title="Refresh bookings"
                    >
                        <IoReload className="text-xl" />
                    </button>
                </div>

                {bookings.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm p-8 text-center max-w-2xl mx-auto border border-gray-100">
                        <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-6 rounded-lg">
                            <h3 className="text-xl font-bold mb-2">No bookings yet</h3>
                            <p className="mb-6">You haven't made any court bookings yet</p>
                            <button
                                onClick={() => navigate("/book-court")}
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 px-8 rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                            >
                                Book a Court Now
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bookings.map((booking) => (
                            <div key={booking.bookingId} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 border border-gray-100">
                                <div className="p-6">
                                    <div className="flex items-start mb-5">
                                        <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white p-3 rounded-xl mr-4 flex-shrink-0 shadow-md">
                                            <IoCalendar className="text-2xl" />
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="text-xl font-bold text-gray-800 truncate">
                                                Booking #{booking.bookingId.slice(0, 8)}...
                                            </h3>
                                            <div className={`inline-block px-3 py-1 text-xs rounded-full mt-2 font-medium ${
                                                booking.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                                                booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                                {booking.status?.toUpperCase() || 'CONFIRMED'}
                                            </div>
                                        </div>
                                    </div>

                                    {/* User Info Section */}
                                    <div className="bg-gray-50 rounded-xl p-4 mb-5">
                                        <div className="flex items-center gap-3 mb-3">
                                            <IoPerson className="text-gray-500 text-lg" />
                                            <span className="text-gray-700 font-medium">{booking.user?.name || 'N/A'}</span>
                                        </div>
                                        <div className="flex items-center gap-3 mb-3">
                                            <IoMail className="text-gray-500 text-lg" />
                                            <span className="text-gray-700">{booking.user?.email || 'N/A'}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <IoCall className="text-gray-500 text-lg" />
                                            <span className="text-gray-700">{booking.user?.phoneNumber || 'N/A'}</span>
                                        </div>
                                    </div>

                                    {/* Booking Slots */}
                                    <div className="space-y-4 mb-6">
                                        {booking.slots.map((slot, index) => (
                                            <div key={index} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                                <div className="flex items-center mb-2 gap-2">
                                                    <IoCalendar className="text-gray-500 text-lg" />
                                                    <span className="text-gray-700 font-medium">{formatDate(slot.date)}</span>
                                                </div>
                                                <div className="flex items-center mb-2 gap-2">
                                                    <IoTime className="text-gray-500 text-lg" />
                                                    <span className="text-gray-700">{formatTimeSlot(slot.timeSlot)}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <IoLocation className="text-gray-500 text-lg" />
                                                    <span className="text-gray-700">Court {slot.court || slot.courtId || 'N/A'}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Booking Summary */}
                                    <div className="border-t border-gray-200 pt-5">
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-gray-600 font-medium">Booking ID:</span>
                                            <span className="font-mono text-gray-800 font-medium">
                                                {booking.bookingId}
                                            </span>
                                        </div>
                                        {booking.paymentId && (
                                            <div className="flex justify-between items-center mb-3">
                                                <span className="text-gray-600 font-medium">Payment ID:</span>
                                                <span className="font-mono text-gray-800 font-medium">
                                                    {booking.paymentId}
                                                </span>
                                            </div>
                                        )}
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-gray-600 font-medium">Total Amount:</span>
                                            <span className="text-xl font-bold text-orange-600">
                                                ₹{booking.totalAmount || 800}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600 font-medium">Booked on:</span>
                                            <span className="text-gray-700">
                                                {formatDate(booking.createdAt)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default BookingHistory;