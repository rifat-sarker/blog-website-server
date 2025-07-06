import mongoose from "mongoose";
import app from "./app.js";
import config from "./app/config/index.js";

let server;

async function main() {
  try {
    await mongoose.connect(config.database_url);
    console.log("✅ Database connected successfully!");

    server = app.listen(config.port, () => {
      console.log(`🚀 Server is running on port ${config.port}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to database:", error);
  }
}

main();
