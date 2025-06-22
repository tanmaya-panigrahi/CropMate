import express, { json } from "express";
import cors from "cors";
import { config } from "dotenv";
import dbConnect from "./config/db.js";
import diagnoseRoutes from "./routes/diagnose.routes.js";
import historyRoutes from "./routes/history.routes.js";
import chatbotRoutes from "./routes/chatbot.routes.js";
import cropsRoutes from "./routes/crops.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";


const url = "https://cropmate-hb1k.onrender.com"; // Replace with your actual URL
const interval = 14 * 60 * 1000; // 14 minutes (render free tier sleeps after 15 minutes of inactivity)

function reloadWebsite() {
  axios.get(url)
    .then((response) => {
      console.log("Website reloaded successfully:", new Date().toISOString());
    })
    .catch((error) => {
      console.error(`Website reload error: ${error.message}`);
    });
}

// Start the reload interval after the server is up and running
setTimeout(() => {
  setInterval(reloadWebsite, interval);
  console.log("Website auto-reload started");
}, 10000); // Wait 10 seconds after server start before beginning the reload cycle


// Load environment variables directly
config();

// Connect to MongoDB
dbConnect();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'https://crop-mate-eight.vercel.app', // Your frontend URL
  credentials: true
}));
app.use(json()); // Parse JSON
app.use("/api/diagnose", diagnoseRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/crops", cropsRoutes);
app.use("/api/dashboard", dashboardRoutes);


// Test Route
app.get("/", (req, res) => {
  res.send("CropMate Backend is running 🚀");
});

// TODO: Add API routes here

export default app;