const multer = require("multer");
const { join } = require("path");

const multerConfig = multer.diskStorage({
  destination: join(process.cwd(), "temp"),
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
