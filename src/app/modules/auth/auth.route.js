import express from "express";
import { AuthController } from "./auth.controller.js";

const router = express.Router();

// Email OTP Endpoints
router.post("/send-otp", AuthController.requestOTP);
router.post("/verify-otp", AuthController.verifyOTP);

// Google 1-Click Login Endpoint
router.post("/google", AuthController.googleLogin);

export const AuthRoutes = router;

