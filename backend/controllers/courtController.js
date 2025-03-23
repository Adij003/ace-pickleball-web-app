import { db } from "../config/firebase.js";

// Add Court Details
export const addCourtDetails = async (req, res) => {
    const { courtId, date, timeSlot, availability, bookedBy } = req.body;

    try {
        await db.collection("courtDetails").doc(courtId).set({
            date,
            timeSlot,
            availability,
            bookedBy
        });
        res.status(201).json({ message: "Court details added successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to add court details" });
    }
};

// Get Court Details
export const getCourtDetails = async (req, res) => {
    try {
        const snapshot = await db.collection("courtDetails").get();
        const courtDetails = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        res.status(200).json(courtDetails);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch court details" });
    }
};
