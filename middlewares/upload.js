const multer = require("multer");
const path = require("path");
const { AppError } = require("../utils/errorHandlers");

const tempDir = path.join(process.cwd(), "temp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cbk) => {
    cbk(null, file.originalname);
  },
});

const multerFilter = (req, file, cbk) => {
  if (!file.mimetype.startsWith("image")) {
    cbk(new AppError(400, "Please upload images only"));
  }
  if (file.size > 1 * 1024 * 1024)
    cbk(new AppError(400, "File is too large.."));

  cbk(null, true);
};

const upload = multer({
  storage: multerConfig,
  fileFilter: multerFilter,
  limits: {
    fileSize: 1 * 1024 * 1024,
  },
});

module.exports = upload;
