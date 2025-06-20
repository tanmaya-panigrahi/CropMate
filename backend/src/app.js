import express, { json } from "express";
import cors from "cors";
import { config } from "dotenv";
import dbConnect from "./config/db.js";
import diagnoseRoutes from "./routes/diagnose.routes.js";
import historyRoutes from "./routes/history.routes.js";

// Load environment variables directly
config();

// Connect to MongoDB
dbConnect();

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // Your frontend URL
  credentials: true
}));
app.use(json()); // Parse JSON
app.use("/api/diagnose", diagnoseRoutes);
app.use("/api/history", historyRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("CropMate Backend is running 🚀");
});

// TODO: Add API routes here

export default app;