import { db } from "../config/firebase.js";

// Helper function for error handling
const handleFirestoreError = (error, operation) => {
  console.error(`Firestore ${operation} error:`, {
    message: error.message,
    stack: error.stack
  });
  return {
    error: `Failed to ${operation} user`,
    details: error.message
  };
};

// Create User (using Admin SDK)
export const createUser = async (req, res) => {
  const userData = req.body;

  try {
    const docRef = await db.collection("users").add({
      ...userData,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    res.status(201).json({ 
      id: docRef.id, 
      message: "User created successfully." 
    });
  } catch (error) {
    const { error: errorMsg, details } = handleFirestoreError(error, "create");
    res.status(500).json({ error: errorMsg, details });
  }
};

// Get All Users (using Admin SDK)
export const getAllUsers = async (req, res) => {
  try {
    const snapshot = await db.collection("users").get();
    const users = snapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    }));
    res.status(200).json(users);
  } catch (error) {
    const { error: errorMsg, details } = handleFirestoreError(error, "fetch all");
    res.status(500).json({ error: errorMsg, details });
  }
};

// Get User by ID (using Admin SDK)
export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const docRef = db.collection("users").doc(id);
    const docSnap = await docRef.get();

    if (docSnap.exists) {
      res.status(200).json({ 
        id: docSnap.id, 
        ...docSnap.data() 
      });
    } else {
      res.status(404).json({ error: "User not found." });
    }
  } catch (error) {
    const { error: errorMsg, details } = handleFirestoreError(error, "fetch");
    res.status(500).json({ error: errorMsg, details });
  }
};

// Update User (using Admin SDK)
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const docRef = db.collection("users").doc(id);
    await docRef.update({ 
      ...updatedData, 
      updatedAt: admin.firestore.FieldValue.serverTimestamp() 
    });
    res.status(200).json({ message: "User updated successfully." });
  } catch (error) {
    const { error: errorMsg, details } = handleFirestoreError(error, "update");
    res.status(500).json({ error: errorMsg, details });
  }
};

// Delete User (using Admin SDK)
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const docRef = db.collection("users").doc(id);
    await docRef.delete();
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    const { error: errorMsg, details } = handleFirestoreError(error, "delete");
    res.status(500).json({ error: errorMsg, details });
  }
};

// Get User by Email (using Admin SDK)
export const getUserByEmail = async (req, res) => {
  const { email } = req.params;
  
  if (!email) {
    return res.status(400).json({ error: "Email parameter is required" });
  }

  try {
    const decodedEmail = decodeURIComponent(email);
    console.log('Processing request for email:', decodedEmail);

    const snapshot = await db.collection("users")
                          .where("email", "==", decodedEmail)
                          .get();

    console.log(`Found ${snapshot.size} users with email: ${decodedEmail}`);

    if (snapshot.empty) {
      return res.status(404).json({ 
        error: "User not found",
        searchedEmail: decodedEmail
      });
    }

    const userDoc = snapshot.docs[0];
    const userData = userDoc.data();
    
    res.status(200).json({
      userId: userDoc.id,
      email: userData.email,
      name: userData.name,
      picture: userData.picture,
      createdAt: userData.createdAt
    });

  } catch (error) {
    console.error("Error in getUserByEmail:", {
      message: error.message,
      stack: error.stack,
      receivedEmail: email
    });
    
    res.status(500).json({ 
      error: "Failed to fetch user by email",
      details: error.message,
      type: "Firestore operation error"
    });
  }
};