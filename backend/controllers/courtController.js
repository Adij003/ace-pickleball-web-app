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
                price: 800, // Changed to number instead of string
                priceDisplay: "₹800", // Added display version
                bookedBy: "",
                phoneNumber: "",
                bookedAt: null,
                courtId: court
            }));
        });
    }

    return slots;
};

// Enhanced validateBookingData
const validateBookingData = (bookingSlots, userDetails) => {
    if (!bookingSlots || !Array.isArray(bookingSlots) || bookingSlots.length === 0) {
        return "No slots selected for booking";
    }

    // Validate each slot's price
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

    return null;
};

// Convert price to number safely
const convertPriceToNumber = (price) => {
    if (typeof price === 'number') return price;
    if (typeof price === 'string') {
        // Remove any non-digit characters including ₹ symbol
        const numericValue = parseInt(price.replace(/[^\d]/g, ''), 10);
        return isNaN(numericValue) ? 800 : numericValue; // Default to 800 if conversion fails
    }
    return 800; // Default value
};

// Add Court Details (Booking Slots)
export const addCourtDetails = async (req, res) => {
    try {
        console.log("Incoming booking request:", req.body);
        const { action, slots: incomingSlots, userDetails, totalAmount } = req.body;

        if (action === "book-existing") {
            // Validate booking data first
            const validationError = validateBookingData(incomingSlots, userDetails);
            if (validationError) {
                console.log("Validation failed:", validationError);
                return res.status(400).json({
                    success: false,
                    error: validationError
                });
            }

            // Process slots to ensure proper price format
            const bookingSlots = incomingSlots.map(slot => ({
                ...slot,
                price: convertPriceToNumber(slot.price),
                priceDisplay: `₹${convertPriceToNumber(slot.price)}` // Add display version
            }));

            const batch = db.batch();
            const bookingDate = new Date().toISOString();
            const unavailableSlots = [];

            // 1. Verify all slots are available
            for (const slot of bookingSlots) {
                const slotRef = db.collection("courtDetails")
                    .doc(slot.date)
                    .collection(slot.court)
                    .doc(slot.timeSlot);

                const slotDoc = await slotRef.get();
                
                if (!slotDoc.exists) {
                    unavailableSlots.push(`${slot.date} - ${slot.court} - ${slot.timeSlot}`);
                    continue;
                }

                const currentData = slotDoc.data();
                if (currentData.booked) {
                    unavailableSlots.push(`${slot.date} - ${slot.court} - ${slot.timeSlot}`);
                }
            }

            if (unavailableSlots.length > 0) {
                console.log("Unavailable slots:", unavailableSlots);
                return res.status(400).json({
                    success: false,
                    error: "Some slots are no longer available",
                    unavailableSlots
                });
            }

            // 2. Update slots status
            for (const slot of bookingSlots) {
                const slotRef = db.collection("courtDetails")
                    .doc(slot.date)
                    .collection(slot.court)
                    .doc(slot.timeSlot);

                batch.update(slotRef, {
                    booked: true,
                    bookedBy: userDetails.name,
                    phoneNumber: userDetails.phoneNumber,
                    userEmail: userDetails.email || null,
                    bookedAt: bookingDate
                });
            }

            // 3. Create booking record
            const bookingRef = db.collection("bookings").doc();
            const bookingData = {
                bookingId: bookingRef.id,
                user: {
                    userId: req.user?.uid || "guest",
                    name: userDetails.name,
                    email: userDetails.email,
                    phoneNumber: userDetails.phoneNumber
                },
                slots: bookingSlots.map(slot => ({
                    date: slot.date,
                    timeSlot: slot.timeSlot,
                    court: slot.court,
                    courtId: slot.courtId,
                    price: slot.price,
                    priceDisplay: slot.priceDisplay
                })),
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

                    const existingSlots = await courtRef.get();
                    
                    if (!existingSlots.empty) {
                        console.log(`Slots for ${date} - ${court} already exist. Skipping...`);
                        continue;
                    }

                    slots[date][court].forEach((slot) => {
                        const slotRef = courtRef.doc(slot.timeSlot);
                        batch.set(slotRef, slot);
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
            error: error.message || "Failed to process booking",
            details: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};

// Get Court Details (Fetching Slots)
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

        // Initialize with all time slots as available
        const courtDetails = {};
        allTimeSlots.forEach(timeSlot => {
            courtDetails[timeSlot] = {
                timeSlot,
                booked: false,
                price: 800,
                priceDisplay: "₹800",
                bookedBy: "",
                court: courtId,
                date: date
            };
        });

        // Get actual data from Firestore
        const snapshot = await db
            .collection("courtDetails")
            .doc(date)
            .collection(courtId)
            .get();

        // Update with actual booked slots
        snapshot.docs.forEach(doc => {
            if (courtDetails[doc.id]) {
                courtDetails[doc.id] = {
                    ...courtDetails[doc.id],
                    ...doc.data(),
                    // Ensure priceDisplay exists
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
            error: "Missing required parameters (date, courtId, or timeSlot)"
        });
    }

    try {
        const docRef = db.collection("courtDetails")
            .doc(date)
            .collection(courtId)
            .doc(timeSlot);

        const doc = await docRef.get();

        if (doc.exists) {
            const data = doc.data();
            res.status(200).json({
                success: true,
                data: {
                    booked: data.booked || false,
                    bookedBy: data.bookedBy || "",
                    phoneNumber: data.phoneNumber || "",
                    timeSlot: data.timeSlot || timeSlot,
                    court: courtId,
                    date: date,
                    price: data.price || 800,
                    priceDisplay: data.priceDisplay || `₹${data.price || 800}`
                }
            });
        } else {
            // If slot doesn't exist in Firestore, it's available
            res.status(200).json({
                success: true,
                data: {
                    booked: false,
                    bookedBy: "",
                    phoneNumber: "",
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