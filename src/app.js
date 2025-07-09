import express from "express";
import cors from "cors";
import router from "./app/routes/index.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [
      "https://bicycle-store-client.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

// Blog routes
app.use("/api", router);

// Test route
app.get("/", (req, res) => {
  res.send("Blog Website Server is Running 🚀");
});

export default app;
