import React, { useState } from 'react';
import Header from '../components/Header';
import { Link, useNavigate } from 'react-router-dom'
import { IoArrowBack } from "react-icons/io5";
import { toast } from 'react-toastify';

const preBookedSlots = {
    "2025-03-20-06:00 AM - 07:00 AM-C1": true,
    "2025-03-20-07:00 AM - 08:00 AM-C2": true,
    "2025-03-20-08:00 AM - 09:00 AM-C3": true,
};


const timeSlots = [
    { time: "06:00 AM - 07:00 AM", price: "₹800" },
    { time: "07:00 AM - 08:00 AM", price: "₹800" },
    { time: "08:00 AM - 09:00 AM", price: "₹800" },
    { time: "09:00 AM - 10:00 AM", price: "₹800" },
    { time: "10:00 AM - 11:00 AM", price: "₹800" },
    { time: "03:00 PM - 04:00 PM", price: "₹800" },
    { time: "04:00 PM - 05:00 PM", price: "₹800" },
    { time: "05:00 PM - 06:00 PM", price: "₹800" },
    { time: "06:00 PM - 07:00 PM", price: "₹800" },
    { time: "07:00 PM - 08:00 PM", price: "₹800" },
    { time: "08:00 PM - 09:00 PM", price: "₹800" },
    { time: "09:00 PM - 10:00 PM", price: "₹800" },
    { time: "10:00 PM - 11:00 PM", price: "₹800" },
    { time: "11:00 PM - 12:00 AM", price: "₹800" },
];
const courts = ["C1", "C2", "C3", "C4"];

function CourtBooking() {
    const navigate = useNavigate()
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const generateDates = () => {
        const dates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date();
            date.setDate(date.getDate() + i);
            dates.push({
                fullDate: date.toISOString().split('T')[0],
                day: date.toLocaleDateString('en-US', { weekday: 'short' }),
                date: date.getDate(),
                month: date.toLocaleDateString('en-US', { month: 'long' }),
                year: date.getFullYear
            });
        }
        return dates;
    };


    const selectedMonthYear = new Date(selectedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    const [selectedSlots, setSelectedSlots] = useState({});

    const handleSelectDate = (fullDate) => {
        setSelectedDate(fullDate)
        setSelectedSlots({})
    }

    const handleCheckboxChange = (event, time, court, price) => {
        const isChecked = event.target.checked;
        setSelectedSlots((prev) => {
            const newSlots = { ...prev };
            const key = `${selectedDate}-${time}-${court}`;

            if (isChecked) {
                // Add slot if checked
                newSlots[key] = { time, court, price, date: selectedDate };
            } else {
                // Remove slot if unchecked
                delete newSlots[key];
            }

            console.log("Selected Slots:", newSlots);
            return newSlots;
        });
    };


    const handleNext = (event) => {
        if (Object.keys(selectedSlots).length === 0) {
            event.preventDefault(); // Prevent navigation
            toast.error("Please select at least one slot!", {
                position: "top-center",
                autoClose: 2000,
                style: {
                    width: "360px",
                    margin: "20px auto",
                    textAlign: "center",
                },
            });
        }
    };

    console.log('Selected slots complete ', selectedSlots)


    return (
        <div>

            <div className=' w-full h-full bg-white py-2 rounded-t-2xl '>
                <div
                    className="flex w-full justify-between items-center gap-2 p-2 rounded-lg"
                >   <button
                    onClick={() => navigate("/")}
                    className='font-bold text-xl ml-4'
                >
                        <IoArrowBack />
                    </button>
                    <span className='mr-10 font-bold'>Select Slot</span>
                    <span></span>
                </div>
                <div className=' w-full  bg-white rounded-t-2xl mt-4'>
                    <div className='mb-4'>
                        <label className='flex items-center justify-center mb-2'>
                            <div className="text-xl font-semibold text-orange-400">{selectedMonthYear}</div>
                            {/* <hr className="w-20 border-gray-200 border-t-[2px] mt-1" /> */}
                        </label>
                        <div className='flex space-x-3 justify-center'>
                            {generateDates().map(({ fullDate, day, date }) => (
                                <div key={fullDate} className='text-center cursor-pointer' onClick={() => handleSelectDate(fullDate)}>
                                    <div className='text-sm font-semibold mb-2'>{day}</div>
                                    <div className={`w-10 h-10 flex items-center justify-center rounded-full ${selectedDate === fullDate ? 'bg-orange-400 text-white' : 'bg-gray-200'}`}>
                                        {date}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-4 bg-white text-black text-sm TimeSlotCheckbox">
                        <div className="grid grid-cols-6 items-center text-left font-bold ">
                            <div className=' col-span-2'>Time Slot</div>
                            {courts.map((court) => (
                                <div key={court} className="text-center">{court}</div>
                            ))}
                        </div>

                        {timeSlots.map(({ time, price }) => (
                            <div
                                key={time}
                                className="grid grid-cols-6 items-center mt-2"
                            >
                                <div className="text-left col-span-2 w-2xs text-xs mt-2">
                                    <div>{time}</div>
                                    <div className="text-green-400 font-bold">{price}</div>
                                </div>
                                {courts.map((court) => (
                                    <div key={court} className="flex justify-center ">
                                        <input
                                            type="checkbox"
                                            className={`w-4 h-4 rounded border-gray-500 bg-gray-800 
        ${preBookedSlots[`${selectedDate}-${time}-${court}`] ? 'checked:bg-red-500 cursor-not-allowed' : ''}`}
                                            onChange={(event) => handleCheckboxChange(event, time, court, price)}
                                            checked={
                                                !!selectedSlots[`${selectedDate}-${time}-${court}`] ||
                                                preBookedSlots[`${selectedDate}-${time}-${court}`] // Ensure pre-booked slots are checked
                                            }
                                            disabled={!!preBookedSlots[`${selectedDate}-${time}-${court}`]} // Disable pre-booked slots
                                        />

                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            <Link to="/checkout"
                state={{ selectedSlots, selectedDate }}
                className='w-full flex items-center justify-center'
                onClick={handleNext}
            >
                <button className=' w-[90%] bg-orange-600 text-white p-2 rounded mb-4'>Next</button>
            </Link>
        </div>
    )
}

export default CourtBooking
