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
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("user-info");
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setIsOpen(false);
        navigate("/");
    };

    const handleLogin = () => {
        setIsOpen(false);
        navigate("/login");
    };

    return (
        <div className="relative min-h-screen">
            {/* Main Content */}
            <div className="p-4 container mx-auto">
                <Header handleNavDrawer={handleNavDrawer} />
                
                {/* Hero Section */}
                <div className="mt-6 mb-8">
                    <TypewriterText />
                    <div className="flex items-center mt-4">
                        <div className="text-sm ml-4 mr-2 font-medium text-gray-600">Book your court</div>
                        <hr className="flex-1 border-gray-200 border-t-[2px] mt-1 max-w-[100px]" />
                    </div>
                </div>

                {/* Cards with subtle animation */}
                <div className="flex justify-center transform hover:scale-[1.01] transition-transform duration-300">
                    <CardComponent />
                </div>

                {/* Ace Heading with floating effect */}
                <div className="mt-8 hover:-translate-y-1 transition-transform duration-300">
                    <AceHeading />
                </div>

                {/* About Us with gradient border */}
                <div className="mt-10 p-[2px] bg-gradient-to-r from-transparent via-orange-100 to-transparent rounded-lg">
                    <AboutUs />
                </div>
            </div>
            
            {/* Enhanced Navigation Drawer */}
            {isOpen && (
                <div className="fixed inset-0 z-50 overflow-hidden">
                    {/* Overlay with fade-in animation */}
                    <div 
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-in-out animate-fadeIn"
                        onClick={() => setIsOpen(false)}
                    ></div>
                    
                    {/* Drawer with slide-in animation */}
                    <div className={`fixed inset-y-0 right-0 w-full max-w-xs transform transition-all duration-500 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                        <div className="flex h-full flex-col bg-white shadow-2xl">
                            {/* Header with close button */}
                            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-white">
                                <h2 className="text-xl font-bold text-gray-800">Menu</h2>
                                <button 
                                    onClick={() => setIsOpen(false)}
                                    className="rounded-full p-2 text-gray-500 hover:bg-gray-100 transition-colors"
                                >
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            
                            {/* Navigation Items */}
                            <div className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
                                <Link 
                                    to="/about-us" 
                                    className="flex items-center px-4 py-3 rounded-xl mx-2 bg-gray-50 hover:bg-gray-100 text-gray-800 transition-all duration-200 group hover:shadow-sm"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center mr-3 group-hover:bg-orange-200 transition-colors">
                                        <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <span className="font-medium group-hover:text-orange-500 transition-colors">About Us</span>
                                    <svg className="ml-auto h-5 w-5 text-gray-300 group-hover:text-orange-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                                
                                {isLoggedIn && (
                                    <Link 
                                        to="/history" 
                                        className="flex items-center px-4 py-3 rounded-xl mx-2 bg-gray-50 hover:bg-gray-100 text-gray-800 transition-all duration-200 group hover:shadow-sm"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center mr-3 group-hover:bg-orange-200 transition-colors">
                                            <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            </svg>
                                        </div>
                                        <span className="font-medium group-hover:text-orange-500 transition-colors">Booking History</span>
                                        <svg className="ml-auto h-5 w-5 text-gray-300 group-hover:text-orange-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                )}
                                
                                <Link 
                                    to="/membership" 
                                    className="flex items-center px-4 py-3 rounded-xl mx-2 bg-gray-50 hover:bg-gray-100 text-gray-800 transition-all duration-200 group hover:shadow-sm"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center mr-3 group-hover:bg-orange-200 transition-colors">
                                        <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <span className="font-medium group-hover:text-orange-500 transition-colors">Membership</span>
                                    <svg className="ml-auto h-5 w-5 text-gray-300 group-hover:text-orange-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                                
                                <Link 
                                    to="/events" 
                                    className="flex items-center px-4 py-3 rounded-xl mx-2 bg-gray-50 hover:bg-gray-100 text-gray-800 transition-all duration-200 group hover:shadow-sm"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center mr-3 group-hover:bg-orange-200 transition-colors">
                                        <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <span className="font-medium group-hover:text-orange-500 transition-colors">Events</span>
                                    <svg className="ml-auto h-5 w-5 text-gray-300 group-hover:text-orange-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                                
                                <Link 
                                    to="/gallery" 
                                    className="flex items-center px-4 py-3 rounded-xl mx-2 bg-gray-50 hover:bg-gray-100 text-gray-800 transition-all duration-200 group hover:shadow-sm"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center mr-3 group-hover:bg-orange-200 transition-colors">
                                        <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <span className="font-medium group-hover:text-orange-500 transition-colors">Gallery</span>
                                    <svg className="ml-auto h-5 w-5 text-gray-300 group-hover:text-orange-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                            
                            {/* Footer with Login/Logout */}
                            <div className="px-4 py-6 border-t border-gray-200 bg-gray-50">
                                {isLoggedIn ? (
                                    <button 
                                        onClick={handleLogout}
                                        className="w-full flex items-center justify-center px-4 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white transition-all duration-300 group hover:shadow-md"
                                    >
                                        <svg className="h-5 w-5 mr-2 group-hover:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        <span className="font-medium">Logout</span>
                                    </button>
                                ) : (
                                    <button 
                                        onClick={handleLogin}
                                        className="w-full flex items-center justify-center px-4 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white transition-all duration-300 group hover:shadow-md"
                                    >
                                        <svg className="h-5 w-5 mr-2 group-hover:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                        </svg>
                                        <span className="font-medium">Login</span>
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