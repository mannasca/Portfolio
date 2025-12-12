import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import contactRoutes from "./routes/contact.js";
import qualificationRoutes from "./routes/qualification.js";
import projectRoutes from "./routes/project.js";
import serviceRoutes from "./routes/service.js";
import { seedProjects } from "./controllers/project.js";
import { seedServices } from "./controllers/service.js";
import { seedQualifications } from "./controllers/qualification.js";

dotenv.config();

const app = express();

// ----- MIDDLEWARE -----
app.use(express.json());
app.use(cookieParser());

// FIXED CORS — required for Postman + frontend cookies
app.use(cors({
    origin: true,
    credentials: true
}));

// ----- MONGO CONNECTION -----
const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/portfolio";
        await mongoose.connect(mongoUri);
        console.log("✅ MongoDB connected successfully");
        
        // Seed default data on first load
        await seedProjects();
        await seedServices();
        await seedQualifications();
    } catch (err) {
        console.error("❌ MongoDB connection failed:", err.message);
        process.exit(1);
    }
};

// ----- ROUTES -----
app.use("/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/qualification", qualificationRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/service", serviceRoutes);

// ----- SERVER -----
const PORT = process.env.PORT || 5000;

// Start server
(async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`✅ Server running on port ${PORT}`);
    });
})();
