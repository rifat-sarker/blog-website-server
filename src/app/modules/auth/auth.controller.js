import { AuthServices } from "./auth.service.js";

const requestOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email address is required." });
    }

    const result = await AuthServices.requestOTP(email);
    res.status(200).json(result);
  } catch (error) {
    console.error("Request OTP Controller Error:", error);
    res.status(500).json({ error: "Failed to send verification code.", message: error.message });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ error: "Email and OTP code are required." });
    }

    const result = await AuthServices.verifyOTP(email, otp);
    res.status(200).json(result);
  } catch (error) {
    console.error("Verify OTP Controller Error:", error);
    res.status(400).json({ error: error.message || "Invalid OTP code." });
  }
};

const googleLogin = async (req, res) => {
  try {
    const { email, name, avatar, googleId } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required for Google authentication." });
    }

    const result = await AuthServices.googleLogin({ email, name, avatar, googleId });
    res.status(200).json(result);
  } catch (error) {
    console.error("Google Login Controller Error:", error);
    res.status(500).json({ error: "Google authentication failed.", message: error.message });
  }
};

export const AuthController = {
  requestOTP,
  verifyOTP,
  googleLogin,
};

