import jwt from "jsonwebtoken";

/**
 * Middleware to verify JWT token
 * Attaches decoded user object to req.user
 */
export function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. Token missing or invalid format." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(403).json({ message: "Token has expired." });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(403).json({ message: "Invalid token." });
    }
    return res.status(403).json({ message: "Token verification failed." });
  }
}

/**
 * Middleware to check if user is admin
 * Must be used after verifyToken middleware
 */
export function isAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: "Authentication required." });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admin privileges required." });
  }

  next();
}
