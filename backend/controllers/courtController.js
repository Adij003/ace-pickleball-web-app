import cron from "node-cron";
import { db } from "../config/firebase.js";
import dayjs from "dayjs";

// Generate Time Slots for the Next 6 Days
const generateTimeSlots = () => {
    const courts = ["C1", "C2", "C3", "C4"];
    const timeSlots = [
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
    ];

    const slots = {};

    for (let i = 0; i < 6; i++) {
        const date = dayjs().add(i, 'day').format('YYYY-MM-DD');
        slots[date] = {};

        courts.forEach((court) => {
            slots[date][court] = timeSlots.map((time) => ({
                timeSlot: time,
                booked: false,
                price: 800,
                priceDisplay: "₹800",
                bookedBy: "",
                userId: "",
                phoneNumber: "",
                bookedAt: null,
                courtId: court
            }));
        });
    }

    return slots;
};

// Enhanced validateBookingData with userId validation
const validateBookingData = (bookingSlots, userDetails, isAuthenticated) => {
    if (!bookingSlots || !Array.isArray(bookingSlots) || bookingSlots.length === 0) {
        return "No slots selected for booking";
    }

    for (const slot of bookingSlots) {
        if (typeof slot.price !== 'number' && typeof slot.price !== 'string') {
            return `Invalid price format for slot ${slot.timeSlot}`;
        }
    }

    if (!userDetails || !userDetails.name || !userDetails.phoneNumber) {
        return "Missing required user details (name and phone number)";
    }

    if (!/^\d{10}$/.test(userDetails.phoneNumber)) {
        return "Phone number must be 10 digits";
    }

    // Validate userId for authenticated users
    if (isAuthenticated && (!userDetails.userId || userDetails.userId === 'guest')) {
        return "User authentication error";
    }

    return null;
};

const addSlotsToFirestore = async () => {
    try {
        console.log("Running scheduled job: Adding time slots...");
        const slots = generateTimeSlots();
        const batch = db.batch();

        for (const date in slots) {
            for (const court in slots[date]) {
                const courtRef = db.collection("courtDetails").doc(date).collection(court);
                
                slots[date][court].forEach((slot) => {
                    batch.set(courtRef.doc(slot.timeSlot), slot, { merge: true });
                });
            }
        }

        await batch.commit();
        console.log("Time slots added successfully");
    } catch (error) {
        console.error("Error adding time slots:", error);
    }
};

// Schedule daily at midnight IST
cron.schedule("0 0 * * *", addSlotsToFirestore, {
    timezone: "Asia/Kolkata"
});

const convertPriceToNumber = (price) => {
    if (typeof price === 'number') return price;
    if (typeof price === 'string') {
        const numericValue = parseInt(price.replace(/[^\d]/g, ''), 10);
        return isNaN(numericValue) ? 800 : numericValue;
    }
    return 800;
};

