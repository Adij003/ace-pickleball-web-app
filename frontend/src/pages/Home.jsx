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

    const handleNavDrawer = () => {
        setIsOpen(true);
    };

    const handleLogout = () => {
        // Remove authentication token or user session
       localStorage.removeItem("authToken");  
        sessionStorage.removeItem("user");
        setIsOpen(false);
        navigate("/");

        navigate("/");
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
            
            {/* Sidebar */}
            {isOpen && (
                <div className="fixed inset-0 z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>
                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex w-80 pl-10">
                                <div className="pointer-events-auto relative w-screen max-w-md transform transition ease-in-out duration-500 sm:duration-700 translate-x-0">
                                    
                                    {/* Close Button */}
                                    <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                                        <button onClick={() => setIsOpen(false)} type="button" className="relative rounded-md text-gray-300 hover:text-white focus:ring-2 focus:ring-white focus:outline-none">
                                            <span className="absolute -inset-2.5"></span>
                                            <span className="sr-only">Close panel</span>
                                            <svg className="size-6 mt-2" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="black" aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                
                                    {/* Panel Content */}
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                        <div className="px-4 sm:px-6">
                                            <h2 className="text-base font-semibold text-gray-900" id="slide-over-title">Navigation</h2>
                                        </div>
                
                                        {/* Navigation Buttons */}
                                        <div className="relative mt-6 flex-1 px-4 sm:px-6 space-y-4">
                                            <Link to="/about-us" className="block w-full text-center bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 transition">
                                                About Us
                                            </Link>
                                            <Link to="/history" className="block w-full text-center bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 transition">
                                                Booking History
                                            </Link>
                                            <Link to="/membership" className="block w-full text-center bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 transition">
                                                Membership Details
                                            </Link>
                                            <Link to="/events" className="block w-full text-center bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 transition">
                                                Upcoming Events
                                            </Link>
                                            <Link to="/gallery" className="block w-full text-center bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 transition">
                                                Gallery
                                            </Link>
                                            <button 
                                                onClick={handleLogout} 
                                                className="block w-full text-center bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                
                                </div>
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
