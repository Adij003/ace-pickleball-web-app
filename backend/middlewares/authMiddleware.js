import { admin } from "../config/firebase.js";

const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized - No token provided" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // Attach the verified user to the request
    next();
  } catch (error) {
    res.status(403).json({ message: "Unauthorized - Invalid token" });
  }
};

export { protect };
