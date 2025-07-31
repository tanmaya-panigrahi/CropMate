import express, { json } from "express";
import cors from "cors";
import { config } from "dotenv";
import dbConnect from "../src/config/db.js";
import diagnoseRoutes from "../src/routes/diagnose.routes.js";
import historyRoutes from "../src/routes/history.routes.js";
import chatbotRoutes from "../src/routes/chatbot.routes.js";
import cropsRoutes from "../src/routes/crops.routes.js";
import dashboardRoutes from "../src/routes/dashboard.routes.js";

config();

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://crop-mate-three.vercel.app',
    process.env.CLIENT_ORIGIN
  ],
  credentials: true
}));
app.use(json());

// Connect to DB for each request (serverless)
app.use(async (req, res, next) => {
  try {
    await dbConnect();
    next();
  } catch (error) {
    console.error("DB connection failed:", error);
    res.status(500).json({ error: "Database connection failed" });
  }
});

// Routes
app.use("/api/diagnose", diagnoseRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/crops", cropsRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("CropMate Backend is running 🚀");
});

export default app;