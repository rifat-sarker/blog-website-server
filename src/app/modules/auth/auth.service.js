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

// Send OTP to email with Rate Limiting (60s cooldown per email)
const requestOTP = async (email) => {
  const normalizedEmail = email.toLowerCase().trim();

  // Rate Limiting: 60s cooldown per email
  const cooldownKey = `otp:cooldown:${normalizedEmail}`;
  const isCooldown = await cache.get(cooldownKey);
  if (isCooldown) {
    throw new Error("Please wait 60 seconds before requesting another verification code.");
  }

  const otp = generateOTP();

  // Save in cache/redis for 5 minutes (300 seconds)
  const cacheKey = `otp:${normalizedEmail}`;
  await cache.set(cacheKey, otp, 300);
  await cache.set(cooldownKey, "active", 60);
  await cache.set(`otp:attempts:${normalizedEmail}`, 0, 300);

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

// Verify OTP & Log In / Register User (Max 5 attempts allowed)
const verifyOTP = async (email, otpCode) => {
  const normalizedEmail = email.toLowerCase().trim();
  const cacheKey = `otp:${normalizedEmail}`;
  const attemptsKey = `otp:attempts:${normalizedEmail}`;

  const attempts = (await cache.get(attemptsKey)) || 0;
  if (Number(attempts) >= 5) {
    await cache.del(cacheKey);
    throw new Error("Too many failed attempts. Please request a new verification code.");
  }

  const storedOTP = await cache.get(cacheKey);

  const isValid = storedOTP && storedOTP.toString() === otpCode.toString();
  if (!isValid) {
    await cache.set(attemptsKey, Number(attempts) + 1, 300);
    throw new Error("Invalid or expired verification code.");
  }

  await cache.del(cacheKey);
  await cache.del(attemptsKey);

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
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
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

// Google 1-Click Login Verification (Server-Side ID Token Signature Validation)
const googleLogin = async ({ email, name, avatar, googleId, credentialToken }) => {
  let verifiedEmail = email ? email.toLowerCase().trim() : "";
  let verifiedName = name;
  let verifiedAvatar = avatar;

  // Verify Google ID Token with Google's official tokeninfo endpoint if provided
  if (credentialToken) {
    try {
      const verifyRes = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${credentialToken}`);
      if (verifyRes.ok) {
        const tokenInfo = await verifyRes.json();
        if (tokenInfo?.email) {
          verifiedEmail = tokenInfo.email.toLowerCase().trim();
          verifiedName = tokenInfo.name || verifiedName;
          verifiedAvatar = tokenInfo.picture || verifiedAvatar;
        }
      } else if (config.node_env === "production") {
        throw new Error("Invalid or expired Google identity credential.");
      }
    } catch (err) {
      if (config.node_env === "production") {
        throw new Error("Google authentication verification failed.");
      }
    }
  }

  if (!verifiedEmail) {
    throw new Error("A valid email is required for authentication.");
  }

  let user = null;
  if (mongoose.connection.readyState === 1) {
    try {
      user = await User.findOne({ email: verifiedEmail });
      if (!user) {
        user = await User.create({
          email: verifiedEmail,
          name: verifiedName || verifiedEmail.split("@")[0],
          avatar: verifiedAvatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
          role: "Staff Essayist",
          authProvider: "google",
        });
      } else {
        if (verifiedAvatar) user.avatar = verifiedAvatar;
        if (verifiedName) user.name = verifiedName;
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
      email: verifiedEmail,
      name: verifiedName || verifiedEmail.split("@")[0],
      avatar: verifiedAvatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
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
