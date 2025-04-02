import axios from "axios";
import { db } from "../config/firebase.js";
import jwtDecode from "jwt-decode";

/* Register User */
const registerUser = async (req, res) => {
  const { uid, email, name, picture } = req.body;

  try {
    await db.collection("users").doc(uid).set({
      email,
      name,
      picture,
      createdAt: new Date().toISOString(),
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Register User Error:", error.message);
    res.status(500).json({ message: "User registration failed", error: error.message });
  }
};

/* Get User Profile */
const getUserProfile = async (req, res) => {
  const { uid } = req.params;

  try {
    const userDoc = await db.collection("users").doc(uid).get();

    if (!userDoc.exists) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(userDoc.data());
  } catch (error) {
    console.error("Get User Profile Error:", error.message);
    res.status(500).json({ message: "Failed to retrieve user profile", error: error.message });
  }
};

/* Google Authentication API */
const googleAuth = async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ message: "Authorization code is required" });
  }

  try {
    const { data } = await axios.post("https://oauth2.googleapis.com/token", {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: "https://ace-pickleball-web-app.vercel.app",
      grant_type: "authorization_code",
    });

    const { id_token } = data;
    const decodedToken = jwtDecode(id_token);

    const { sub: uid, email, name, picture } = decodedToken;

    const userDoc = await db.collection("users").doc(uid).get();

    if (!userDoc.exists) {
      await db.collection("users").doc(uid).set({
        email,
        name,
        picture,
        createdAt: new Date().toISOString(),
      });
      console.log(`New user created: ${uid}`);
    } else {
      console.log(`User already exists: ${uid}`);
    }

    res.status(200).json({
      message: "Authentication successful",
      user: { uid, email, name, picture },
    });
  } catch (error) {
    console.error("Google Auth Error:", error.response?.data || error.message);
    res.status(401).json({ message: "Failed Google Authentication", error: error.message });
  }
};

export { registerUser, getUserProfile, googleAuth };