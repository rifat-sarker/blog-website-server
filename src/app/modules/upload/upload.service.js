import crypto from "crypto";
import config from "../../config/index.js";

const generateSignature = () => {
  const timestamp = Math.round(Date.now() / 1000);
  const secret = config.cloudinary.api_secret;

  const signature = crypto
    .createHash("sha1")
    .update(`timestamp=${timestamp}${secret}`)
    .digest("hex");

  return {
    timestamp,
    signature,
    apiKey: config.cloudinary.api_key,
    cloudName: config.cloudinary.cloud_name,
  };
};

const uploadImage = async (dataUriOrBase64) => {
  const { timestamp, signature, apiKey, cloudName } = generateSignature();

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      file: dataUriOrBase64,
      api_key: apiKey,
      timestamp,
      signature,
    }),
  });

  const result = await response.json();
  if (result.error) {
    throw new Error(result.error.message || "Cloudinary image upload failed");
  }

  return {
    url: result.secure_url || result.url,
    publicId: result.public_id,
    format: result.format,
    width: result.width,
    height: result.height,
  };
};

export const UploadServices = {
  generateSignature,
  uploadImage,
};

