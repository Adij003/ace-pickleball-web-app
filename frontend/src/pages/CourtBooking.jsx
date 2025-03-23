import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Link, useNavigate } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";
import { toast } from 'react-toastify';
import axios from 'axios';

function CourtBooking() {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [preBookedSlots, setPreBookedSlots] = useState({});
    const [selectedSlots, setSelectedSlots] = useState({});

    useEffect(() => {
        const fetchSlots = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/courts/court-details');
                setPreBookedSlots(response.data);
            } catch (error) {
                console.error("Error fetching slots:", error);
                toast.error("Failed to fetch slots.");
            }
        };
        fetchSlots();
    }, []);

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
                year: date.getFullYear()
            });
        }
        return dates;
    };

    const selectedMonthYear = new Date(selectedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    const handleSelectDate = (fullDate) => {
        setSelectedDate(fullDate);
        setSelectedSlots({});
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

    const handleCheckboxChange = (event, time, court, price) => {
        const isChecked = event.target.checked;
        setSelectedSlots((prev) => {
            const newSlots = { ...prev };
            const key = `${selectedDate}-${time}-${court}`;

            if (isChecked) {
                newSlots[key] = { time, court, price, date: selectedDate };
            } else {
                delete newSlots[key];
            }

            return newSlots;
        });
    };

    const handleNext = async (event) => {
        if (Object.keys(selectedSlots).length === 0) {
            event.preventDefault();
            toast.error("Please select at least one slot!", {
                position: "top-center",
                autoClose: 2000,
                style: {
                    width: "360px",
                    margin: "20px auto",
                    textAlign: "center",
                },
            });
        } else {
            try {
                await axios.post('http://localhost:5001/api/courts/book-slots', selectedSlots);
                toast.success("Slots booked successfully!");
            } catch (error) {
                console.error("Error booking slots:", error);
                toast.error("Failed to book slots.");
            }
        }
    };

    return (
        <div>
            <div className='w-full h-full bg-white py-2 rounded-t-2xl'>
                <div className="flex w-full justify-between items-center gap-2 p-2 rounded-lg">
                    <button onClick={() => navigate("/")} className='font-bold text-xl ml-4'>
                        <IoArrowBack />
                    </button>
                    <span className='mr-10 font-bold'>Select Slot</span>
                    <span></span>
                </div>
                <div className='w-full bg-white rounded-t-2xl mt-4'>
                    <div className='mb-4'>
                        <label className='flex items-center justify-center mb-2'>
                            <div className="text-xl font-semibold text-orange-400">{selectedMonthYear}</div>
                        </label>
                        <div className='flex space-x-2 justify-center'>
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
                        <div className="grid grid-cols-6 items-center text-left font-bold">
                            <div className='col-span-2'>Time Slot</div>
                            {courts.map((court) => (
                                <div key={court} className="text-center">{court}</div>
                            ))}
                        </div>
                        {timeSlots.map(({ time, price }) => (
                            <div key={time} className="grid grid-cols-6 items-center mt-2">
                                <div className="text-left col-span-2 w-2xs text-xs mt-2">
                                    <div>{time}</div>
                                    <div className="text-green-400 font-bold">{price}</div>
                                </div>
                                {courts.map((court) => (
                                    <div key={court} className="flex justify-center">
                                        <input
                                            type="checkbox"
                                            className={`w-4 h-4 rounded border-gray-500 bg-gray-800 
                                            ${preBookedSlots[`${selectedDate}-${time}-${court}`] ? 'checked:bg-red-500 cursor-not-allowed' : ''}`}
                                            onChange={(event) => handleCheckboxChange(event, time, court, price)}
                                            checked={
                                                !!selectedSlots[`${selectedDate}-${time}-${court}`] ||
                                                preBookedSlots[`${selectedDate}-${time}-${court}`]
                                            }
                                            disabled={!!preBookedSlots[`${selectedDate}-${time}-${court}`]}
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
                <button className='w-[90%] bg-orange-600 text-white p-2 rounded mb-4'>Next</button>
            </Link>
        </div>
    );
}

export default CourtBooking;