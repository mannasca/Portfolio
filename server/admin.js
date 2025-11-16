// createAdmin.js
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.config.js";
import User from "./models/user.model.js";

dotenv.config();
await connectDB();

const hashed = await bcrypt.hash("admin123", 10);
await User.create({
  username: "Admin",
  email: "admin@portfolio.com",
  password: hashed,
  role: "admin",
});
console.log("✅ Admin created successfully!");
process.exit();
