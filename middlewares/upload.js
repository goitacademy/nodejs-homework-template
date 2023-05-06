const multer = require("multer");
const { storagePath } = require("../utils/constants");

const multerConfig = multer.diskStorage({
  destination: storagePath.tempPath,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
