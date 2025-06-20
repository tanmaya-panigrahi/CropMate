import axios from "axios";
import { InferenceClient } from "@huggingface/inference";
import dotenv from "dotenv";
import fetch from "node-fetch";
import fs from "fs";
dotenv.config();

const client = new InferenceClient(process.env.HF_TOKEN);

async function predictDisease(imageUrl) {
  try {
    // ✅ Fetch the image from Cloudinary URL
    const imageBuffer = fs.readFileSync("src\\ml\\leafDisease.jpg");

    // ✅ Send buffer to Hugging Face
    const result = await client.imageClassification({
      data: imageBuffer,
      model: "linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification",
      provider: "hf-inference",
    });


    return result[0]?.label || "Unknown disease";
  } catch (error) {
    console.error("Prediction error:", error.message);
    return null;
  }
}

export default predictDisease;
