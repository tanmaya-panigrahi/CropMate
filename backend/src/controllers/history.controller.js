// src/controllers/history.controller.js
import Diagnose from "../models/Diagnose.js";

export const getHistory = async (req, res) => {
  try {
    const userId = req.user.uid; // From Firebase token

    const history = await Diagnose.find({ userId })
      .sort({ createdAt: -1 });

    res.json(history);
  } catch (err) {
    console.error("Error fetching history:", err);
    res.status(500).json({ message: "Failed to fetch history" });
  }
};
