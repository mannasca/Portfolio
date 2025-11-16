import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.config.js";
import authRoutes from "./routes/auth.routes.js";

// Load environment variables FIRST
dotenv.config({ path: ".env" });

// Debug: Log the PORT value
console.log("DEBUG: process.env.PORT =", process.env.PORT);
console.log("DEBUG: .env file loaded");

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Default route
app.get("/", (req, res) => {
  res.send("✅ Portfolio API running...");
});

// API routes
app.use("/auth", authRoutes);

// Server port - explicitly use 4000 if .env not working
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 4000;

console.log("DEBUG: Final PORT =", PORT);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
