import mongoose from "mongoose";

export async function connectToDB() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  if (!process.env.MONGO_URI) {
    console.warn("-------------------------------------------------------");
    console.warn("⚠️  MONGO_URI is missing in environment variables!");
    console.warn("⚠️  Please set MONGO_URI in your Vercel Environment Variables.");
    console.warn("-------------------------------------------------------");
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected: ", conn.connection.host);
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error.message);
  }
}
