import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import Crop from "../models/Crop.js";

dotenv.config();

const cropsPath = path.resolve("./src/scripts/crops.json");
const cropsData = JSON.parse(fs.readFileSync(cropsPath, "utf-8"));

const importCrops = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Crop.deleteMany(); // optional: clear old data
    await Crop.insertMany(cropsData);

    console.log("✅ Crop data imported successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error importing crop data:", error);
    process.exit(1);
  }
};

importCrops();
