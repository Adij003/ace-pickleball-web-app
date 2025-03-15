import React, { useState } from 'react';
import { GrAppsRounded } from "react-icons/gr";
import profile from "../assets/profile.webp";
import CardComponent from '../components/CardComponent';
import TypewriterText from '../components/TypewriterText';
import AceHeading from '../components/AceHeading';
import AboutUs from './AboutUs';

function Home() {
    const [isBookingPopOver, setIsBookingPopOver] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedTime, setSelectedTime] = useState(null);

    const generateDates = () => {
        const dates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date();
            date.setDate(date.getDate() + i);
            dates.push({
                fullDate: date.toISOString().split('T')[0],
                day: date.toLocaleDateString('en-US', { weekday: 'short' }),
                date: date.getDate()
            });
        }
        return dates;
    };

    const timeSlots = [];
    for (let hour = 6; hour <= 23; hour++) {
        timeSlots.push(`${hour}:00`);
    }

    const handleBookNowClick = () => {
        setIsBookingPopOver(true);
    };

    return (
        <div className={`p-4 container ${isBookingPopOver ? 'bg-gray-400 bg-opacity-50' : ''}`}>
            <div className="flex justify-between items-center m-2">
                <div className="relative h-15 w-15 p-[2px] rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500">
                    <img
                        src={profile}
                        alt="user profile"
                        className="h-full w-full rounded-full border-2 border-white"
                    />
                </div>
                <GrAppsRounded className='text-4xl text-gray-600 font-thin cursor-pointer' strokeWidth={0.00} style={{ color: "#6B7280" }} />
            </div>

            <TypewriterText />
            <div className="flex items-center">
                <div className="text-sm ml-4 mr-2">Book your court</div>
                <hr className={`w-20 ${isBookingPopOver ? 'border-gray-500' : 'border-gray-200'} border-t-[2px] mt-1`} />
            </div>

            <div className='flex justify-center'>
                <CardComponent onBookNowClick={handleBookNowClick} />
            </div>
            <div className='mt-4'>
                <AceHeading />
            </div>
            <AboutUs />
            <div className='flex justify-center mt-4'></div>
            {
                isBookingPopOver && (
                    <div className='fixed bottom-0 left-0 w-full h-[80%] bg-white shadow-lg p-4 rounded-t-2xl overflow-hidden'>
                        <h2 className='text-lg font-bold ml-2 mb-2'>Book your court</h2>
                        <div className='mb-4'>
                            <label className='flex items-center mb-2' >
                            <div className="text-sm ml-2 mr-4 font-semibold text-orange-400">Select Date</div>
                            <hr className="w-20 border-gray-200 border-t-[2px] mt-1" />
                            </label>
                            <div className='flex space-x-2 justify-center'>
                                {generateDates().map(({ fullDate, day, date }) => (
                                    <div key={fullDate} className='text-center cursor-pointer' onClick={() => setSelectedDate(fullDate)}>
                                        <div className='text-sm font-semibold mb-2'>{day}</div>
                                        <div className={`w-10 h-10 flex items-center justify-center rounded-full ${selectedDate === fullDate ? 'bg-orange-400 text-white' : 'bg-gray-200'}`}>
                                            {date}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='mb-6'>
                        <label className='flex items-center mb-4' >
                            <div className="text-sm ml-2 mr-4 font-semibold text-orange-400">Select Time</div>
                            <hr className="w-20 border-gray-200 border-t-[2px] mt-1" />
                            </label>
                            <div className='border p-2 rounded h-56 overflow-y-auto'>
                                {timeSlots.map((time, index) => (
                                    <div 
                                        key={index} 
                                        className={`p-2 cursor-pointer ${selectedTime === time ? 'bg-orange-400 text-white' : 'bg-gray-100'} rounded mb-1`} 
                                        onClick={() => setSelectedTime(time)}>
                                        {time} - {Math.random() > 0.5 ? "Booked" : "Available"}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button className='w-full bg-orange-600 text-white p-2 rounded mb-2' onClick={() => setIsBookingPopOver(false)}>Book Appointment</button>
                        <button className='w-full bg-gray-300 text-white p-2 rounded mt-2' onClick={() => setIsBookingPopOver(false)}>Close</button>
                    </div>
                )
            }
        </div>
    );
}

export default Home;
