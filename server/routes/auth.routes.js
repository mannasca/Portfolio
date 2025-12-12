import express from "express";
import { signUp, signIn, signOut, profile } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/authJwt.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/signout", signOut);
router.get("/profile", verifyToken, profile);

export default router;
