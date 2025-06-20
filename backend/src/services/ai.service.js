// ai.service.js
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

export const queryHuggingFace = async (imageBuffer) => {
  try {
    const response = await fetch(
      "https://router.huggingface.co/hf-inference/models/linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification",
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "image/jpeg",
        },
        method: "POST",
        body: imageBuffer,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HF API error: ${errorText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Hugging Face API Error:", error.message);
    throw error;
  }
};
