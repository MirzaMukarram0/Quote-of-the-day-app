import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * Generate JWT token
 */
function generateToken(user) {
  const payload = {
    id: user._id,
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
}

/**
 * Signup - Register a new user
 * POST /auth/signup
 */
export async function signup(req, res) {
  try {
    const { name, email, password, role } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please provide name, email, and password.",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User with this email already exists.",
      });
    }

    // Create new user
    const newUser = new User({
      name,
      email,
      password,
      role: role || "user", // Default to 'user' if not specified
    });

    await newUser.save();

    // Generate token
    const token = generateToken(newUser);

    res.status(201).json({
      success: true,
      message: "User registered successfully.",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation error.",
        errors: Object.values(error.errors).map((e) => e.message),
      });
    }
    
    res.status(500).json({
      message: "Error creating user.",
      error: error.message,
    });
  }
}

/**
 * Login - Authenticate user and return JWT
 * POST /auth/login
 */
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password.",
      });
    }

    // Find user by email
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    // Generate token
    const token = generateToken(user);

    res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Error during login.",
      error: error.message,
    });
  }
}

/**
 * Forgot Password - Mock password reset
 * POST /auth/forgot-password
 */
export async function forgotPassword(req, res) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Please provide an email address.",
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      // Return success even if user not found (security best practice)
      return res.status(200).json({
        success: true,
        message: "If an account with that email exists, a password reset link has been sent.",
      });
    }

    // Generate a password reset token (valid for 1 hour)
    const resetToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // In a real application, send this via email
    // For now, log it to console
    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
    console.log("\n" + "=".repeat(60));
    console.log("🔑 PASSWORD RESET REQUEST");
    console.log("=".repeat(60));
    console.log(`User: ${user.name} (${user.email})`);
    console.log(`Reset Link: ${resetLink}`);
    console.log("=".repeat(60) + "\n");

    res.status(200).json({
      success: true,
      message: "If an account with that email exists, a password reset link has been sent.",
      // In development, you might want to return the token for testing
      ...(process.env.NODE_ENV === "development" && {
        resetToken,
        resetLink,
      }),
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({
      message: "Error processing password reset request.",
      error: error.message,
    });
  }
}

/**
 * Get current user profile
 * GET /auth/me
 * Requires authentication
 */
export async function getProfile(req, res) {
  try {
    // User ID is attached by the verifyToken middleware
    const userId = req.user.id || req.user.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({
      message: "Error fetching user profile.",
      error: error.message,
    });
  }
}
