import React, { useState } from 'react';
import { GrAppsRounded } from "react-icons/gr";
import profile from "../assets/profile.webp";
import CardComponent from '../components/CardComponent';
import TypewriterText from '../components/TypewriterText';
import AceHeading from '../components/AceHeading';
import AboutUs from './AboutUs';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

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

    const mockBookings = timeSlots.flatMap((time, index) => {
        return generateDates().map(({ fullDate }) => ({
            slotId: `${fullDate}-${time}`,
            selectedDate: fullDate,
            selectedTime: time,
            isBooked: Math.random() > 0.5,
            bookedBy: Math.random() > 0.5 ? `User${index + 1}` : null
        }));
    });


   
    const handleSelectCourt = (court) => {
        setSelectedCourt(court);
    };

      const handleBookMySlot = () => {
        if (selectedDate && selectedTime && selectedCourt) {
            console.log({ selectedDate, selectedCourt, selectedTime });
        } else {
            alert("Please select date, court, and time slot");
        }
    };

    return (
        <div>

            <div className={`p-4 container`}>
                <Header/>
                <TypewriterText />
                <div className="flex items-center">
                    <div className="text-sm ml-4 mr-2">Book your court</div>
                    <hr className={`w-20 border-gray-200'} border-t-[2px] mt-1`} />
                </div>

                <div className='flex justify-center'>
                    <CardComponent  />
                </div>
                <div className='mt-4'>
                    <AceHeading />
                </div>
                <AboutUs />
                
            </div>
            <Footer />
        </div>

    );
}

export default Home;
