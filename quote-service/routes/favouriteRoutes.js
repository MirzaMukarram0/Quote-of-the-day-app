import express from "express";
import {
  getFavourites,
  addFavourite,
  removeFavourite,
} from "../controllers/favouriteController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// All favourite routes require authentication
router.get("/", verifyToken, getFavourites);
router.post("/add/:quoteId", verifyToken, addFavourite);
router.delete("/remove/:quoteId", verifyToken, removeFavourite);

export default router;
