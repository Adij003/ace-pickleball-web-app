import { db } from "../config/firebase.js";

const registerUser = async (req, res) => {
  const { uid, email, name } = req.body;

  if (!uid || !email) {
    return res.status(400).json({ message: "UID and email are required" });
  }

  try {
    await db.collection("users").doc(uid).set({
      email,
      name,
      createdAt: new Date().toISOString(),
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
};

const getUserProfile = async (req, res) => {
  const uid = req.user.uid;

  try {
    const userDoc = await db.collection("users").doc(uid).get();

    if (!userDoc.exists) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(userDoc.data());
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error: error.message });
  }
};

export { registerUser, getUserProfile };
