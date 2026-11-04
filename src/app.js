import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./app/routes/index.js";
import config from "./app/config/index.js";

const app = express();

// Allowed Origins for CORS
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
  "https://blogs.rifatsarker.com",
  "https://blogs-server.rifatsarker.com",
  "https://blog-website-client-chi.vercel.app",
  config.client_url,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);

      const isAllowed =
        allowedOrigins.includes(origin) ||
        origin.endsWith(".vercel.app") ||
        origin.endsWith(".rifatsarker.com");

      if (isAllowed || config.node_env !== "production") {
        return callback(null, true);
      }
      return callback(new Error("CORS policy does not allow access from the specified Origin."), false);
    },
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Root health check
app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    edition: "MixHub Dispatch Server 2026",
    timestamp: new Date().toISOString(),
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy", uptime: process.uptime() });
});

// API Routes
app.use("/api", router);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled Server Error:", err);
  res.status(err.status || 500).json({
    error: "Internal Server Error",
    message: err.message || "An unexpected error occurred.",
  });
});

export default app;
