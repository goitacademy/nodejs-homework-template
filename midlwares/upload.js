const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "upload");

const multerComfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerComfig,
});

module.exports = upload;
