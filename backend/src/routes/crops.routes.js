import express from "express";
import { getAllCrops, getCropByName } from "../controllers/crops.controller.js";

const router = express.Router();

router.get("/", getAllCrops);
router.get("/:name", getCropByName);

export default router;
