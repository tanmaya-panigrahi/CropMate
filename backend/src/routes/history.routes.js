// src/routes/history.routes.js
import express from "express";
import { getHistory } from "../controllers/history.controller.js";
import verifyFirebaseToken from "../middlewares/auth.js";

const router = express.Router();

router.get("/", verifyFirebaseToken, getHistory);

export default router;
