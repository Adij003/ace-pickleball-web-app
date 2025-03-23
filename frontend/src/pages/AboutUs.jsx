import React, { useState } from 'react';

function AboutUs() {
  const [activeTab, setActiveTab] = useState('about');

  return (
    <div className='px-1 container mx-auto mb-10'>
      <div className="flex justify-end items-center mt-6 mb-10">
        <hr className="w-20 border-gray-200 border-t-[2px] mt-1" />
        <div className="text-sm ml-4 mr-2">Get to know us</div>
      </div>
      <div className="w-full bg-white border border-yellow-500 rounded-lg shadow-sm">
        <ul className="flex flex-wrap text-sm font-medium text-center text-white bg-amber-500 rounded-t-lg" role="tablist">
          <li className="me-2">
            <button
              onClick={() => setActiveTab('about')}
              className={`inline-block p-4 rounded-ss-lg transition-all ${activeTab === 'about' ? 'bg-emerald-500' : 'hover:bg-amber-500'}`}
            >
              About
            </button>
          </li>
          <li className="me-2">
            <button
              onClick={() => setActiveTab('services')}
              className={`inline-block p-4 transition-all ${activeTab === 'services' ? 'bg-emerald-500' : 'hover:bg-yellow-500'}`}
            >
              Services
            </button>
          </li>
          <li className="me-2">
            <button
              onClick={() => setActiveTab('statistics')}
              className={`inline-block p-4 transition-all ${activeTab === 'statistics' ? 'bg-emerald-500' : 'hover:bg-yellow-500'}`}
            >
              Location
            </button>
          </li>
        </ul>
        <div className="p-6">
          {activeTab === 'about' && (
            <div>
              <h2 className="mb-3 text-3xl font-extrabold text-yellow-700">Premier Pickleball Destination</h2>
              <p className="text-gray-700">
                Located in the heart of Bhopal, our state-of-the-art facility features four professional-grade pickleball courts, modern amenities, and a stadium-like atmosphere that's perfect for competitive play and socializing.

                At Ace Pickleball Club, we're dedicated to providing a unique and engaging experience that's fun, social, and competitive.
              </p>
            </div>
          )}
          {activeTab === 'services' && (
            <div>
              <h2 className="mb-3 text-2xl font-extrabold text-yellow-700"> Elevating the Pickleball Experience</h2>
              <ul className="space-y-2 text-gray-700">
                <li>✔ Comprehensive Player Support</li>
                <li>✔ Pickleball for All Skill Levels</li>
                <li>✔ Structured Training & Development</li>
                <li>✔ Seamless Club Management & Events</li>
              </ul>
            </div>
          )}
          {activeTab === 'statistics' && (
              <div className="col-span-2 sm:col-span-3">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4661.726321243961!2d77.43174751177524!3d23.161305378989507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c45208d6a8dbf%3A0x9ef1e50977a86392!2sAce%20Pickleball%20Club!5e1!3m2!1sen!2sin!4v1742740864948!5m2!1sen!2sin" 
                width="100%" 
                height="250" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
