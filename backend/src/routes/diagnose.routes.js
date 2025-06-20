import express from "express";
import diagnoseController from "../controllers/diagnose.controller.js";
import upload from "../middlewares/upload.js";
import verifyFirebaseToken from "../middlewares/auth.js";

const router = express.Router();

// POST /api/diagnose
router.post("/", verifyFirebaseToken, upload.single("image"), diagnoseController.runDiagnosis);

export default router;
