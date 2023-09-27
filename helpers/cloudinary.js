import { v2 as cloudinary } from "cloudinary";
import "dotenv/config.js";

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KAY, CLOUDINARY_API_SECRET } =
  process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KAY,
  api_secret: CLOUDINARY_API_SECRET,
});

export default cloudinary;
