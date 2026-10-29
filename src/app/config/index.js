import dotenv from "dotenv";
import path from "path";

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  node_env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 5000,
  database_url: process.env.DATABASE_URL || "mongodb://localhost:27017/mixhub_dispatch",
  jwt_secret: process.env.JWT_SECRET || "mixhub_secret_2026",
  client_url: process.env.CLIENT_URL || "http://localhost:5173",
  redis_url: process.env.REDIS_URL || "",
};
