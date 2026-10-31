import { UploadServices } from "./upload.service.js";

const uploadImage = async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) {
      return res.status(400).json({ error: "Image data (base64 or data URI) is required." });
    }

    const result = await UploadServices.uploadImage(image);
    res.status(200).json(result);
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Upload failed", message: error.message });
  }
};

const getUploadParams = async (req, res) => {
  try {
    const params = UploadServices.generateSignature();
    res.status(200).json(params);
  } catch (error) {
    res.status(500).json({ error: "Failed to generate upload signature", message: error.message });
  }
};

export const UploadControllers = {
  uploadImage,
  getUploadParams,
};

