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
              Facts
            </button>
          </li>
        </ul>
        <div className="p-6">
          {activeTab === 'about' && (
            <div>
              <h2 className="mb-3 text-3xl font-extrabold text-yellow-700">Powering Innovation & Trust</h2>
              <p className="text-gray-700">
                Empower Developers, IT Ops, and business teams to collaborate at high velocity. Respond to changes and deliver great customer and employee service experiences fast.
              </p>
            </div>
          )}
          {activeTab === 'services' && (
            <div>
              <h2 className="mb-3 text-2xl font-extrabold text-yellow-700">We Invest in the World's Potential</h2>
              <ul className="space-y-2 text-gray-700">
                <li>✔ Dynamic reports and dashboards</li>
                <li>✔ Templates for everyone</li>
                <li>✔ Development workflow</li>
                <li>✔ Limitless business automation</li>
              </ul>
            </div>
          )}
          {activeTab === 'statistics' && (
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
              <div>
                <h3 className="text-3xl font-bold text-yellow-700">73M+</h3>
                <p className="text-gray-700">Developers</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-yellow-700">100M+</h3>
                <p className="text-gray-700">Public repositories</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-yellow-700">1000s</h3>
                <p className="text-gray-700">Open source projects</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
