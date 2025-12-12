import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const testMongoConnection = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/portfolio";
    
    console.log("🔄 Attempting to connect to MongoDB Atlas...");
    console.log(`📍 Connection string: ${mongoUri.split('@')[0]}@***`);
    
    await mongoose.connect(mongoUri);
    
    console.log("✅ MongoDB connection successful!");
    console.log("📊 Connection status:", mongoose.connection.readyState === 1 ? "Connected" : "Not connected");
    
    // List collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("📦 Collections:", collections.map(c => c.name).join(", ") || "No collections yet");
    
    await mongoose.connection.close();
    console.log("✅ Connection closed");
    
    process.exit(0);
  } catch (err) {
    console.error("❌ Connection failed:", err.message);
    process.exit(1);
  }
};

testMongoConnection();
