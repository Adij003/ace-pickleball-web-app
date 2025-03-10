const User = {
    Name,
    Email,
    Bookings: [
        {
            Booking_id: A,
            Court_id: A,
            Court_time_slot_id: [1],
            Payments
        },
        {
            Booking_id: A,
            Court_id: B,
            Court_time_slot_id: [1],
            Payments
        },
    ]
}


// time slot unique = court_id + court_time_slot_id


const courts = {
    Court_id: ["A", "B", "C", "D"],
    dimentions: "",
    timeSlots: [
        {slot_id: number,
            booked_by: user_id,
            is_booked: true,


        },
        {slot_id: number,
            booked_by: user_id,
            is_booked: true


        },  {slot_id: number,
            booked_by: user_id,
            is_booked: flase


        },  {slot_id: number,
            booked_by: user_id,
            is_booked: flase


        },
    ]
}


const query = courts.timeSlots.is_booked = true




const slot_id = [
"00:00 - 01:00" = 1,
"01:00 - 02:00" = 2,
]


const Payments ={
    Token: alphaNum,
    Id: 1234
    }
   
// user
// getAll Time-slots and courts -> show which one are booked and which are available
// confirmBooking -> court_name/court_id and time-slot and date, then pay
// getPastBookings -> user history of booking


// admin side
// getAll Time-slots and courts -> show which one are booked and which are available
// getAllBookings -> view all bookings,
// updateSlotsforHoldiays


// other info
// we can book only 3 days in advanced
// only limited number courts and slots can be booked
// add membership card
// add pics of club
// if two users are booking at the same time


