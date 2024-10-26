import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected at host: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Connection Error: ${error}`);
    process.exit(1);
  }
};
