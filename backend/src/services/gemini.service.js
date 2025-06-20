// services/gemini.service.js
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getDiseaseExplanation = async (label, description = "") => {
  try {
    const prompt = `
You are a plant disease expert. A leaf image has been diagnosed with the disease: "${label}".

${description ? `Additional symptoms or context: "${description}".` : ""}

Provide the following in simple and clear language:
1. What causes "${label}"?
2. How can it be cured or treated?
3. How long might it take for the plant to recover?
Make sure the explanation is helpful to farmers.
`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); 
    // or use "gemini-2.5-flash" if you want latest

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text.trim() || "No explanation generated.";
  } catch (error) {
    console.error("Gemini API Error:", error.message);
    throw new Error("Failed to fetch explanation from Gemini.");
  }
};

export default getDiseaseExplanation;
