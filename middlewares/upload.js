const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "temp");

const uploadConfig = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, tempDir);
  },
  filename: (req, file, cd) => {
    cd(null, file.originalname);
  },
  limits: {
    fileSize: 2048,
  },
});

const upload = multer({
  storage: uploadConfig,
});
module.exports = upload;
