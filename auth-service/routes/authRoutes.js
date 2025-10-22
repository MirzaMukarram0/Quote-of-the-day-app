import express from "express";
import {
  signup,
  login,
  forgotPassword,
  getProfile,
} from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);

// Protected routes
router.get("/me", verifyToken, getProfile);

export default router;
