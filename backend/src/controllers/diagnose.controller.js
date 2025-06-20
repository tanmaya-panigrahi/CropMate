import { queryHuggingFace } from "../services/ai.service.js";
import getDiseaseExplanation from "../services/gemini.service.js";
import cloudinary from "../config/cloudinary.js";
import Diagnosis from "../models/Diagnose.js";

const runDiagnosis = async (req, res) => {
  const file = req.file;
  const userId = req.user?.uid || "anonymous";
  const description = req.body.description || "";
  try {


    if (!file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    // 1. Run prediction with buffer
    let hfResponse;
    try {
      hfResponse = await queryHuggingFace(file.buffer);

      if (!hfResponse || !Array.isArray(hfResponse) || hfResponse.length === 0) {
        throw new Error("Invalid prediction result");
      }
    } catch (err) {
      console.error("HuggingFace error:", err.message);
      return res.status(500).json({
        message: "Prediction failed",
        details: err.message,
      });
    }

    // 2. Upload to Cloudinary
    let cloudinaryUrl = null;
    try {
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ resource_type: "image" }, (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }).end(file.buffer);
      });

      cloudinaryUrl = uploadResult.secure_url;
    } catch (err) {
      console.error("Cloudinary upload error:", err.message);
    }

    // 3. Gemini Explanation
    let explanation;
    try {
      explanation = await getDiseaseExplanation(hfResponse[0]?.label, description);
    } catch (err) {
      explanation = "Unable to generate explanation at this time.";
    }

    // 4. Save to DB
    const diagnosis = new Diagnosis({
      userId,
      disease: hfResponse[0]?.label || "Unknown disease",
      imageUrl: cloudinaryUrl,
      explanation,
      description,
      createdAt: new Date(),
    });

    await diagnosis.save();

    res.status(200).json({
      disease: hfResponse[0]?.label,
      imageUrl: cloudinaryUrl,
      explanation,
      message: "Diagnosis complete",
    });
  } catch (err) {
    console.error("Unhandled error:", err.message);
    res.status(500).json({ message: "Something went wrong", details: err.message });
  }
};

export default { runDiagnosis };
