import mongoose from "mongoose";
import config from "./app/config/index.js";
import app from "./app.js";
import Blog from "./app/modules/blog/blog.model.js";
import { SEED_ESSAYS } from "./app/modules/blog/blog.constants.js";

let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  if (!config.database_url) {
    console.warn("⚠️ No DATABASE_URL configured. Running with in-memory state.");
    return;
  }

  try {
    await mongoose.connect(config.database_url, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log("✅ MongoDB Connected Successfully");

    // Auto seed if collection is empty
    const count = await Blog.countDocuments();
    if (count === 0) {
      console.log("🌱 Database empty. Seeding initial broadsheet monographs...");
      const cleanSeed = SEED_ESSAYS.map(({ _id, ...rest }) => rest);
      await Blog.insertMany(cleanSeed);
      console.log("✨ Seeding completed.");
    }
  } catch (error) {
    console.warn("⚠️ MongoDB connection deferred (offline or invalid URI):", error.message);
  }
}

// Vercel Serverless Function Handler
export default async function handler(req, res) {
  await connectDB();
  return app(req, res);
}

// Local Standalone Dev / Docker Server
if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
  const PORT = config.port || 5000;
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`🗞️  MixHub Dispatch Server running at http://localhost:${PORT}`);
    });
  });
}
