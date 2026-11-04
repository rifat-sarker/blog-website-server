import dotenv from "dotenv";
import path from "path";

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), ".env") });

if (process.env.NODE_ENV === "production" && !process.env.JWT_SECRET) {
  console.warn("⚠️ SECURITY WARNING: JWT_SECRET environment variable is not set in production!");
}

export default {
  node_env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 5000,
  database_url: process.env.DATABASE_URL || "mongodb://localhost:27017/mixhub_dispatch",
  jwt_secret: process.env.JWT_SECRET || "mixhub_secret_2026",
  client_url: process.env.CLIENT_URL || "http://localhost:5173",
  redis_url: process.env.REDIS_URL || "",
  email: {
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: parseInt(process.env.EMAIL_PORT || "587", 10),
    user: process.env.EMAIL_USER || "",
    pass: (process.env.EMAIL_PASS || "").replace(/^["']|["']$/g, ""),
  },
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
    api_key: process.env.CLOUDINARY_API_KEY || "",
    api_secret: process.env.CLOUDINARY_API_SECRET || "",
  },
};
