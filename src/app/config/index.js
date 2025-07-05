import dotenv from "dotenv";
import path from "path";

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT || 5000,
  node_env: process.env.NODE_ENV || "development",

  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  },

  //   jwt: {
  //     secret: process.env.JWT_SECRET,
  //     expires_in: process.env.JWT_EXPIRES_IN,
  //     refresh_secret: process.env.JWT_REFRESH_SECRET,
  //     refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  //   },

  email: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
};
