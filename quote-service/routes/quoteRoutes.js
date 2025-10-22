import express from "express";
import {
  getRandomQuote,
  addQuote,
  updateQuote,
  deleteQuote,
} from "../controllers/quoteController.js";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public route - get random quote
router.get("/random", getRandomQuote);

// Admin-only routes
router.post("/add", verifyToken, isAdmin, addQuote);
router.put("/:id", verifyToken, isAdmin, updateQuote);
router.delete("/:id", verifyToken, isAdmin, deleteQuote);

export default router;
