import { Router } from "express";
import { UploadControllers } from "./upload.controller.js";
import { verifyAuth } from "../../middlewares/auth.middleware.js";

const router = Router();

router.post("/", verifyAuth, UploadControllers.uploadImage);
router.get("/params", verifyAuth, UploadControllers.getUploadParams);

export const UploadRoutes = router;

