import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB, closeDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Routes
app.use("/auth", authRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    service: "Auth Service",
    timestamp: new Date().toISOString(),
  });
});

// Root endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    service: "Auth Service",
    version: "1.0.0",
    endpoints: {
      signup: "POST /auth/signup",
      login: "POST /auth/login",
      forgotPassword: "POST /auth/forgot-password",
      profile: "GET /auth/me",
      health: "GET /health",
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(`[ERROR] ${err.stack}`);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err : {},
  });
});

// Connect to database and start server
async function startServer() {
  await connectDB();
  
  app.listen(PORT, () => {
    console.log(`🚀 Auth Service running on port ${PORT}`);
    console.log(`📍 Health check: http://localhost:${PORT}/health`);
  });
}

// Handle graceful shutdown
process.on("SIGINT", async () => {
  console.log("\n⚠️ Shutting down gracefully...");
  await closeDB();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("\n⚠️ Shutting down gracefully...");
  await closeDB();
  process.exit(0);
});

// Start the server
startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
