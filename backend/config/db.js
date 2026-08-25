import mongoose from "mongoose";

export async function connectToDB() {
  if (!process.env.MONGO_URI) {
    console.warn("-------------------------------------------------------");
    console.warn("⚠️  MONGO_URI is missing in backend/.env!");
    console.warn("⚠️  Please set MONGO_URI in backend/.env to use Auth/Database features.");
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
