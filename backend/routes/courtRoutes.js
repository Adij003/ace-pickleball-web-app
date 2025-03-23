import express from "express";
import { addCourtDetails, getCourtDetails } from "../controllers/courtController.js";

const router = express.Router();

router.post("/book-slots", addCourtDetails);
router.get("/court-details", getCourtDetails);

export default router;
