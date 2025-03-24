import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../components/CardComponent';
import TypewriterText from '../components/TypewriterText';
import AceHeading from '../components/AceHeading';
import AboutUs from './AboutUs';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Link } from "react-router-dom";

function Home() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem("isAuthenticated") === "true"
    );

    const handleNavDrawer = () => {
        setIsOpen(true);
    };

    const handleLogout = () => {
        // Clear all authentication data
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("user-info");
        localStorage.removeItem("token");
        
        // Force state update before navigation
        setIsLoggedIn(false);
        setIsOpen(false);
        
        // Use setTimeout to ensure state updates before navigation
        setTimeout(() => {
            navigate("/");
        }, 0);
    };

    const handleLogin = () => {
        setIsOpen(false);
        navigate("/login");
    };

    return (
        <div>
            <div className="p-4 container">
                <Header handleNavDrawer={handleNavDrawer} />
                <TypewriterText />
                <div className="flex items-center">
                    <div className="text-sm ml-4 mr-2">Book your court</div>
                    <hr className="w-20 border-gray-200 border-t-[2px] mt-1" />
                </div>

                <div className="flex justify-center">
                    <CardComponent />
                </div>
                <div className="mt-4">
                    <AceHeading />
                </div>
                <AboutUs />
            </div>
            
            {/* Enhanced Navigation Drawer */}
            {isOpen && (
                <div className="fixed inset-0 z-50 overflow-hidden">
                    {/* Overlay with fade-in animation */}
                    <div 
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-in-out"
                        onClick={() => setIsOpen(false)}
                    ></div>
                    
                    {/* Drawer with slide-in animation */}
                    <div className={`fixed inset-y-0 right-0 w-full max-w-xs transform transition-all duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                        <div className="flex h-full flex-col bg-white shadow-xl">
                            {/* Header with close button */}
                            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
                                <h2 className="text-xl font-bold text-gray-800">Menu</h2>
                                <button 
                                    onClick={() => setIsOpen(false)}
                                    className="rounded-md p-1 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                >
                                    <span className="sr-only">Close panel</span>
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            
                            {/* Navigation Items */}
                            <div className="flex-1 px-4 py-6 space-y-3 overflow-y-auto">
                                <Link 
                                    to="/about-us" 
                                    className="flex items-center px-4 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 transition-all duration-200 group"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <span className="mr-3 group-hover:text-orange-500 transition-colors">About Us</span>
                                    <svg className="ml-auto h-5 w-5 text-gray-400 group-hover:text-orange-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                                
                                {isLoggedIn && (
                                    <Link 
                                        to="/history" 
                                        className="flex items-center px-4 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 transition-all duration-200 group"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <span className="mr-3 group-hover:text-orange-500 transition-colors">Booking History</span>
                                        <svg className="ml-auto h-5 w-5 text-gray-400 group-hover:text-orange-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                )}
                                
                                <Link 
                                    to="/membership" 
                                    className="flex items-center px-4 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 transition-all duration-200 group"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <span className="mr-3 group-hover:text-orange-500 transition-colors">Membership</span>
                                    <svg className="ml-auto h-5 w-5 text-gray-400 group-hover:text-orange-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                                
                                <Link 
                                    to="/events" 
                                    className="flex items-center px-4 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 transition-all duration-200 group"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <span className="mr-3 group-hover:text-orange-500 transition-colors">Events</span>
                                    <svg className="ml-auto h-5 w-5 text-gray-400 group-hover:text-orange-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                                
                                <Link 
                                    to="/gallery" 
                                    className="flex items-center px-4 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 transition-all duration-200 group"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <span className="mr-3 group-hover:text-orange-500 transition-colors">Gallery</span>
                                    <svg className="ml-auto h-5 w-5 text-gray-400 group-hover:text-orange-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                            
                            {/* Footer with Login/Logout */}
                            <div className="px-4 py-6 border-t border-gray-200">
                                {isLoggedIn ? (
                                    <button 
                                        onClick={handleLogout}
                                        className="w-full flex items-center justify-center px-4 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white transition-all duration-200 group"
                                    >
                                        <svg className="h-5 w-5 mr-2 group-hover:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        <span>Logout</span>
                                    </button>
                                ) : (
                                    <button 
                                        onClick={handleLogin}
                                        className="w-full flex items-center justify-center px-4 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white transition-all duration-200 group"
                                    >
                                        <svg className="h-5 w-5 mr-2 group-hover:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                        </svg>
                                        <span>Login</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            <Footer />
        </div>
    );
}

export default Home;