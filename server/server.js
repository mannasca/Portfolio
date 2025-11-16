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
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("MongoDB connected");
    // Seed default data on first load
    seedProjects();
    seedServices();
})
.catch((err) => console.log(err));

// ----- ROUTES -----
app.use("/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/qualification", qualificationRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/service", serviceRoutes);

// ----- SERVER -----
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
