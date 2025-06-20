import admin from "../config/firebase.js";

const verifyFirebaseToken = async (req, res, next) => {
  const token = req.headers.authorization?.split("Bearer ")[1]; // "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded; // Can access req.user.uid in controller
    next();
  } catch (err) {
    console.error("Token verification failed", err);
    res.status(403).json({ message: "Unauthorized" });
  }
};

export default verifyFirebaseToken;
