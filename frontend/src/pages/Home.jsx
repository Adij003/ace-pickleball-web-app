import React, { useState } from 'react';
import CardComponent from '../components/CardComponent';
import TypewriterText from '../components/TypewriterText';
import AceHeading from '../components/AceHeading';
import AboutUs from './AboutUs';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Home() {
    const [isOpen, setIsOpen] = useState(false);
    const handleNavDrawer = () => {
        setIsOpen(true)
    }

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
            
            {isOpen && (
                <div className="fixed inset-0 z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>
                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                <div className="pointer-events-auto relative w-screen max-w-md transform transition ease-in-out duration-500 sm:duration-700 translate-x-0">
                                    <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                                        <button onClick={() => setIsOpen(false)} type="button" className="relative rounded-md text-gray-300 hover:text-white focus:ring-2 focus:ring-white focus:outline-none">
                                            <span className="absolute -inset-2.5"></span>
                                            <span className="sr-only">Close panel</span>
                                            <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                        <div className="px-4 sm:px-6">
                                            <h2 className="text-base font-semibold text-gray-900" id="slide-over-title">Panel title</h2>
                                        </div>
                                        <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                            {/* Your content */}
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
