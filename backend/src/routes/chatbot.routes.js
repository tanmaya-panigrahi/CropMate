import express from "express";
import chatbotController from "../controllers/chatbot.controller.js";
import verifyFirebaseToken from "../middlewares/auth.js";

const router = express.Router();

router.post("/", verifyFirebaseToken, chatbotController.chat);

export default router;
