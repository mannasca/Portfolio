import express from "express";
import { signin, signup, signout } from "../controllers/auth.controller.js";

const router = express.Router();

// Signup route (POST)
router.post("/signup", signup);

// Signin route (POST)
router.post("/signin", signin);

// Signout route (GET)
router.get("/signout", signout);

export default router;
