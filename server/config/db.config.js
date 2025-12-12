import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from root .env
dotenv.config();

/**
 * Connect to MongoDB.
 * - Reads MONGO_URI or MONGO_DB_URI from environment, falls back to a local mongodb URI.
 * - Exports default async function for server startup.
 */
const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || process.env.MONGO_DB_URI || "mongodb://127.0.0.1:27017/portfolio";
    await mongoose.connect(uri, {
      // modern mongoose doesn't require these options but keep them as safe defaults
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message || err);
    // exit with non-zero so process managers know it failed
    process.exit(1);
  }
};

export default connectDB;
