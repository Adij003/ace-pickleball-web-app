import express from "express";
import { 
    addCourtDetails, 
    getCourtDetails, 
    getSlotStatus,
    getUserBookings,
    getBookingDetails
} from "../controllers/courtController.js";

const router = express.Router();

router.post("/book-slots", addCourtDetails);
router.get("/court-details", getCourtDetails);
router.get("/slot-status", getSlotStatus);
router.get("/users/:userId", getUserBookings);
router.get("/bookings/:bookingId", getBookingDetails);

export default router;