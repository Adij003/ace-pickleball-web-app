import express from "express";
import { registerUser, getUserProfile, googleAuth } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/google", googleAuth);
router.post("/register", registerUser);
router.get("/profile", protect, getUserProfile);

export default router;
