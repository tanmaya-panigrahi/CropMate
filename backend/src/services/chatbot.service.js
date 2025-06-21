import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getChatbotReply = async (userMessage = "") => {
  try {
    const prompt = `
You are a friendly and knowledgeable farming assistant. Help the user with farming, crop care, pest control, or soil health queries.

User asked: "${userMessage}"

Reply clearly, concisely, and in easy-to-understand language suitable for farmers.
`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); 
    // or "gemini-2.5-pro" if you want the latest

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text.trim() || "Sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Chatbot Gemini API Error:", error.message);
    throw new Error("Failed to fetch response from Gemini.");
  }
};

export default getChatbotReply;
