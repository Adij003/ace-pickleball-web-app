import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserByEmail,
  addUserBooking,      
  removeUserBooking,   
  getUserBookings     
} from "../controllers/userController.js";

const router = express.Router();

// Existing routes
router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.get("/email/:email", getUserByEmail);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

// New booking-related routes
router.post("/:userId/bookings", addUserBooking);
router.delete("/:userId/bookings/:bookingId", removeUserBooking);
router.get("/:userId/bookings", getUserBookings);

export default router;