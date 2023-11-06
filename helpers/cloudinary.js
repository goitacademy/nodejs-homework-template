const { v2 } = require("cloudinary");
const { config } = require("dotenv");

config();

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;
