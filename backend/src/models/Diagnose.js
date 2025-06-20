import mongoose from "mongoose";

const diagnosisSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  disease: {
    type: String,
    required: true,
  },
  explanation: {
    type: String,
    required: true,
  },
  description: {
    type: String, // Optional text user gave during diagnosis
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Diagnosis = mongoose.model("Diagnosis", diagnosisSchema);

export default Diagnosis;
