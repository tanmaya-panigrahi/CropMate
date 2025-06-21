import Diagnose from "../models/Diagnose.js";

export const getRecentDiagnoses = async (req, res) => {
  try {
    const userId = req.user?.uid;

    const recent = await Diagnose.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("disease createdAt description")
      .lean();

    res.json(recent);
  } catch (err) {
    console.error("Error in getRecentDiagnoses:", err);
    res.status(500).json({ error: "Failed to fetch recent diagnoses" });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user?.uid; // if using Firebase auth
    const totalDiagnoses = await Diagnose.countDocuments({ userId });

    const diseases = await Diagnose.distinct("disease", { userId });
    const uniqueDiseaseSaved = diseases.length;

    // Add logic for chatbot uses if stored
    const chatbotUses = 0;

    res.json({
      diagnoses: totalDiagnoses,
      uniqueDiseaseSaved,
      history: totalDiagnoses,
      chatbotUses,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
};
