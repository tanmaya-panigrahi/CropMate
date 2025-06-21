import express from "express";
import { getDashboardStats, getRecentDiagnoses } from "../controllers/dashboard.controller.js";
import verifyFirebaseToken from "../middlewares/auth.js";
const router = express.Router();


router.get("/summary", verifyFirebaseToken,getDashboardStats);
router.get("/recent", verifyFirebaseToken,getRecentDiagnoses);

export default router;
