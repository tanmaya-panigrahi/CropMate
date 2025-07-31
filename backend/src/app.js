import express, { json } from "express";
import cors from "cors";
import { config } from "dotenv";
import dbConnect from "./config/db.js";
import diagnoseRoutes from "./routes/diagnose.routes.js";
import historyRoutes from "./routes/history.routes.js";
import chatbotRoutes from "./routes/chatbot.routes.js";
import cropsRoutes from "./routes/crops.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";

// Load environment variables directly
config();

// Don't connect to DB here - let API handle it

const app = express();

if (process.env.NODE_ENV === 'development') {
  console.log('🔧 Running in development mode - connecting to DB once');
  dbConnect();
} else {
  console.log('🚀 Running in production mode - DB connection handled per request');
}

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://crop-mate-three.vercel.app',
    process.env.CLIENT_ORIGIN
  ].filter(Boolean), // Remove undefined values
  credentials: true
}));
app.use(json());
app.use("/api/diagnose", diagnoseRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/crops", cropsRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("CropMate Backend is running 🚀");
});

export default app;