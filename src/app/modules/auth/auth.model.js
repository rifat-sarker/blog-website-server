import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      default: "Contributing Author",
    },
    role: {
      type: String,
      default: "Writer",
    },
    location: {
      type: String,
      default: "Dhaka Bureau",
    },
    avatar: {
      type: String,
      default: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    },
    authProvider: {
      type: String,
      enum: ["email-otp", "google"],
      default: "email-otp",
    },
    lastLoginAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;

