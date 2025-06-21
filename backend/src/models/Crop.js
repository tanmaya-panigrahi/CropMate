import mongoose from "mongoose";

const cropSchema = new mongoose.Schema({
  cropName: { type: String, required: true, unique: true },
  scientificName: String,
  category: String,        // e.g., Vegetable, Grain, etc.
  climate: String,         // e.g., Warm, 25-35°C
  soilType: String,        // e.g., Well-drained loamy soil
  watering: String,        // e.g., Moderate watering
  growthDuration: String,  // e.g., 50-70 days
  harvestTips: String,     // e.g., Harvest tender pods regularly
  commonDiseases: [String],
  pests: [String],
  care: String
}, { timestamps: true });

const Crop = mongoose.model("Crop", cropSchema);
export default Crop;