// Main booking function
export const addCourtDetails = async (req, res) => {
    try {
        console.log("Incoming booking request:", req.body);
        const { action, slots: incomingSlots, userDetails, totalAmount } = req.body;
        const isAuthenticated = !!req.user?.uid;

        if (action === "book-existing") {
            // Validate with authentication status
            const validationError = validateBookingData(incomingSlots, userDetails, isAuthenticated);
            if (validationError) {
                return res.status(400).json({
                    success: false,
                    error: validationError
                });
            }

            const bookingSlots = incomingSlots.map(slot => ({
                ...slot,
                price: convertPriceToNumber(slot.price),
                priceDisplay: `₹${convertPriceToNumber(slot.price)}`
            }));

            const batch = db.batch();
            const bookingDate = new Date().toISOString();
            const unavailableSlots = [];

            // Verify slot availability
            for (const slot of bookingSlots) {
                const slotRef = db.collection("courtDetails")
                    .doc(slot.date)
                    .collection(slot.court)
                    .doc(slot.timeSlot);

                const slotDoc = await slotRef.get();
                
                if (!slotDoc.exists || slotDoc.data().booked) {
                    unavailableSlots.push(`${slot.date} - ${slot.court} - ${slot.timeSlot}`);
                }
            }

            if (unavailableSlots.length > 0) {
                return res.status(400).json({
                    success: false,
                    error: "Some slots are no longer available",
                    unavailableSlots
                });
            }

            // Update slots with booking info
            for (const slot of bookingSlots) {
                const slotRef = db.collection("courtDetails")
                    .doc(slot.date)
                    .collection(slot.court)
                    .doc(slot.timeSlot);

                batch.update(slotRef, {
                    booked: true,
                    bookedBy: userDetails.name,
                    userId: userDetails.userId,
                    phoneNumber: userDetails.phoneNumber,
                    userEmail: userDetails.email,
                    bookedAt: bookingDate
                });
            }

            // Create booking record
            const bookingRef = db.collection("bookings").doc();
            const bookingData = {
                bookingId: bookingRef.id,
                user: {
                    userId: isAuthenticated ? req.user.uid : userDetails.userId,
                    name: userDetails.name,
                    email: userDetails.email,
                    phoneNumber: userDetails.phoneNumber
                },
                slots: bookingSlots,
                totalAmount: convertPriceToNumber(totalAmount),
                totalAmountDisplay: `₹${convertPriceToNumber(totalAmount)}`,
                status: "confirmed",
                paymentStatus: "pending",
                createdAt: bookingDate,
                updatedAt: bookingDate
            };

            batch.set(bookingRef, bookingData);
            await batch.commit();
            
            console.log("Booking successful:", bookingRef.id);
            return res.status(200).json({
                success: true,
                message: "Booking confirmed successfully",
                bookingId: bookingRef.id,
                bookingData
            });
        } else {
            // Slot generation logic
            const slots = generateTimeSlots();
            const batch = db.batch();

            for (const date of Object.keys(slots)) {
                for (const court of Object.keys(slots[date])) {
                    const courtRef = db.collection("courtDetails").doc(date).collection(court);
                    slots[date][court].forEach((slot) => {
                        batch.set(courtRef.doc(slot.timeSlot), slot);
                    });
                }
            }

            await batch.commit();
            return res.status(201).json({ 
                success: true,
                message: "Slots generated successfully" 
            });
        }
    } catch (error) {
        console.error("Error in court operation:", error);
        return res.status(500).json({ 
            success: false,
            error: error.message || "Failed to process booking"
        });
    }
};

// Get Court Details
export const getCourtDetails = async (req, res) => {
    const { date, courtId } = req.query;

    if (!date || !courtId) {
        return res.status(400).json({ 
            success: false,
            error: "Invalid date or court ID." 
        });
    }

    try {
        const allTimeSlots = [
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
        ];

        const courtDetails = {};
        allTimeSlots.forEach(timeSlot => {
            courtDetails[timeSlot] = {
                timeSlot,
                booked: false,
                price: 800,
                priceDisplay: "₹800",
                court: courtId,
                date: date
            };
        });

        const snapshot = await db
            .collection("courtDetails")
            .doc(date)
            .collection(courtId)
            .get();

        snapshot.docs.forEach(doc => {
            if (courtDetails[doc.id]) {
                courtDetails[doc.id] = {
                    ...courtDetails[doc.id],
                    ...doc.data(),
                    priceDisplay: doc.data().priceDisplay || `₹${doc.data().price || 800}`
                };
            }
        });

        res.status(200).json({ 
            success: true,
            data: courtDetails 
        });
    } catch (error) {
        console.error("Error fetching court details:", error);
        res.status(500).json({ 
            success: false,
            error: "Failed to fetch court details." 
        });
    }
};

// Check individual slot status
export const getSlotStatus = async (req, res) => {
    const { date, courtId, timeSlot } = req.query;

    if (!date || !courtId || !timeSlot) {
        return res.status(400).json({
            success: false,
            error: "Missing required parameters"
        });
    }

    try {
        const docRef = db.collection("courtDetails")
            .doc(date)
            .collection(courtId)
            .doc(timeSlot);

        const doc = await docRef.get();

        if (doc.exists) {
            res.status(200).json({
                success: true,
                data: {
                    ...doc.data(),
                    timeSlot: doc.data().timeSlot || timeSlot,
                    court: courtId,
                    date: date,
                    priceDisplay: doc.data().priceDisplay || `₹${doc.data().price || 800}`
                }
            });
        } else {
            res.status(200).json({
                success: true,
                data: {
                    booked: false,
                    timeSlot: timeSlot,
                    court: courtId,
                    date: date,
                    price: 800,
                    priceDisplay: "₹800"
                }
            });
        }
    } catch (error) {
        console.error("Error checking slot status:", error);
        res.status(500).json({
            success: false,
            error: "Failed to check slot status"
        });
    }
};