const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "..", "tmp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  // filename: (req, file, cb) => {
  //   const userEmail = req.body.email || "unknown_email";
  //   const originalExtension = path.extname(file.originalname);
  //   const fileName = `${userEmail}_${Date.now()}${originalExtension}`;
  //   cb(null, fileName);
  // },
});

const filesUploader = multer({
  storage: multerConfig,
});

module.exports = filesUploader;
