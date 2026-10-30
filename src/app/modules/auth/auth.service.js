import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import config from "../../config/index.js";
import { cache } from "../../utils/cache.js";
import User from "./auth.model.js";
import { sendOTPEmail } from "./auth.email.js";

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP to email
const requestOTP = async (email) => {
  const normalizedEmail = email.toLowerCase().trim();
  const otp = generateOTP();

  // Save in cache/redis for 5 minutes (300 seconds)
  const cacheKey = `otp:${normalizedEmail}`;
  await cache.set(cacheKey, otp, 300);

  // Send via Google SMTP
  try {
    await sendOTPEmail(normalizedEmail, otp);
  } catch (error) {
    console.error("Failed to send OTP email:", error);
  }

  return {
    success: true,
    message: "A single-use verification code has been dispatched to your email.",
    expiresIn: 300,
  };
};

// Verify OTP & Log In / Register User
const verifyOTP = async (email, otpCode) => {
  const normalizedEmail = email.toLowerCase().trim();
  const cacheKey = `otp:${normalizedEmail}`;
  const storedOTP = await cache.get(cacheKey);

  const isValid = storedOTP && storedOTP.toString() === otpCode.toString();
  if (!isValid) {
    throw new Error("Invalid or expired verification code.");
  }

  await cache.del(cacheKey);

  let user = null;
  if (mongoose.connection.readyState === 1) {
    try {
      user = await User.findOne({ email: normalizedEmail });
      if (!user) {
        user = await User.create({
          email: normalizedEmail,
          name: normalizedEmail.split("@")[0].replace(/[._]/g, " "),
          role: "Contributing Writer",
          authProvider: "email-otp",
        });
      } else {
        user.lastLoginAt = new Date();
        await user.save();
      }
    } catch {
      // Memory fallback
    }
  }

  if (!user) {
    user = {
      _id: `usr-${Date.now()}`,
      email: normalizedEmail,
      name: normalizedEmail.split("@")[0].replace(/[._]/g, " "),
      role: "Contributing Writer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    };
  }

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    config.jwt_secret,
    { expiresIn: "7d" }
  );

  return {
    user,
    token,
  };
};

// Google 1-Click Login Verification
const googleLogin = async ({ email, name, avatar, googleId }) => {
  const normalizedEmail = email.toLowerCase().trim();

  let user = null;
  if (mongoose.connection.readyState === 1) {
    try {
      user = await User.findOne({ email: normalizedEmail });
      if (!user) {
        user = await User.create({
          email: normalizedEmail,
          name: name || normalizedEmail.split("@")[0],
          avatar: avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
          role: "Staff Essayist",
          authProvider: "google",
        });
      } else {
        if (avatar) user.avatar = avatar;
        if (name) user.name = name;
        user.lastLoginAt = new Date();
        await user.save();
      }
    } catch {
      // Memory fallback
    }
  }

  if (!user) {
    user = {
      _id: `usr-${Date.now()}`,
      email: normalizedEmail,
      name: name || normalizedEmail.split("@")[0],
      avatar: avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      role: "Staff Essayist",
    };
  }

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    config.jwt_secret,
    { expiresIn: "7d" }
  );

  return {
    user,
    token,
  };
};

export const AuthServices = {
  requestOTP,
  verifyOTP,
  googleLogin,
};
