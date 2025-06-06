import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";
import { toast } from 'react-toastify';
import axios from 'axios';

function CourtBooking() {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const navigate = useNavigate()
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [preBookedSlots, setPreBookedSlots] = useState({});
    const [selectedSlots, setSelectedSlots] = useState({});
    const [loading, setLoading] = useState(false);
    const [slotStatus, setSlotStatus] = useState({});

    const timeSlots = useMemo(() => [
        "06:00 AM - 07:00 AM",
        "07:00 AM - 08:00 AM",
        "08:00 AM - 09:00 AM",
        "09:00 AM - 10:00 AM",
        "10:00 AM - 11:00 AM",
        "03:00 PM - 04:00 PM",
        "04:00 PM - 05:00 PM",
        "05:00 PM - 06:00 PM",
        "06:00 PM - 07:00 PM",
        "07:00 PM - 08:00 PM",
        "08:00 PM - 09:00 PM",
        "09:00 PM - 10:00 PM"
    ], []);

    const courts = useMemo(() => ["C1", "C2", "C3", "C4"], []);

    // Fetch initial court details
    useEffect(() => {
        const fetchSlots = async () => {
            setLoading(true);
            try {
                const slotPromises = courts.map(courtId =>
                    axios.get(`${BASE_URL}/courts/court-details`, {
                        params: {
                            date: selectedDate,
                            courtId
                        }
                    })
                );
        
                const responses = await Promise.all(slotPromises);
                const allSlots = {};
        
                responses.forEach((response, index) => {
                    if (response.status === 200) {
                        const courtId = courts[index];
                        const slotsData = response.data;
                        
                        Object.entries(slotsData).forEach(([timeSlot, slotInfo]) => {
                            const key = `${selectedDate}-${timeSlot}-${courtId}`;
                            allSlots[key] = {
                                booked: slotInfo.booked,
                                bookedBy: slotInfo.bookedBy,
                                price: slotInfo.price,
                                timeSlot: slotInfo.timeSlot,
                                court: courtId,
                                date: selectedDate
                            };
                        });
                    }
                });
        
                setPreBookedSlots(allSlots);
            } catch (error) {
                console.error("Error fetching slots:", error.response?.data || error.message);
                toast.error("Failed to fetch slots. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchSlots();
    }, [selectedDate, courts]);

    // Fetch all slot statuses
    useEffect(() => {
        const fetchAllSlotStatuses = async () => {
            try {
                const statusPromises = timeSlots.flatMap(time => 
                    courts.map(async court => {
                        try {
                            const response = await axios.get(
                                'http://localhost:5001/api/courts/slot-status',
                                { 
                                    params: { 
                                        date: selectedDate,
                                        courtId: court,
                                        timeSlot: time
                                    } 
                                }
                            );
                            return {
                                key: `${selectedDate}-${time}-${court}`,
                                data: response.data.success ? response.data.data : {
                                    booked: true,
                                    bookedBy: "",
                                    phoneNumber: ""
                                }
                            };
                        } catch (error) {
                            return {
                                key: `${selectedDate}-${time}-${court}`,
                                data: {
                                    booked: true,
                                    bookedBy: "",
                                    phoneNumber: ""
                                }
                            };
                        }
                    })
                );

                const results = await Promise.all(statusPromises);
                const newStatus = {};
                results.forEach(({key, data}) => {
                    newStatus[key] = data;
                });
                setSlotStatus(newStatus);
            } catch (error) {
                console.error("Error fetching slot statuses:", error);
                toast.error("Failed to load some slot information");
            }
        };

        fetchAllSlotStatuses();
    }, [selectedDate, timeSlots, courts]);

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

    const handleCheckboxChange = (event, time, court) => {
        const isChecked = event.target.checked;
        setSelectedSlots((prev) => {
            const newSlots = { ...prev };
            const key = `${selectedDate}-${time}-${court}`;
            const slotInfo = preBookedSlots[key] || {
                timeSlot: time,
                court,
                date: selectedDate,
                price: "₹800",
                booked: false
            };

            if (isChecked) {
                newSlots[key] = slotInfo;
            } else {
                delete newSlots[key];
            }

            return newSlots;
        });
    };

    const handleNext = (event) => {
        event.preventDefault();
        
        if (Object.keys(selectedSlots).length === 0) {
            toast.error("Please select at least one slot!");
            return;
        }
    
        // Simply navigate to checkout with the selected slots
        navigate("/checkout", { 
            state: { 
                selectedSlots,
                selectedDate 
            } 
        });
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
                    
                    {loading ? (
                        <div className="flex justify-center items-center p-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-400"></div>
                        </div>
                    ) : (
                        <div className="p-4 bg-white text-black text-sm TimeSlotCheckbox">
                            <div className="grid grid-cols-6 items-center text-left font-bold">
                                <div className='col-span-2'>Time Slot</div>
                                {courts.map((court) => (
                                    <div key={court} className="text-center">{court}</div>
                                ))}
                            </div>
                            {timeSlots.map((time) => {
                                const sampleSlotKey = `${selectedDate}-${time}-C1`;
                                const price = preBookedSlots[sampleSlotKey]?.price || "₹800";
                                
                                return (
                                    <div key={time} className="grid grid-cols-6 items-center mt-2">
                                        <div className="text-left col-span-2 w-2xs text-xs mt-2">
                                            <div>{time}</div>
                                            <div className="text-green-400 font-bold">{price}</div>
                                        </div>
                                        {courts.map((court) => {
                                            const slotKey = `${selectedDate}-${time}-${court}`;
                                            const slotData = slotStatus[slotKey] || {
                                                booked: true,
                                                bookedBy: "",
                                                phoneNumber: ""
                                            };
                                            const isBooked = slotData.booked;
                                            const isSelected = !!selectedSlots[slotKey];
                                            
                                            return (
                                                <div key={court} className="flex justify-center items-center">
                                                    <input
                                                        type="checkbox"
                                                        className={`w-4 h-4 rounded border-gray-500 bg-gray-800 
                                                                ${isBooked ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                        onChange={(event) => !isBooked && handleCheckboxChange(event, time, court)}
                                                        checked={isSelected}
                                                        disabled={isBooked}
                                                    />
                                                    {isBooked && (
                                                    <div className="ml-1 animate-wiggle">
                                                        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
            <div className='w-full flex items-center justify-center'>
                <button 
                    onClick={handleNext}
                    className='w-[90%] bg-orange-600 text-white p-2 rounded mb-4'
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default CourtBooking;