import { connect } from "mongoose";

const dbConnect = async () => {
  try {
    await connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default dbConnect;
