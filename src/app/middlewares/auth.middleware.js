import jwt from "jsonwebtoken";
import config from "../config/index.js";

export const verifyAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Authentication token is required to access this resource.",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, config.jwt_secret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      error: "Forbidden",
      message: "Invalid or expired authentication token.",
    });
  }
};

