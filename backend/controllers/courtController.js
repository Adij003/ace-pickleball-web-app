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
                price: "₹800",
                bookedBy: "",
                phoneNumber: "",
                bookedAt: null
            }));
        });
    }

    return slots;
};

// Add Court Details (Booking Slots)
export const addCourtDetails = async (req, res) => {
    try {
        const { action, slots: bookingSlots, userDetails } = req.body;

        if (action === "book-existing") {
            // Validate required fields
            if (!bookingSlots || !userDetails) {
                return res.status(400).json({
                    success: false,
                    error: "Missing required booking data"
                });
            }

            const batch = db.batch();
            const bookingDate = new Date().toISOString();

            // 1. Update each slot in courtDetails
            for (const slot of bookingSlots) {
                const slotRef = db.collection("courtDetails")
                    .doc(slot.date)
                    .collection(slot.court)
                    .doc(slot.timeSlot);

                // First check if slot exists
                const slotDoc = await slotRef.get();
                
                if (!slotDoc.exists) {
                    console.log(`Slot not found: ${slot.date} - ${slot.court} - ${slot.timeSlot}`);
                    continue;
                }

                const currentData = slotDoc.data();
                
                if (currentData.booked) {
                    console.log(`Slot already booked: ${slot.date} - ${slot.court} - ${slot.timeSlot}`);
                    continue;
                }

                // Prepare update data with optional userEmail
                const updateData = {
                    booked: true,
                    bookedBy: userDetails.name,
                    phoneNumber: userDetails.phoneNumber,
                    bookedAt: bookingDate
                };

                // Only add userEmail if it exists and is not undefined
                if (slot.userEmail) {
                    updateData.userEmail = slot.userEmail;
                }

                batch.update(slotRef, updateData);
            }

            // 2. Create a booking record
            const bookingRef = db.collection("bookings").doc();
            const bookingData = {
                bookingId: bookingRef.id,
                slots: bookingSlots.map(slot => ({
                    date: slot.date,
                    timeSlot: slot.timeSlot,
                    court: slot.court,
                    price: slot.price
                })),
                userDetails,
                totalAmount: req.body.totalAmount,
                status: "confirmed",
                createdAt: bookingDate,
                updatedAt: bookingDate
            };

            batch.set(bookingRef, bookingData);

            await batch.commit();
            
            return res.status(200).json({
                success: true,
                message: "Slots booked successfully",
                bookingId: bookingRef.id
            });
        } else {
            // Original slot generation logic
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
            error: error.message || "Failed to process request" 
        });
    }
};

// Get Court Details (Fetching Slots)
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
                price: "₹800",
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
                    ...doc.data()
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

// Add this new function to check individual slot status
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
                    price: data.price || "₹800"
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
                    price: "₹800"
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