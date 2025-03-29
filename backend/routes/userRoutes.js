import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserByEmail 
} from "../controllers/userController.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.get("/email/:email", getUserByEmail); 
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;