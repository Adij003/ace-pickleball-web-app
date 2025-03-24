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
                bookedBy: "" // Empty by default
            }));
        });
    }

    return slots;
};

// Add Court Details (Booking Slots)
export const addCourtDetails = async (req, res) => {
    const slots = generateTimeSlots();

    try {
        const batch = db.batch();

        for (const date of Object.keys(slots)) {
            for (const court of Object.keys(slots[date])) {
                const courtRef = db.collection("courtDetails").doc(date).collection(court);

                const existingSlots = await courtRef.get();
                
                // Skip this date-court combination if slots already exist
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
        res.status(201).json({ message: "Slots generated successfully (only new slots added)." });
    } catch (error) {
        console.error("Error generating slots:", error);
        res.status(500).json({ error: "Failed to generate slots." });
    }
};

// Get Court Details (Fetching Slots)
export const getCourtDetails = async (req, res) => {
    const { date, courtId } = req.query; // Include `courtId` in query

    if (!date || !courtId) {
        return res.status(400).json({ error: "Invalid date or court ID." });
    }

    try {
        const snapshot = await db
            .collection("courtDetails")
            .doc(date)
            .collection(courtId)
            .get();

        if (snapshot.empty) {
            return res.status(404).json({ error: "No slots found for this court." });
        }

        const courtDetails = {};
        snapshot.docs.forEach((doc) => {
            courtDetails[doc.id] = doc.data();
        });

        res.status(200).json(courtDetails);
    } catch (error) {
        console.error("Error fetching court details:", error);
        res.status(500).json({ error: "Failed to fetch court details." });
    }
};