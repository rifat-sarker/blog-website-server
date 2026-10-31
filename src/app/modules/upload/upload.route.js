import { Router } from "express";
import { UploadControllers } from "./upload.controller.js";

const router = Router();

router.post("/", UploadControllers.uploadImage);
router.get("/params", UploadControllers.getUploadParams);

export const UploadRoutes = router;

