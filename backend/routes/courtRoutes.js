import express from "express";
import { addCourtDetails, getCourtDetails, getSlotStatus } from "../controllers/courtController.js";

const router = express.Router();

router.post("/book-slots", addCourtDetails);
router.get("/court-details", getCourtDetails);
router.get("/slot-status", getSlotStatus); 

export default router;
