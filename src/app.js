import router from "./app/routes";

const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware
app.use(
  cors({
    origin: [
      "https://blog-platform-seven-zeta.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

app.get("/", (request, response) => {
  response.send("Welcome to my portfolio API");
});

// application routes
app.use("/api", router);

export default app;
