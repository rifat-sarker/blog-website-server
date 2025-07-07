import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { BlogRoutes } from "./app/modules/blog/blog.route";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Blog routes
app.use("/api", BlogRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Blog Website Server is Running 🚀");
});

export default app;
