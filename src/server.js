import mongoose from "mongoose";
import config from "./app/config/index.js"; // Relative to src/
import app from "./app.js";

let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  try {
    await mongoose.connect(config.database_url);
    isConnected = true;
    console.log("✅ Database connected");
  } catch (error) {
    console.error("❌ Failed to connect DB:", error);
  }
}

export default async function handler(req, res) {
  await connectDB();
  return app(req, res);
}

// Only run the server if not in Vercel (local/dev mode)
if (process.env.NODE_ENV !== "production") {
  const PORT = config.port || 5000;
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  });
}
