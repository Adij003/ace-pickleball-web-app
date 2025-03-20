import { db } from "../config/firebase.js";
import { collection, addDoc, getDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

// Create User
export const createUser = async (req, res) => {
  const userData = req.body;

  try {
    const docRef = await addDoc(collection(db, "users"), {
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    res.status(201).json({ id: docRef.id, message: "User created successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to create user." });
  }
};

// Get All Users
export const getAllUsers = async (req, res) => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users." });
  }
};

// Get User by ID
export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      res.status(200).json({ id: docSnap.id, ...docSnap.data() });
    } else {
      res.status(404).json({ error: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user." });
  }
};

// Update User
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const docRef = doc(db, "users", id);
    await updateDoc(docRef, { ...updatedData, updatedAt: new Date() });
    res.status(200).json({ message: "User updated successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to update user." });
  }
};

// Delete User
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const docRef = doc(db, "users", id);
    await deleteDoc(docRef);
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user." });
  }
};
